import { NextResponse } from 'next/server';
import connectDB from '../../../lib/dbConnect';
import User from '../../../models/User';
import Event from '../../../models/Event';
import EventParticipation from '../../../models/EventParticipation'; 

export async function GET() {
  try {
    await connectDB();

    // Fetch all collections concurrently for optimal performance
    const [users, events, registrations] = await Promise.all([
      User.find({}).sort({ createdAt: -1 }).select('-password'),
      Event.find({}).sort({ date: 1 }),
      EventParticipation.find({}).populate('eventId', 'title date status').sort({ createdAt: -1 })
    ]);

    return NextResponse.json({ 
      success: true, 
      users, 
      events, 
      registrations 
    }, { status: 200 });

  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
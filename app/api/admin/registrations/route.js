import { NextResponse } from 'next/server';
import connectDB from '../../../lib/dbConnect';
import EventParticipation from '../../../models/EventParticipation';

export async function GET() {
  try {
    await connectDB();
    
    // Fetch all registrations, sorted by newest
    const registrations = await EventParticipation.find({}).sort({ createdAt: -1 }).lean();
    
    return NextResponse.json({ success: true, data: registrations }, { status: 200 });
  } catch (error) {
    console.error("Admin Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch registrations." }, { status: 500 });
  }
}
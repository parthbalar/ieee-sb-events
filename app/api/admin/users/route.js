import { NextResponse } from 'next/server';
import connectDB from '../../../lib/dbConnect';
import User from '../../../models/User';

export async function GET() {
  try {
    await connectDB();
    
    // Fetch all users, sort by newest, and exclude the password field
    const users = await User.find({}).sort({ createdAt: -1 }).select('-password');
    
    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
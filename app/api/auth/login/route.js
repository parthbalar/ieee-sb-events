import { NextResponse } from 'next/server';
import connectDB from '../../../lib/dbConnect';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    // 1. Establish database connection
    await connectDB();

    // 2. Extract data from the incoming request
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Please provide all fields' }, { status: 400 });
    }

    // 3. Find the user in MongoDB
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // 4. Verify password (assuming passwords are hashed in the database)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // 5. Return success (In a real app, you would set a session cookie or JWT here)
    return NextResponse.json({ 
      success: true, 
      message: 'Login successful',
      user: {
        name: user.name,   // <-- Add this line
        email: user.email,
        role: user.role
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
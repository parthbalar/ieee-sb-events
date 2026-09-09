import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '../../../lib/dbConnect';
import User from '../../../models/User';

// 1. GET Method: Fetches the user's full profile to display on the page
export async function GET(req) {
  try {
    await connectDB();
    
    // Extract email from the URL query parameters (e.g., ?email=parth@gmail.com)
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Find user but exclude the password field for security
    const user = await User.findOne({ email }).select('-password');
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Profile Fetch Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// 2. PUT Method: Saves the updated profile data back to the database
export async function PUT(request) {
  try {
    // Establish database connection
    await connectDB();

    // Parse the incoming JSON payload
    const body = await request.json();
    
    // Extract ALL fields sent from the frontend
    const { 
      email, 
      name, 
      department, 
      memberId, 
      college, 
      city, 
      year, 
      contactNo, 
      enrollmentNo, 
      password 
    } = body;

    // Ensure we know which user to update
    if (!email) {
      return NextResponse.json({ error: 'Email identifier is missing' }, { status: 400 });
    }

    // Find the user by their email
    const user = await User.findOne({ email });
    
    if (!user) {
      return NextResponse.json({ error: 'User account not found in database' }, { status: 404 });
    }

    // Update standard fields
    if (name) user.name = name;
    if (department) user.department = department;
    if (college) user.college = college;
    if (year) user.year = year;
    if (contactNo) user.contactNo = contactNo;
    
    // Update fields that are allowed to be completely empty/blank strings
    if (memberId !== undefined) user.memberId = memberId;
    if (city !== undefined) user.city = city;
    if (enrollmentNo !== undefined) user.enrollmentNo = enrollmentNo;

    // Securely handle password update ONLY if the user typed a new one
    if (password && password.trim() !== '') {
      if (password.length < 6) {
        return NextResponse.json({ error: 'New password must be at least 6 characters' }, { status: 400 });
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // Save all changes to the database
    await user.save();

    // Return success
    return NextResponse.json({ 
      success: true, 
      message: 'Profile updated',
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Profile Update Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json(); // <--- THIS is what was missing!
    
    const { name, email, password, contactNo, college, department, memberId } = body;

    // Validation
    if (!name || !email || !password || !contactNo || !college || !department) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({ error: 'A user with this email already exists' }, { status: 409 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      contactNo,
      college,
      department,
      role: 'student',
      memberId: memberId || '', 
    });

    return NextResponse.json(
      { 
        message: 'Account created successfully', 
        user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration Error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return NextResponse.json({ error: `Database Error: ${messages.join(', ')}` }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
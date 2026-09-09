import { NextResponse } from 'next/server';
import connectDB from '../../../../../lib/dbConnect';
import EventParticipation from '../../../../../models/EventParticipation';

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    // Security check to ensure valid status
    const validStatuses = ['Pending', 'Verified', 'Not Verified', 'Shortlisted' , 'Rejected'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status value provided." }, { status: 400 });
    }

    // Update the registration status safely
    const updatedTeam = await EventParticipation.findByIdAndUpdate(
      id,
      { $set: { registrationStatus: status } },
      { returnDocument: 'after' }
    );

    if (!updatedTeam) {
      return NextResponse.json({ error: "Team not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: `Status updated to ${status}` }, { status: 200 });
    
  } catch (error) {
    console.error("Admin Status Update Error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
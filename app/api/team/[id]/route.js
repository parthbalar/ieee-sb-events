import { NextResponse } from "next/server";
import connectDB from "../../../lib/dbConnect";
import EventParticipation from "../../../models/EventParticipation"; 

export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    // 1. Unwrap the params Promise
    const { id } = await params;
    
    const body = await request.json();
    const { memberType, memberIndex, data } = body; 

    // 2. Safely remove the `_id` field from the frontend data so MongoDB doesn't throw an "Immutable Field" error
    const safeData = { ...data };
    delete safeData._id;

    let updateQuery = {};

    // 3. Build the update query dynamically using "Dot Notation" (e.g., teamMembers.0.name)
    if (memberType === 'leader') {
      // Update leader fields individually
      for (const key in safeData) {
        updateQuery[`teamLeader.${key}`] = safeData[key];
      }
    } else if (memberType === 'member' && memberIndex !== null && memberIndex !== undefined) {
      // Update specific member fields individually
      for (const key in safeData) {
        updateQuery[`teamMembers.${memberIndex}.${key}`] = safeData[key];
      }
    } else {
      return NextResponse.json({ error: "Invalid member data received." }, { status: 400 });
    }

    // 4. Update the database using the safe dot-notation map
    const updatedTeam = await EventParticipation.findByIdAndUpdate(
      id,
      { $set: updateQuery },
      { 
        returnDocument: 'after', 
        runValidators: true 
      } 
    );

    if (!updatedTeam) {
      return NextResponse.json({ error: "Registration team not found in database." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedTeam }, { status: 200 });
    
  } catch (error) {
    console.error("Edit API Error:", error);
    return NextResponse.json({ error: "Failed to update team member. Please try again." }, { status: 500 });
  }
}
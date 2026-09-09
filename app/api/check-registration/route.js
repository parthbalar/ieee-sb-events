import { NextResponse } from 'next/server';
import dbConnect from '../../lib/dbConnect';
import EventParticipation from '../../models/EventParticipation';

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get('eventId');
    const email = searchParams.get('email');

    if (!eventId || !email) {
      return NextResponse.json({ isRegistered: false }, { status: 200 });
    }

    // Find registration where user is either teamLeader or a teamMember
    const registration = await EventParticipation.findOne({
      eventId: eventId,
      $or: [
        { 'teamLeader.email': email },
        { 'teamMembers.email': email }
      ]
    }).lean();

    if (!registration) {
      return NextResponse.json({ isRegistered: false }, { status: 200 });
    }

    // Return the full registration data including teamLeader & teamMembers
    return NextResponse.json({
      isRegistered: true,
      registrationId: registration._id,
      registrationStatus: registration.registrationStatus || 'Pending',
      teamName: registration.teamName,
      selectedTrack: registration.selectedTrack,
      abstract: registration.abstract,
      teamLeader: registration.teamLeader,
      teamMembers: registration.teamMembers || []
    }, { status: 200 });

  } catch (error) {
    console.error("Check Registration Error:", error);
    return NextResponse.json({ isRegistered: false, error: error.message }, { status: 500 });
  }
}
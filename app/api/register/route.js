import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import dbConnect from '../../lib/dbConnect';
import Event from '../../models/Event';
import EventParticipation from '../../models/EventParticipation';

// Helper: Save IEEE Proofs
async function saveImage(file, teamName, memberName) {
  if (!file || file === 'null' || typeof file === 'string') return '';
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const safeTeamName = teamName.replace(/[^a-zA-Z0-9]/g, '_');
    const safeMemberName = memberName.replace(/[^a-zA-Z0-9]/g, '_');
    const extension = path.extname(file.name) || '.jpg';
    const fileName = `${safeTeamName}_${safeMemberName}${extension}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'ieee_proofs');
    
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, fileName), buffer);
    return `/uploads/ieee_proofs/${fileName}`;
  } catch (error) {
    console.error("Failed to save IEEE proof:", error);
    return ''; 
  }
}

// Helper: Save Payment Screenshot (Names it: Payment_TeamID_TeamName)
async function savePaymentProof(file, teamId, teamName) {
  if (!file || file === 'null' || typeof file === 'string') return '';
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const safeTeamName = teamName.replace(/[^a-zA-Z0-9]/g, '_');
    const extension = path.extname(file.name) || '.jpg';
    
    const fileName = `Payment_${teamId}_${safeTeamName}${extension}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'payments');
    
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, fileName), buffer);
    return `/uploads/payments/${fileName}`;
  } catch (error) {
    console.error("Failed to save Payment proof:", error);
    return ''; 
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    
    const formData = await req.formData();
    const eventIdOrSlug = formData.get('eventId');
    const teamName = formData.get('teamName'); 
    const selectedTrack = formData.get('selectedTrack');
    const leaderData = JSON.parse(formData.get('teamLeader'));
    const teamMembers = JSON.parse(formData.get('teamMembers') || '[]');
    const abstract = formData.get('abstract');
    
    // Extract Payment Data
    const paymentTransactionId = formData.get('paymentTransactionId') || '';
    const paymentAmount = formData.get('paymentAmount') || 0;
    const paymentProofFile = formData.get('paymentProof');

    if (!eventIdOrSlug || !selectedTrack || !abstract || !teamName) {
      return NextResponse.json({ error: 'Event ID, Team Name, Technical Track, and Abstract are required' }, { status: 400 });
    }

    const isObjectId = eventIdOrSlug.length === 24 && /^[0-9a-fA-F]{24}$/.test(eventIdOrSlug);
    const event = await Event.findOne({
      $or: [ { slug: eventIdOrSlug }, ...(isObjectId ? [{ _id: eventIdOrSlug }] : []) ]
    });

    if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

    const minMembers = event?.guidelines?.team_size?.min_members || 1;
    const maxMembers = event?.guidelines?.team_size?.max_members || 1;
    const totalTeamSize = teamMembers.length + 1;

    if (totalTeamSize < minMembers || totalTeamSize > maxMembers) {
      return NextResponse.json({ error: `Team size must be between ${minMembers} and ${maxMembers} members.` }, { status: 400 });
    }

    // =========================================================================
    // 1. GENERATE SEQUENTIAL CUSTOM TEAM ID (NPC26-T001)
    // =========================================================================
    // Find the latest team registered that has an ID starting with "NPC26-T"
    const lastParticipation = await EventParticipation.findOne(
      { _id: { $regex: /^NPC26-T/ } }
    ).sort({ createdAt: -1 }); // Sort by newest first

    let nextNumber = 1;

    if (lastParticipation && lastParticipation._id) {
      // Extract the numerical part. E.g., from "NPC26-T042", extract "042" -> 42
      const lastIdString = lastParticipation._id.replace('NPC26-T', '');
      const lastIdNumber = parseInt(lastIdString, 10);
      
      if (!isNaN(lastIdNumber)) {
        nextNumber = lastIdNumber + 1; // Increment the number
      }
    }

    // Convert the number back to a string and pad with zeros (e.g., 5 becomes "005")
    const paddedNumber = String(nextNumber).padStart(3, '0');
    const customRegistrationId = `NPC26-T${paddedNumber}`;
    // =========================================================================

    // 2. PROCESS PAYMENT IMAGE WITH THE NEW ID
    let paymentProofUrl = '';
    if (paymentProofFile) {
      paymentProofUrl = await savePaymentProof(paymentProofFile, customRegistrationId, teamName);
    }

    // 3. PROCESS IEEE PROOFS
    const leaderProofFile = formData.get('leaderProof');
    leaderData.ieeeProofUrl = await saveImage(leaderProofFile, teamName, leaderData.name);

    for (let i = 0; i < teamMembers.length; i++) {
      const memberProofFile = formData.get(`memberProof_${i}`);
      teamMembers[i].ieeeProofUrl = await saveImage(memberProofFile, teamName, teamMembers[i].name);
    }

    // 4. CREATE DATABASE RECORD
    const newParticipation = await EventParticipation.create({
      _id: customRegistrationId, // Assigned NPC26-T00X here
      eventId: event._id,
      eventName: event?.event_info?.title || event?.title || eventIdOrSlug,
      teamName: teamName, 
      selectedTrack,
      teamLeader: leaderData,
      teamMembers,
      abstract, 
      paymentTransactionId,
      paymentAmount: Number(paymentAmount),
      paymentProofUrl
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Registration successful!',
      registrationId: newParticipation._id 
    }, { status: 201 });

  } catch (error) {
    console.error('Registration Error:', error);
    
    // Safety Net: If two people hit "Submit" at the exact same millisecond, MongoDB will catch the duplicate ID
    if (error.code === 11000) {
      return NextResponse.json({ error: 'High traffic! A team ID collision occurred. Please click submit again to generate the next ID.' }, { status: 400 });
    }
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return NextResponse.json({ error: `Validation Error: ${messages.join(', ')}` }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error during registration' }, { status: 500 });
  }
}
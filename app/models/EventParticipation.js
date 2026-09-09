import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  enrollmentNo: { type: String, required: true },
  college: { type: String, required: true },
  department: { type: String, required: true },
  year: { type: String, required: true },
  ieeeMemberId: { type: String, default: '' }, 
  ieeeProofUrl: { type: String, default: '' }, 
});

const teamLeaderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  enrollmentNo: { type: String, required: true },
  college: { type: String, required: true },
  department: { type: String, required: true },
  year: { type: String, required: true },
  ieeeMemberId: { type: String, default: '' }, 
  ieeeProofUrl: { type: String, default: '' }, 
});

const participationSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, 
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    eventName: { type: String, required: true },
    teamName: { type: String, required: true },
    selectedTrack: { type: String, required: true },
    teamLeader: teamLeaderSchema,
    teamMembers: [memberSchema],
    abstract: { type: String, required: true }, 
    
    // NEW: Payment Storage Fields
    paymentTransactionId: { type: String, default: '' },
    paymentAmount: { type: Number, default: 0 },
    paymentProofUrl: { type: String, default: '' },

    // ---> 1. ADD THIS NEW FIELD <---
    registrationStatus: { 
      type: String, 
      enum: ['Pending', 'Verified', 'Not Verified', 'Shortlisted', 'Rejected'], 
      default: 'Pending'
    }
  },
  { 
    timestamps: true,
    collection: 'event_participates'
  }
);

if (mongoose.models.EventParticipation) {
  delete mongoose.models.EventParticipation;
}

const EventParticipation = mongoose.model('EventParticipation', participationSchema);

export default EventParticipation;
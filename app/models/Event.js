import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    event_info: {
      title: { type: String, required: true },
      theme: String,
      host_institute: String,
      host_department: String,
      venue: String,
      date: { type: String, required: true }, // Required for proper sorting
      day: String,
      organizers: [String],
    },
    event: {
      title: String,
      theme: String,
      rules_and_guidelines: [
        {
          section: String,
          // Arrays for standard bullet points or tracks
          rules: [String],
          tracks: [String],
          // Strings for extra information
          note: String,
          total_weightage: String,
          // Nested objects for judging criteria
          criteria: [
            {
              criterion: String,
              weightage: String,
            }
          ]
        }
      ]
    },
    technical_tracks: [
      {
        track_id: Number,
        title: String,
        sub_topics: [String],
      }
    ],
    guidelines: {
      team_size: {
        min_members: Number,
        max_members: Number,
      },
      presentation: {
        total_time_minutes: Number,
        presentation_minutes: Number,
        q_and_a_minutes: Number,
      },
      format: String,
      eligibility: [String],
    },
    contact: {
      email: String,
      phone: String,
      instagram: String,
      registration: String,
    },
    schedule: {
      deadline: String,
      acceptance: String,
      event_date: String,
    },
    document_date: String,
  },
  { timestamps: true }
);

// Prevent Mongoose from compiling the model multiple times in Next.js
const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

export default Event;
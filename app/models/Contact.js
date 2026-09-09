import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: false, // Optional as specified in your frontend placeholder
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
  },
  { 
    timestamps: true // Automatically adds `createdAt` and `updatedAt` timestamps
  }
);

// This check prevents Mongoose from compiling the model multiple times during Next.js development hot-reloads
const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;
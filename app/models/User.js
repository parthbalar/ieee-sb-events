import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your full name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    contactNo: { // Changed from phoneNumber to contactNo
      type: String,
      required: [true, 'Please provide a phone number'],
    },
    college: {
      type: String,
      required: [true, 'Please provide your college name'],
    },
    department: {
      type: String,
      required: [true, 'Please provide your department'],
    },
    role: {
      type: String,
      enum: ['student', 'admin'],
      default: 'student',
    },
    city: {
      type: String,
      default: '',
    },
    year: {
      type: String,
      default: '1st Year',
    },
    enrollmentNo: {
      type: String,
      default: '',
    },
    memberId: {
      type: String,
      default: '', 
    },
  },
  { timestamps: true }
);

// Prevent mongoose from compiling the model multiple times in Next.js
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
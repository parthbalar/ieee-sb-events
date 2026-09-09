import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Ensure your .env.local file uses MONGO_URI
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
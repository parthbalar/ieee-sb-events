import { NextResponse } from "next/server";
import connectDB from "../../lib/dbConnect";
import Contact from "../../models/Contact";

export async function POST(request) {
  try {
    // 1. Establish database connection
    await connectDB();

    // 2. Parse the JSON body sent from the frontend
    const body = await request.json();
    const { name, email, phone, message } = body;

    // 3. Server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    // 4. Create and save the new document to MongoDB
    const newContact = await Contact.create({
      name,
      email,
      phone,
      message,
    });

    // 5. Return a successful response
    return NextResponse.json(
      { 
        success: true, 
        message: "Message sent successfully!", 
        data: newContact 
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error("Contact API Error:", error);
    
    // Return an error response if something goes wrong
    return NextResponse.json(
      { error: "Failed to send the message. Please try again later." },
      { status: 500 }
    );
  }
}
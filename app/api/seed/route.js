import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import dbConnect from '../../lib/dbConnect'; 
import Event from '../../models/Event'; 

export async function GET() {
  try {
    // 1. Connect to the database
    await dbConnect();
    
    // 2. Locate and read the events.json file from the app folder
    const filePath = path.join(process.cwd(), 'app', 'events.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    
    // 3. Parse the JSON data
    const eventData = JSON.parse(fileContents);

    // 4. Insert the new data
    if (Array.isArray(eventData)) {
      await Event.insertMany(eventData);
    } else {
      await Event.create(eventData);
    }
    
    return NextResponse.json(
      { message: 'Fresh events (with all rules & guidelines) successfully ADDED to MongoDB!' }, 
      { status: 200 }
    );

  } catch (error) {
    console.error('Seeding Error:', error);
    
    // Catch common JSON formatting errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON format in events.json file. Check for missing commas or quotes.' }, 
        { status: 400 }
      );
    }
    
    // Catch file not found errors
    if (error.code === 'ENOENT') {
      return NextResponse.json(
        { error: 'Could not find events.json in the app folder.' }, 
        { status: 404 }
      );
    }

    // Return the EXACT database error to the browser
    return NextResponse.json(
      { 
        error: 'Failed to add events from JSON', 
        details: error.message || error.toString() 
      }, 
      { status: 500 }
    );
  }
}
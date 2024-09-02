import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  try {
    // Get the absolute path to the JSON file
    const jsonPath = path.join(process.cwd(), 'src', 'data', 'locations.json');
    
    // Read the JSON file
    const fileContents = await fs.readFile(jsonPath, 'utf8');
    
    // Parse the JSON content
    const data = JSON.parse(fileContents);

    // Log the data for debugging
    console.log('API: Data loaded:', data);

    // Return the data as a JSON response
    return NextResponse.json(data);
  } catch (error) {
    console.error('API: Error reading locations:', error);
    return NextResponse.json({ message: 'Error reading locations data' }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  try {
    const jsonPath = path.join(process.cwd(), 'src', 'data', 'locations.json');
    const fileContents = await fs.readFile(jsonPath, 'utf8');

    let data;
    try {
      data = JSON.parse(fileContents);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      return NextResponse.json({ message: 'Error parsing locations data' }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error('API: Error reading locations:', error);
    return NextResponse.json({ message: 'Error reading locations data' }, { status: 500 });
  }
}
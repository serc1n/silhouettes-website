import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { artistName, twitterHandle, medium, expectation, timestamp } = body

    // Validate required fields
    if (!artistName || !twitterHandle || !medium || !expectation) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Create CSV file path in secure data directory
    const dataDir = path.join(process.cwd(), 'data')
    const csvFilePath = path.join(dataDir, 'collaboration_requests.csv')
    
    // Ensure data directory exists
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    
    // Check if file exists, if not create it with headers
    if (!fs.existsSync(csvFilePath)) {
      const headers = 'Timestamp,Artist Name,Twitter Handle,Medium,Expectation from the Collab\n'
      fs.writeFileSync(csvFilePath, headers, 'utf8')
    }

    // Escape CSV values (handle commas and quotes)
    const escapeCsvValue = (value: string) => {
      if (value.includes(',') || value.includes('"') || value.includes('\n')) {
        return `"${value.replace(/"/g, '""')}"`
      }
      return value
    }

    // Create CSV row
    const csvRow = [
      timestamp,
      escapeCsvValue(artistName),
      escapeCsvValue(twitterHandle),
      escapeCsvValue(medium),
      escapeCsvValue(expectation)
    ].join(',') + '\n'

    // Append to CSV file
    fs.appendFileSync(csvFilePath, csvRow, 'utf8')

    return NextResponse.json(
      { message: 'Collaboration request submitted successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error processing collaboration request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 
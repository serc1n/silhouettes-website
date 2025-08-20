import { NextRequest, NextResponse } from 'next/server'

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

    // Log the collaboration request (for now, since Vercel can't write files)
    console.log('🎨 New Collaboration Request:')
    console.log('Timestamp:', timestamp)
    console.log('Artist Name:', artistName)
    console.log('Twitter Handle:', twitterHandle)
    console.log('Medium:', medium)
    console.log('Expectation:', expectation)
    console.log('---')

    // In a real application, you would:
    // - Send to a database (like Supabase, PlanetScale, etc.)
    // - Send to an email service (like SendGrid, Mailgun)
    // - Send to a form service (like Formspree, Netlify Forms)
    // - Send to Google Sheets via Google Apps Script
    
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
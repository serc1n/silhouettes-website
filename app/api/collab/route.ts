import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

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

    // Clean Twitter handle (add @ if missing)
    const cleanTwitterHandle = twitterHandle.startsWith('@') 
      ? twitterHandle 
      : `@${twitterHandle}`

    // Insert into Supabase database
    const { data, error } = await supabase
      .from('collaboration_requests')
      .insert([
        {
          artist_name: artistName,
          twitter_handle: cleanTwitterHandle,
          medium: medium,
          expectation: expectation,
          created_at: timestamp || new Date().toISOString()
        }
      ])

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save collaboration request' },
        { status: 500 }
      )
    }

    console.log('🎨 New Collaboration Request Saved:', data)
    
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
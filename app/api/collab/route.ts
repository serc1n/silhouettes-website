import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

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

    // Check if environment variables exist
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables')
      console.error('SUPABASE_URL exists:', !!supabaseUrl)
      console.error('SUPABASE_KEY exists:', !!supabaseKey)
      return NextResponse.json(
        { error: 'Database configuration error' },
        { status: 500 }
      )
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Clean Twitter handle (add @ if missing)
    const cleanTwitterHandle = twitterHandle.startsWith('@') 
      ? twitterHandle 
      : `@${twitterHandle}`

    console.log('🎨 Attempting to save collaboration request:', {
      artist_name: artistName,
      twitter_handle: cleanTwitterHandle,
      medium: medium,
      expectation: expectation.substring(0, 50) + '...'
    })

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
      .select()

    if (error) {
      console.error('❌ Supabase error:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      return NextResponse.json(
        { error: 'Failed to save collaboration request: ' + error.message },
        { status: 500 }
      )
    }

    console.log('✅ Collaboration request saved successfully:', data)
    
    return NextResponse.json(
      { message: 'Collaboration request submitted successfully', data },
      { status: 200 }
    )

  } catch (error) {
    console.error('❌ Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    )
  }
} 
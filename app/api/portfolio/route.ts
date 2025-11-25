import { createClient } from '@/lib/supabaseServer'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// GET - Fetch user's portfolio
export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ portfolio: data || null })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST - Create portfolio
export async function POST(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { slug, data } = body

    if (!slug || !data) {
      return NextResponse.json({ error: 'Missing slug or data' }, { status: 400 })
    }

    const supabase = await createClient()

    // Check if user already has a portfolio
    const { data: existingUserPortfolio } = await supabase
      .from('portfolios')
      .select('slug')
      .eq('user_id', userId)
      .single()

    if (existingUserPortfolio) {
      return NextResponse.json({ 
        error: 'You already have a portfolio. Use PUT to update it.',
        existingSlug: existingUserPortfolio.slug 
      }, { status: 409 })
    }

    // Check if slug is taken by another user
    const { data: existingSlug } = await supabase
      .from('portfolios')
      .select('slug')
      .eq('slug', slug)
      .single()

    if (existingSlug) {
      return NextResponse.json({ error: 'Username already taken' }, { status: 409 })
    }

    // Create new portfolio
    const { error } = await supabase
      .from('portfolios')
      .insert({ slug, data, user_id: userId })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// PUT - Update portfolio
export async function PUT(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { slug, data } = body

    if (!slug || !data) {
      return NextResponse.json({ error: 'Missing slug or data' }, { status: 400 })
    }

    const supabase = await createClient()

    // Check if the new slug is available (if changing slug)
    const { data: existingSlug } = await supabase
      .from('portfolios')
      .select('slug, user_id')
      .eq('slug', slug)
      .single()

    if (existingSlug && existingSlug.user_id !== userId) {
      return NextResponse.json({ error: 'Username already taken by another user' }, { status: 409 })
    }

    // Update the portfolio
    const { error } = await supabase
      .from('portfolios')
      .update({ slug, data, updated_at: new Date().toISOString() })
      .eq('user_id', userId)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// DELETE - Delete portfolio
export async function DELETE() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = await createClient()

    const { error } = await supabase
      .from('portfolios')
      .delete()
      .eq('user_id', userId)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

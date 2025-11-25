import { createClient } from '@/lib/supabaseServer'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  if (!slug) {
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('portfolios')
    .select('slug')
    .eq('slug', slug)
    .single()

  if (error && error.code !== 'PGRST116') { // PGRST116 is "The result contains 0 rows"
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ exists: !!data })
}

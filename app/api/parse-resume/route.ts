import { NextRequest, NextResponse } from 'next/server'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY

export async function POST(request: NextRequest) {
  if (!OPENROUTER_API_KEY) {
    return NextResponse.json(
      { error: 'OpenRouter API key not configured' },
      { status: 500 }
    )
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Read file content
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    
    // Determine mime type
    let mimeType = file.type || 'application/pdf'
    if (file.name.endsWith('.pdf')) mimeType = 'application/pdf'
    else if (file.name.endsWith('.txt')) mimeType = 'text/plain'
    else if (file.name.endsWith('.doc')) mimeType = 'application/msword'
    else if (file.name.endsWith('.docx')) mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

    const systemPrompt = `You are an expert resume parser. Look at this resume and extract information into a structured JSON object.

Return ONLY valid JSON with this exact structure (no markdown, no code blocks, just raw JSON):
{
  "name": "Full Name",
  "title": "Professional Title (e.g., Software Engineer)",
  "email": "email@example.com",
  "subtitle": ["Role 1", "Role 2"],
  "bio": "A brief professional summary (2-3 sentences)",
  "socialLinks": [
    {"platform": "github", "url": "https://github.com/username"},
    {"platform": "linkedin", "url": "https://linkedin.com/in/username"}
  ],
  "experiences": [
    {
      "company": "Company Name",
      "role": "Job Title",
      "location": "City, State",
      "period": "Jan 2022 - Present"
    }
  ],
  "projects": [
    {
      "title": "Project Name",
      "description": "Brief description of the project",
      "technologies": ["Tech1", "Tech2"],
      "github": "https://github.com/...",
      "demo": "https://..."
    }
  ],
  "skills": ["Skill1", "Skill2", "Skill3"]
}

Important:
- Extract real data from the resume
- For missing fields, use empty strings or empty arrays
- For social links, only include platforms: github, linkedin, twitter, email, other
- Keep descriptions concise
- Return ONLY the JSON object, no explanations`

    // Use a vision model that can read documents
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
        'X-Title': 'Link1t Portfolio Generator'
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-001',
        messages: [
          { 
            role: 'user', 
            content: [
              { type: 'text', text: systemPrompt },
              { 
                type: 'file',
                file: {
                  filename: file.name,
                  file_data: `data:${mimeType};base64,${base64}`
                }
              }
            ]
          }
        ],
        temperature: 0.1,
        max_tokens: 4000
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('OpenRouter API error:', errorData)
      return NextResponse.json(
        { error: errorData.error?.message || 'Failed to parse resume' },
        { status: response.status }
      )
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content

    if (!content) {
      return NextResponse.json(
        { error: 'No response from AI model' },
        { status: 500 }
      )
    }

    // Parse the JSON response
    try {
      // Clean up the response - remove any markdown code blocks if present
      let cleanContent = content.trim()
      if (cleanContent.startsWith('```json')) {
        cleanContent = cleanContent.slice(7)
      } else if (cleanContent.startsWith('```')) {
        cleanContent = cleanContent.slice(3)
      }
      if (cleanContent.endsWith('```')) {
        cleanContent = cleanContent.slice(0, -3)
      }
      cleanContent = cleanContent.trim()

      const parsedData = JSON.parse(cleanContent)
      return NextResponse.json({ success: true, data: parsedData })
    } catch (parseError) {
      console.error('Failed to parse AI response:', content)
      return NextResponse.json(
        { error: 'Failed to parse AI response as JSON' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Resume parsing error:', error)
    return NextResponse.json(
      { error: 'Failed to process resume' },
      { status: 500 }
    )
  }
}

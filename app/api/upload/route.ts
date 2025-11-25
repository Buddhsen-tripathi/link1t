import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { NextResponse } from 'next/server'

const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT || `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
  forcePathStyle: true,
})

const BUCKET_NAME = process.env.R2_IMAGE_BUCKET_NAME || process.env.R2_BUCKET_NAME || 'portfolio-assets'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const username = formData.get('username') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (file.size > 4.5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size exceeds 4.5MB limit' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const folder = username ? username : 'uploads'
    const filename = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`

    await s3Client.send(new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: filename,
      Body: buffer,
      ContentType: file.type,
    }))

    // Return relative URL to our proxy
    const url = `/api/image/${filename}`

    return NextResponse.json({ url })
  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 })
  }
}

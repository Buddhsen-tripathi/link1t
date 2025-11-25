import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params
    const key = path.join('/')

    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    })

    const response = await s3Client.send(command)

    if (!response.Body) {
      return new NextResponse('Image not found', { status: 404 })
    }

    // Convert the stream to a Buffer
    const byteArray = await response.Body.transformToByteArray()
    const buffer = Buffer.from(byteArray)

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': response.ContentType || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Error fetching image:', error)
    return new NextResponse('Image not found', { status: 404 })
  }
}

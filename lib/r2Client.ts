import { S3Client } from '@aws-sdk/client-s3'

export const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT || `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
  forcePathStyle: true,
})

export const BUCKET_NAME = process.env.R2_IMAGE_BUCKET_NAME || process.env.R2_BUCKET_NAME || 'portfolio-assets'
export const PUBLIC_URL_BASE = process.env.R2_PUBLIC_URL || 'https://pub-your-r2-domain.r2.dev'

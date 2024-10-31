import type { NextRequest } from 'next/server'

export function cors(req: NextRequest) {
  const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:3000']

  const origin = req.headers.get('origin')
  
  if (origin && allowedOrigins.includes(origin)) {
    return new Headers({
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    })
  }
  
  return new Headers()
}
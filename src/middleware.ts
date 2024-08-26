import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: any) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);

      // If token verification is successful, continue the request
      const response = NextResponse.next();
      return response;

    } catch (error: any) {
      // Token verification failed
      console.error('Token verification failed:', error);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  } else {
    // No token provided
    return NextResponse.json({ error: 'Token is missing' }, { status: 401 });
  }
}

export const config = {
  matcher: ['/api/subscriptions/purchaseSubscription', '/api/subscriptions/confirmSubscription'],
};

import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'Token is missing' }, { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    // Clone the request headers
    const requestHeaders = new Headers(request.headers);

    if (typeof payload.id === 'string') {
      requestHeaders.set('X-User-ID', payload.id);
    }
    if (typeof payload.email === 'string') {
      requestHeaders.set('X-User-Email', payload.email);
    }

    const newRequest = new NextRequest(request, {
      headers: requestHeaders,
    });

    return NextResponse.next({
      request: newRequest,
    });

  } catch (error: any) {
    console.error('Token verification failed:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export const config = {
  matcher: [
    '/api/subscriptions/purchaseSubscription',
    '/api/subscriptions/confirmSubscription',
    '/api/Profile/showProfile',
    '/api/Jobs/applyJob',
  ],
};
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);

      // Add user information to headers
      const response = NextResponse.next();
      
      if (typeof payload.id === 'string') {
        response.headers.set('X-User-ID', payload.id);
        response.cookies.set('X-User-ID', payload.id);
      }
      if (typeof payload.email === 'string') {
        response.headers.set('X-User-Email', payload.email);
      }

      return response;

    } catch (error: any) {
      console.error('Token verification failed:', error);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  } else {
    return NextResponse.json({ error: 'Token is missing' }, { status: 401 });
  }
}

export const config = {
  matcher: ['/api/subscriptions/purchaseSubscription', '/api/subscriptions/confirmSubscription',
    '/api/Profile/showProfile', '/api/Jobs/applyJob', '/api/Jobs/editJob/:id'
  ],
};
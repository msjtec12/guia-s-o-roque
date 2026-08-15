import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const adminSession = request.cookies.get('admin_session');
    
    // Check if Supabase auth token or custom admin session cookie is present
    const isAuthCookieValid = adminSession && adminSession.value === 'authenticated';
    const hasSupabaseToken = request.cookies.getAll().some(c => c.name.includes('sb-') && c.name.includes('-auth-token'));

    if (!isAuthCookieValid && !hasSupabaseToken) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

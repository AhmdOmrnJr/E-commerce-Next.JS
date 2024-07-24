import { NextResponse } from 'next/server';

export default function middleware(request) {
    const cookie = request.cookies.get('token');
    const { pathname } = request.nextUrl;

    if (!cookie && pathname !== '/auth/login' && pathname !== '/auth/register' && pathname !== '/auth/forgotPassword' && pathname !== '/auth/verifyResetCode' && pathname !== '/auth/resetPassword' && !pathname.startsWith('/_next/')) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    if (cookie && (pathname === '/auth/login' || pathname === '/auth/register')) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
}

import { authRoutes } from '@constants';
import { NextResponse, NextRequest } from 'next/server';

import '@init-globals';

export async function middleware(request: NextRequest) {
  try {
    if (request.method !== 'GET') {
      if (request.method === 'POST') return;

      return NextResponse.next();
    }

    if (!request.headers.get('Authorization') && !request.cookies.has('jwt')) {
      if (authRoutes.some((el) => el.pathname === request.nextUrl.pathname)) {
        console.log("sheesh1 " + request.nextUrl.pathname);
        return;
      }

      if (!authRoutes.some((el) => el.pathname === request.nextUrl.pathname)) {
        console.log("sheesh " + request.nextUrl.pathname);

        return NextResponse.redirect(new URL('/login', request.url));
      }
    }

    const token =
      request.headers.get('Authorization') ||
      `Bearer ${request.cookies.get('jwt')?.value}`;

    const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/jwt-verify`, {
      headers: {
        Authorization: token || '',
      },
      next: {
        revalidate: 1700,
      },
    });

    if (!res.ok) {
      const redirectResponse = NextResponse.redirect(new URL('/', request.url));

      redirectResponse.cookies.delete('jwt');

      return redirectResponse;
    }

    const user = await res.json();

    if (token) {
      if (
        user?.role === 'DOCTOR' &&
        request.nextUrl.pathname.startsWith('/doctor')
      ) {
        return NextResponse.next({
          headers: {
            'user-type': user?.role || '',
            'x-pathname': request.nextUrl.pathname,
          },
        });
      }

      if (
        user?.role === 'NURSE' &&
        request.nextUrl.pathname.startsWith('/nurse')
      ) {
        return NextResponse.next({
          headers: {
            'user-type': user?.role || '',
            'x-pathname': request.nextUrl.pathname,
          },
        });
      }

      if (
        user?.role === 'PATIENT' &&
        request.nextUrl.pathname.startsWith('/patient')
      ) {
        return NextResponse.next({
          headers: {
            'user-type': user?.role || '',
            'x-pathname': request.nextUrl.pathname,
          },
        });
      }

      if (
        user?.role === 'MASTER' &&
        request.nextUrl.pathname.startsWith('/master')
      ) {
        return NextResponse.next({
          headers: {
            'user-type': user?.role || '',
            'x-pathname': request.nextUrl.pathname,
          },
        });
      }

      if (
        user?.role === 'ADMIN' &&
        request.nextUrl.pathname.startsWith('/admin')
      ) {
        return NextResponse.next({
          headers: {
            'user-type': user?.role || '',
            'x-pathname': request.nextUrl.pathname,
          },
        });
      }

      if (
        user?.role === 'SUPERADMIN' &&
        request.nextUrl.pathname.startsWith('/superadmin')
      ) {
        return NextResponse.next({
          headers: {
            'user-type': user?.role || '',
            'x-pathname': request.nextUrl.pathname,
          },
        });
      }
    }

    return NextResponse.redirect(
      new URL(`/${user?.role?.toLowerCase()}`, request.url)
    );
  } catch (err: any) {
    // return;
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

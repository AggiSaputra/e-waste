import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth'

const publicRoutes = ['/login', '/register', '/']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const user = verifyToken(token)

    if (pathname.startsWith('/customer') && user.role !== 'CUSTOMER') {
      return NextResponse.redirect(
        new URL('/collector/dashboard', request.url)
      )
    }

    if (pathname.startsWith('/collector') && user.role !== 'COLLECTOR') {
      return NextResponse.redirect(
        new URL('/customer/dashboard', request.url)
      )
    }

    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}



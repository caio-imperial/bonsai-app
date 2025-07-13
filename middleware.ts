import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const PUBLIC_PAGES = ['/login']

async function verifyJWT(token: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch {
    return null
  }
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('auth')?.value
  const isPublic = PUBLIC_PAGES.includes(req.nextUrl.pathname)

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (token && isPublic) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  if (token) {
    const isValid = await verifyJWT(token)
    if (!isValid) {
      return NextResponse.redirect(new URL('/api/auth/logout', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|api|static|favicon.ico).*)'],
}

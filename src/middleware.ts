import { publicDecrypt } from 'crypto'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // parbaudit ja kadam ir tokens tad lai vins neredzeto signup un login
  const isPublicPath = path === '/login' || path === '/signup'
  //kods lai parbauditu vai ir tokens?
  const token = request.cookies.get('token')?.value || ''
  
  //ja ir sis lietas tad var piemeram ielikt "/profile"
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  //ja nav sis lietas tad aizmest uz login page (request.nexturl aizmet automatiski)
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup'
  ]
}
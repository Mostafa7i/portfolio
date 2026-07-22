import { NextResponse } from 'next/server'

const locales = ['en', 'ar']
const COOKIE = 'NEXT_LOCALE'

function detectLocale(request) {
  // 1. Cookie takes priority
  const cookie = request.cookies.get(COOKIE)?.value
  if (cookie && locales.includes(cookie)) return cookie

  // 2. Accept-Language header
  const acceptLang = request.headers.get('accept-language') || ''
  if (/\bar(-[A-Z]{2})?\b/i.test(acceptLang)) return 'ar'
  return 'en'
}

export function proxy(request) {
  const { pathname } = request.nextUrl

  // Skip static assets
  const isStatic =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    /\.(.+)$/.test(pathname)

  if (isStatic) return NextResponse.next()

  // Already has a valid locale prefix → persist cookie and continue
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  )

  if (hasLocale) {
    const locale = locales.find(
      (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
    )
    const res = NextResponse.next()
    res.cookies.set(COOKIE, locale, { path: '/', maxAge: 60 * 60 * 24 * 365 })
    return res
  }

  // No locale prefix → detect and redirect
  const locale = detectLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  const res = NextResponse.redirect(request.nextUrl)
  res.cookies.set(COOKIE, locale, { path: '/', maxAge: 60 * 60 * 24 * 365 })
  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf)).*)',
  ],
}

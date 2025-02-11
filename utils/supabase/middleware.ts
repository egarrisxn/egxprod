import {createServerClient, type CookieOptions} from '@supabase/ssr'
import {NextResponse, type NextRequest} from 'next/server'

const publicRoutes = ['login', '/register', '/auth-verify', '/auth-error']
const protectedRoutes = ['/profile', '/dashboard']

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({name, value}) => request.cookies.set(name, value))
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({name, value, options}) =>
            response.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  const {
    data: {user},
  } = await supabase.auth.getUser()

  if (!user && publicRoutes.some((e) => request.nextUrl.pathname.startsWith(e))) return response

  if (user && publicRoutes.some((e) => request.nextUrl.pathname.startsWith(e)))
    return NextResponse.redirect(new URL('/', request.url))

  if (!user && protectedRoutes.some((e) => request.nextUrl.pathname.startsWith(e))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}

import {createServerClient} from '@supabase/ssr'
import {NextResponse, type NextRequest} from 'next/server'

export async function updateUserSession(request: NextRequest) {
  // let supabaseResponse = NextResponse.next({request})
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

  const user = await supabase.auth.getUser()

  if (request.nextUrl.pathname.startsWith('/protected') && user.error) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  if (request.nextUrl.pathname === '/' && !user.error) {
    return NextResponse.redirect(new URL('/protected/dashboard', request.url))
  }

  if (request.nextUrl.pathname === '/signin' && !user.error) {
    return NextResponse.redirect(new URL('/protected/dashboard', request.url))
  }

  if (request.nextUrl.pathname === '/signup' && !user.error) {
    return NextResponse.redirect(new URL('/protected/dashboard', request.url))
  }

  return response
}

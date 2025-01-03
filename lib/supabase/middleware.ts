import {createServerClient} from '@supabase/ssr'
import {NextResponse, type NextRequest} from 'next/server'

export async function updateUserSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({request})

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({name, value, options}) => {
            request.cookies.set(name, value)
            supabaseResponse = NextResponse.next({request})
            supabaseResponse.cookies.set(name, value, options)
          })
        },
      },
    },
  )

  const {
    data: {user},
  } = await supabase.auth.getUser()

  const protectedPaths = ['/profile', '/dashboard']
  const isProtected = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  if (isProtected && !user) {
    // If accessing a protected route without being logged in, redirect to login
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

// import {createServerClient} from '@supabase/ssr'
// import {NextResponse, type NextRequest} from 'next/server'

// export async function updateUserSession(request: NextRequest) {
//   let supabaseResponse = NextResponse.next({
//     request,
//   })

//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return request.cookies.getAll()
//         },
//         setAll(cookiesToSet) {
//           // eslint-disable-next-line @typescript-eslint/no-unused-vars
//           cookiesToSet.forEach(({name, value, options}) => request.cookies.set(name, value))
//           supabaseResponse = NextResponse.next({
//             request,
//           })
//           cookiesToSet.forEach(({name, value, options}) =>
//             supabaseResponse.cookies.set(name, value, options),
//           )
//         },
//       },
//     },
//   )

//   await supabase.auth.getUser()

//   return supabaseResponse
// }

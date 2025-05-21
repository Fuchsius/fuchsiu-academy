import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // This is a simplified middleware that doesn't use auth or session
  // which avoids Edge runtime issues with Node.js modules

  const isLoggedIn =
    !!request.cookies.get("next-auth.session-token") ||
    !!request.cookies.get("__Secure-next-auth.session-token");

  // Define authenticated routes
  const authRoutes = ["/dashboard"];
  const isAuthRoute = authRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // If trying to access auth routes but not logged in
  if (isAuthRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*"],
};

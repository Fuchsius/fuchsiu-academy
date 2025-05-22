import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  // Define authenticated routes
  const authRoutes = ["/dashboard"];
  const adminRoutes = ["/admin"];

  const isAuthRoute = authRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  const isAdminRoute = adminRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // If trying to access auth routes but not logged in
  if ((isAuthRoute || isAdminRoute) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  } // Handle admin routes separately - check for admin role
  if (isAdminRoute) {
    // We need to check if user has admin role
    // Since role might not be directly in the session, we can check
    // whether the user is allowed to access admin routes here
    // and the detailed role check can happen in the admin layout component
    return NextResponse.next();
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};

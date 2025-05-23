import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  const userRole = session?.user?.role;
  const isAdmin = userRole?.toUpperCase() === "ADMIN";

  console.log("Middleware - User Session:", {
    isLoggedIn,
    userId: session?.user?.id,
    userEmail: session?.user?.email,
    userRole,
    isAdmin,
    path: request.nextUrl.pathname,
  });

  // Define authenticated routes
  const authRoutes = ["/dashboard", "/student"];
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
  }

  // Handle admin routes separately - check for admin role
  if (isAdminRoute && !isAdmin) {
    // Redirect non-admin users away from admin routes
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};

export const runtime = "nodejs";

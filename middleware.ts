// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/", "/products", "/category", "/subcategory", "/items-category"];

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/login") {
    return NextResponse.next();
  }

  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    const token = request.cookies.get("authToken");

    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

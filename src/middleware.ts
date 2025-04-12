// frontend/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { apiService } from "./services/api";
// import { parseCookies } from "nookies";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("creajr.token")?.value;
  const { pathname } = request.nextUrl;

  const protectedRoutes = ["/home"];

  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
    const loginUrl = new URL("/credenciais", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (["/credenciais"].includes(pathname) && token) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

    if (token && token !== undefined) {
      const response = await apiService.validateToken(token);

      if (!response.valid) {
        const res = NextResponse.redirect(new URL("/credenciais", request.url));
        res.cookies.delete("creajr.token");
        return res;
      }
    }


  return NextResponse.next();
}


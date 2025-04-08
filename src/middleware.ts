// frontend/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parseCookies } from "nookies";

export function middleware(request: NextRequest) {
  const { "creajr.token": token } = parseCookies();
  const { pathname } = request.nextUrl;

  // Rotas que requerem autenticação
  const protectedRoutes = [
    // "/home",
     "/home"];

  // Se tentar acessar rota protegida sem token
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
    const loginUrl = new URL("/credenciais", request.url);
    // loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Se tentar acessar login/register com token
  if (["/credenciais"].includes(pathname) && token) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

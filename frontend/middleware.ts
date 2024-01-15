import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/login", "/signup"];

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("currentUser")?.value;

  if ((!currentUser || Date.now() > JSON.parse(currentUser).expiredAt)) {
    request.cookies.delete("currentUser");
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("currentUser");

    return response;
  }

  if (currentUser) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }
}

export const config = {
    matcher: ["/", "/profile", "/checkout", "/chat", "/setup"],
  }
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import CookieUtility from "./app/(utils)/CookieUtility";
import { ACCESS_TOKEN } from "./app/(constants)/Cookies";
import JWTUtility from "./app/(utils)/JWTUtility";

export function middleware(request: NextRequest) {
  const accessToken = CookieUtility.get(ACCESS_TOKEN);
  if (
    !accessToken ||
    accessToken === "" ||
    JWTUtility.checkIfIsExpired(accessToken)
  ) {
    CookieUtility.set(ACCESS_TOKEN, "");
    return NextResponse.redirect(new URL("/login", request.url));  
}
}
export const config = {
  matcher: ["/", "/profile", "/checkout", "/chat", "/setup"],
};

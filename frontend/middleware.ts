import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_TOKEN } from "./app/(constants)/Cookies";
import JWTUtility from "./app/(utils)/JWTUtility";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_TOKEN)?.value
  if (
    !accessToken ||
    accessToken === "" ||
    JWTUtility.checkIfIsExpired(accessToken)
  ) {
    request.cookies.set(ACCESS_TOKEN, "")
    return NextResponse.redirect(new URL("/login", request.url));  
}
}
export const config = {
  matcher: ["/", "/profile", "/checkout", "/chat", "/setup"],
};

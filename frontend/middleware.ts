import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import CookieUtility from "./app/(utils)/CookieUtility";
import { ACCESS_TOKEN } from "./app/(constants)/Cookies";

const publicPaths = ["/login", "/signup"];

export function middleware(request: NextRequest) {
    
}
import { getCookie, removeCookie, setCookie, Types } from "typescript-cookie";

/**
 * CookieUtility is a wrapper class that can be used to interact with cookies.
 */
class CookieUtility {
  private static readonly defaultOptions: Types.CookieAttributes = {
    secure: process.env.NEXT_PUBLIC_USE_HTTPS === "true",
    sameSite: "strict",
  };

  private static combineOptions(options?: Types.CookieAttributes): Types.CookieAttributes {
    return {
      ...CookieUtility.defaultOptions,
      ...options,
    };
  }

  public static set(name: string, value: string, options?: Types.CookieAttributes) {
    setCookie(name, value, this.combineOptions(options));
  }

  public static get(name: string): string | undefined {
    return getCookie(name);
  }

  public static remove(name: string) {
    removeCookie(name);
  }
}

export default CookieUtility;

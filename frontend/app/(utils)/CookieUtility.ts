import { cookies } from "next/headers";

/**
 * CookieUtility is a wrapper class that can be used to interact with cookies.
 */
class CookieUtility {
  public static set(name: string, value: string) {
    cookies().set(name, value);
  }

  public static get(name: string): string | undefined {
    return cookies().get(name)?.value
  }

  public static remove(name: string) {
    cookies().delete(name);
  }
}

export default CookieUtility;

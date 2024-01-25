import { deleteCookie, getCookie, setCookie } from 'cookies-next';

/**
 * CookieUtility is a wrapper class that can be used to interact with cookies.
 */
class CookieUtility {
  public static set(name: string, value: string) {
    setCookie(name, value)
  }

  public static get(name: string): string | undefined {
    return getCookie(name)
  }

  public static remove(name: string) {
    deleteCookie(name)
  }
}

export default CookieUtility;

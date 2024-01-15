import React, { createContext, useContext, useEffect, useState } from "react";
import { ACCESS_TOKEN } from "../(constants)/Cookies";
import Principal from "@/components/types/Principal";
import AuthenticationService from "../(services)/AuthenticationService";
import CookieUtility from "../(utils)/CookieUtility";
import JWTUtility from "../(utils)/JWTUtility";
import { redirect } from 'next/navigation'

type AuthenticationProviderProps = {
  children: React.ReactNode;
};

export type AuthenticationContextProps = {
  principal: Principal | undefined;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthenticationContext = createContext<AuthenticationContextProps>(
  {} as AuthenticationContextProps
);

export const useAuth = () => useContext(AuthenticationContext);

export const AuthenticationContextProvider = ({
  children,
}: AuthenticationProviderProps) => {
  const [principal, setPrincipal] = useState<Principal | undefined>(undefined);

  const extractAndSetPrincipalAndTokens = (access_token: string) => {
    CookieUtility.set(ACCESS_TOKEN, access_token);
    const payload = JWTUtility.decodePayload(access_token);
    setPrincipal({
      id: payload.sub,
    });
  };

  useEffect(() => {
    authenticate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authenticate = async () => {
    const accessToken = CookieUtility.get(ACCESS_TOKEN);
    if (accessToken) {
      if (JWTUtility.checkIfIsExpired(accessToken)) {
        redirect("/login")
      } else {
        extractAndSetPrincipalAndTokens(accessToken);
      }
    }
  };

  const login = async (username: string, password: string) => {
    const data = await AuthenticationService()
      .login(username, password);
    return extractAndSetPrincipalAndTokens(data);
  };

  const logout = async () => {
    CookieUtility.remove(ACCESS_TOKEN);
    setPrincipal(undefined);
    redirect("/login")
  };

  return (
    <AuthenticationContext.Provider
      value={{
        principal: principal,
        login: login,
        logout: logout
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContext;

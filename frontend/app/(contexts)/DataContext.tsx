import React, { createContext, useContext, useEffect, useState } from "react";
import UserProfile from "@/components/types/UserProfile";
import { useAuth } from "./AuthenticationContext";
import UserService from "../(services)/UserService";

type DataProviderProps = {
  children: React.ReactNode;
};

export type DataContextProps = {
  profile: UserProfile | undefined,
  loadProfile: (id: string) => void;
};

const DataContext = createContext<DataContextProps>(
  {} as DataContextProps
);

export const useData = () => useContext(DataContext);

export const DataContextProvider = ({
  children,
}: DataProviderProps) => {
  const [profile, setProfile] = useState<UserProfile | undefined>(undefined);
  const {principal} = useAuth();

  const loadProfile = async () => {
    setProfile(principal && await UserService.getProfile(principal.id));
  }

  useEffect( () => {
    loadProfile().then(() => console.log(profile))
    
  }, [principal])

  return (
    <DataContext.Provider
      value={{
        profile: profile,
        loadProfile: loadProfile
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;

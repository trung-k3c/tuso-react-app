import React, { createContext, useState, useContext } from 'react';

export type UserData = {
  name: string;
  gender: string;
  birthDate: Date;
  birthHour: string;
  battu?: {
    stems: string[];
    branches: string[];
    interpretation?: string;
  };
  tuvi?: {
    tuviDetails: {
      saoChieuMenh: string[];
      [key: string]: any;
    };
    interpretation?: string;
  };
};

type UserContextType = {
  userData: UserData | null;
  setUserData: (data: Partial<UserData>) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userDataState, setUserDataState] = useState<UserData | null>(null);

  const setUserData = (data: Partial<UserData>) => {
    setUserDataState((prev) => ({ ...(prev ?? ({} as UserData)), ...data }));
  };

  return (
    <UserContext.Provider value={{ userData: userDataState, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUserContext must be used within a UserProvider');
  return context;
};

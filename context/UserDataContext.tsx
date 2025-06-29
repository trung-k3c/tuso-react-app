import React, { createContext, useState, useContext } from 'react';

type UserData = {
  name: string;
  gender: string;
  birthDate: Date;
  birthHour: string;
};

type BattuData = {
  basic: UserData;
  stems: string[];
  branches: string[];
  interpretation?: string;
};

type TuviData = {
  basic: UserData;
  tuviDetails: {
    saoChieuMenh: string[];
    [key: string]: any;
  };
  interpretation?: string;
};

type UserContextType = {
  userData: UserData | null;
  setUserData: (data: UserData) => void;
  battuData: BattuData | null;
  setBattuData: (data: BattuData) => void;
  tuviData: TuviData | null;
  setTuviData: (data: TuviData) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [battuData, setBattuData] = useState<BattuData | null>(null);
  const [tuviData, setTuviData] = useState<TuviData | null>(null);

  return (
    <UserContext.Provider
      value={{ userData, setUserData, battuData, setBattuData, tuviData, setTuviData }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUserContext must be used within a UserProvider');
  return context;
};

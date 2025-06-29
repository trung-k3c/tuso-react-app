export type RootStackParamList = {
  Splash: undefined;
  TramChanKhong: undefined;
  Onboarding: undefined;
  InputInfo: undefined;
  BattuResult: undefined;
  BattuInterpretation: undefined;
  TuviResult: undefined;
  TuviInterpretation: undefined;
  Main: undefined;
  // thêm các màn khác nếu có
};
export type SplashScreenProps = {
  navigation: {
    navigate: (screen: keyof RootStackParamList) => void;
  };
};

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

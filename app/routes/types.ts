export type RootStackParamList = {
  SplashScreen: undefined;
  TramChanKhong: undefined;
  Onboarding: undefined;
  InputInfo: undefined;
  BattuResult: { battuData: BattuData };
  AIInterpretation: { battuData: BattuData };
  // thêm các màn khác nếu có
};
export type SplashScreenProps = {
  navigation: {
    navigate: (screen: keyof RootStackParamList) => void;
  };
};

export type BattuData = {
  name: string;
  gender: string;
  birthDate: Date;
  birthHour: string;
  stems: string[];
  branches: string[];
};
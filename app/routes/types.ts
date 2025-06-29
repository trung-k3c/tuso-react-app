export type RootStackParamList = {
  Splash: undefined;
  TramChanKhong: undefined;
  Onboarding: undefined;
  InputInfo: undefined;
  BattuResult: { battuData: BattuData };
  BattuInterpretation: { battuData: BattuData };
  TuviResult: { tuviData: TuviData };
  TuviInterpretation: { tuviData: TuviData };
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
};

export type BattuData = {
  basic: UserData;
  stems?: string[];
  branches?: string[];
};

export type TuviData = {
  basic: UserData;
  cungMenh?: string,
  menhChu?: string,
  saoChieuMenh?: string[],
  tongQuan?: string,
}
export type RootStackParamList = {
  SplashScreen: undefined;
  TramChanKhong: undefined;
  Onboarding: undefined;
  InputInfo: undefined;
  BattuResult: { battuData: BattuData };
  BattuInterpretation: { battuData: BattuData };
  TuviResult: { tuviData: TuviData };
  TuviInterpretation: { tuviData: TuviData };
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

export type TuviData = {
  name: string;
  gender: string;
  birthDate: Date;
  birthHour: string;
  tuviDetails: {
    cungMenh: string,
    menhChu: string,
    saoChieuMenh: string[],
    tongQuan: string,
  }; // có thể là chuỗi mô tả hoặc đối tượng  
}
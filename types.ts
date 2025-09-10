import { NavigatorScreenParams } from '@react-navigation/native';

export type MainStackParamList = {
  Home: undefined;
  ExploreSelf: undefined;
  IChing: undefined;
  ChuaLanh: undefined;
  KhaiMo: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  TramChanKhong: undefined;
  Onboarding: undefined;
  ProfileSetup: undefined;
  LoadingProfile: undefined;
  Registration: undefined;

  // Shell cố định có nested stack bên trong
  Main: NavigatorScreenParams<MainStackParamList>;

  // Các màn modal/overlay
  LaSoBatTu: undefined;
  LaSoTuVi: undefined;
  TongHop: undefined;
  GieoQue: undefined;
  Profile: undefined;
};

// export type RootStackParamList = {
//   Splash: undefined;
//   TramChanKhong: undefined;
//   Onboarding: undefined;
//   ProfileSetup: undefined;
//   LoadingProfile: undefined;
//   Registration: undefined;
//   Home: undefined;
//   ExploreSelf: undefined;
//   IChing: undefined;
//   ChuaLanh: undefined;
//   KhaiMo: undefined;
//   LaSoBatTu: undefined;
//   LaSoTuVi: undefined;
//   TongHop: undefined;
//   GieoQue: undefined;
//   Profile: undefined;
// };

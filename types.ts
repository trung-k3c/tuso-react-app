export type RootStackParamList = {
  Splash: undefined;
  TramChanKhong: undefined;
  Onboarding: undefined;
  // thêm các màn khác nếu có
};
export type SplashScreenProps = {
  navigation: {
    navigate: (screen: keyof RootStackParamList) => void;
  };
};
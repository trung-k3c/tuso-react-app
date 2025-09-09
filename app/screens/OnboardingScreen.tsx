import React, { useRef, useEffect } from 'react';
import { Pressable, Animated, Dimensions, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types'; // sửa lại path cho đúng
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { height } = Dimensions.get('window');
const TOP_GAP = 60; // đỉnh cách top ~30px
const SHEET_MAX_HEIGHT = height - TOP_GAP;

export default function OnboardingScreen() {
    const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const translateY = useRef(new Animated.Value(SHEET_MAX_HEIGHT)).current;

    useEffect(() => {
        Animated.timing(translateY, {
        toValue: 0,
        duration: 280,
        useNativeDriver: true,
        }).start();
    }, [translateY]);

    const close = () => {
        Animated.timing(translateY, {
        toValue: SHEET_MAX_HEIGHT,
        duration: 220,
        useNativeDriver: true,
        }).start(() => nav.goBack());
    };
  return (
    <View style={StyleSheet.absoluteFill}>
      <Pressable style={styles.overlay} onPress={close} />
      <Animated.View
        style={[
          styles.sheetContainer,
          { height: SHEET_MAX_HEIGHT, transform: [{ translateY }] },
        ]}
      >
        <View style={styles.sheet}>
      <ScrollView contentContainerStyle={styles.scrollable} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Chào mừng đến với Tuso</Text>
        </View>

        <View style={styles.list}>
          {/* 1. Khám Phá Bản Thân */}
          <View style={styles.row}>
            <View style={styles.icon}>
              <Svg width={28} height={28} viewBox="0 0 24 24">
                <Circle cx="12" cy="12" r="9" stroke="#062023" strokeWidth={1.8} fill="none" />
                <Path d="M8 16l3-7 5-2-3 7-5 2Z" stroke="#062023" strokeWidth={1.8} fill="none" />
                <Circle cx="12" cy="12" r="1" fill="#062023" />
              </Svg>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.h3}>Khám Phá Bản Thân</Text>
              <Text style={styles.p}>
                Lá số <Text style={styles.b}>Bát Tự</Text>, <Text style={styles.b}>Tử Vi</Text> (tướng số chưa có trong MVP). Bản đồ khí mệnh để hiểu mình.
              </Text>
            </View>
          </View>

          {/* 2. Soi Đường Quyết Định */}
          <View style={styles.row}>
            <View style={styles.icon}>
              <Svg width={28} height={28} viewBox="0 0 24 24">
                <Path d="M4 7h16M4 11h7M13 11h7M4 15h16" stroke="#062023" strokeWidth={1.8} fill="none" />
              </Svg>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.h3}>Soi Đường Quyết Định</Text>
              <Text style={styles.p}>Gieo quẻ <Text style={styles.b}>Kinh Dịch</Text> để nhìn thời – vận, chọn nhịp phù hợp cho hành động.</Text>
            </View>
          </View>

          {/* 3. Chữa Lành Cảm Xúc */}
          <View style={styles.row}>
            <View style={styles.icon}>
              <Svg width={28} height={28} viewBox="0 0 24 24">
                <Path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" stroke="#062023" strokeWidth={1.8} fill="none" />
              </Svg>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.h3}>Chữa Lành Cảm Xúc</Text>
              <Text style={styles.p}>Đối thoại với <Text style={styles.b}>AI dịu dàng</Text> — xả stress, soi chiếu và cân bằng cảm xúc.</Text>
            </View>
          </View>

          {/* 4. Khai Mở Vận Mệnh */}
          <View style={styles.row}>
            <View style={styles.icon}>
              <Svg width={28} height={28} viewBox="0 0 24 24">
                <Path d="M3 20c5-8 13-8 18 0" stroke="#062023" strokeWidth={1.8} fill="none" />
                <Circle cx="6" cy="18" r="1.6" fill="none" stroke="#062023" strokeWidth={1.8} />
                <Circle cx="12" cy="12" r="1.6" fill="none" stroke="#062023" strokeWidth={1.8} />
                <Circle cx="18" cy="18" r="1.6" fill="none" stroke="#062023" strokeWidth={1.8} />
              </Svg>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.h3}>Khai Mở Vận Mệnh</Text>
              <Text style={styles.p}>Hành trình trở về với <Text style={styles.b}>An Nhiên</Text> và <Text style={styles.b}>Thịnh Vượng</Text> — bước nhỏ, thay đổi lớn.</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.foot}>
        <Text style={styles.footText}>
          Chúng tôi có thể dùng dữ liệu sử dụng để cá nhân hoá trải nghiệm, cải thiện dịch vụ và phòng chống gian lận.
          <Text style={styles.link}>  Cách Tuso quản lý dữ liệu của bạn</Text>.
        </Text>
        <TouchableOpacity style={styles.cta} onPress={() => nav.navigate('ProfileSetup')}>
          <Text style={styles.ctaText}>Bắt Đầu Hành Trình</Text>
        </TouchableOpacity>
      </View>
    </View>
      </Animated.View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.25)' },
  sheetContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#111213',
  },
  sheet: {
    flex: 1,
    backgroundColor: '#111213',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: 'hidden',
  },
  scrollable: {
    paddingTop: 28,
    paddingHorizontal: 22,
    paddingBottom: 18,
  },
  header: { paddingVertical: 8 },
  title: {
    textAlign: 'center',
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 22,
    color: '#F2F2F2',
  },
  list: { gap: 26, paddingVertical: 8 },
  row: { flexDirection: 'row', gap: 14 },
  icon: {
    width: 52,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'transparent',
    // gradient “cảm giác” (đơn sắc + đổ bóng nhẹ để gần giống HTML):
    shadowColor: '#59D2FF',
    shadowOpacity: 0.18,
    shadowRadius: 26,
    shadowOffset: { width: 0, height: 8 },
    backgroundColor: '#5AD1FF',
  },
  h3: { fontSize: 18, fontWeight: 'bold', color: '#F2F2F2', marginBottom: 6 },
  p: { color: '#B8B8B8', fontSize: 15, lineHeight: 22 },
  b: { fontWeight: '800', color: '#F2F2F2' },
  foot: {
    paddingTop: 14,
    paddingHorizontal: 22,
    paddingBottom: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#252525',
    backgroundColor: '#11121379',
  },
  footText: { marginTop: 8, color: '#C9C9C9', fontSize: 12.8, lineHeight: 19, textAlign: 'center' },
  link: { color: '#5AD1FF' },
  cta: {
    marginTop: 24,
    marginBottom:28,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    backgroundColor: '#5AD1FF',
    alignItems: 'center',
  },
  ctaText: { fontSize: 17, fontWeight: '800', letterSpacing: 0.2, color: '#041818' },
});

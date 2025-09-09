import React from 'react';
import { act, create } from 'react-test-renderer';
import TramChanKhongScreen from '../TramChanKhongScreen';

// Mocks
const mockStart = jest.fn();
const mockStop = jest.fn();
const mockLoop = jest.fn(() => ({ start: mockStart, stop: mockStop }));

jest.mock('react-native', () => ({
  View: 'View',
  Text: 'Text',
  StyleSheet: { create: () => ({}) },
  Pressable: 'Pressable',
  Animated: {
    Value: jest.fn(() => ({ interpolate: jest.fn() })),
    timing: jest.fn(),
    sequence: jest.fn(),
    loop: mockLoop,
    Easing: { inOut: jest.fn(() => jest.fn()), quad: 'quad' },
  },
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
}));

jest.mock('../../components/BreathingDot', () => () => null);

describe('TramChanKhongScreen', () => {
  it('stops the looping animation on unmount', () => {
    jest.useFakeTimers();
    let renderer: any;
    act(() => {
      renderer = create(<TramChanKhongScreen />);
    });
    expect(mockStart).toHaveBeenCalled();

    act(() => {
      renderer.unmount();
    });
    expect(mockStop).toHaveBeenCalled();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
});

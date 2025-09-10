// app/lib/store.ts

/*
import { create, StoreApi, UseBoundStore } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveOnboardingState, saveProfileState } from './persistence';
import { getSafeWebStorage } from './safeWebStorage';
import { Platform } from 'react-native';

// ---------- Types
export type SessionState = {
  lastSessionId?: string;
};

export type UIState = {
  theme: 'light' | 'dark';
};

export type Store = {
  // slices
  session: SessionState;
  ui: UIState;
  hasOnboarded: boolean;
  hasProfileSetup: boolean;

  setSession: (patch: Partial<SessionState>) => void;
  setUI: (patch: Partial<UIState>) => void;
  completeOnboarding: () => void;
  completeProfileSetup: () => void;
};

// ---------- Defaults
const defaultState: Pick<Store, 'session' | 'ui' | 'hasOnboarded' | 'hasProfileSetup'> = {
  session: {},
  ui: { theme: 'dark' },
  hasOnboarded: false,
  hasProfileSetup: false,
};

// ---------- Storage (AsyncStorage) with namespacing
const storage: StateStorage = {
  getItem: async (name: string) => {
    const v = await AsyncStorage.getItem(name);
    return v ?? null;
  },
  setItem: async (name: string, value: string) => {
    await AsyncStorage.setItem(name, value);
  },
  removeItem: async (name: string) => {
    await AsyncStorage.removeItem(name);
  },
};

// ---------- Persist config
const STORE_NAME = 'tuso:store';
const STORE_VERSION = 1; // bump khi thay đổi shape để migrate

export const useAppStore = create<Store>()(
  persist(
    (set, get) => ({
      ...defaultState,

      setSession: (patch) =>
        set((s) => ({ session: { ...s.session, ...patch } })),

      setUI: (patch) =>
        set((s) => ({ ui: { ...s.ui, ...patch } })),

      completeOnboarding: () => {
        if (!get().hasOnboarded) {
          set({ hasOnboarded: true });
          // Nếu bạn còn cần sync ra ngoài:
          saveOnboardingState(true);
        }
      },

      completeProfileSetup: () => {
        if (!get().hasProfileSetup) {
          set({ hasProfileSetup: true });
          // Nếu bạn còn cần sync ra ngoài:
          saveProfileState(true);
        }
      },
    }),
    {
      name: STORE_NAME,
      version: STORE_VERSION,
      // Persist cả 4 field cần thiết
      partialize: (state) => ({
        session: state.session,
        ui: state.ui,
        hasOnboarded: state.hasOnboarded,
        hasProfileSetup: state.hasProfileSetup,
      }),
      storage: createJSONStorage(() => Platform.OS === "web" ? getSafeWebStorage() : storage),
      migrate: async (persisted, version) => {
        if (!persisted) return persisted as any;

        // Migrates cũ -> v1: chốt theme mặc định, chèn flags nếu thiếu
        if (version < 1) {
          const p = persisted as Partial<Store>;
          return {
            session: p.session ?? {},
            ui: { theme: p.ui?.theme ?? 'dark' },
            hasOnboarded: p.hasOnboarded ?? false,
            hasProfileSetup: p.hasProfileSetup ?? false,
          } as Store;
        }

        // Không cần đổi gì ở v1
        return persisted as any;
      },
    }
  )
);

// ---------- Selector helper (tối ưu re-render) — Gõ đúng type cho Zustand hook
type UseStoreWithSelector<S> = UseBoundStore<StoreApi<S>>;

export const createSelectors = <S>(hook: UseStoreWithSelector<S>) => ({
  use: <T>(selector: (s: S) => T) => hook(selector),
  get: () => hook.getState(),
  set: (patch: Partial<S>) => hook.setState(patch as any),
  subscribe: hook.subscribe,
});

// Dùng $ với type chính xác của Store
export const $ = createSelectors<Store>(useAppStore);

/*
Usage:
import { $ } from '../lib/store';

const hasOnboarded = $.use((s) => s.hasOnboarded);
const hasProfileSetup = $.use((s) => s.hasProfileSetup);
*/

import { create, StoreApi, UseBoundStore } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSafeWebStorage } from './safeWebStorage'; // adapter web an toàn

type AppState = {
  hasOnboarded: boolean;
  hasProfileSetup: boolean;
  setOnboarded: (b: boolean) => void;
  setProfileSetup: (b: boolean) => void;
};

const storage = Platform.OS === 'web'
  ? getSafeWebStorage()            // localStorage an toàn (fallback memory khi window chưa có)
  : AsyncStorage;                  // native

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      hasOnboarded: false,
      hasProfileSetup: false,
      setOnboarded: (b) => set({ hasOnboarded: b }),
      setProfileSetup: (b) => set({ hasProfileSetup: b }),
    }),
    {
      name: 'tuso-app',
      storage: createJSONStorage(() => storage),
      partialize: (s) => ({ hasOnboarded: s.hasOnboarded, hasProfileSetup: s.hasProfileSetup }),
    }
  )
);

type UseStoreWithSelector<S> = UseBoundStore<StoreApi<S>>;

export const createSelectors = <S>(hook: UseStoreWithSelector<S>) => ({
  use: <T>(selector: (s: S) => T) => hook(selector),
  get: () => hook.getState(),
  set: (patch: Partial<S>) => hook.setState(patch as any),
  subscribe: hook.subscribe,
});

// Dùng $ với type chính xác của Store
export const $ = createSelectors<AppState>(useAppStore);

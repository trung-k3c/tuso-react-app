// app/lib/store.ts
import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ---------- Types
type SessionState = {
  lastSessionId?: string;
};
type UIState = {
  theme: 'light' | 'dark';
  onboardingCompleted: boolean;
};

type Store = {
  // slices
  session: SessionState;
  ui: UIState;

  setSession: (patch: Partial<SessionState>) => void;
  setUI: (patch: Partial<UIState>) => void;
};

// ---------- Defaults
const defaultState: Pick<Store, 'session' | 'ui'> = {
  session: {},
  ui: { theme: 'dark', onboardingCompleted: false },
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
      setSession: (patch) => set((s) => ({ session: { ...s.session, ...patch } })),
      setUI: (patch) => set((s) => ({ ui: { ...s.ui, ...patch } })),
    }),
    {
      name: STORE_NAME,
      version: STORE_VERSION,
      // chỉ persist các slice cần thiết
      partialize: (state) => ({
        session: state.session,
        ui: state.ui,
      }),
      storage: createJSONStorage(() => storage),
      migrate: async (persisted, version) => {
        // ví dụ migrate khi đổi cấu trúc
        if (!persisted) return persisted as any;
        if (version < 1) {
          // add default ui.theme nếu thiếu
          return {
            ...persisted,
            ui: { theme: 'dark', onboardingCompleted: false, ...(persisted as any).ui },
          };
        }
        return persisted as any;
      },
    }
  )
);

// ---------- Selector helper (tối ưu re-render)
export const createSelectors = <S extends object>(hook: (cb?: any) => S) => ({
  use: <T>(selector: (s: S) => T) => hook(selector),
});
export const $ = createSelectors(useAppStore);

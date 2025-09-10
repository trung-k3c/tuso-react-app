// app/lib/persistence.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const NS = 'tuso'; // namespace để tránh đụng key app khác

export const kv = {
  key: (k: string) => `${NS}:${k}`,
  async get<T>(key: string, fallback: T): Promise<T> {
    try {
      const raw = await AsyncStorage.getItem(this.key(key));
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  },
  async set(key: string, value: unknown) {
    try {
      await AsyncStorage.setItem(this.key(key), JSON.stringify(value));
    } catch {}
  },
  async del(key: string) {
    try {
      await AsyncStorage.removeItem(this.key(key));
    } catch {}
  },
  async clearNamespace() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const nsKeys = keys.filter((k) => k.startsWith(`${NS}:`));
      await AsyncStorage.multiRemove(nsKeys);
    } catch {}
  },
};

// Onboarding & ProfileSetup persistence helpers
const ONBOARDING_KEY = 'onboarding_state';
const PROFILE_KEY = 'profile_state';

export async function loadOnboardingState() {
  return kv.get<boolean>(ONBOARDING_KEY, false);
}

export async function saveOnboardingState(value: boolean) {
  await kv.set(ONBOARDING_KEY, value);
}

export async function loadProfileState() {
  return kv.get<boolean>(PROFILE_KEY, false);
}

export async function saveProfileState(value: boolean) {
  await kv.set(PROFILE_KEY, value);
}

// Debounce util cho các tác vụ lưu cục bộ
export function debounce<T extends (...args: any[]) => void>(fn: T, ms = 250) {
  let t: any;
  return (...args: Parameters<T>) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

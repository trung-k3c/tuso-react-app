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

// Debounce util cho các tác vụ lưu cục bộ
export function debounce<T extends (...args: any[]) => void>(fn: T, ms = 250) {
  let t: any;
  return (...args: Parameters<T>) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

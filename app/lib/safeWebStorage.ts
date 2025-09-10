// app/lib/safeWebStorage.ts
import type { StateStorage } from 'zustand/middleware';

// Trả về StateStorage dựa trên window.localStorage nếu có, ngược lại fallback memory
export function getSafeWebStorage(): StateStorage {
  // ⚠️ KHÔNG đụng 'localStorage' trực tiếp; luôn đi qua 'window'
  const canUseLS =
    typeof window !== 'undefined' &&
    typeof window.localStorage !== 'undefined';

  if (!canUseLS) {
    // Fallback: in-memory storage (không persist giữa lần reload)
    const mem = new Map<string, string>();
    return {
      getItem: async (name) => mem.get(name) ?? null,
      setItem: async (name, value) => void mem.set(name, value),
      removeItem: async (name) => void mem.delete(name),
    };
  }

  // Bọc localStorage vào API async để đồng nhất với AsyncStorage
  return {
    getItem: async (name) => {
      try { return window.localStorage.getItem(name); } catch { return null; }
    },
    setItem: async (name, value) => {
      try { window.localStorage.setItem(name, value); } catch {}
    },
    removeItem: async (name) => {
      try { window.localStorage.removeItem(name); } catch {}
    },
  };
}

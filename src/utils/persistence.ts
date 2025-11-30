
type Persistence = {
  setItem(key: string, value: string): Promise<void>;
  getItem(key: string): Promise<string | null>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
};

// Check if we're in the sandbox environment with persistentStorage
const hasPersistentStorage = typeof window !== 'undefined' && 'persistentStorage' in window;

// Fallback to localStorage for standard browser environments
const localStorageFallback: Persistence = {
  async setItem(key: string, value: string): Promise<void> {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn('localStorage not available:', e);
    }
  },
  async getItem(key: string): Promise<string | null> {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn('localStorage not available:', e);
      return null;
    }
  },
  async removeItem(key: string): Promise<void> {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn('localStorage not available:', e);
    }
  },
  async clear(): Promise<void> {
    try {
      localStorage.clear();
    } catch (e) {
      console.warn('localStorage not available:', e);
    }
  },
};

declare global {
  interface Window {
    persistentStorage?: Persistence;
  }
}

export const persistence: Persistence = hasPersistentStorage
  ? {
      setItem(key, value) {
        return window.persistentStorage!.setItem(key, value);
      },
      getItem(key) {
        return window.persistentStorage!.getItem(key);
      },
      removeItem(key) {
        return window.persistentStorage!.removeItem(key);
      },
      clear() {
        return window.persistentStorage!.clear();
      },
    }
  : localStorageFallback;

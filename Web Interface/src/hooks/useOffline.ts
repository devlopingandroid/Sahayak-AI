import { useState, useEffect, useCallback } from 'react';
import { openDB, IDBPDatabase } from 'idb';

const DB_NAME = 'sahayak-db';
const DB_VERSION = 1;

interface CacheItem<T> {
  key: string;
  data: T;
  timestamp: number;
}

export const useOffline = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [db, setDb] = useState<IDBPDatabase | null>(null);

  // Initialize IndexedDB
  useEffect(() => {
    const initDB = async () => {
      try {
        const database = await openDB(DB_NAME, DB_VERSION, {
          upgrade(db) {
            // Create stores for offline data
            if (!db.objectStoreNames.contains('memories')) {
              db.createObjectStore('memories', { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains('faces')) {
              db.createObjectStore('faces', { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains('cache')) {
              db.createObjectStore('cache', { keyPath: 'key' });
            }
          },
        });
        setDb(database);
      } catch (error) {
        console.error('Failed to initialize IndexedDB:', error);
      }
    };

    initDB();
  }, []);

  // Listen for online/offline changes
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Cache data
  const cacheData = useCallback(async <T>(key: string, data: T) => {
    if (!db) return;

    try {
      const item: CacheItem<T> = {
        key,
        data,
        timestamp: Date.now(),
      };
      await db.put('cache', item);
    } catch (error) {
      console.error('Failed to cache data:', error);
    }
  }, [db]);

  // Get cached data
  const getCachedData = useCallback(async <T>(key: string): Promise<T | null> => {
    if (!db) return null;

    try {
      const item = await db.get('cache', key) as CacheItem<T> | undefined;
      return item?.data ?? null;
    } catch (error) {
      console.error('Failed to get cached data:', error);
      return null;
    }
  }, [db]);

  // Save memory
  const saveMemory = useCallback(async (memory: { id: string; [key: string]: unknown }) => {
    if (!db) return;

    try {
      await db.put('memories', memory);
    } catch (error) {
      console.error('Failed to save memory:', error);
    }
  }, [db]);

  // Get all memories
  const getMemories = useCallback(async () => {
    if (!db) return [];

    try {
      return await db.getAll('memories');
    } catch (error) {
      console.error('Failed to get memories:', error);
      return [];
    }
  }, [db]);

  // Save face
  const saveFace = useCallback(async (face: { id: string; [key: string]: unknown }) => {
    if (!db) return;

    try {
      await db.put('faces', face);
    } catch (error) {
      console.error('Failed to save face:', error);
    }
  }, [db]);

  // Get all faces
  const getFaces = useCallback(async () => {
    if (!db) return [];

    try {
      return await db.getAll('faces');
    } catch (error) {
      console.error('Failed to get faces:', error);
      return [];
    }
  }, [db]);

  return {
    isOnline,
    cacheData,
    getCachedData,
    saveMemory,
    getMemories,
    saveFace,
    getFaces,
    isReady: !!db,
  };
};

export default useOffline;

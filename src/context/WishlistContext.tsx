import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WishlistContextType {
  wishlistIds: string[];
  isWishlisted: (id: string) => boolean;
  toggleWishlist: (id: string) => Promise<void>;
  addToWishlist: (id: string) => Promise<void>;
  removeFromWishlist: (id: string) => Promise<void>;
  clearWishlist: () => Promise<void>;
  isLoading: boolean;
}

const STORAGE_KEY = '@terra_saved_escapes_v1';

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Restore wishlist from AsyncStorage on app launch
  useEffect(() => {
    async function loadWishlist() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setWishlistIds(parsed);
          }
        }
      } catch (err) {
        console.error('Error loading TERRA wishlist from AsyncStorage:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadWishlist();
  }, []);

  // Save changes to AsyncStorage
  const persistWishlist = async (newIds: string[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newIds));
    } catch (err) {
      console.error('Error saving TERRA wishlist to AsyncStorage:', err);
    }
  };

  const isWishlisted = useCallback(
    (id: string) => wishlistIds.includes(id),
    [wishlistIds]
  );

  const toggleWishlist = useCallback(
    async (id: string) => {
      setWishlistIds((prev) => {
        const exists = prev.includes(id);
        const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
        persistWishlist(next);
        return next;
      });
    },
    []
  );

  const addToWishlist = useCallback(async (id: string) => {
    setWishlistIds((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      persistWishlist(next);
      return next;
    });
  }, []);

  const removeFromWishlist = useCallback(async (id: string) => {
    setWishlistIds((prev) => {
      const next = prev.filter((item) => item !== id);
      persistWishlist(next);
      return next;
    });
  }, []);

  const clearWishlist = useCallback(async () => {
    setWishlistIds([]);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        isWishlisted,
        toggleWishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isLoading,
      }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

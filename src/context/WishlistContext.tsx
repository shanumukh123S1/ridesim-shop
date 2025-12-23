import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Motorcycle } from '@/data/motorcycles';

interface WishlistContextType {
  wishlist: Motorcycle[];
  addToWishlist: (motorcycle: Motorcycle) => void;
  removeFromWishlist: (motorcycleId: string) => void;
  isInWishlist: (motorcycleId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Motorcycle[]>([]);

  const addToWishlist = (motorcycle: Motorcycle) => {
    if (!wishlist.some(m => m.id === motorcycle.id)) {
      setWishlist(prev => [...prev, motorcycle]);
    }
  };

  const removeFromWishlist = (motorcycleId: string) => {
    setWishlist(prev => prev.filter(m => m.id !== motorcycleId));
  };

  const isInWishlist = (motorcycleId: string): boolean => {
    return wishlist.some(m => m.id === motorcycleId);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

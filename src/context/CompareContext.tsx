import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Motorcycle } from '@/data/motorcycles';

interface CompareContextType {
  compareList: Motorcycle[];
  addToCompare: (motorcycle: Motorcycle) => boolean;
  removeFromCompare: (motorcycleId: string) => void;
  clearCompare: () => void;
  isInCompare: (motorcycleId: string) => boolean;
  canAddMore: boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const MAX_COMPARE_ITEMS = 3;

export const CompareProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [compareList, setCompareList] = useState<Motorcycle[]>([]);

  const addToCompare = (motorcycle: Motorcycle): boolean => {
    if (compareList.length >= MAX_COMPARE_ITEMS) {
      return false;
    }
    
    if (compareList.some(m => m.id === motorcycle.id)) {
      return false;
    }

    setCompareList(prev => [...prev, motorcycle]);
    return true;
  };

  const removeFromCompare = (motorcycleId: string) => {
    setCompareList(prev => prev.filter(m => m.id !== motorcycleId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const isInCompare = (motorcycleId: string): boolean => {
    return compareList.some(m => m.id === motorcycleId);
  };

  const canAddMore = compareList.length < MAX_COMPARE_ITEMS;

  return (
    <CompareContext.Provider value={{
      compareList,
      addToCompare,
      removeFromCompare,
      clearCompare,
      isInCompare,
      canAddMore
    }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};

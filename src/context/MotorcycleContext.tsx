import React, { createContext, useContext, useState, ReactNode } from 'react';
import { motorcycles as initialMotorcycles, Motorcycle } from '@/data/motorcycles';

interface MotorcycleContextType {
  motorcycles: Motorcycle[];
  addMotorcycle: (motorcycle: Omit<Motorcycle, 'id'>) => void;
  updateMotorcycle: (id: string, motorcycle: Partial<Motorcycle>) => void;
  deleteMotorcycle: (id: string) => void;
  getMotorcycleById: (id: string) => Motorcycle | undefined;
}

const MotorcycleContext = createContext<MotorcycleContextType | undefined>(undefined);

export const MotorcycleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>(initialMotorcycles);

  const addMotorcycle = (motorcycle: Omit<Motorcycle, 'id'>) => {
    const id = `${motorcycle.brand.toLowerCase()}-${motorcycle.model.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
    setMotorcycles(prev => [...prev, { ...motorcycle, id }]);
  };

  const updateMotorcycle = (id: string, updates: Partial<Motorcycle>) => {
    setMotorcycles(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
  };

  const deleteMotorcycle = (id: string) => {
    setMotorcycles(prev => prev.filter(m => m.id !== id));
  };

  const getMotorcycleById = (id: string) => {
    return motorcycles.find(m => m.id === id);
  };

  return (
    <MotorcycleContext.Provider value={{ motorcycles, addMotorcycle, updateMotorcycle, deleteMotorcycle, getMotorcycleById }}>
      {children}
    </MotorcycleContext.Provider>
  );
};

export const useMotorcycles = () => {
  const context = useContext(MotorcycleContext);
  if (!context) throw new Error('useMotorcycles must be used within MotorcycleProvider');
  return context;
};

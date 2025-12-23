import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Motorcycle } from '@/data/motorcycles';

interface CartItem {
  motorcycle: Motorcycle;
  quantity: number;
  selectedColor: string;
  selectedVariant: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (motorcycle: Motorcycle, color: string, variant: string) => void;
  removeFromCart: (motorcycleId: string) => void;
  updateQuantity: (motorcycleId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (motorcycle: Motorcycle, color: string, variant: string) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.motorcycle.id === motorcycle.id && 
                item.selectedColor === color && 
                item.selectedVariant === variant
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [...prev, { motorcycle, quantity: 1, selectedColor: color, selectedVariant: variant }];
    });
  };

  const removeFromCart = (motorcycleId: string) => {
    setItems(prev => prev.filter(item => item.motorcycle.id !== motorcycleId));
  };

  const updateQuantity = (motorcycleId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(motorcycleId);
      return;
    }

    setItems(prev => prev.map(item => 
      item.motorcycle.id === motorcycleId 
        ? { ...item, quantity } 
        : item
    ));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const totalPrice = items.reduce((sum, item) => {
    const variant = item.motorcycle.variants.find(v => v.name === item.selectedVariant);
    const price = variant?.price || item.motorcycle.price;
    return sum + (price * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

'use client'
import { 
  createContext, 
  useContext, 
  useState, 
  ReactNode, 
  Dispatch, 
  SetStateAction } from 'react';

type CartContextType = {
  cartNumber: number;
  setCartNumber: Dispatch<SetStateAction<number>>;
  barangay: string;
  setBarangay: Dispatch<SetStateAction<string>>;

};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartNumber, setCartNumber] = useState<number>(0);
  const [barangay, setBarangay] = useState<string>('');

  const contextValue: CartContextType = {
    cartNumber,
    setCartNumber,
    barangay,
    setBarangay,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

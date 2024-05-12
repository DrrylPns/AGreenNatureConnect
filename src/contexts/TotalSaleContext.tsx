
'use client'
import { 
  createContext, 
  useContext, 
  useState, 
  ReactNode, 
  Dispatch, 
  SetStateAction } from 'react';

type TotalSalesContextType = {
totalSale: number;
setTotalSale: Dispatch<SetStateAction<number>>;
};

// Create a context
const TotalSalesContext = createContext<TotalSalesContextType | undefined>(undefined);


export const TotalSalesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [totalSale, setTotalSale] = useState<number>(0);
  
    const contextValue: TotalSalesContextType = {
        totalSale,
        setTotalSale,
    };
  
    return <TotalSalesContext.Provider value={contextValue}>{children}</TotalSalesContext.Provider>;
  };
  
export const useSaleValue = (): TotalSalesContextType => {
const context = useContext(TotalSalesContext);
if (!context) {
    throw new Error('useSaleValue must be used within a TotalSalesContext');
}
return context;
};
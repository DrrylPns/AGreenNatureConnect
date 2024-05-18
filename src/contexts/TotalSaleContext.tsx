
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
totalSalectedCatA: number;
totalSalectedCatB: number;
totalSalectedCatC: number;
revPercentage: number;
barangay: string;
setTotalSale: Dispatch<SetStateAction<number>>;
setTotalSalectedCatA: Dispatch<SetStateAction<number>>
setTotalSalectedCatB: Dispatch<SetStateAction<number>>
setTotalSalectedCatC: Dispatch<SetStateAction<number>>
setRevPercentage: Dispatch<SetStateAction<number>>
setBarangay: Dispatch<SetStateAction<string>>
};

// Create a context
const TotalSalesContext = createContext<TotalSalesContextType | undefined>(undefined);


export const TotalSalesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [totalSale, setTotalSale] = useState<number>(0);
    const [totalSalectedCatA, setTotalSalectedCatA] = useState<number>(0);
    const [totalSalectedCatB, setTotalSalectedCatB] = useState<number>(0);
    const [totalSalectedCatC, setTotalSalectedCatC] = useState<number>(0);
    const [revPercentage, setRevPercentage] = useState<number>(0);
    const [barangay, setBarangay] = useState<string>('');
  
    const contextValue: TotalSalesContextType = {
        totalSale,
        setTotalSale,
        totalSalectedCatA,
        setTotalSalectedCatA,
        totalSalectedCatB,
        setTotalSalectedCatB,
        totalSalectedCatC,
        setTotalSalectedCatC,
        revPercentage,
        setRevPercentage,
        barangay,
        setBarangay,
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
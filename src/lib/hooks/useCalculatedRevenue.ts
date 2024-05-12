import { create } from 'zustand';

interface TotalSalesRevenue {
    totalSalesValue: number;
    setTotalSalesValue: (value: number) => void;
}

export const useTotalSalesValueStore = create<TotalSalesRevenue>((set) => ({
    totalSalesValue: 0,
    setTotalSalesValue: (value: number) => set({ totalSalesValue: value}),
  }));
  
import { create } from "zustand";
import { CustoInsumo, DespesaFixa, Receita, MonthlyFinancial } from "../types";
import { mockExpenses, mockFixedCosts, mockRevenues, mockMonthlyFinances } from "../data/mockData";

interface FinanceStore {
  expenses: CustoInsumo[];
  fixedCosts: DespesaFixa[];
  revenues: Receita[];
  monthlyData: MonthlyFinancial[];
  
  // Computed totals for dashboard
  totalRevenue: number;
  totalOperatingCost: number;
  netMargin: number; // percentage
  
  addExpense: (expense: CustoInsumo) => void;
  addRevenue: (revenue: Receita) => void;
  addFixedCost: (fixedCost: DespesaFixa) => void;
  
  getLitterExpenses: (litterId: string) => CustoInsumo[];
  getAnimalExpenses: (animalId: string) => CustoInsumo[];
}

const calculateTotals = (revenues: Receita[], expenses: CustoInsumo[], fixedCosts: DespesaFixa[]) => {
  const rev = revenues.reduce((acc, r) => acc + r.netValue, 0);
  const varCost = expenses.reduce((acc, e) => acc + e.totalCost, 0);
  // Simplification for prototype: multiply fixed costs by 6 months (the window we are looking at)
  const fixCost = fixedCosts.reduce((acc, f) => acc + (f.active ? f.monthlyValue : 0), 0) * 6; 
  const totalCost = varCost + fixCost;
  
  const margin = rev > 0 ? ((rev - totalCost) / rev) * 100 : 0;
  
  return {
    totalRevenue: rev,
    totalOperatingCost: totalCost,
    netMargin: Number(margin.toFixed(1))
  };
};

export const useFinanceStore = create<FinanceStore>((set, get) => {
  const initialTotals = calculateTotals(mockRevenues, mockExpenses, mockFixedCosts);
  
  return {
    expenses: mockExpenses,
    fixedCosts: mockFixedCosts,
    revenues: mockRevenues,
    monthlyData: mockMonthlyFinances,
    
    totalRevenue: initialTotals.totalRevenue,
    totalOperatingCost: initialTotals.totalOperatingCost,
    netMargin: initialTotals.netMargin,

    addExpense: (expense) => set((state) => {
      const newExpenses = [...state.expenses, expense];
      const newTotals = calculateTotals(state.revenues, newExpenses, state.fixedCosts);
      return { expenses: newExpenses, ...newTotals };
    }),

    addRevenue: (revenue) => set((state) => {
      const newRevenues = [...state.revenues, revenue];
      const newTotals = calculateTotals(newRevenues, state.expenses, state.fixedCosts);
      return { revenues: newRevenues, ...newTotals };
    }),

    addFixedCost: (fixedCost) => set((state) => {
      const newFixed = [...state.fixedCosts, fixedCost];
      const newTotals = calculateTotals(state.revenues, state.expenses, newFixed);
      return { fixedCosts: newFixed, ...newTotals };
    }),

    getLitterExpenses: (litterId) => get().expenses.filter(e => e.litterId === litterId),
    getAnimalExpenses: (animalId) => get().expenses.filter(e => e.animalId === animalId),
  };
});

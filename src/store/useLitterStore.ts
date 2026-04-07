import { create } from "zustand";
import { Litter, MatingSimulation } from "../types";
import { mockLitters, mockSimulations } from "../data/mockData";

interface LitterStore {
  litters: Litter[];
  simulations: MatingSimulation[];
  
  addLitter: (litter: Litter) => void;
  updateLitter: (id: string, partial: Partial<Litter>) => void;
  
  addSimulation: (sim: MatingSimulation) => void;
  getSimulations: () => MatingSimulation[];
}

export const useLitterStore = create<LitterStore>((set, get) => ({
  litters: mockLitters,
  simulations: mockSimulations,

  addLitter: (litter) => set((state) => ({ litters: [...state.litters, litter] })),
  
  updateLitter: (id, partial) => set((state) => ({
    litters: state.litters.map(l => l.id === id ? { ...l, ...partial } : l)
  })),

  addSimulation: (sim) => set((state) => ({
      simulations: [sim, ...state.simulations]
  })),
  getSimulations: () => get().simulations,
}));

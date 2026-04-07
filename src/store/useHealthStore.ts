import { create } from "zustand";
import { VaccineProtocol, ReproductiveEvent } from "../types";
import { mockMissingVaccines } from "../data/mockData";

interface HealthStore {
  vaccineProtocols: VaccineProtocol[];
  reproductiveEvents: ReproductiveEvent[];
  
  addVaccine: (vaccine: VaccineProtocol) => void;
  updateVaccineStatus: (id: string, status: VaccineProtocol["status"]) => void;
  getVaccinesByAnimal: (animalId: string) => VaccineProtocol[];
  
  addReproductiveEvent: (event: ReproductiveEvent) => void;
  getEventsByAnimal: (animalId: string) => ReproductiveEvent[];
}

export const useHealthStore = create<HealthStore>((set, get) => ({
  vaccineProtocols: mockMissingVaccines,
  reproductiveEvents: [],

  addVaccine: (vaccine) => set((state) => ({
    vaccineProtocols: [...state.vaccineProtocols, vaccine]
  })),

  updateVaccineStatus: (id, status) => set((state) => ({
    vaccineProtocols: state.vaccineProtocols.map(v => 
      v.id === id ? { ...v, status } : v
    )
  })),

  getVaccinesByAnimal: (animalId) => get().vaccineProtocols.filter(v => v.animalId === animalId),

  addReproductiveEvent: (event) => set((state) => ({
    reproductiveEvents: [...state.reproductiveEvents, event]
  })),

  getEventsByAnimal: (animalId) => get().reproductiveEvents.filter(e => e.animalId === animalId),
}));

import { create } from "zustand";
import { Animal } from "../types";
import { mockAnimals } from "../data/mockData";

interface AnimalStore {
  animals: Animal[];
  addAnimal: (animal: Animal) => void;
  updateAnimal: (id: string, partial: Partial<Animal>) => void;
  removeAnimal: (id: string) => void;
  getAnimalById: (id: string) => Animal | undefined;
  getAnimalsByBreed: (breedCode: string) => Animal[];
  activeCount: number;
}

export const useAnimalStore = create<AnimalStore>((set, get) => ({
  animals: mockAnimals,
  activeCount: mockAnimals.filter(a => a.status !== "Aposentado" && a.status !== "Vendido").length,

  addAnimal: (animal) => set((state) => {
    const newAnimals = [...state.animals, animal];
    return {
      animals: newAnimals,
      activeCount: newAnimals.filter(a => a.status !== "Aposentado" && a.status !== "Vendido").length
    };
  }),

  updateAnimal: (id, partial) => set((state) => {
    const newAnimals = state.animals.map(a => a.id === id ? { ...a, ...partial } : a);
    return {
      animals: newAnimals,
      activeCount: newAnimals.filter(a => a.status !== "Aposentado" && a.status !== "Vendido").length
    };
  }),

  removeAnimal: (id) => set((state) => {
    const newAnimals = state.animals.filter(a => a.id !== id);
    return {
      animals: newAnimals,
      activeCount: newAnimals.filter(a => a.status !== "Aposentado" && a.status !== "Vendido").length
    };
  }),

  getAnimalById: (id) => get().animals.find(a => a.id === id),
  getAnimalsByBreed: (breedCode) => get().animals.filter(a => a.breedCode === breedCode),
}));

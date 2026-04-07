// ─── LINEOS v4.0 — Domain Models ─────────────────────────────────────────────

export type Sex = "M" | "F";
export type AnimalStatus = "Reprodutor" | "Matriz" | "Filhote" | "Aposentado" | "Vendido";
export type BreedCode = "GR" | "BF" | "PA" | "ST" | "LB" | "YK" | "RW" | "DB";

export interface BreedConfig {
  code: BreedCode;
  name: string;
  gestationDays: number;
  avgLitterSize: number;
  avgSalePrice: number;
  avgCostPerPuppy: number;
  kcalPerKgGrowth: number;
}

// ─── Genetic Traits ──────────────────────────────────────────────────────────
export interface GeneticTrait {
  name: string;
  value: number;       // 0–100 score
  heritability: number; // 0–1
  economicValuePerUnit: number; // R$ per unit improvement
}

export interface EBVScores {
  fertility: number;
  health: number;
  temperament: number;
  conformation: number;
  coatQuality: number;
  longevity: number;
}

// ─── Animal ──────────────────────────────────────────────────────────────────
export interface Animal {
  id: string;
  name: string;
  breed: string;
  breedCode: BreedCode;
  sex: Sex;
  birthDate: string; // ISO date
  status: AnimalStatus;
  registrationNumber: string;
  microchip?: string;
  sireId?: string;
  damId?: string;
  coi: number; // Coefficient of Inbreeding %
  ebv: EBVScores;
  weight?: number; // current weight in grams
  photoUrl?: string;
  notes?: string;
  accumulatedCost: number; // total R$ spent on this animal
  createdAt: string;
}

// ─── Litter ──────────────────────────────────────────────────────────────────
export interface Litter {
  id: string;
  code: string; // e.g. "#47"
  sireId: string;
  damId: string;
  breed: string;
  breedCode: BreedCode;
  birthDate: string;
  puppyIds: string[];
  expectedCount: number;
  bornCount: number;
  weanedCount: number;
  status: "Gestação" | "Lactação" | "Desmamados" | "Vendidos" | "Parcial";
}

// ─── Financial Entities ──────────────────────────────────────────────────────
export type InsumoType = "Ração" | "Vacina" | "Medicamento" | "Suplemento" | "Exame" | "Microchip" | "Registro" | "Outro";
export type DespesaCategory = "Aluguel" | "Salário" | "Software" | "Energia" | "Água" | "Seguro" | "Manutenção" | "Outro";

export interface CustoInsumo {
  id: string;
  type: InsumoType;
  description: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  purchaseDate: string;
  animalId?: string;   // specific animal, or null for rateable
  litterId?: string;
}

export interface DespesaFixa {
  id: string;
  description: string;
  monthlyValue: number;
  dueDate: number; // day of month
  category: DespesaCategory;
  active: boolean;
}

export interface Receita {
  id: string;
  animalSoldId: string;
  animalName: string;
  breed: string;
  saleValue: number;
  saleDate: string;
  buyer: string;
  commission: number; // %
  netValue: number;
  litterId?: string;
}

export interface ROICache {
  entityId: string; // animal or litter ID
  entityType: "animal" | "litter" | "breed";
  totalCost: number;
  totalRevenue: number;
  roi: number; // percentage
  updatedAt: string;
}

// ─── Health & Vaccination ────────────────────────────────────────────────────
export type VaccineStatus = "em_dia" | "pendente" | "atrasada" | "aplicada";

export interface VaccineProtocol {
  id: string;
  animalId: string;
  animalName: string;
  vaccineName: string;
  dose: string;
  status: VaccineStatus;
  applicationDate?: string;
  nextDate: string;
  cost: number;
  veterinarian?: string;
}

export interface ReproductiveEvent {
  id: string;
  animalId: string;
  type: "Cio" | "Progesterona" | "Inseminação" | "Ultrassom" | "Parto" | "Desmame";
  date: string;
  value?: number; // e.g. progesterone ng/ml
  notes?: string;
  cost?: number;
}

// ─── Mating Simulation ──────────────────────────────────────────────────────
export interface MatingSimulation {
  id: string;
  sireId: string;
  sireName: string;
  damId: string;
  damName: string;
  breed: string;
  expectedCOI: number;
  predictedEBV: EBVScores;
  expectedLitterSize: number;
  costPerPuppy: number;
  estimatedSalePrice: number;
  marginPerLitter: number;
  inbreedingRisk: "low" | "moderate" | "high";
  inbreedingCostImpact: number; // R$ loss estimate
  createdAt: string;
}

// ─── Growth Tracking ─────────────────────────────────────────────────────────
export interface GrowthRecord {
  animalId: string;
  week: number;
  weight: number; // grams
  expected: number;
  date: string;
}

// ─── Monthly Financial Summary ───────────────────────────────────────────────
export interface MonthlyFinancial {
  month: string; // "Jan", "Fev", etc.
  year: number;
  revenue: number;
  variableCost: number;
  fixedCost: number;
  totalCost: number;
  profit: number;
  puppiesSold: number;
}

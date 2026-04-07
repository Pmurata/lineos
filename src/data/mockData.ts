// ─── LINEOS v4.0 — Mock Data ─────────────────────────────────────────────

import {
  Animal,
  BreedConfig,
  DespesaFixa,
  Litter,
  MonthlyFinancial,
  VaccineProtocol,
  CustoInsumo,
  Receita,
  MatingSimulation
} from "../types";

export const mockBreeds: BreedConfig[] = [
  { code: "GR", name: "Golden Retriever", gestationDays: 63, avgLitterSize: 8, avgSalePrice: 4500, avgCostPerPuppy: 1840, kcalPerKgGrowth: 4100 },
  { code: "BF", name: "Bulldog Francês", gestationDays: 63, avgLitterSize: 4, avgSalePrice: 7800, avgCostPerPuppy: 2650, kcalPerKgGrowth: 4500 },
  { code: "PA", name: "Pastor Alemão", gestationDays: 63, avgLitterSize: 7, avgSalePrice: 3200, avgCostPerPuppy: 1520, kcalPerKgGrowth: 4200 },
  { code: "ST", name: "Shih Tzu", gestationDays: 63, avgLitterSize: 4, avgSalePrice: 2800, avgCostPerPuppy: 980, kcalPerKgGrowth: 4000 },
  { code: "LB", name: "Labrador", gestationDays: 63, avgLitterSize: 8, avgSalePrice: 3000, avgCostPerPuppy: 1650, kcalPerKgGrowth: 4150 },
];

export const mockAnimals: Animal[] = [
  {
    id: "GR-001", name: "Rex", breed: "Golden Retriever", breedCode: "GR", sex: "M", birthDate: "2023-02-15",
    status: "Reprodutor", registrationNumber: "CBKC-19284", microchip: "982000000123456",
    coi: 3.1, accumulatedCost: 14500, createdAt: "2024-01-10",
    ebv: { fertility: 85, health: 90, temperament: 95, conformation: 88, coatQuality: 92, longevity: 80 }
  },
  {
    id: "GR-002", name: "Bella", breed: "Golden Retriever", breedCode: "GR", sex: "F", birthDate: "2023-08-20",
    status: "Matriz", registrationNumber: "CBKC-19877", microchip: "982000000123457",
    coi: 2.8, accumulatedCost: 12200, createdAt: "2024-01-15",
    ebv: { fertility: 92, health: 88, temperament: 90, conformation: 85, coatQuality: 89, longevity: 85 }
  },
  {
    id: "BF-001", name: "Thor", breed: "Bulldog Francês", breedCode: "BF", sex: "M", birthDate: "2022-03-10",
    status: "Reprodutor", registrationNumber: "CBKC-17500", microchip: "982000000123458",
    coi: 4.5, accumulatedCost: 18000, createdAt: "2024-01-20",
    ebv: { fertility: 75, health: 80, temperament: 85, conformation: 92, coatQuality: 88, longevity: 70 }
  },
  {
    id: "BF-002", name: "Luna", breed: "Bulldog Francês", breedCode: "BF", sex: "F", birthDate: "2024-01-05",
    status: "Matriz", registrationNumber: "CBKC-19100", microchip: "982000000123459",
    coi: 3.2, accumulatedCost: 9500, createdAt: "2024-02-01",
    ebv: { fertility: 82, health: 85, temperament: 88, conformation: 90, coatQuality: 85, longevity: 75 }
  },
  {
    id: "PA-001", name: "Zeus", breed: "Pastor Alemão", breedCode: "PA", sex: "M", birthDate: "2021-04-12",
    status: "Reprodutor", registrationNumber: "CBKC-16200", microchip: "982000000123460",
    coi: 5.8, accumulatedCost: 16000, createdAt: "2024-01-25",
    ebv: { fertility: 88, health: 85, temperament: 80, conformation: 95, coatQuality: 88, longevity: 78 }
  },
  {
    id: "ST-001", name: "Mel", breed: "Shih Tzu", breedCode: "ST", sex: "F", birthDate: "2024-07-22",
    status: "Matriz", registrationNumber: "CBKC-20500", microchip: "982000000123461",
    coi: 1.9, accumulatedCost: 6800, createdAt: "2024-08-01",
    ebv: { fertility: 90, health: 92, temperament: 95, conformation: 85, coatQuality: 98, longevity: 88 }
  }
];

export const mockLitters: Litter[] = [
  {
    id: "LIT-001", code: "#43", sireId: "GR-001", damId: "GR-002", breed: "Golden Retriever", breedCode: "GR",
    birthDate: "2025-05-10", puppyIds: ["GR-P01", "GR-P02", "GR-P03", "GR-P04", "GR-P05", "GR-P06", "GR-P07", "GR-P08"],
    expectedCount: 8, bornCount: 8, weanedCount: 8, status: "Vendidos"
  },
  {
    id: "LIT-002", code: "#47", sireId: "GR-001", damId: "GR-002", breed: "Golden Retriever", breedCode: "GR",
    birthDate: "2026-02-15", puppyIds: ["GR-P09", "GR-P10", "GR-P11", "GR-P12", "GR-P13", "GR-P14", "GR-P15"],
    expectedCount: 8, bornCount: 8, weanedCount: 7, status: "Desmamados"
  },
  {
    id: "LIT-003", code: "#44", sireId: "BF-001", damId: "BF-002", breed: "Bulldog Francês", breedCode: "BF",
    birthDate: "2025-08-20", puppyIds: ["BF-P01", "BF-P02", "BF-P03", "BF-P04"],
    expectedCount: 4, bornCount: 4, weanedCount: 4, status: "Vendidos"
  }
];

export const mockExpenses: CustoInsumo[] = [
  { id: "EXP-001", type: "Ração", description: "PremieR Golden Puppy 15kg", quantity: 5, unitCost: 220, totalCost: 1100, purchaseDate: "2026-03-01", litterId: "LIT-002" },
  { id: "EXP-002", type: "Vacina", description: "V10 Zoetis", quantity: 10, unitCost: 45, totalCost: 450, purchaseDate: "2026-03-10", litterId: "LIT-002" },
  { id: "EXP-003", type: "Ração", description: "Royal Canin French Bulldog Adult 12kg", quantity: 3, unitCost: 350, totalCost: 1050, purchaseDate: "2026-03-15" },
  { id: "EXP-004", type: "Medicamento", description: "Bravecto 10-20kg", quantity: 2, unitCost: 250, totalCost: 500, purchaseDate: "2026-03-20", animalId: "BF-001" },
];

export const mockFixedCosts: DespesaFixa[] = [
  { id: "FIX-001", description: "Aluguel Canil", monthlyValue: 3500, dueDate: 5, category: "Aluguel", active: true },
  { id: "FIX-002", description: "Salário Tratador", monthlyValue: 2800, dueDate: 5, category: "Salário", active: true },
  { id: "FIX-003", description: "Energia Elétrica", monthlyValue: 850, dueDate: 15, category: "Energia", active: true },
  { id: "FIX-004", description: "LINEOS PRO", monthlyValue: 299, dueDate: 10, category: "Software", active: true },
];

export const mockRevenues: Receita[] = [
  { id: "REV-001", animalSoldId: "GR-P01", animalName: "Max", breed: "Golden Retriever", saleValue: 4500, saleDate: "2025-07-20", buyer: "João Silva", commission: 0, netValue: 4500, litterId: "LIT-001" },
  { id: "REV-002", animalSoldId: "GR-P02", animalName: "Nina", breed: "Golden Retriever", saleValue: 4500, saleDate: "2025-07-25", buyer: "Maria Souza", commission: 0, netValue: 4500, litterId: "LIT-001" },
  { id: "REV-003", animalSoldId: "BF-P01", animalName: "Apollo", breed: "Bulldog Francês", saleValue: 7800, saleDate: "2025-10-25", buyer: "Carlos Cunha", commission: 390, netValue: 7410, litterId: "LIT-003" },
];

export const mockMissingVaccines: VaccineProtocol[] = [
  { id: "VAC-001", animalId: "GR-001", animalName: "Rex", vaccineName: "V10", dose: "Reforço Anual", status: "em_dia", nextDate: "2027-02-15", cost: 85 },
  { id: "VAC-002", animalId: "BF-001", animalName: "Thor", vaccineName: "Giárdia", dose: "Reforço Anual", status: "atrasada", nextDate: "2026-04-01", cost: 65 },
  { id: "VAC-003", animalId: "BF-002", animalName: "Luna", vaccineName: "V10", dose: "2ª Dose", status: "em_dia", applicationDate: "2026-03-28", nextDate: "2026-06-28", cost: 85 },
];

export const mockMonthlyFinances: MonthlyFinancial[] = [
  { month: "Dez", year: 2025, revenue: 25400, variableCost: 8500, fixedCost: 7449, totalCost: 15949, profit: 9451, puppiesSold: 5 },
  { month: "Jan", year: 2026, revenue: 12400, variableCost: 3200, fixedCost: 7449, totalCost: 10649, profit: 1751, puppiesSold: 3 },
  { month: "Fev", year: 2026, revenue: 15800, variableCost: 4100, fixedCost: 7449, totalCost: 11549, profit: 4251, puppiesSold: 4 },
  { month: "Mar", year: 2026, revenue: 18200, variableCost: 4800, fixedCost: 7449, totalCost: 12249, profit: 5951, puppiesSold: 4 },
  { month: "Abr", year: 2026, revenue: 14500, variableCost: 3600, fixedCost: 7449, totalCost: 11049, profit: 3451, puppiesSold: 3 },
  { month: "Mai", year: 2026, revenue: 22100, variableCost: 5200, fixedCost: 7449, totalCost: 12649, profit: 9451, puppiesSold: 5 },
];

export const mockSimulations: MatingSimulation[] = [
    {
        id: "SIM-001", sireId: "GR-001", sireName: "Rex", damId: "GR-002", damName: "Bella", breed: "Golden Retriever",
        expectedCOI: 3.8, expectedLitterSize: 8, costPerPuppy: 1840, estimatedSalePrice: 4800, marginPerLitter: 23680,
        predictedEBV: { fertility: 88, health: 89, temperament: 92, conformation: 86, coatQuality: 90, longevity: 82 },
        inbreedingRisk: "low", inbreedingCostImpact: 0, createdAt: "2026-04-05T10:00:00"
    }
]

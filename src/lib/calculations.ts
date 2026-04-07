import { EBVScores } from "../types";

// ─── Financial Calculations ──────────────────────────────────────────────────

/**
 * Calculates Return on Investment (ROI) percentage
 */
export const calculateROI = (totalCost: number, totalRevenue: number): number => {
  if (totalCost === 0) return 0;
  return Math.round(((totalRevenue - totalCost) / totalCost) * 100);
};

/**
 * Calculates the number of puppies that need to be sold to cover fixed costs
 */
export const calculateBreakEvenPoint = (fixedCosts: number, avgMarginPerPuppy: number): number => {
  if (avgMarginPerPuppy <= 0) return 0;
  return Math.ceil(fixedCosts / avgMarginPerPuppy);
};

/**
 * Divides total nutritional/veterinary cost of a litter by the number of weaned puppies
 */
export const calculateCostPerPuppy = (totalLitterCost: number, weanedCount: number): number => {
  if (weanedCount === 0) return totalLitterCost; // Avoid division by zero
  return totalLitterCost / weanedCount;
};

// ─── Genetic Calculations ────────────────────────────────────────────────────

/**
 * Predicts the EBV for a theoretical offspring based on sire and dam scores.
 * Simplistic additive genetic model for the prototype.
 */
export const calculatePredictedEBV = (sireEBV: EBVScores, damEBV: EBVScores): EBVScores => {
  return {
    fertility: (sireEBV.fertility + damEBV.fertility) / 2,
    health: (sireEBV.health + damEBV.health) / 2,
    temperament: (sireEBV.temperament + damEBV.temperament) / 2,
    conformation: (sireEBV.conformation + damEBV.conformation) / 2,
    coatQuality: (sireEBV.coatQuality + damEBV.coatQuality) / 2,
    longevity: (sireEBV.longevity + damEBV.longevity) / 2,
  };
};

/**
 * Simulates Coefficient of Inbreeding for offspring.
 * In a real app, this traverses the pedigree graph. Here we mock it based on parents' COI + random factor.
 */
export const simulateOffspringCOI = (sireCOI: number, damCOI: number, isCloseRelation: boolean = false): number => {
    let base = (sireCOI + damCOI) / 2;
    if (isCloseRelation) {
        base += 12.5; // E.g., half-sibling mating
    } else {
        base += Math.random() * 2; // Random drift
    }
    return Number(base.toFixed(2));
}

/**
 * Inbreeding depression penalty: Translates high COI into estimated economic loss per puppy.
 * Formula: Every 1% COI > 6.25% reduces litter size by 0.1 and increases vet costs by 5%.
 */
export const calculateInbreedingDepressionCost = (coi: number, baseCostPerPuppy: number, salePrice: number): number => {
  if (coi <= 6.25) return 0;
  
  const excessCoi = coi - 6.25;
  const lostPuppyOpportunity = (excessCoi * 0.1) * salePrice;
  const extraVetCost = (excessCoi * 0.05) * baseCostPerPuppy;
  
  return Number((lostPuppyOpportunity + extraVetCost).toFixed(2));
};

// ─── Health Risk Calculations ────────────────────────────────────────────────

/**
 * Calculates estimated cost of a disease outbreak if a vaccine is delayed.
 */
export const calculateVaccineNonComplianceCost = (
  vaccineName: string, 
  daysDelayed: number, 
  flockSize: number, 
  avgTreatmentCost: number = 800
): number => {
  if (daysDelayed <= 0) return 0;
  
  // Base risk increases by 1% per day delayed, capped at 40%
  const riskProbability = Math.min(daysDelayed * 0.01, 0.40);
  
  // Expected Value = Probability * Impact (Impact = Treatment * number of animals likely infected)
  const estimatedSpreadMultiplier = vaccineName === "V10" ? 0.8 : 0.3; // Parvo/Kinomose spread faster
  const infectedAnimals = Math.ceil(flockSize * estimatedSpreadMultiplier);
  
  return Number((riskProbability * infectedAnimals * avgTreatmentCost).toFixed(2));
};

/**
 * FEDIAF Nutritional Guidelines Engine
 * 
 * Engenharia de cálculos baseada nas diretrizes FEDIAF 2025 para
 * determinação exata da Necessidade Energética de Manutenção (MER)
 * ajustada para cada fase de vida, gestação, lactação e níveis de atividade.
 */

export interface AnimalNutritionalProfile {
  species: "dog" | "cat";
  weightKg: number;
  lifeStage: "growth" | "maintenance" | "senior" | "gestation" | "lactation";
  activityLevel: "low" | "moderate" | "high";
  bodyConditionScore: number; // Escala 1-9 (5 é ideal)
  // Parâmetros específicos de fase
  gestationWeek?: number; // 1 a 9 semanas para cães/gatos
  lactationWeek?: number; // 1 a 8 semanas
  litterSize?: number;    // Quantidade de filhotes (Lactação/Gestação)
  matureWeightKg?: number;// Peso esperado quando adulto (Para fase growth)
  currentAgeMonths?: number;
}

/**
 * Calcula a Necessidade Energética de Manutenção (MER) em kcal ME/dia
 */
export const calculateMER = (profile: AnimalNutritionalProfile): number => {
  const { 
    species, 
    weightKg, 
    lifeStage, 
    activityLevel, 
    gestationWeek = 1,
    lactationWeek = 1,
    litterSize = 1,
    matureWeightKg = weightKg,
    currentAgeMonths = 12
  } = profile;
  
  // O fator metabólico (Potência) varia por espécie e às vezes pela fase.
  // Cães: Peso^0.75 | Gatos: Peso^0.67
  const powerFactor = species === "dog" ? 0.75 : 0.67;
  const metabolicWeight = Math.pow(weightKg, powerFactor);
  
  // 1. Definição da Base de Manutenção (Adulto Não Reprodutivo)
  let baseConstant = 0;
  if (species === "dog") {
    switch (activityLevel) {
      case "low": baseConstant = 95; break; // Indoor / Propensão a obesidade
      case "moderate": baseConstant = 110; break; // Atividade normal (1-3h)
      case "high": baseConstant = 130; break; // Cães de trabalho/esporte
      default: baseConstant = 110;
    }
  } else {
    switch (activityLevel) {
      case "low": baseConstant = 75; break; // Indoor, neutered
      case "moderate": baseConstant = 100; break; // Ativo
      case "high": baseConstant = 130; break; // Muito ativo (ex: gatos inteiros outdoor)
      default: baseConstant = 100;
    }
  }

  const standardMaintenanceMER = baseConstant * metabolicWeight;

  // 2. Aplicação das Fórmulas Específicas por Fase
  let finalKcal = standardMaintenanceMER;

  switch (lifeStage) {
    case "growth":
      if (species === "dog") {
        const percentMature = (weightKg / matureWeightKg) * 100;
        if (percentMature <= 50) {
          finalKcal = standardMaintenanceMER * 2.0; // Desmame até 50% do peso adulto
        } else if (percentMature <= 80) {
          finalKcal = standardMaintenanceMER * 1.6; // 50 a 80%
        } else {
          finalKcal = standardMaintenanceMER * 1.2; // 80 a 100% (crescimento tardio)
        }
      } else {
        // Gatos
        if (currentAgeMonths <= 4) {
          finalKcal = 200 * metabolicWeight; // Crescimento inicial acelerado FEDIAF
        } else {
          finalKcal = 130 * metabolicWeight; // Crescimento até 12 meses
        }
      }
      break;

    case "gestation":
      if (species === "dog") {
        if (gestationWeek <= 4) {
          // Primeiras 4 semanas: Necessidade de manutenção
          finalKcal = standardMaintenanceMER;
        } else {
          // Após 5ª semana: Aumento progressivo de 26 kcal/kg de peso
          const extraKcal = 26 * weightKg;
          finalKcal = 130 * metabolicWeight + extraKcal;
        }
      } else {
        // Gatos: Necessitam de acúmulo linear desde o acasalamento
        finalKcal = 140 * metabolicWeight;
      }
      break;

    case "lactation":
      if (species === "dog") {
        // Fórmula FEDIAF Lactação: 145 * BW^0.75 + BW * (L * ninhada) onde L varia pela semana
        let L = 24; 
        if (lactationWeek >= 4) L = 30; // Pico de lactação entre semana 3 e 5
        finalKcal = (145 * metabolicWeight) + (weightKg * L * litterSize);
      } else {
        // Gatos Lactantes: Variabilidade pela quantidade de gatinhos
        let multiplier = 2.0; // Base para 1-2 gatinhos
        if (litterSize >= 3 && litterSize <= 4) multiplier = 2.5;
        if (litterSize >= 5) multiplier = 3.0; // Pode chegar a 4x dependendo do peso da gata
        finalKcal = standardMaintenanceMER * multiplier;
      }
      break;

    case "senior":
      // Idosos tendem a reduzir atividade e Taxa Metabólica Basal
      finalKcal = standardMaintenanceMER * 0.85;
      break;

    case "maintenance":
    default:
      // Caso de adultos padrão, a manutenção pura baseConstant * BP já governa
      finalKcal = standardMaintenanceMER;
      break;
  }

  // 3. Ajuste de Escore Corporal (BCS)
  // Se o animal estiver obeso (BCS > 5), o requerimento calórico prescritivo sofre redução
  if (profile.bodyConditionScore > 5) {
    const excessScore = profile.bodyConditionScore - 5;
    const restrictionFactor = 1 - (excessScore * 0.10); // Reduz 10% de restrição por ponto acima de 5
    finalKcal = finalKcal * restrictionFactor;
  }

  return Math.round(finalKcal);
};

export const calculateMacronutrients = (merKcal: number, species: "dog" | "cat", lifeStage: AnimalNutritionalProfile["lifeStage"]) => {
  // Ajuste do alvo nutricional dependendo da fase de vida e espécie
  let targetProteinPct = species === "dog" ? 25 : 40;
  let targetFatPct = species === "dog" ? 15 : 20;

  // Aumentamos a exigência proteica na lactação e crescimento
  if (lifeStage === "lactation" || lifeStage === "growth") {
    targetProteinPct += (species === "dog" ? 5 : 5);
    targetFatPct += 5;
  }

  // Valores de Atwood (Modificados FEDIAF):
  // Proteína: 3.5 kcal/g
  // Gordura: 8.5 kcal/g
  const proteinGrams = (merKcal * (targetProteinPct / 100)) / 3.5;
  const fatGrams = (merKcal * (targetFatPct / 100)) / 8.5;

  return {
    proteinRequiredGrams: Math.round(proteinGrams),
    fatRequiredGrams: Math.round(fatGrams),
    proteinPct: targetProteinPct,
    fatPct: targetFatPct
  };
};

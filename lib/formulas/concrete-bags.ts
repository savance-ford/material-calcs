export interface ConcreteBagInputs {
  mode: 'dimensions' | 'volume';
  lengthFeet?: number;
  widthFeet?: number;
  thicknessInches?: number;
  knownVolume?: number;
  volumeUnit?: 'cubicFeet' | 'cubicYards';
  bagSize: 40 | 50 | 60 | 80;
  wastePercent: number;
}

export interface ConcreteBagOutputs {
  totalCubicFeet: number;
  totalCubicYards: number;
  bagsNeeded: number;
  totalWeightLbs: number;
  warnings: string[];
}

/**
 * Calculates how many bags of concrete are needed based on dimensions or a known volume.
 */
export function calculateConcreteBags(inputs: ConcreteBagInputs): ConcreteBagOutputs {
  const warnings: string[] = [];
  let cubicFeet = 0;

  if (inputs.mode === 'dimensions') {
    const l = inputs.lengthFeet || 0;
    const w = inputs.widthFeet || 0;
    const t = inputs.thicknessInches || 0;

    if (l <= 0 || w <= 0 || t <= 0) {
      warnings.push("Dimensions must be greater than zero.");
      return { totalCubicFeet: 0, totalCubicYards: 0, bagsNeeded: 0, totalWeightLbs: 0, warnings };
    }
    
    const thicknessFeet = t / 12;
    cubicFeet = l * w * thicknessFeet;

  } else if (inputs.mode === 'volume') {
    const v = inputs.knownVolume || 0;
    
    if (v <= 0) {
      warnings.push("Volume must be greater than zero.");
      return { totalCubicFeet: 0, totalCubicYards: 0, bagsNeeded: 0, totalWeightLbs: 0, warnings };
    }

    if (inputs.volumeUnit === 'cubicYards') {
      cubicFeet = v * 27;
    } else {
      cubicFeet = v;
    }
  }

  const wasteFactor = 1 + Math.max(0, inputs.wastePercent) / 100;
  const cubicFeetWithWaste = cubicFeet * wasteFactor;
  const cubicYards = cubicFeetWithWaste / 27;

  // Bag yield assumptions (should verify against manufacturer data)
  // Industry standard averages:
  let bagYield = 0.60;
  if (inputs.bagSize === 80) bagYield = 0.60;
  else if (inputs.bagSize === 60) bagYield = 0.45;
  else if (inputs.bagSize === 50) bagYield = 0.375;
  else if (inputs.bagSize === 40) bagYield = 0.30;

  const bagsNeeded = Math.ceil(cubicFeetWithWaste / bagYield);
  const totalWeightLbs = bagsNeeded * inputs.bagSize;

  // Warning for large jobs (> 1 cubic yard approx or > 40-50 bags)
  if (totalWeightLbs > 3500) {
    warnings.push(
      "Large job alert: Your project requires a significant amount of weight. Mixing this many bags by hand will be extremely labor-intensive. Consider ordering a ready-mix truck delivery for projects over 1 cubic yard."
    );
  }

  return {
    totalCubicFeet: Number(cubicFeetWithWaste.toFixed(2)),
    totalCubicYards: Number(cubicYards.toFixed(2)),
    bagsNeeded,
    totalWeightLbs,
    warnings
  };
}

export interface FootingInputs {
  lengthFeet: number;
  widthInches: number;
  depthInches: number;
  footingCount: number;
  wastePercent: number;
  bagSize: 40 | 50 | 60 | 80;
}

export interface FootingOutputs {
  volumePerFootingCubicFeet: number;
  totalVolumeCubicFeet: number;
  totalVolumeCubicYards: number;
  bagsNeeded: number;
  warnings: string[];
}

/**
 * Calculates concrete volume and bags needed for rectangular footings.
 */
export function calculateFooting(inputs: FootingInputs): FootingOutputs {
  const warnings: string[] = [];

  const {
    lengthFeet,
    widthInches,
    depthInches,
    footingCount,
    wastePercent,
    bagSize
  } = inputs;

  if (lengthFeet <= 0 || widthInches <= 0 || depthInches <= 0 || footingCount <= 0) {
    warnings.push("All dimensions and footing count must be greater than zero.");
    return {
      volumePerFootingCubicFeet: 0,
      totalVolumeCubicFeet: 0,
      totalVolumeCubicYards: 0,
      bagsNeeded: 0,
      warnings
    };
  }

  const widthFeet = widthInches / 12;
  const depthFeet = depthInches / 12;

  const volumePerFootingCubicFeet = lengthFeet * widthFeet * depthFeet;
  const totalCubicFeet = volumePerFootingCubicFeet * footingCount;

  // Apply waste
  const wasteFactor = 1 + (Math.max(0, wastePercent) / 100);
  const totalWithWaste = totalCubicFeet * wasteFactor;
  const totalCubicYards = totalWithWaste / 27;

  // Yield calculation
  let bagYield = 0.60;
  if (bagSize === 80) bagYield = 0.60;
  else if (bagSize === 60) bagYield = 0.45;
  else if (bagSize === 50) bagYield = 0.375;
  else if (bagSize === 40) bagYield = 0.30;

  const bagsNeeded = Math.ceil(totalWithWaste / bagYield);

  // Warnings
  if (totalCubicYards >= 1 || bagsNeeded > 45) {
    warnings.push("Large job alert: Your project requires over a cubic yard of concrete. Consider ordering a ready-mix truck delivery instead of hand-mixing bags.");
  }
  warnings.push("Footing dimensions (width and depth) are often strictly controlled by local building codes, soil bearing capacity, structural loads, and regional frost depth lines. Always consult local codes or a structural engineer before pouring.");

  return {
    volumePerFootingCubicFeet: Number(volumePerFootingCubicFeet.toFixed(3)),
    totalVolumeCubicFeet: Number(totalWithWaste.toFixed(2)),
    totalVolumeCubicYards: Number(totalCubicYards.toFixed(3)),
    bagsNeeded,
    warnings
  };
}

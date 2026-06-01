export interface SonotubeInputs {
  tubeCount: number;
  diameterInches: number;
  height: number;
  heightUnit: 'inches' | 'feet';
  wastePercent: number;
  bagSize: 40 | 50 | 60 | 80;
}

export interface SonotubeOutputs {
  volumePerTubeCubicFeet: number;
  totalVolumeCubicFeet: number;
  totalVolumeCubicYards: number;
  bagsNeeded: number;
  warnings: string[];
}

/**
 * Calculates concrete volume and bags needed for round concrete form tubes (Sonotubes).
 */
export function calculateSonotube(inputs: SonotubeInputs): SonotubeOutputs {
  const warnings: string[] = [];

  const {
    tubeCount,
    diameterInches,
    height,
    heightUnit,
    wastePercent,
    bagSize
  } = inputs;

  if (tubeCount <= 0 || diameterInches <= 0 || height <= 0) {
    warnings.push("Tubes count, diameter, and height must be greater than zero.");
    return {
      volumePerTubeCubicFeet: 0,
      totalVolumeCubicFeet: 0,
      totalVolumeCubicYards: 0,
      bagsNeeded: 0,
      warnings
    };
  }

  const radiusFeet = (diameterInches / 2) / 12;
  const heightFeet = heightUnit === 'inches' ? height / 12 : height;

  const volumePerTubeCubicFeet = Math.PI * Math.pow(radiusFeet, 2) * heightFeet;
  const totalCubicFeet = volumePerTubeCubicFeet * tubeCount;

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

  // General Warnings
  if (totalCubicYards >= 1 || bagsNeeded > 45) {
      warnings.push("Large job alert: Your project requires a significant amount of weight. Mixing this many bags by hand will be extremely labor-intensive. Consider ordering a ready-mix truck delivery for projects over 1 cubic yard.");
  }
  warnings.push("For structural footings (like load-bearing decks or building piers), always follow local building codes for required depth (frost line) and footing base sizes. Consult a professional engineer if unsure.");

  return {
    volumePerTubeCubicFeet: Number(volumePerTubeCubicFeet.toFixed(3)),
    totalVolumeCubicFeet: Number(totalWithWaste.toFixed(2)),
    totalVolumeCubicYards: Number(totalCubicYards.toFixed(3)),
    bagsNeeded,
    warnings
  };
}

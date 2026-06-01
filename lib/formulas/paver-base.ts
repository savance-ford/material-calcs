export interface PaverBaseInputs {
  mode: 'rectangle' | 'squareFeet';
  lengthFeet?: number;
  widthFeet?: number;
  knownSquareFeet?: number;
  baseDepthInches: number;
  sandDepthInches: number;
  wastePercent: number;
  baseDensityTonsPerCy: number;
  sandDensityTonsPerCy: number;
}

export interface PaverBaseOutputs {
  totalAreaSqFt: number;
  baseCubicFeet: number;
  baseCubicYards: number;
  baseTons: number;
  sandCubicFeet: number;
  sandCubicYards: number;
  sandTons: number;
  warnings: string[];
}

/**
 * Calculates base rock and bedding sand needed for paver patios and walkways.
 */
export function calculatePaverBase(inputs: PaverBaseInputs): PaverBaseOutputs {
  const warnings: string[] = [];
  let squareFeet = 0;

  if (inputs.mode === 'rectangle') {
    const l = inputs.lengthFeet || 0;
    const w = inputs.widthFeet || 0;
    if (l <= 0 || w <= 0) {
      warnings.push("Length and Width must be greater than zero.");
      return { totalAreaSqFt: 0, baseCubicFeet: 0, baseCubicYards: 0, baseTons: 0, sandCubicFeet: 0, sandCubicYards: 0, sandTons: 0, warnings };
    }
    squareFeet = l * w;
  } else if (inputs.mode === 'squareFeet') {
    const sqft = inputs.knownSquareFeet || 0;
    if (sqft <= 0) {
      warnings.push("Square feet must be greater than zero.");
      return { totalAreaSqFt: 0, baseCubicFeet: 0, baseCubicYards: 0, baseTons: 0, sandCubicFeet: 0, sandCubicYards: 0, sandTons: 0, warnings };
    }
    squareFeet = sqft;
  }

  if (inputs.baseDepthInches < 0 || inputs.sandDepthInches < 0) {
    warnings.push("Depths must be non-negative.");
    return { totalAreaSqFt: 0, baseCubicFeet: 0, baseCubicYards: 0, baseTons: 0, sandCubicFeet: 0, sandCubicYards: 0, sandTons: 0, warnings };
  }

  const baseDepthFeet = inputs.baseDepthInches / 12;
  const sandDepthFeet = inputs.sandDepthInches / 12;

  const rawBaseCubicFeet = squareFeet * baseDepthFeet;
  const rawSandCubicFeet = squareFeet * sandDepthFeet;

  const wasteFactor = 1 + Math.max(0, inputs.wastePercent) / 100;
  
  const baseCubicFeet = rawBaseCubicFeet * wasteFactor;
  const sandCubicFeet = rawSandCubicFeet * wasteFactor;

  const baseCubicYards = baseCubicFeet / 27;
  const sandCubicYards = sandCubicFeet / 27;

  let baseDensity = inputs.baseDensityTonsPerCy > 0 ? inputs.baseDensityTonsPerCy : 1.4; // standard class 2 base
  let sandDensity = inputs.sandDensityTonsPerCy > 0 ? inputs.sandDensityTonsPerCy : 1.35; // standard concrete sand

  const baseTons = baseCubicYards * baseDensity;
  const sandTons = sandCubicYards * sandDensity;

  if (inputs.baseDepthInches > 0 && inputs.baseDepthInches < 4) {
      warnings.push("Structural Warning: Base depths under 4 inches are generally not recommended for paver patios except on undisturbed, very firm, well-draining soil.");
  }

  // Density/Compaction warning
  if (baseTons > 0) {
      warnings.push("Compaction Alert: Crushed stone bases (like Class 2 or Item 4) must be mechanically compacted in 2-inch lifts. Highly compacted base material shrinks in volume, so your waste factor should ideally be at least 10-15% to account for this compaction.");
  }
  
  warnings.push("Depth Warning: Appropriate base depths vary widely based on expected traffic (walkway vs driveway), native soil type (clay vs sandy), drainage, and local climate (frost heave). Always follow ICPI guidelines or consult a local hardscape professional.");

  return {
    totalAreaSqFt: Number(squareFeet.toFixed(2)),
    baseCubicFeet: Number(baseCubicFeet.toFixed(2)),
    baseCubicYards: Number(baseCubicYards.toFixed(2)),
    baseTons: Number(baseTons.toFixed(2)),
    sandCubicFeet: Number(sandCubicFeet.toFixed(2)),
    sandCubicYards: Number(sandCubicYards.toFixed(2)),
    sandTons: Number(sandTons.toFixed(2)),
    warnings
  };
}

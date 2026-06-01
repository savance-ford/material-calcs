export interface GravelInputs {
  mode: 'rectangle' | 'circle' | 'squareFeet';
  lengthFeet?: number;
  widthFeet?: number;
  diameterFeet?: number;
  knownSquareFeet?: number;
  depthInches: number;
  materialDensityTonsPerCy: number;
  wastePercent: number;
}

export interface GravelOutputs {
  totalAreaSqFt: number;
  totalVolumeCubicFeet: number;
  totalVolumeCubicYards: number;
  totalTons: number;
  warnings: string[];
}

/**
 * Calculates gravel volume and tons needed for driveways, paths, and landscaping.
 */
export function calculateGravel(inputs: GravelInputs): GravelOutputs {
  const warnings: string[] = [];
  let squareFeet = 0;

  if (inputs.mode === 'rectangle') {
    const l = inputs.lengthFeet || 0;
    const w = inputs.widthFeet || 0;
    if (l <= 0 || w <= 0) {
      warnings.push("Length and Width must be greater than zero.");
      return { totalAreaSqFt: 0, totalVolumeCubicFeet: 0, totalVolumeCubicYards: 0, totalTons: 0, warnings };
    }
    squareFeet = l * w;
  } else if (inputs.mode === 'circle') {
    const d = inputs.diameterFeet || 0;
    if (d <= 0) {
      warnings.push("Diameter must be greater than zero.");
      return { totalAreaSqFt: 0, totalVolumeCubicFeet: 0, totalVolumeCubicYards: 0, totalTons: 0, warnings };
    }
    const radius = d / 2;
    squareFeet = Math.PI * Math.pow(radius, 2);
  } else if (inputs.mode === 'squareFeet') {
    const sqft = inputs.knownSquareFeet || 0;
    if (sqft <= 0) {
      warnings.push("Square feet must be greater than zero.");
      return { totalAreaSqFt: 0, totalVolumeCubicFeet: 0, totalVolumeCubicYards: 0, totalTons: 0, warnings };
    }
    squareFeet = sqft;
  }

  if (inputs.depthInches <= 0) {
    warnings.push("Depth must be greater than zero.");
    return { totalAreaSqFt: 0, totalVolumeCubicFeet: 0, totalVolumeCubicYards: 0, totalTons: 0, warnings };
  }

  const depthFeet = inputs.depthInches / 12;
  const cubicFeet = squareFeet * depthFeet;

  const wasteFactor = 1 + Math.max(0, inputs.wastePercent) / 100;
  const cubicFeetWithWaste = cubicFeet * wasteFactor;
  const cubicYards = cubicFeetWithWaste / 27;

  let density = inputs.materialDensityTonsPerCy;
  if (density <= 0) {
    density = 1.4; // fallback to standard gravel
  }

  const tons = cubicYards * density;

  // Compaction warning
  if (inputs.materialDensityTonsPerCy > 1 && inputs.depthInches > 2) {
      warnings.push("Compaction Alert: If you are mechanically compacting crushed stone (like Crusher Run or Item 4) for a driveway or patio base, the volume will shrink. Ensure your waste factor accounts for at least 10-15% compaction loss.");
  }
  
  if (tons > 1) {
    warnings.push("Delivery Note: For amounts over 1 ton, it is typically much cheaper to have material delivered in bulk by a dump truck rather than buying individual bags at a home center.");
  }

  return {
    totalAreaSqFt: Number(squareFeet.toFixed(2)),
    totalVolumeCubicFeet: Number(cubicFeetWithWaste.toFixed(2)),
    totalVolumeCubicYards: Number(cubicYards.toFixed(2)),
    totalTons: Number(tons.toFixed(2)),
    warnings
  };
}

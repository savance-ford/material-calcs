export interface MulchInputs {
  mode: 'rectangle' | 'circle' | 'squareFeet';
  lengthFeet?: number;
  widthFeet?: number;
  diameterFeet?: number;
  knownSquareFeet?: number;
  depthInches: number;
  bagSizeCubicFeet: number;
  wastePercent: number;
}

export interface MulchOutputs {
  totalAreaSqFt: number;
  totalVolumeCubicFeet: number;
  totalVolumeCubicYards: number;
  bagsNeeded: number;
  warnings: string[];
}

/**
 * Calculates mulch volume and bags needed for landscaping beds and areas.
 */
export function calculateMulch(inputs: MulchInputs): MulchOutputs {
  const warnings: string[] = [];
  let squareFeet = 0;

  if (inputs.mode === 'rectangle') {
    const l = inputs.lengthFeet || 0;
    const w = inputs.widthFeet || 0;
    if (l <= 0 || w <= 0) {
      warnings.push("Length and Width must be greater than zero.");
      return { totalAreaSqFt: 0, totalVolumeCubicFeet: 0, totalVolumeCubicYards: 0, bagsNeeded: 0, warnings };
    }
    squareFeet = l * w;
  } else if (inputs.mode === 'circle') {
    const d = inputs.diameterFeet || 0;
    if (d <= 0) {
      warnings.push("Diameter must be greater than zero.");
      return { totalAreaSqFt: 0, totalVolumeCubicFeet: 0, totalVolumeCubicYards: 0, bagsNeeded: 0, warnings };
    }
    const radius = d / 2;
    squareFeet = Math.PI * Math.pow(radius, 2);
  } else if (inputs.mode === 'squareFeet') {
    const sqft = inputs.knownSquareFeet || 0;
    if (sqft <= 0) {
      warnings.push("Square feet must be greater than zero.");
      return { totalAreaSqFt: 0, totalVolumeCubicFeet: 0, totalVolumeCubicYards: 0, bagsNeeded: 0, warnings };
    }
    squareFeet = sqft;
  }

  if (inputs.depthInches <= 0) {
    warnings.push("Depth must be greater than zero.");
    return { totalAreaSqFt: 0, totalVolumeCubicFeet: 0, totalVolumeCubicYards: 0, bagsNeeded: 0, warnings };
  }

  const depthFeet = inputs.depthInches / 12;
  const cubicFeet = squareFeet * depthFeet;

  const wasteFactor = 1 + Math.max(0, inputs.wastePercent) / 100;
  const cubicFeetWithWaste = cubicFeet * wasteFactor;
  const cubicYards = cubicFeetWithWaste / 27;

  let bagsNeeded = 0;
  if (inputs.bagSizeCubicFeet > 0) {
    bagsNeeded = Math.ceil(cubicFeetWithWaste / inputs.bagSizeCubicFeet);
  } else {
    warnings.push("Bag size must be greater than zero.");
  }

  // Guidance on mulch depth
  if (inputs.depthInches < 2) {
    warnings.push("Note: A depth of less than 2 inches may not effectively suppress weeds or retain soil moisture.");
  } else if (inputs.depthInches > 4) {
    warnings.push("Note: Depths over 4 inches can starve plant roots of oxygen and promote fungal diseases. 2-3 inches is standard.");
  }

  // Bulk recommendation
  if (cubicYards >= 2) {
    warnings.push("Bulk Alert: You need more than 2 cubic yards of mulch. Buying bags will be expensive and create a lot of plastic waste. Consider ordering bulk mulch delivered by a local landscape supply company.");
  }

  return {
    totalAreaSqFt: Number(squareFeet.toFixed(2)),
    totalVolumeCubicFeet: Number(cubicFeetWithWaste.toFixed(2)),
    totalVolumeCubicYards: Number(cubicYards.toFixed(2)),
    bagsNeeded,
    warnings
  };
}

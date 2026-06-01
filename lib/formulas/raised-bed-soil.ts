export interface RaisedBedInputs {
  lengthFeet: number;
  widthFeet: number;
  heightInches: number;
  bedCount: number;
  fillPercentage: number;
  bagSizeValue: number;
  bagSizeUnit: 'cubicFeet' | 'quarts';
  wastePercent: number;
}

export interface RaisedBedOutputs {
  totalVolumeCubicFeet: number;
  totalVolumeCubicYards: number;
  bagsNeeded: number;
  mixTopsoilCuFt: number;
  mixCompostCuFt: number;
  mixAerationCuFt: number;
  warnings: string[];
}

/**
 * Calculates soil volume for raised garden beds, including a standard mix breakdown.
 */
export function calculateRaisedBed(inputs: RaisedBedInputs): RaisedBedOutputs {
  const warnings: string[] = [];

  const {
    lengthFeet,
    widthFeet,
    heightInches,
    bedCount,
    fillPercentage,
    bagSizeValue,
    bagSizeUnit,
    wastePercent
  } = inputs;

  if (lengthFeet <= 0 || widthFeet <= 0 || heightInches <= 0 || bedCount <= 0) {
    warnings.push("Dimensions and bed count must be greater than zero.");
    return {
      totalVolumeCubicFeet: 0,
      totalVolumeCubicYards: 0,
      bagsNeeded: 0,
      mixTopsoilCuFt: 0,
      mixCompostCuFt: 0,
      mixAerationCuFt: 0,
      warnings
    };
  }

  const fillFactor = Math.max(0, Math.min(100, fillPercentage)) / 100;
  
  if (fillFactor < 0.5) {
      warnings.push("False-Bottom Tip: If you are using the Hugelkultur method (filling the bottom half with logs and branches), remember that the organic material will break down rapidly in the first year, causing significant soil settling.");
  }

  const heightFeet = heightInches / 12;
  const depthToFillFeet = heightFeet * fillFactor;
  
  const volumePerBedCuFt = lengthFeet * widthFeet * depthToFillFeet;
  const totalRawCuFt = volumePerBedCuFt * bedCount;

  // Apply waste / settling factor
  const wasteFactor = 1 + (Math.max(0, wastePercent) / 100);
  const totalCuFtWithWaste = totalRawCuFt * wasteFactor;
  const totalCuYards = totalCuFtWithWaste / 27;

  // Calculate bags
  let bagSizeCuFt = bagSizeValue;
  if (bagSizeUnit === 'quarts') {
    // 1 cubic foot = 25.714 dry quarts legally in the US for soil
    bagSizeCuFt = bagSizeValue / 25.714;
  }

  let bagsNeeded = 0;
  if (bagSizeCuFt > 0) {
    bagsNeeded = Math.ceil(totalCuFtWithWaste / bagSizeCuFt);
  } else {
    warnings.push("Bag size must be greater than zero.");
  }

  // Common DIY Mix (50% Topsoil, 30% Compost, 20% Aeration/Peat)
  const mixTopsoilCuFt = totalCuFtWithWaste * 0.50;
  const mixCompostCuFt = totalCuFtWithWaste * 0.30;
  const mixAerationCuFt = totalCuFtWithWaste * 0.20;

  warnings.push("Settling Warning: Fluffy raised bed soil and compost will naturally settle and compress by 10-20% over the first few months and after heavy rains. It's recommended to slightly overfill or keep extra soil on hand.");

  if (totalCuYards > 2) {
      warnings.push("Bulk Alert: For volumes over 2 cubic yards, ordering bulk soil (like a 50/50 loam/compost mix) from a local landscape supplier is usually significantly cheaper than buying bags.");
  }

  return {
    totalVolumeCubicFeet: Number(totalCuFtWithWaste.toFixed(2)),
    totalVolumeCubicYards: Number(totalCuYards.toFixed(2)),
    bagsNeeded,
    mixTopsoilCuFt: Number(mixTopsoilCuFt.toFixed(2)),
    mixCompostCuFt: Number(mixCompostCuFt.toFixed(2)),
    mixAerationCuFt: Number(mixAerationCuFt.toFixed(2)),
    warnings
  };
}

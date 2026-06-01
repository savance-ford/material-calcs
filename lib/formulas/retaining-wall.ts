export interface RetainingWallInputs {
  wallLengthFeet: number;
  wallHeightFeet: number;
  blockLengthInches: number;
  blockHeightInches: number;
  wastePercent: number;
  includeCapBlocks: boolean;
  baseTrenchDepthInches: number;
  baseTrenchWidthInches: number;
}

export interface RetainingWallOutputs {
  totalWallBlocks: number;
  totalRows: number;
  totalCapBlocks: number;
  baseMaterialCubicFeet: number;
  baseMaterialCubicYards: number;
  warnings: string[];
}

/**
 * Calculates blocks, cap blocks, and base material needed for retaining walls.
 */
export function calculateRetainingWall(inputs: RetainingWallInputs): RetainingWallOutputs {
  const warnings: string[] = [];

  const {
    wallLengthFeet,
    wallHeightFeet,
    blockLengthInches,
    blockHeightInches,
    wastePercent,
    includeCapBlocks,
    baseTrenchDepthInches,
    baseTrenchWidthInches
  } = inputs;

  if (wallLengthFeet <= 0 || wallHeightFeet <= 0 || blockLengthInches <= 0 || blockHeightInches <= 0) {
    warnings.push("Wall dimensions and block dimensions must be greater than zero.");
    return {
      totalWallBlocks: 0,
      totalRows: 0,
      totalCapBlocks: 0,
      baseMaterialCubicFeet: 0,
      baseMaterialCubicYards: 0,
      warnings
    };
  }

  const totalWallSquareFeet = wallLengthFeet * wallHeightFeet;
  const blockSquareFeet = (blockLengthInches / 12) * (blockHeightInches / 12);
  
  const rawWallBlocks = totalWallSquareFeet / blockSquareFeet;
  const wasteFactor = 1 + (Math.max(0, wastePercent) / 100);
  
  const totalWallBlocks = Math.ceil(rawWallBlocks * wasteFactor);

  const totalRows = Math.ceil(wallHeightFeet / (blockHeightInches / 12));

  let totalCapBlocks = 0;
  if (includeCapBlocks) {
    const rawCapBlocks = wallLengthFeet / (blockLengthInches / 12);
    totalCapBlocks = Math.ceil(rawCapBlocks * wasteFactor);
  }

  let baseMaterialCubicFeet = 0;
  let baseMaterialCubicYards = 0;
  if (baseTrenchDepthInches > 0 && baseTrenchWidthInches > 0) {
    const rawBaseCubicFeet = wallLengthFeet * (baseTrenchWidthInches / 12) * (baseTrenchDepthInches / 12);
    baseMaterialCubicFeet = rawBaseCubicFeet * wasteFactor;
    baseMaterialCubicYards = baseMaterialCubicFeet / 27;
  } else if (baseTrenchDepthInches < 0 || baseTrenchWidthInches < 0) {
    warnings.push("Base trench dimensions cannot be negative.");
  }

  if (wallHeightFeet >= 3) {
      warnings.push("Structural Warning: Retaining walls 3 to 4 feet or taller (or walls supporting driveways/structures) typically require professional engineering, building permits, specialized drainage, and structural geogrid. Check local code.");
  }
  
  warnings.push("Drainage Note: Don't forget backfill! You typically need to backfill the area immediately behind the retaining wall with free-draining crushed stone (like 3/4-inch clean stone) and install a perforated drain pipe to prevent hydrostatic pressure buildup.");
  warnings.push("Base Course Note: Remember that the first course (row) of blocks must usually be fully buried below grade for stability. Ensure your Wall Height includes this buried course.");

  return {
    totalWallBlocks,
    totalRows,
    totalCapBlocks,
    baseMaterialCubicFeet: Number(baseMaterialCubicFeet.toFixed(2)),
    baseMaterialCubicYards: Number(baseMaterialCubicYards.toFixed(2)),
    warnings
  };
}

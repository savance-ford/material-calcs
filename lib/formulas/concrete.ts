export interface ConcreteSlabInputs {
  lengthFeet: number;
  widthFeet: number;
  thicknessInches: number;
  wastePercent: number;
}

export interface ConcreteSlabOutputs {
  cubicFeet: number;
  cubicYards: number;
  fortyPoundBags: number;
  sixtyPoundBags: number;
  eightyPoundBags: number;
  warnings: string[];
}

/**
 * Calculates concrete volume and bag requirements for a rectangular slab.
 *
 * Requirements matching:
 * 1. thicknessFeet = thicknessInches / 12
 * 2. cubicFeet = lengthFeet * widthFeet * thicknessFeet
 * 3. cubicFeetWithWaste = cubicFeet * (1 + wastePercent / 100)
 * 4. cubicYards = cubicFeetWithWaste / 27
 * 5. Bag counts rounded up with Math.ceil.
 * 6. Industry average bag yields are used with a disclaimer.
 * 7. Validate inputs strictly.
 * 8. Return warnings for outliers and invalid values.
 * 9. Function is pure with no side effects or API calls.
 */
export function calculateConcreteSlab(inputs: ConcreteSlabInputs): ConcreteSlabOutputs {
  const warnings: string[] = [];

  // 7. Validate inputs & gracefully return 0 on invalid values
  if (inputs.lengthFeet <= 0 || inputs.widthFeet <= 0 || inputs.thicknessInches <= 0) {
    warnings.push("Dimensions must be greater than zero.");
    return {
      cubicFeet: 0,
      cubicYards: 0,
      fortyPoundBags: 0,
      sixtyPoundBags: 0,
      eightyPoundBags: 0,
      warnings,
    };
  }

  // 8. Return warnings for unusually thin slabs
  if (inputs.thicknessInches < 2) {
    warnings.push(
      "Slabs less than 2 inches thick are prone to cracking and typically require specialized overlays rather than standard concrete mixes."
    );
  }

  // 8. Return warnings for unusually thick slabs
  if (inputs.thicknessInches > 8) {
    warnings.push(
      "Slabs thicker than 8 inches might require special engineering, reinforced footings, deeper excavation, or multiple pours."
    );
  }

  // 1. thicknessFeet = thicknessInches / 12
  const thicknessFeet = inputs.thicknessInches / 12;

  // 2. cubicFeet = lengthFeet * widthFeet * thicknessFeet
  const cubicFeet = inputs.lengthFeet * inputs.widthFeet * thicknessFeet;

  // 3. cubicFeetWithWaste = cubicFeet * (1 + wastePercent / 100)
  const wasteFactor = 1 + Math.max(0, inputs.wastePercent) / 100;
  const cubicFeetWithWaste = cubicFeet * wasteFactor;

  // 4. cubicYards = cubicFeetWithWaste / 27
  const cubicYards = cubicFeetWithWaste / 27;

  // 6. Use bag yield assumptions, but clearly comment that these should be verified against manufacturer data.
  // ALWAYS verify against the specific manufacturer's bag ratings.
  // Industry standard averages: 80lb = 0.60, 60lb = 0.45, 40lb = 0.30
  const YIELD_40LB = 0.30;
  const YIELD_60LB = 0.45;
  const YIELD_80LB = 0.60;

  // 5. Bag counts should be rounded up with Math.ceil.
  const fortyPoundBags = Math.ceil(cubicFeetWithWaste / YIELD_40LB);
  const sixtyPoundBags = Math.ceil(cubicFeetWithWaste / YIELD_60LB);
  const eightyPoundBags = Math.ceil(cubicFeetWithWaste / YIELD_80LB);

  // 8. Warning for large jobs
  if (eightyPoundBags > 45) {
    warnings.push(
      "Large job alert: You need over a yard of concrete. Consider ordering a ready-mix truck delivery rather than mixing bags manually, as it will be extremely labor-intensive."
    );
  }

  return {
    cubicFeet: Number(cubicFeetWithWaste.toFixed(2)),
    cubicYards: Number(cubicYards.toFixed(2)),
    fortyPoundBags,
    sixtyPoundBags,
    eightyPoundBags,
    warnings,
  };
}

// ==========================================
// 5 UNIT TEST EXAMPLES
// ==========================================
/*
Test Case 1: Standard Patio
Input: { lengthFeet: 10, widthFeet: 10, thicknessInches: 4, wastePercent: 10 }
Expected cubicFeet: 36.67
Expected cubicYards: 1.36
Expected 80lb Bags: 62
Warnings: ["Large job alert: ..."]

Test Case 2: Zero/Invalid Dimensions
Input: { lengthFeet: 0, widthFeet: 10, thicknessInches: 4, wastePercent: 10 }
Expected cubicFeet: 0
Warnings: ["Dimensions must be greater than zero."]

Test Case 3: Very Thin Overlay
Input: { lengthFeet: 5, widthFeet: 5, thicknessInches: 1, wastePercent: 0 }
Expected cubicFeet: 2.08
Expected cubicYards: 0.08
Warnings: ["Slabs less than 2 inches thick are prone to cracking..."]

Test Case 4: Deep Footing (Thick Slab)
Input: { lengthFeet: 2, widthFeet: 2, thicknessInches: 12, wastePercent: 0 }
Expected cubicFeet: 4.00
Expected cubicYards: 0.15
Warnings: ["Slabs thicker than 8 inches might require special engineering..."]

Test Case 5: Exact 1 Yard Pour (No warnings except standard)
Input: { lengthFeet: 9, widthFeet: 9, thicknessInches: 4, wastePercent: 0 }
Expected cubicFeet: 27.00
Expected cubicYards: 1.00
Expected 80lb Bags: 45
Warnings: []
*/

export interface PostHoleInputs {
  postCount: number;
  holeDiameterInches: number;
  holeDepthInches: number;
  postShape: 'round' | 'square';
  postWidthInches: number; // diameter if round, side if square
  wastePercent: number;
  bagSize: 40 | 50 | 60 | 80;
}

export interface PostHoleOutputs {
  volumePerHoleCubicFeet: number;
  totalVolumeCubicFeet: number;
  totalVolumeCubicYards: number;
  bagsNeeded: number;
  warnings: string[];
}

/**
 * Calculates concrete volume and bags needed for post holes,
 * subtracting the volume displaced by the post itself.
 */
export function calculatePostHole(inputs: PostHoleInputs): PostHoleOutputs {
  const warnings: string[] = [];

  const {
    postCount,
    holeDiameterInches,
    holeDepthInches,
    postShape,
    postWidthInches,
    wastePercent,
    bagSize
  } = inputs;

  if (postCount <= 0 || holeDiameterInches <= 0 || holeDepthInches <= 0 || postWidthInches <= 0) {
    warnings.push("All dimensions and post count must be greater than zero.");
    return {
      volumePerHoleCubicFeet: 0,
      totalVolumeCubicFeet: 0,
      totalVolumeCubicYards: 0,
      bagsNeeded: 0,
      warnings
    };
  }

  // Check if post fits in the hole
  // For square posts, diagonal is width * sqrt(2)
  const maxPostDim = postShape === 'square' ? postWidthInches * Math.sqrt(2) : postWidthInches;
  if (maxPostDim >= holeDiameterInches) {
    warnings.push("The post is too large to fit in the specified hole with adequate concrete coverage.");
  }
  
  if (holeDiameterInches < postWidthInches) {
      warnings.push("The post width is larger than the hole diameter. This is invalid.");
      return {
          volumePerHoleCubicFeet: 0,
          totalVolumeCubicFeet: 0,
          totalVolumeCubicYards: 0,
          bagsNeeded: 0,
          warnings
      }
  }

  // Calculate volume of the hole in cubic inches
  const PI = Math.PI;
  const holeRadius = holeDiameterInches / 2;
  const holeVolumeCuIn = PI * Math.pow(holeRadius, 2) * holeDepthInches;

  // Calculate volume of the post in cubic inches (assuming post goes to the bottom of the hole)
  let postVolumeCuIn = 0;
  if (postShape === 'round') {
    const postRadius = postWidthInches / 2;
    postVolumeCuIn = PI * Math.pow(postRadius, 2) * holeDepthInches;
  } else {
    // square
    postVolumeCuIn = postWidthInches * postWidthInches * holeDepthInches;
  }

  // Concrete volume per hole
  let concreteCuIn = holeVolumeCuIn - postVolumeCuIn;
  if (concreteCuIn < 0) {
    concreteCuIn = 0;
  }

  const volumePerHoleCubicFeet = concreteCuIn / 1728;
  const totalCubicFeet = volumePerHoleCubicFeet * postCount;
  
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
  warnings.push("Always check your local building codes for frost depth requirements. Post holes often need to be dug below the frost line to prevent heaving.");
  warnings.push("For significantly load-bearing projects (like large decks or structural columns), always verify requirements with a structural engineer.");

  return {
    volumePerHoleCubicFeet: Number(volumePerHoleCubicFeet.toFixed(3)),
    totalVolumeCubicFeet: Number(totalWithWaste.toFixed(2)),
    totalVolumeCubicYards: Number(totalCubicYards.toFixed(3)),
    bagsNeeded,
    warnings
  };
}

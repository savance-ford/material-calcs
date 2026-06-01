import { describe, it, expect } from 'vitest';
import { calculatePostHole } from './post-hole';

describe('calculatePostHole', () => {
  it('1. should calculate correctly for standard 4x4 square post in 8 inch hole', () => {
    // 4x4 is technically 3.5x3.5, let's just use entered dims
    const result = calculatePostHole({
      postCount: 1,
      holeDiameterInches: 8,
      holeDepthInches: 24,
      postShape: 'square',
      postWidthInches: 3.5,
      wastePercent: 0,
      bagSize: 80
    });
    
    // Hole: PI * 4^2 * 24 = 1206.37 cu in
    // Post: 3.5 * 3.5 * 24 = 294 cu in
    // Conc: 912.37 cu in / 1728 = 0.528 ft³
    expect(result.volumePerHoleCubicFeet).toBeCloseTo(0.528, 3);
    expect(result.totalVolumeCubicFeet).toBeCloseTo(0.53, 2); // rounded up 
    expect(result.bagsNeeded).toBe(1); // 0.53 / 0.6 -> math.ceil is 1
  });

  it('2. should calculate correctly for standard round post', () => {
    const result = calculatePostHole({
      postCount: 1,
      holeDiameterInches: 10,
      holeDepthInches: 36,
      postShape: 'round',
      postWidthInches: 4,
      wastePercent: 0,
      bagSize: 60
    });
    // Hole: PI * 25 * 36 = 2827.43
    // Post: PI * 4 * 36 = 452.39
    // Conc: 2375.04 / 1728 = 1.374 ft³
    expect(result.volumePerHoleCubicFeet).toBeCloseTo(1.374, 3);
    // 1.374 / 0.45 = 3.05 -> 4 bags
    expect(result.bagsNeeded).toBe(4);
  });

  it('3. should correctly multiply by post count', () => {
    const result = calculatePostHole({
      postCount: 10,
      holeDiameterInches: 8,
      holeDepthInches: 24,
      postShape: 'square',
      postWidthInches: 3.5,
      wastePercent: 0,
      bagSize: 80
    });
    expect(result.volumePerHoleCubicFeet).toBeCloseTo(0.528, 3);
    // 10 * 0.528 = 5.28 ft³
    expect(result.totalVolumeCubicFeet).toBeCloseTo(5.28, 2);
    // 5.28 / 0.6 = 8.8 -> 9 bags
    expect(result.bagsNeeded).toBe(9);
  });

  it('4. should correctly apply waste percentage', () => {
    const result = calculatePostHole({
      postCount: 10,
      holeDiameterInches: 8,
      holeDepthInches: 24,
      postShape: 'square',
      postWidthInches: 3.5,
      wastePercent: 10, // 10%
      bagSize: 80
    });
    // Vol was ~5.28 ft³, +10% is ~5.81 ft³
    expect(result.totalVolumeCubicFeet).toBeCloseTo(5.81, 2);
    // 5.81 / 0.6 = 9.68 -> 10 bags
    expect(result.bagsNeeded).toBe(10);
  });

  it('5. should handle invalid dimensions with 0', () => {
    const result = calculatePostHole({
      postCount: 0,
      holeDiameterInches: 8,
      holeDepthInches: 24,
      postShape: 'square',
      postWidthInches: 3.5,
      wastePercent: 0,
      bagSize: 80
    });
    expect(result.bagsNeeded).toBe(0);
    expect(result.warnings).toContain("All dimensions and post count must be greater than zero.");
  });

  it('6. should warn and yield 0 if post is wider than hole', () => {
    const result = calculatePostHole({
      postCount: 1,
      holeDiameterInches: 4,
      holeDepthInches: 24,
      postShape: 'square',
      postWidthInches: 6,
      wastePercent: 0,
      bagSize: 80
    });
    expect(result.bagsNeeded).toBe(0);
    expect(result.warnings).toContain("The post width is larger than the hole diameter. This is invalid.");
  });

  it('7. should warn if diagonal of square post touches or exceeds hole diameter', () => {
    const result = calculatePostHole({
      postCount: 1,
      holeDiameterInches: 5,
      holeDepthInches: 24,
      postShape: 'square',
      postWidthInches: 4, // diagonal is ~5.6, which is > 5
      wastePercent: 0,
      bagSize: 80
    });
    expect(result.warnings).toContain("The post is too large to fit in the specified hole with adequate concrete coverage.");
  });

  it('8. should calculate properly with 50-lb yield (0.375)', () => {
    const result = calculatePostHole({
      postCount: 1,
      holeDiameterInches: 6,
      holeDepthInches: 24, // ~678.5 cu in = 0.392 ft3 (ignoring post here for simple test of yield division)
      postShape: 'round',
      postWidthInches: 2, // ~75.4 cu in
      wastePercent: 0,
      bagSize: 50
    });
    // Vol per hole = 0.349 ft3
    // 0.349 / 0.375 = 0.93 -> 1 bag
    expect(result.volumePerHoleCubicFeet).toBeCloseTo(0.349, 3);
    expect(result.bagsNeeded).toBe(1);
  });

  it('9. should correctly provide standard disclaimers', () => {
    const result = calculatePostHole({
      postCount: 1,
      holeDiameterInches: 8,
      holeDepthInches: 24,
      postShape: 'round',
      postWidthInches: 4,
      wastePercent: 0,
      bagSize: 80
    });
    const hasFrostWarning = result.warnings.some(w => w.includes('frost depth requirements'));
    const hasCodeWarning = result.warnings.some(w => w.includes('structural engineer'));
    expect(hasFrostWarning).toBe(true);
    expect(hasCodeWarning).toBe(true);
  });

  it('10. should properly handle large scale jobs', () => {
    const result = calculatePostHole({
      postCount: 100,
      holeDiameterInches: 12,
      holeDepthInches: 48,
      postShape: 'round',
      postWidthInches: 6,
      wastePercent: 5,
      bagSize: 80
    });
    expect(result.bagsNeeded).toBeGreaterThan(100);
    // Hole: PI*36*48 = 5428 cu in; Post: PI*9*48 = 1357 cu in;
    // Diff: 4071 cu in / 1728 = 2.356 ft3 per hole
    // 100 holes = 235.6 ft3
    // Waste 5% = 247.38 ft3
    // Yards = 247.38 / 27 = 9.16 yards
    // Bags = 247.38 / 0.60 = 413
    expect(result.totalVolumeCubicYards).toBeCloseTo(9.162, 2);
    expect(result.bagsNeeded).toBe(413);
  });
});

import { describe, it, expect } from 'vitest';
import { calculateSonotube } from './sonotube';

describe('calculateSonotube', () => {
  it('1. should calculate correctly for an 8-inch sonotube 4 feet deep', () => {
    const result = calculateSonotube({
      tubeCount: 1,
      diameterInches: 8,
      height: 4,
      heightUnit: 'feet',
      wastePercent: 0,
      bagSize: 80
    });
    
    // Radius = 0.333 ft
    // Vol = PI * 0.333^2 * 4 = 1.396 ft³
    expect(result.volumePerTubeCubicFeet).toBeCloseTo(1.396, 3);
    expect(result.totalVolumeCubicFeet).toBeCloseTo(1.40, 2);
    // 1.40 / 0.6 = 2.33 -> 3 bags
    expect(result.bagsNeeded).toBe(3);
  });

  it('2. should calculate using inches height correctly', () => {
    const result = calculateSonotube({
      tubeCount: 1,
      diameterInches: 12, // r = 0.5 ft
      height: 48,
      heightUnit: 'inches',
      wastePercent: 0,
      bagSize: 60
    });
    // r = 0.5, h = 4. Vol = PI * 0.25 * 4 = 3.14159 ft³
    expect(result.volumePerTubeCubicFeet).toBeCloseTo(3.142, 3);
    // 3.142 / 0.45 = 6.98 -> 7 bags
    expect(result.bagsNeeded).toBe(7);
  });

  it('3. should correctly sum up multiple tubes', () => {
    const result = calculateSonotube({
      tubeCount: 10,
      diameterInches: 8,
      height: 4,
      heightUnit: 'feet',
      wastePercent: 0,
      bagSize: 80
    });
    // 10 * 1.396 ft³ = 13.96 ft³
    expect(result.totalVolumeCubicFeet).toBeCloseTo(13.96, 2);
    expect(result.volumePerTubeCubicFeet).toBeCloseTo(1.396, 3);
    // 13.96 / 0.60 = 23.27 -> 24 bags
    expect(result.bagsNeeded).toBe(24);
  });

  it('4. should correctly apply waste percentage', () => {
    const result = calculateSonotube({
      tubeCount: 10,
      diameterInches: 8,
      height: 4,
      heightUnit: 'feet',
      wastePercent: 10,
      bagSize: 80
    });
    // 13.96 * 1.10 = 15.36 ft³
    expect(result.totalVolumeCubicFeet).toBeCloseTo(15.36, 2);
    // 15.36 / 0.60 = 25.6 -> 26 bags
    expect(result.bagsNeeded).toBe(26);
  });

  it('5. should handle zero inputs properly', () => {
    const result = calculateSonotube({
      tubeCount: 0,
      diameterInches: 8,
      height: 4,
      heightUnit: 'feet',
      wastePercent: 0,
      bagSize: 80
    });
    expect(result.totalVolumeCubicFeet).toBe(0);
    expect(result.bagsNeeded).toBe(0);
    expect(result.warnings).toContain("Tubes count, diameter, and height must be greater than zero.");
  });

  it('6. should calculate correctly with 50-lb bag size', () => {
    const result = calculateSonotube({
      tubeCount: 1,
      diameterInches: 10,
      height: 2,
      heightUnit: 'feet',
      wastePercent: 0,
      bagSize: 50
    });
    // r = 5" = 0.4167 ft. Vol = PI * 0.4167^2 * 2 = 1.09 ft³
    expect(result.volumePerTubeCubicFeet).toBeCloseTo(1.091, 3);
    // 1.091 / 0.375 = 2.90 -> 3 bags
    expect(result.bagsNeeded).toBe(3);
  });

  it('7. should calculate correctly with 40-lb bag size', () => {
    const result = calculateSonotube({
      tubeCount: 1,
      diameterInches: 6, // r=0.25 ft
      height: 36,
      heightUnit: 'inches',
      wastePercent: 0,
      bagSize: 40
    });
    // Vol = PI * 0.25^2 * 3 = 0.589 ft³
    expect(result.volumePerTubeCubicFeet).toBeCloseTo(0.589, 3);
    // 0.589 / 0.30 = 1.96 -> 2 bags
    expect(result.bagsNeeded).toBe(2);
  });

  it('8. should show ready mix warning for large jobs', () => {
    const result = calculateSonotube({
      tubeCount: 20,
      diameterInches: 12,
      height: 4,
      heightUnit: 'feet',
      wastePercent: 10,
      bagSize: 80
    });
    // Vol = 20 * PI * 0.5^2 * 4 = 62.83 ft³
    // +10% waste = 69.11 ft³
    // > 27 ft³, so needs truck warning
    const hasWarning = result.warnings.some(w => w.includes('ready-mix truck delivery'));
    expect(hasWarning).toBe(true);
  });

  it('9. should correctly calculate yards', () => {
    const result = calculateSonotube({
      tubeCount: 10,
      diameterInches: 12,
      height: 36,
      heightUnit: 'inches', // 3 feet
      wastePercent: 0,
      bagSize: 80
    });
    // Vol per = PI * 0.5^2 * 3 = 2.356 ft³
    // Total = 23.56 ft³
    // Yards = 23.56 / 27 = 0.873 yds
    expect(result.totalVolumeCubicYards).toBeCloseTo(0.873, 3);
  });

  it('10. should output structural warning', () => {
    const result = calculateSonotube({
      tubeCount: 1,
      diameterInches: 8,
      height: 4,
      heightUnit: 'feet',
      wastePercent: 0,
      bagSize: 80
    });
    const hasWarning = result.warnings.some(w => w.includes('structural footings'));
    expect(hasWarning).toBe(true);
  });
});

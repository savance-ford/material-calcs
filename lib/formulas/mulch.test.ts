import { describe, it, expect } from 'vitest';
import { calculateMulch } from './mulch';

describe('calculateMulch', () => {
  it('1. should calculate correctly for rectangular area', () => {
    const result = calculateMulch({
      mode: 'rectangle',
      lengthFeet: 10,
      widthFeet: 10,
      depthInches: 3,
      bagSizeCubicFeet: 2,
      wastePercent: 0
    });
    // Area = 100 sq ft
    // Depth = 0.25 ft
    // Vol = 25 cu ft
    expect(result.totalAreaSqFt).toBe(100);
    expect(result.totalVolumeCubicFeet).toBe(25);
    // Bags = 25 / 2 = 12.5 -> 13
    expect(result.bagsNeeded).toBe(13);
  });

  it('2. should calculate correctly for circular area', () => {
    const result = calculateMulch({
      mode: 'circle',
      diameterFeet: 10,
      depthInches: 2,
      bagSizeCubicFeet: 2,
      wastePercent: 0
    });
    // Area = PI * 25 = 78.5398
    // Depth = 2/12 = 0.1666 ft
    // Vol = 13.09 cu ft
    expect(result.totalAreaSqFt).toBeCloseTo(78.54, 2);
    expect(result.totalVolumeCubicFeet).toBeCloseTo(13.09, 2);
    expect(result.bagsNeeded).toBe(7); // 13.09 / 2 = 6.545 -> 7
  });

  it('3. should calculate correctly for known square feet', () => {
    const result = calculateMulch({
      mode: 'squareFeet',
      knownSquareFeet: 250,
      depthInches: 3,
      bagSizeCubicFeet: 3,
      wastePercent: 10
    });
    // Area = 250
    // Depth = 0.25
    // Vol CF = 62.5
    // Waste = 68.75
    expect(result.totalAreaSqFt).toBe(250);
    expect(result.totalVolumeCubicFeet).toBeCloseTo(68.75, 2);
    // Bags = 68.75 / 3 = 22.91 -> 23
    expect(result.bagsNeeded).toBe(23);
  });

  it('4. should output bulk mulch warning for large jobs', () => {
    const result = calculateMulch({
      mode: 'rectangle',
      lengthFeet: 20,
      widthFeet: 20,
      depthInches: 4,
      bagSizeCubicFeet: 2,
      wastePercent: 0
    });
    // Area = 400. Depth = 1/3. Vol = 133.33 cu ft = 4.93 yards
    expect(result.totalVolumeCubicYards).toBeGreaterThan(2);
    expect(result.warnings.some(w => w.includes('Bulk Alert'))).toBe(true);
  });

  it('5. should provide too thin warning', () => {
    const result = calculateMulch({
      mode: 'squareFeet',
      knownSquareFeet: 100,
      depthInches: 1,
      bagSizeCubicFeet: 2,
      wastePercent: 0
    });
    expect(result.warnings.some(w => w.includes('less than 2 inches'))).toBe(true);
  });

  it('6. should provide too thick warning', () => {
    const result = calculateMulch({
      mode: 'squareFeet',
      knownSquareFeet: 100,
      depthInches: 6,
      bagSizeCubicFeet: 2,
      wastePercent: 0
    });
    expect(result.warnings.some(w => w.includes('Depths over 4 inches'))).toBe(true);
  });

  it('7. should handle zero inputs properly for rect', () => {
    const result = calculateMulch({ mode: 'rectangle', lengthFeet: 0, widthFeet: 10, depthInches: 3, bagSizeCubicFeet: 2, wastePercent: 0 });
    expect(result.totalAreaSqFt).toBe(0);
    expect(result.bagsNeeded).toBe(0);
    expect(result.warnings).toContain("Length and Width must be greater than zero.");
  });

  it('8. should handle zero inputs properly for circle', () => {
    const result = calculateMulch({ mode: 'circle', diameterFeet: 0, depthInches: 3, bagSizeCubicFeet: 2, wastePercent: 0 });
    expect(result.totalAreaSqFt).toBe(0);
    expect(result.bagsNeeded).toBe(0);
    expect(result.warnings).toContain("Diameter must be greater than zero.");
  });

  it('9. should handle zero depth properly', () => {
    const result = calculateMulch({ mode: 'squareFeet', knownSquareFeet: 100, depthInches: 0, bagSizeCubicFeet: 2, wastePercent: 0 });
    expect(result.bagsNeeded).toBe(0);
    expect(result.warnings).toContain("Depth must be greater than zero.");
  });

  it('10. should handle zero bag size properly', () => {
    const result = calculateMulch({ mode: 'squareFeet', knownSquareFeet: 100, depthInches: 2, bagSizeCubicFeet: 0, wastePercent: 0 });
    expect(result.bagsNeeded).toBe(0);
    expect(result.warnings).toContain("Bag size must be greater than zero.");
  });
});

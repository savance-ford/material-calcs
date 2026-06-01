import { describe, it, expect } from 'vitest';
import { calculateGravel } from './gravel';

describe('calculateGravel', () => {
  it('1. should calculate correctly for rectangular area', () => {
    const result = calculateGravel({
      mode: 'rectangle',
      lengthFeet: 10,
      widthFeet: 10,
      depthInches: 3,
      materialDensityTonsPerCy: 1.4,
      wastePercent: 0
    });
    // Area = 100 sq ft
    // Depth = 0.25 ft
    // Vol = 25 cu ft
    // Yards = 25 / 27 = 0.9259
    // Tons = 0.9259 * 1.4 = 1.296
    expect(result.totalAreaSqFt).toBe(100);
    expect(result.totalVolumeCubicFeet).toBe(25);
    expect(result.totalVolumeCubicYards).toBeCloseTo(0.93, 2);
    expect(result.totalTons).toBeCloseTo(1.30, 2);
  });

  it('2. should calculate correctly for circular area', () => {
    const result = calculateGravel({
      mode: 'circle',
      diameterFeet: 12,
      depthInches: 2,
      materialDensityTonsPerCy: 1.5,
      wastePercent: 0
    });
    // Area = PI * 36 = 113.097
    // Depth = 0.16667 ft
    // Vol = 18.8495 cu ft
    // Yards = 0.698 yds
    // Tons = 0.698 * 1.5 = 1.047
    expect(result.totalAreaSqFt).toBeCloseTo(113.10, 2);
    expect(result.totalVolumeCubicFeet).toBeCloseTo(18.85, 2);
    expect(result.totalTons).toBeCloseTo(1.05, 2);
  });

  it('3. should calculate correctly for known square feet', () => {
    const result = calculateGravel({
      mode: 'squareFeet',
      knownSquareFeet: 500,
      depthInches: 4,
      materialDensityTonsPerCy: 1.3,
      wastePercent: 10
    });
    // Area = 500
    // Depth = 0.333 ft
    // Vol CF = 166.67
    // Waste 10% = 183.33 CF
    // Yards = 183.33 / 27 = 6.79
    // Tons = 6.79 * 1.3 = 8.827
    expect(result.totalAreaSqFt).toBe(500);
    expect(result.totalVolumeCubicFeet).toBeCloseTo(183.33, 2);
    expect(result.totalVolumeCubicYards).toBeCloseTo(6.79, 2);
    expect(result.totalTons).toBeCloseTo(8.83, 2);
  });

  it('4. should output compaction warning for crushed stone bases', () => {
    const result = calculateGravel({
      mode: 'rectangle',
      lengthFeet: 20,
      widthFeet: 10,
      depthInches: 4,
      materialDensityTonsPerCy: 1.4,
      wastePercent: 5
    });
    expect(result.warnings.some(w => w.includes('Compaction Alert'))).toBe(true);
  });

  it('5. should handle zero inputs properly for rect', () => {
    const result = calculateGravel({ mode: 'rectangle', lengthFeet: 0, widthFeet: 10, depthInches: 3, materialDensityTonsPerCy: 1.4, wastePercent: 0 });
    expect(result.totalAreaSqFt).toBe(0);
    expect(result.totalTons).toBe(0);
    expect(result.warnings).toContain("Length and Width must be greater than zero.");
  });

  it('6. should handle zero inputs properly for circle', () => {
    const result = calculateGravel({ mode: 'circle', diameterFeet: 0, depthInches: 3, materialDensityTonsPerCy: 1.4, wastePercent: 0 });
    expect(result.totalAreaSqFt).toBe(0);
    expect(result.warnings).toContain("Diameter must be greater than zero.");
  });

  it('7. should handle zero depth properly', () => {
    const result = calculateGravel({ mode: 'squareFeet', knownSquareFeet: 100, depthInches: 0, materialDensityTonsPerCy: 1.4, wastePercent: 0 });
    expect(result.totalTons).toBe(0);
    expect(result.warnings).toContain("Depth must be greater than zero.");
  });

  it('8. should fallback to standard density if zero', () => {
    const result = calculateGravel({ mode: 'squareFeet', knownSquareFeet: 270, depthInches: 12, materialDensityTonsPerCy: 0, wastePercent: 0 });
    // 270 CF = 10 Yards
    // 10 Yards * 1.4 fallback = 14 Tons
    expect(result.totalTons).toBe(14);
  });

  it('9. should show delivery warning for over 1 ton', () => {
    const result = calculateGravel({
      mode: 'squareFeet',
      knownSquareFeet: 100,
      depthInches: 4,
      materialDensityTonsPerCy: 1.5,
      wastePercent: 0
    });
    // 33.33 CF = 1.23 Yards -> 1.85 Tons
    expect(result.warnings.some(w => w.includes('Delivery Note'))).toBe(true);
  });
  
  it('10. should accurately process deep layers', () => {
    const result = calculateGravel({
      mode: 'rectangle',
      lengthFeet: 10,
      widthFeet: 10,
      depthInches: 24, // 2 feet
      materialDensityTonsPerCy: 1.4,
      wastePercent: 5
    });
    // Area = 100
    // Vol CF = 200
    // Waste = 210 CF
    // CY = 7.777
    // Tons = 10.888
    expect(result.totalVolumeCubicYards).toBeCloseTo(7.78, 2);
    expect(result.totalTons).toBeCloseTo(10.89, 2);
  });
});

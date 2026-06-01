import { describe, it, expect } from 'vitest';
import { calculatePaverBase } from './paver-base';

describe('calculatePaverBase', () => {
  it('1. should calculate correctly for rectangular area', () => {
    const result = calculatePaverBase({
      mode: 'rectangle',
      lengthFeet: 10,
      widthFeet: 10,
      baseDepthInches: 4,
      sandDepthInches: 1,
      wastePercent: 0,
      baseDensityTonsPerCy: 1.4,
      sandDensityTonsPerCy: 1.35
    });
    // Area = 100
    // Base: 4" = 0.333 ft. Vol = 33.33 ft³. Yd = 1.23. Tons = 1.23 * 1.4 = 1.73
    // Sand: 1" = 0.0833 ft. Vol = 8.33 ft³. Yd = 0.308. Tons = 0.308 * 1.35 = 0.42
    expect(result.totalAreaSqFt).toBe(100);
    expect(result.baseCubicFeet).toBeCloseTo(33.33, 2);
    expect(result.baseCubicYards).toBeCloseTo(1.23, 2);
    expect(result.baseTons).toBeCloseTo(1.73, 2);
    expect(result.sandCubicFeet).toBeCloseTo(8.33, 2);
    expect(result.sandCubicYards).toBeCloseTo(0.31, 2);
    expect(result.sandTons).toBeCloseTo(0.42, 2);
  });

  it('2. should calculate correctly for known square feet', () => {
    const result = calculatePaverBase({
      mode: 'squareFeet',
      knownSquareFeet: 250,
      baseDepthInches: 6,
      sandDepthInches: 1,
      wastePercent: 10,
      baseDensityTonsPerCy: 1.4,
      sandDensityTonsPerCy: 1.35
    });
    // Area 250
    // Base: 6" = 0.5 ft. Vol CF = 125. Waste 110% = 137.5 CF. Yd = 5.09. Tons = 5.09 * 1.4 = 7.13
    // Sand: 1" = 0.0833 ft. Vol = 20.83. Waste = 22.92 CF. Yd = 0.85. Tons = 0.85 * 1.35 = 1.15
    expect(result.totalAreaSqFt).toBe(250);
    expect(result.baseCubicFeet).toBeCloseTo(137.5, 2);
    expect(result.baseCubicYards).toBeCloseTo(5.09, 2);
    expect(result.baseTons).toBeCloseTo(7.13, 2);
    expect(result.sandCubicFeet).toBeCloseTo(22.92, 2);
    expect(result.sandCubicYards).toBeCloseTo(0.85, 2);
    expect(result.sandTons).toBeCloseTo(1.15, 2);
  });

  it('3. should provide compaction warning for base', () => {
    const result = calculatePaverBase({
      mode: 'rectangle',
      lengthFeet: 10,
      widthFeet: 10,
      baseDepthInches: 4,
      sandDepthInches: 1,
      wastePercent: 10,
      baseDensityTonsPerCy: 1.4,
      sandDensityTonsPerCy: 1.35
    });
    expect(result.warnings.some(w => w.includes('Compaction Alert'))).toBe(true);
  });

  it('4. should provide structural warning for shallow base', () => {
    const result = calculatePaverBase({
      mode: 'rectangle',
      lengthFeet: 10,
      widthFeet: 10,
      baseDepthInches: 3,
      sandDepthInches: 1,
      wastePercent: 10,
      baseDensityTonsPerCy: 1.4,
      sandDensityTonsPerCy: 1.35
    });
    expect(result.warnings.some(w => w.includes('Structural Warning'))).toBe(true);
  });

  it('5. should provide depth warning for all inputs', () => {
    const result = calculatePaverBase({
      mode: 'rectangle',
      lengthFeet: 10,
      widthFeet: 10,
      baseDepthInches: 4,
      sandDepthInches: 1,
      wastePercent: 10,
      baseDensityTonsPerCy: 1.4,
      sandDensityTonsPerCy: 1.35
    });
    expect(result.warnings.some(w => w.includes('Depth Warning'))).toBe(true);
  });

  it('6. should handle zero inputs properly for rect', () => {
    const result = calculatePaverBase({
      mode: 'rectangle', lengthFeet: 0, widthFeet: 10, 
      baseDepthInches: 4, sandDepthInches: 1, wastePercent: 0, 
      baseDensityTonsPerCy: 1.4, sandDensityTonsPerCy: 1.35
    });
    expect(result.totalAreaSqFt).toBe(0);
    expect(result.baseTons).toBe(0);
    expect(result.warnings).toContain("Length and Width must be greater than zero.");
  });

  it('7. should handle zero square feet properly', () => {
    const result = calculatePaverBase({
      mode: 'squareFeet', knownSquareFeet: 0, 
      baseDepthInches: 4, sandDepthInches: 1, wastePercent: 0, 
      baseDensityTonsPerCy: 1.4, sandDensityTonsPerCy: 1.35
    });
    expect(result.totalAreaSqFt).toBe(0);
    expect(result.warnings).toContain("Square feet must be greater than zero.");
  });

  it('8. should handle negative depths properly', () => {
    const result = calculatePaverBase({
      mode: 'rectangle', lengthFeet: 10, widthFeet: 10, 
      baseDepthInches: -4, sandDepthInches: 1, wastePercent: 0, 
      baseDensityTonsPerCy: 1.4, sandDensityTonsPerCy: 1.35
    });
    expect(result.baseTons).toBe(0);
    expect(result.warnings).toContain("Depths must be non-negative.");
  });

  it('9. should handle calculations with zero sand depth (like for pedestal pavers or thin-set)', () => {
    const result = calculatePaverBase({
      mode: 'rectangle', lengthFeet: 5, widthFeet: 5, 
      baseDepthInches: 4, sandDepthInches: 0, wastePercent: 0, 
      baseDensityTonsPerCy: 1.4, sandDensityTonsPerCy: 1.35
    });
    expect(result.baseCubicFeet).toBeCloseTo(8.33, 2);
    expect(result.sandCubicFeet).toBe(0);
  });

  it('10. should fallback to standard densities if omitted or zero', () => {
    const result = calculatePaverBase({
      mode: 'rectangle', lengthFeet: 10, widthFeet: 10, 
      baseDepthInches: 4, sandDepthInches: 1, wastePercent: 0, 
      baseDensityTonsPerCy: 0, sandDensityTonsPerCy: 0
    });
    expect(result.baseTons).toBeCloseTo(1.73, 2); // uses 1.4
    expect(result.sandTons).toBeCloseTo(0.42, 2); // uses 1.35
  });
});

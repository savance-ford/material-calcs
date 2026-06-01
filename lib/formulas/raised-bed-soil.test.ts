import { describe, it, expect } from 'vitest';
import { calculateRaisedBed } from './raised-bed-soil';

describe('calculateRaisedBed', () => {
  it('1. should calculate correctly for single standard bed', () => {
    const result = calculateRaisedBed({
      lengthFeet: 8,
      widthFeet: 4,
      heightInches: 12,
      bedCount: 1,
      fillPercentage: 100,
      bagSizeValue: 2,
      bagSizeUnit: 'cubicFeet',
      wastePercent: 0
    });
    // 8 * 4 * 1 = 32 ft³
    expect(result.totalVolumeCubicFeet).toBeCloseTo(32, 2);
    expect(result.bagsNeeded).toBe(16);
    expect(result.mixTopsoilCuFt).toBeCloseTo(16, 2); // 50%
    expect(result.mixCompostCuFt).toBeCloseTo(9.6, 2); // 30%
    expect(result.mixAerationCuFt).toBeCloseTo(6.4, 2); // 20%
  });

  it('2. should correctly apply fill percentage', () => {
    const result = calculateRaisedBed({
      lengthFeet: 8,
      widthFeet: 4,
      heightInches: 24, // 2 feet tall
      bedCount: 1,
      fillPercentage: 50, // filled halfway
      bagSizeValue: 1.5,
      bagSizeUnit: 'cubicFeet',
      wastePercent: 0
    });
    // 8 * 4 * (2 * 0.5) = 32 ft³
    expect(result.totalVolumeCubicFeet).toBeCloseTo(32, 2);
    // 32 / 1.5 = 21.3 -> 22
    expect(result.bagsNeeded).toBe(22);
  });

  it('3. should calculate quarts conversion properly', () => {
    const result = calculateRaisedBed({
      lengthFeet: 4,
      widthFeet: 4,
      heightInches: 12,
      bedCount: 1,
      fillPercentage: 100,
      bagSizeValue: 50, // 50 quarts
      bagSizeUnit: 'quarts',
      wastePercent: 0
    });
    // 4 * 4 * 1 = 16 ft³
    // 50 quarts / 25.714 = 1.944 ft³
    // 16 / 1.944 = 8.23 -> 9 bags
    expect(result.totalVolumeCubicFeet).toBeCloseTo(16, 2);
    expect(result.bagsNeeded).toBe(9);
  });

  it('4. should process multiple beds and waste', () => {
    const result = calculateRaisedBed({
      lengthFeet: 6,
      widthFeet: 3,
      heightInches: 12, // 18 cf per bed
      bedCount: 3,      // 54 cf total
      fillPercentage: 100,
      bagSizeValue: 2,
      bagSizeUnit: 'cubicFeet',
      wastePercent: 10  // 59.4 cf total
    });
    expect(result.totalVolumeCubicFeet).toBeCloseTo(59.4, 2);
    expect(result.totalVolumeCubicYards).toBeCloseTo(59.4 / 27, 2);
    expect(result.bagsNeeded).toBe(30); // 59.4 / 2 = 29.7 -> 30
  });

  it('5. should handle zero inputs properly', () => {
    const result = calculateRaisedBed({
      lengthFeet: 0,
      widthFeet: 4,
      heightInches: 12,
      bedCount: 1,
      fillPercentage: 100,
      bagSizeValue: 2,
      bagSizeUnit: 'cubicFeet',
      wastePercent: 0
    });
    expect(result.totalVolumeCubicFeet).toBe(0);
    expect(result.bagsNeeded).toBe(0);
    expect(result.warnings).toContain("Dimensions and bed count must be greater than zero.");
  });

  it('6. should provide false-bottom warning', () => {
    const result = calculateRaisedBed({
      lengthFeet: 8,
      widthFeet: 4,
      heightInches: 24,
      bedCount: 1,
      fillPercentage: 40,
      bagSizeValue: 2,
      bagSizeUnit: 'cubicFeet',
      wastePercent: 0
    });
    expect(result.warnings.some(w => w.includes('Hugelkultur'))).toBe(true);
  });
  
  it('7. should provide bulk warning for large projects', () => {
    const result = calculateRaisedBed({
      lengthFeet: 12,
      widthFeet: 4,
      heightInches: 24, // 2 feet
      bedCount: 2, // 12 * 4 * 2 * 2 = 192 cf = 7.1 yards
      fillPercentage: 100,
      bagSizeValue: 2,
      bagSizeUnit: 'cubicFeet',
      wastePercent: 0
    });
    expect(result.totalVolumeCubicYards).toBeGreaterThan(2);
    expect(result.warnings.some(w => w.includes('Bulk Alert'))).toBe(true);
  });

  it('8. should limit fill percentage to a max of 100', () => {
    const result = calculateRaisedBed({
      lengthFeet: 4,
      widthFeet: 4,
      heightInches: 12,
      bedCount: 1,
      fillPercentage: 150, // Should cap at 100%
      bagSizeValue: 2,
      bagSizeUnit: 'cubicFeet',
      wastePercent: 0
    });
    expect(result.totalVolumeCubicFeet).toBeCloseTo(16, 2);
  });

  it('9. should handle 0 bag size properly', () => {
    const result = calculateRaisedBed({
      lengthFeet: 4,
      widthFeet: 4,
      heightInches: 12,
      bedCount: 1,
      fillPercentage: 100,
      bagSizeValue: 0,
      bagSizeUnit: 'cubicFeet',
      wastePercent: 0
    });
    expect(result.bagsNeeded).toBe(0);
    expect(result.warnings).toContain("Bag size must be greater than zero.");
  });

  it('10. should have settling warning everywhere', () => {
    const result = calculateRaisedBed({
      lengthFeet: 4,
      widthFeet: 4,
      heightInches: 12,
      bedCount: 1,
      fillPercentage: 100,
      bagSizeValue: 2,
      bagSizeUnit: 'cubicFeet',
      wastePercent: 0
    });
    expect(result.warnings.some(w => w.includes('Settling Warning'))).toBe(true);
  });
});

import { describe, it, expect } from 'vitest';
import { calculateFooting } from './footing';

describe('calculateFooting', () => {
  it('1. should calculate correctly for standard 10ft x 12in x 12in footing', () => {
    const result = calculateFooting({
      lengthFeet: 10,
      widthInches: 12, // 1 ft
      depthInches: 12, // 1 ft
      footingCount: 1,
      wastePercent: 0,
      bagSize: 80
    });
    
    // 10 * 1 * 1 = 10 ft³
    expect(result.volumePerFootingCubicFeet).toBeCloseTo(10, 3);
    expect(result.totalVolumeCubicFeet).toBeCloseTo(10, 2);
    // 10 / 0.6 = 16.66 -> 17 bags
    expect(result.bagsNeeded).toBe(17);
  });

  it('2. should correctly sum up multiple footings', () => {
    const result = calculateFooting({
      lengthFeet: 10,
      widthInches: 12,
      depthInches: 12,
      footingCount: 4,
      wastePercent: 0,
      bagSize: 80
    });
    // 10 ft³ * 4 = 40 ft³
    expect(result.totalVolumeCubicFeet).toBeCloseTo(40, 2);
    // 40 / 0.60 = 66.66 -> 67 bags
    expect(result.bagsNeeded).toBe(67);
  });

  it('3. should correctly apply waste percentage', () => {
    const result = calculateFooting({
      lengthFeet: 10,
      widthInches: 12,
      depthInches: 12,
      footingCount: 1,
      wastePercent: 10,
      bagSize: 80
    });
    // 10 ft³ * 1.1 = 11 ft³
    expect(result.totalVolumeCubicFeet).toBeCloseTo(11, 2);
    // 11 / 0.60 = 18.33 -> 19 bags
    expect(result.bagsNeeded).toBe(19);
  });

  it('4. should handle zero inputs properly', () => {
    const result = calculateFooting({
      lengthFeet: 0,
      widthInches: 12,
      depthInches: 12,
      footingCount: 1,
      wastePercent: 0,
      bagSize: 80
    });
    expect(result.totalVolumeCubicFeet).toBe(0);
    expect(result.bagsNeeded).toBe(0);
    expect(result.warnings).toContain("All dimensions and footing count must be greater than zero.");
  });

  it('5. should calculate correctly with 60-lb bag size', () => {
    const result = calculateFooting({
      lengthFeet: 5,
      widthInches: 24, // 2 ft
      depthInches: 6,  // 0.5 ft
      footingCount: 1,
      wastePercent: 0,
      bagSize: 60
    });
    // 5 * 2 * 0.5 = 5 ft³
    expect(result.volumePerFootingCubicFeet).toBeCloseTo(5, 3);
    // 5 / 0.45 = 11.11 -> 12 bags
    expect(result.bagsNeeded).toBe(12);
  });

  it('6. should calculate correctly with 50-lb bag size', () => {
    const result = calculateFooting({
      lengthFeet: 8,
      widthInches: 18, // 1.5 ft
      depthInches: 8,  // 0.667 ft
      footingCount: 1,
      wastePercent: 5,
      bagSize: 50
    });
    // Vol = 8 * 1.5 * (8/12) = 12 * 0.6667 = 8 ft³
    expect(result.volumePerFootingCubicFeet).toBeCloseTo(8, 3);
    // 8 * 1.05 = 8.4 ft³
    expect(result.totalVolumeCubicFeet).toBeCloseTo(8.4, 2);
    // 8.4 / 0.375 = 22.4 -> 23 bags
    expect(result.bagsNeeded).toBe(23);
  });

  it('7. should show ready mix warning for large jobs', () => {
    const result = calculateFooting({
      lengthFeet: 40,
      widthInches: 24, // 2 ft
      depthInches: 12, // 1 ft
      footingCount: 1,
      wastePercent: 10,
      bagSize: 80
    });
    // 40 * 2 * 1 = 80 ft³
    // 80 * 1.1 = 88 ft³
    // Yards = 88 / 27 = 3.25 yds
    expect(result.totalVolumeCubicYards).toBeGreaterThan(1);
    const hasWarning = result.warnings.some(w => w.includes('ready-mix truck delivery'));
    expect(hasWarning).toBe(true);
  });

  it('8. should correctly calculate yards', () => {
    const result = calculateFooting({
      lengthFeet: 27,
      widthInches: 12, // 1 ft
      depthInches: 12, // 1 ft
      footingCount: 1,
      wastePercent: 0,
      bagSize: 80
    });
    // Vol = 27 * 1 * 1 = 27 ft³ = 1 yd³
    expect(result.totalVolumeCubicYards).toBeCloseTo(1, 3);
  });

  it('9. should output structural warning', () => {
    const result = calculateFooting({
      lengthFeet: 10,
      widthInches: 12,
      depthInches: 12,
      footingCount: 1,
      wastePercent: 0,
      bagSize: 80
    });
    const hasWarning = result.warnings.some(w => w.includes('strictly controlled by local building codes'));
    expect(hasWarning).toBe(true);
  });

  it('10. should accurately process max fraction roundups with multiple footings', () => {
    const result = calculateFooting({
      lengthFeet: 3.33,
      widthInches: 14.5,
      depthInches: 8.25,
      footingCount: 6,
      wastePercent: 8,
      bagSize: 40
    });
    // Length: 3.33 ft
    // Width: 14.5 / 12 = 1.2083 ft
    // Depth: 8.25 / 12 = 0.6875 ft
    // Vol per: 3.33 * 1.2083 * 0.6875 = 2.766 ft³
    // Total vol: 6 * 2.766 = 16.596 ft³
    // With waste: 16.596 * 1.08 = 17.92 ft³
    // Bags (0.3 yld): 17.92 / 0.3 = 59.73 -> 60
    expect(result.volumePerFootingCubicFeet).toBeCloseTo(2.766, 3);
    expect(result.totalVolumeCubicFeet).toBeCloseTo(17.93, 2);
    expect(result.bagsNeeded).toBe(60);
  });
});

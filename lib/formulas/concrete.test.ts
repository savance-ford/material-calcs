import { describe, it, expect } from 'vitest';
import { calculateConcreteSlab } from './concrete';

describe('calculateConcreteSlab', () => {
  it('1. should calculate correctly for a normal 10x10 slab at 4 inches with no waste', () => {
    const result = calculateConcreteSlab({
      lengthFeet: 10,
      widthFeet: 10,
      thicknessInches: 4,
      wastePercent: 0,
    });

    // 10 * 10 * (4/12) = 33.333... ft³
    expect(result.cubicFeet).toBe(33.33);
    // 33.333 / 27 = 1.234... yd³
    expect(result.cubicYards).toBe(1.23);
    // 33.333 / 0.3 = 111.11 -> 112
    expect(result.fortyPoundBags).toBe(112);
    // 33.333 / 0.45 = 74.07 -> 75
    expect(result.sixtyPoundBags).toBe(75);
    // 33.333 / 0.6 = 55.55 -> 56
    expect(result.eightyPoundBags).toBe(56);
    // Should warn about large job because > 45 80lb bags
    expect(result.warnings.some(w => w.includes('Large job alert'))).toBe(true);
  });

  it('2. should correctly apply waste percentage', () => {
    const result = calculateConcreteSlab({
      lengthFeet: 10,
      widthFeet: 10,
      thicknessInches: 4,
      wastePercent: 10,
    });

    // 33.333... * 1.10 = 36.666... ft³
    expect(result.cubicFeet).toBe(36.67);
    // 36.666 / 27 = 1.358... yd³
    expect(result.cubicYards).toBe(1.36);
    // 36.666 / 0.3 = 122.22 -> 123
    expect(result.fortyPoundBags).toBe(123);
    // 36.666 / 0.45 = 81.48 -> 82
    expect(result.sixtyPoundBags).toBe(82);
    // 36.666 / 0.6 = 61.11 -> 62
    expect(result.eightyPoundBags).toBe(62);
  });

  it('3. should handle decimal dimensions properly', () => {
    const result = calculateConcreteSlab({
      lengthFeet: 10.5,
      widthFeet: 5.25,
      thicknessInches: 4.5,
      wastePercent: 5,
    });

    // 10.5 * 5.25 * (4.5/12) = 20.671875 ft³
    // + 5% waste = 21.70546875 ft³
    expect(result.cubicFeet).toBe(21.71);
    // 21.70546875 / 27 = 0.8039... yd³
    expect(result.cubicYards).toBe(0.80);
    // 21.70546875 / 0.3 = 72.35 -> 73
    expect(result.fortyPoundBags).toBe(73);
    // 21.70546875 / 0.45 = 48.23 -> 49
    expect(result.sixtyPoundBags).toBe(49);
    // 21.70546875 / 0.6 = 36.17 -> 37
    expect(result.eightyPoundBags).toBe(37);
  });

  it('4. should handle invalid zero input gracefully by returning zeroes', () => {
    const result = calculateConcreteSlab({
      lengthFeet: 0,
      widthFeet: 10,
      thicknessInches: 4,
      wastePercent: 5,
    });

    expect(result.cubicFeet).toBe(0);
    expect(result.cubicYards).toBe(0);
    expect(result.fortyPoundBags).toBe(0);
    expect(result.sixtyPoundBags).toBe(0);
    expect(result.eightyPoundBags).toBe(0);
    expect(result.warnings).toContain('Dimensions must be greater than zero.');
  });

  it('5. should handle negative inputs gracefully by returning zeroes', () => {
    const result = calculateConcreteSlab({
      lengthFeet: 10,
      widthFeet: -5,
      thicknessInches: 4,
      wastePercent: 0,
    });

    expect(result.cubicFeet).toBe(0);
    expect(result.cubicYards).toBe(0);
    expect(result.warnings).toContain('Dimensions must be greater than zero.');
  });

  it('6. should test a very large slab and trigger ready-mix warning', () => {
    const result = calculateConcreteSlab({
      lengthFeet: 100,
      widthFeet: 100,
      thicknessInches: 6,
      wastePercent: 10,
    });

    // 100 * 100 * (6/12) = 5000 ft³
    // + 10% waste = 5500 ft³
    expect(result.cubicFeet).toBe(5500.00);
    // 5500 / 27 = 203.703... yd³
    expect(result.cubicYards).toBe(203.70);
    
    const hasLargeJobWarning = result.warnings.some(w => 
      w.includes('ready-mix truck')
    );
    expect(hasLargeJobWarning).toBe(true);
  });

  it('7. should warn about unusually thin slabs', () => {
    const result = calculateConcreteSlab({
      lengthFeet: 5,
      widthFeet: 5,
      thicknessInches: 1.5,
      wastePercent: 0,
    });

    const hasThinWarning = result.warnings.some(w => 
      w.includes('Slabs less than 2 inches thick')
    );
    expect(hasThinWarning).toBe(true);
  });

  it('8. should warn about unusually thick slabs', () => {
    const result = calculateConcreteSlab({
      lengthFeet: 5,
      widthFeet: 5,
      thicknessInches: 10,
      wastePercent: 0,
    });

    const hasThickWarning = result.warnings.some(w => 
      w.includes('Slabs thicker than 8 inches')
    );
    expect(hasThickWarning).toBe(true);
  });

  it('9. should correctly round values to 2 decimal places', () => {
    const result = calculateConcreteSlab({
      // Values designed to hit exact 27.00 to prevent trailing decimals.
      lengthFeet: 9,
      widthFeet: 9,
      thicknessInches: 4,
      wastePercent: 0,
    });

    // 9 * 9 * (4/12) = 27 ft³
    expect(result.cubicFeet).toBe(27.00);
    // 27 / 27 = 1.00 yd³
    expect(result.cubicYards).toBe(1.00);
    // 27 / 0.6 = 45 bags exactly
    expect(result.eightyPoundBags).toBe(45);
    // No large job warning for exactly 45 bags based on function logic (> 45)
    expect(result.warnings.some(w => w.includes('Large job alert'))).toBe(false);
  });

  it('10. should always round bag counts up (Math.ceil)', () => {
    // We want a cubic footage that results in a fraction of a bag
    // 0.31 ft³ / 0.30 (40 lb bag yield) = 1.0333 bags -> should round to 2
    const result = calculateConcreteSlab({
      lengthFeet: 1,
      widthFeet: 1,
      thicknessInches: 3.72, // 3.72 / 12 = 0.31 ft³
      wastePercent: 0,
    });

    expect(result.cubicFeet).toBe(0.31);
    expect(result.fortyPoundBags).toBe(2); // 1.033 -> 2
    expect(result.sixtyPoundBags).toBe(1); // 0.31 / 0.45 = 0.68 -> 1
    expect(result.eightyPoundBags).toBe(1); // 0.31 / 0.60 = 0.51 -> 1
  });
});

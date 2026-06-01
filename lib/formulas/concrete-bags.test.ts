import { describe, it, expect } from 'vitest';
import { calculateConcreteBags } from './concrete-bags';

describe('calculateConcreteBags', () => {
  it('1. should calculate correctly from dimensions', () => {
    const result = calculateConcreteBags({
      mode: 'dimensions',
      lengthFeet: 10,
      widthFeet: 10,
      thicknessInches: 4,
      bagSize: 80,
      wastePercent: 0,
    });
    // 33.33 ft3 / 0.6 = 55.55 -> 56
    expect(result.totalCubicFeet).toBe(33.33);
    expect(result.bagsNeeded).toBe(56);
    expect(result.totalWeightLbs).toBe(56 * 80);
    expect(result.warnings.some(w => w.includes('Large job'))).toBe(true);
  });

  it('2. should calculate correctly from volume in cubic feet', () => {
    const result = calculateConcreteBags({
      mode: 'volume',
      knownVolume: 10,
      volumeUnit: 'cubicFeet',
      bagSize: 60,
      wastePercent: 10,
    });
    // 10 * 1.1 = 11 ft3
    // 11 / 0.45 = 24.44 -> 25
    expect(result.totalCubicFeet).toBe(11);
    expect(result.bagsNeeded).toBe(25);
    expect(result.totalWeightLbs).toBe(1500);
  });

  it('3. should calculate correctly from volume in cubic yards', () => {
    const result = calculateConcreteBags({
      mode: 'volume',
      knownVolume: 1,
      volumeUnit: 'cubicYards',
      bagSize: 80,
      wastePercent: 0,
    });
    // 27 ft3
    // 27 / 0.6 = 45 bags
    expect(result.totalCubicFeet).toBe(27);
    expect(result.bagsNeeded).toBe(45);
    expect(result.totalWeightLbs).toBe(3600);
  });

  it('4. should apply waste percent correctly in volume mode', () => {
    const result = calculateConcreteBags({
      mode: 'volume',
      knownVolume: 5, // cubic yards
      volumeUnit: 'cubicYards',
      bagSize: 50,
      wastePercent: 5,
    });
    // 5 * 1.05 = 5.25 yds3 -> 141.75 ft3
    // 141.75 / 0.375 = 378 bags
    expect(result.totalCubicFeet).toBe(141.75);
    expect(result.totalCubicYards).toBe(5.25);
    expect(result.bagsNeeded).toBe(378);
  });

  it('5. should handle zero inputs in dimensions gracefully', () => {
    const result = calculateConcreteBags({
      mode: 'dimensions',
      lengthFeet: 0,
      widthFeet: 10,
      thicknessInches: 4,
      bagSize: 40,
      wastePercent: 0,
    });
    expect(result.totalCubicFeet).toBe(0);
    expect(result.bagsNeeded).toBe(0);
    expect(result.warnings).toContain('Dimensions must be greater than zero.');
  });
  
  it('6. should handle zero inputs in volume gracefully', () => {
    const result = calculateConcreteBags({
      mode: 'volume',
      knownVolume: 0,
      volumeUnit: 'cubicFeet',
      bagSize: 80,
      wastePercent: 0,
    });
    expect(result.totalCubicFeet).toBe(0);
    expect(result.bagsNeeded).toBe(0);
    expect(result.warnings).toContain('Volume must be greater than zero.');
  });

  it('7. should handle missing mode parameters', () => {
    const result = calculateConcreteBags({
      mode: 'dimensions',
      // no lengthFeet
      widthFeet: 10,
      thicknessInches: 4,
      bagSize: 40,
      wastePercent: 0,
    });
    expect(result.totalCubicFeet).toBe(0);
    expect(result.warnings).toContain('Dimensions must be greater than zero.');
  });
  
  it('8. should calculate correctly with 50-lb bags', () => {
    const result = calculateConcreteBags({
      mode: 'volume',
      knownVolume: 0.375,
      volumeUnit: 'cubicFeet',
      bagSize: 50,
      wastePercent: 0,
    });
    // exactly 1 bag
    expect(result.totalCubicFeet).toBe(0.38);
    expect(result.bagsNeeded).toBe(1);
    expect(result.totalWeightLbs).toBe(50);
  });

  it('9. should correctly trigger the large job warning', () => {
    const result = calculateConcreteBags({
      mode: 'dimensions',
      lengthFeet: 12,
      widthFeet: 12,
      thicknessInches: 4,
      bagSize: 80,
      wastePercent: 0,
    });
    const hasLargeJobWarning = result.warnings.some(w => 
      w.includes('ready-mix truck delivery')
    );
    expect(hasLargeJobWarning).toBe(true);
  });

  it('10. should correctly use 40-lb bags yield', () => {
    const result = calculateConcreteBags({
      mode: 'volume',
      knownVolume: 1, // cubic yard = 27 ft3
      volumeUnit: 'cubicYards',
      bagSize: 40,
      wastePercent: 0,
    });
    // 27 / 0.3 = 90
    expect(result.bagsNeeded).toBe(90);
    expect(result.totalWeightLbs).toBe(3600);
  });
});

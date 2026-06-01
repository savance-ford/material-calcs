import { describe, it, expect } from 'vitest';
import { calculateRetainingWall } from './retaining-wall';

describe('calculateRetainingWall', () => {
  it('1. should calculate reasonably for standard wall without caps', () => {
    const result = calculateRetainingWall({
      wallLengthFeet: 20,
      wallHeightFeet: 2,
      blockLengthInches: 12,
      blockHeightInches: 4,
      wastePercent: 0,
      includeCapBlocks: false,
      baseTrenchDepthInches: 6,
      baseTrenchWidthInches: 24
    });
    // Wall area = 40. Block area = 0.3333... Total blocks = 120.
    expect(result.totalWallBlocks).toBe(120);
    expect(result.totalRows).toBe(6);
    expect(result.totalCapBlocks).toBe(0);
    // Base trench = 20 * (24/12) * (6/12) = 20 * 2 * 0.5 = 20 ft³
    expect(result.baseMaterialCubicFeet).toBe(20);
    expect(result.baseMaterialCubicYards).toBeCloseTo(0.74, 2);
  });

  it('2. should factor in waste percentage properly', () => {
    const result = calculateRetainingWall({
      wallLengthFeet: 20,
      wallHeightFeet: 2,
      blockLengthInches: 12,
      blockHeightInches: 4,
      wastePercent: 10,
      includeCapBlocks: true,
      baseTrenchDepthInches: 6,
      baseTrenchWidthInches: 24
    });
    // blocks: 120 * 1.10 = 132
    expect(result.totalWallBlocks).toBe(132);
    // caps: (20 / 1) * 1.10 = 22
    expect(result.totalCapBlocks).toBe(22);
    // base: 20 * 1.10 = 22
    expect(result.baseMaterialCubicFeet).toBeCloseTo(22, 2);
  });

  it('3. should return 0 blocks for zero length', () => {
    const result = calculateRetainingWall({
      wallLengthFeet: 0,
      wallHeightFeet: 2,
      blockLengthInches: 12,
      blockHeightInches: 4,
      wastePercent: 0,
      includeCapBlocks: true,
      baseTrenchDepthInches: 6,
      baseTrenchWidthInches: 24
    });
    expect(result.totalWallBlocks).toBe(0);
    expect(result.warnings).toContain("Wall dimensions and block dimensions must be greater than zero.");
  });

  it('4. should process fractional dimensions', () => {
    const result = calculateRetainingWall({
      wallLengthFeet: 15.5,
      wallHeightFeet: 2.5,
      blockLengthInches: 11.5,
      blockHeightInches: 3.5,
      wastePercent: 5,
      includeCapBlocks: true,
      baseTrenchDepthInches: 6,
      baseTrenchWidthInches: 20
    });
    // Wall area = 38.75
    // Block area = 0.9583 * 0.2916 = 0.2795 sq ft
    // raw = 138.63 blocks
    // * 1.05 = 145.56 -> 146
    expect(result.totalWallBlocks).toBe(146);
    expect(result.totalRows).toBe(9); // 2.5 / (3.5/12) = 8.57 -> 9
    // caps: 15.5 / (11.5/12) = 16.17
    // * 1.05 = 16.98 -> 17
    expect(result.totalCapBlocks).toBe(17);
  });

  it('5. should provide engineering warning for tall walls', () => {
    const result = calculateRetainingWall({
      wallLengthFeet: 50,
      wallHeightFeet: 4,
      blockLengthInches: 16,
      blockHeightInches: 6,
      wastePercent: 0,
      includeCapBlocks: false,
      baseTrenchDepthInches: 6,
      baseTrenchWidthInches: 24
    });
    expect(result.warnings.some(w => w.includes('Structural Warning'))).toBe(true);
  });

  it('6. should missing cap blocks correctly if toggled off', () => {
    const result = calculateRetainingWall({
      wallLengthFeet: 10,
      wallHeightFeet: 2,
      blockLengthInches: 12,
      blockHeightInches: 4,
      wastePercent: 10,
      includeCapBlocks: false,
      baseTrenchDepthInches: 6,
      baseTrenchWidthInches: 24
    });
    expect(result.totalCapBlocks).toBe(0);
  });

  it('7. should handle missing trench (zero depth or width)', () => {
    const result = calculateRetainingWall({
      wallLengthFeet: 10,
      wallHeightFeet: 2,
      blockLengthInches: 12,
      blockHeightInches: 4,
      wastePercent: 0,
      includeCapBlocks: false,
      baseTrenchDepthInches: 0,
      baseTrenchWidthInches: 24
    });
    expect(result.baseMaterialCubicFeet).toBe(0);
    expect(result.baseMaterialCubicYards).toBe(0);
  });

  it('8. should calculate large block area properly', () => {
    const result = calculateRetainingWall({
      wallLengthFeet: 20,
      wallHeightFeet: 2,
      blockLengthInches: 16,
      blockHeightInches: 8,
      wastePercent: 0,
      includeCapBlocks: false,
      baseTrenchDepthInches: 6,
      baseTrenchWidthInches: 24
    });
    // Wall area = 40
    // Block area = (16/12) * (8/12) = 1.333 * 0.666 = 0.888 sq ft
    // 40 / 0.888 = 45 blocks
    expect(result.totalWallBlocks).toBe(45);
  });

  it('9. should handle negative trench dims warning', () => {
    const result = calculateRetainingWall({
      wallLengthFeet: 10,
      wallHeightFeet: 2,
      blockLengthInches: 12,
      blockHeightInches: 4,
      wastePercent: 0,
      includeCapBlocks: false,
      baseTrenchDepthInches: -6,
      baseTrenchWidthInches: 24
    });
    expect(result.warnings).toContain("Base trench dimensions cannot be negative.");
  });

  it('10. should have standard drainage warning', () => {
    const result = calculateRetainingWall({
      wallLengthFeet: 10,
      wallHeightFeet: 1,
      blockLengthInches: 12,
      blockHeightInches: 4,
      wastePercent: 0,
      includeCapBlocks: false,
      baseTrenchDepthInches: 4,
      baseTrenchWidthInches: 12
    });
    expect(result.warnings.some(w => w.includes('Drainage Note'))).toBe(true);
  });
});

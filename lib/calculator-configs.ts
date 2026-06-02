import { CalculatorConfig } from '../types/calculator';
import { calculateConcreteSlab } from './formulas/concrete';
import { calculateConcreteBags } from './formulas/concrete-bags';
import { calculatePostHole } from './formulas/post-hole';
import { calculateSonotube } from './formulas/sonotube';
import { calculateFooting } from './formulas/footing';
import { calculateMulch } from './formulas/mulch';
import { calculateGravel } from './formulas/gravel';
import { calculateRaisedBed } from './formulas/raised-bed-soil';
import { calculatePaverBase } from './formulas/paver-base';
import { calculateRetainingWall } from './formulas/retaining-wall';

const retainingWallCalculator: CalculatorConfig = {
  id: 'retaining-wall-calculator',
  slug: 'retaining-wall-calculator',
  category: 'Hardscaping',
  title: 'Retaining Wall Block Calculator',
  shortTitle: 'Retaining Walls',
  description: 'Estimate how many blocks, cap blocks, and gravel base material you may need for small landscape retaining walls.',
  metaTitle: 'Retaining Wall Calculator - Block & Base Estimator',
  metaDescription: 'Calculate the number of blocks, caps, and base gravel needed for your retaining wall project based on wall dimensions.',
  primaryKeyword: 'retaining wall calculator',
  secondaryKeywords: ['wall block calculator', 'how many retaining wall blocks do i need', 'landscape wall calculator', 'keystone block calculator'],
  userIntent: 'User wants to calculate the quantity of masonry blocks to build a retaining wall, along with caps and base material.',
  inputs: [
    {
      id: 'wallLengthFeet',
      label: 'Wall Length',
      type: 'number',
      defaultValue: 20,
      unit: 'ft',
      min: 1
    },
    {
      id: 'wallHeightFeet',
      label: 'Wall Height (including buried course)',
      type: 'number',
      defaultValue: 2,
      unit: 'ft',
      min: 0,
      helpText: 'Remember to include the height of the buried base course (usually 1 block).'
    },
    {
      id: 'blockLengthInches',
      label: 'Block Length',
      type: 'number',
      defaultValue: 12,
      unit: 'in',
      min: 1
    },
    {
      id: 'blockHeightInches',
      label: 'Block Height',
      type: 'number',
      defaultValue: 4,
      unit: 'in',
      min: 1
    },
    {
      id: 'includeCapBlocks',
      label: 'Add Cap Blocks?',
      type: 'radio',
      defaultValue: 'yes',
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'baseTrenchWidthInches',
      label: 'Base Trench Width',
      type: 'number',
      defaultValue: 24,
      unit: 'in',
      min: 0,
      helpText: 'Usually twice the block depth from front to back.'
    },
    {
      id: 'baseTrenchDepthInches',
      label: 'Base Trench Depth (Gravel)',
      type: 'number',
      defaultValue: 6,
      unit: 'in',
      min: 0,
      helpText: 'Commonly 4 to 6 inches of compacted crushed stone base.'
    },
    {
      id: 'wastePercentage',
      label: 'Waste Factor',
      type: 'number',
      defaultValue: 10,
      unit: '%',
      min: 0,
      step: 1
    }
  ],
  outputs: [
    { id: 'totalWallBlocks', label: 'Wall Blocks', unit: 'Blocks', type: 'primary' },
    { id: 'totalCapBlocks', label: 'Cap Blocks', unit: 'Blocks', type: 'primary' },
    { id: 'totalRows', label: 'Rows / Courses', unit: 'Rows', type: 'secondary' },
    { id: 'baseMaterialCubicYards', label: 'Gravel Base Volume', unit: 'Cubic Yards', type: 'secondary' },
    { id: 'baseMaterialCubicFeet', label: 'Gravel Base Volume', unit: 'ft^3', type: 'secondary' },
    { id: 'warning', label: 'Important Note', type: 'warning' }
  ],
  calculate: (inputs) => {
    const result = calculateRetainingWall({
      wallLengthFeet: Number(inputs.wallLengthFeet) || 0,
      wallHeightFeet: Number(inputs.wallHeightFeet) || 0,
      blockLengthInches: Number(inputs.blockLengthInches) || 0,
      blockHeightInches: Number(inputs.blockHeightInches) || 0,
      wastePercent: Number(inputs.wastePercentage) || 0,
      includeCapBlocks: inputs.includeCapBlocks === 'yes',
      baseTrenchDepthInches: Number(inputs.baseTrenchDepthInches) || 0,
      baseTrenchWidthInches: Number(inputs.baseTrenchWidthInches) || 0
    });

    return {
      totalWallBlocks: result.totalWallBlocks,
      totalCapBlocks: result.totalCapBlocks,
      totalRows: result.totalRows,
      baseMaterialCubicYards: result.baseMaterialCubicYards,
      baseMaterialCubicFeet: result.baseMaterialCubicFeet,
      warning: result.warnings.join(' ')
    };
  },
  formulaExplanation: 'Wall face area = length × height. Wall block count = wall face area ÷ one block face area. Courses = wall height ÷ block height. Cap blocks = total wall length ÷ cap block length. Gravel base volume = trench length × trench width × trench depth. Waste percentages are applied to account for cutting and breakage.',
  assumptions: [
    'Calculations assume standard running bond patterns.',
    'Wall height includes the buried courses, if any. Wall blocks and caps are distinct items depending on the product line.'
  ],
  warnings: [
    'Taller retaining walls face immense lateral earth pressure. Consult a structural engineer if building higher than 3-4 feet or if the wall is load-bearing.'
  ],
  exampleCalculation: {
    inputSummary: 'A 20-ft long, 2-ft high wall using 12x4 inch blocks. Base trench is 6 inches deep and 24 inches wide. 10% waste:',
    steps: [
      'Wall area: 20 × 2 = 40 sq ft',
      'Block face area: 1 × 0.333 = 0.333 sq ft',
      'Raw wall blocks: 40 ÷ 0.333 = 120',
      'Add 10% waste: 120 × 1.10 = 132 blocks',
      'Raw cap blocks: 20 ft ÷ (12 in ÷ 12) = 20',
      'Add waste to caps: 20 × 1.10 = 22 cap blocks',
      'Base volume: 20 × (24 ÷ 12) × (6 ÷ 12) = 20 cu ft, plus 10% = 22 cu ft'
    ],
    resultSummary: 'You need 132 wall blocks, 22 cap blocks, and 22 cubic feet of crushed stone base.'
  },
  faqs: [
    {
      question: 'Do I need to bury the first row of blocks?',
      answer: 'Yes. For structural stability, the rule of thumb is to bury one inch of block for every one foot of exposed wall height, or bury one entire block course minimum.'
    },
    {
      question: 'What kind of gravel do I need for the base and backfill?',
      answer: 'For the base, use a compactable crushed stone like Class 2 aggregate or Item 4. For the backfill behind the wall, use a clean, free-draining angular stone like 3/4-inch crushed washed rock. Never backfill entirely with dirt!'
    },
    {
      question: 'Why do walls fail?',
      answer: 'Poor drainage is the #1 reason retaining walls fail. Hydrostatic pressure builds up behind the wall when water cannot escape. Always install a perforated drain pipe and clean stone backfill.'
    },
    {
      question: 'Do I need a building permit?',
      answer: 'Most municipalities require a permit and sometimes engineered drawings for any retaining wall over 3 or 4 feet in height, or any wall that supports a surcharge like a driveway or slope.'
    },
    {
      question: 'Do I need geogrid?',
      answer: 'Geogrid is a synthetic mesh laid between block layers and extending into the hillside to tie the wall and soil together into one unified mass. It is generally required on taller walls or walls with challenging soil loads.'
    }
  ],
  relatedCalculators: ['paver-base-calculator', 'gravel-calculator', 'mulch-calculator'],
  testCases: [
    { name: 'Standard Wall', inputs: { wallLengthFeet: 20, wallHeightFeet: 2, blockLengthInches: 12, blockHeightInches: 4, includeCapBlocks: 'yes', wastePercentage: 0, baseTrenchDepthInches: 6, baseTrenchWidthInches: 24 }, expectedOutputs: { totalWallBlocks: 120, totalCapBlocks: 20, baseMaterialCubicFeet: 20 } },
    { name: 'Waste Calculation', inputs: { wallLengthFeet: 20, wallHeightFeet: 2, blockLengthInches: 12, blockHeightInches: 4, includeCapBlocks: 'yes', wastePercentage: 10, baseTrenchDepthInches: 6, baseTrenchWidthInches: 24 }, expectedOutputs: { totalWallBlocks: 132, totalCapBlocks: 22, baseMaterialCubicFeet: 22 } },
    { name: 'No Caps', inputs: { wallLengthFeet: 20, wallHeightFeet: 2, blockLengthInches: 12, blockHeightInches: 4, includeCapBlocks: 'no', wastePercentage: 0, baseTrenchDepthInches: 6, baseTrenchWidthInches: 24 }, expectedOutputs: { totalCapBlocks: 0 } },
    { name: 'Zero Inputs', inputs: { wallLengthFeet: 0, wallHeightFeet: 2, blockLengthInches: 12, blockHeightInches: 4, includeCapBlocks: 'yes', wastePercentage: 0, baseTrenchDepthInches: 6, baseTrenchWidthInches: 24 }, expectedOutputs: { totalWallBlocks: 0 } }
  ]
};

const paverBaseCalculator: CalculatorConfig = {
  id: 'paver-base-calculator',
  slug: 'paver-base-calculator',
  category: 'Hardscaping',
  title: 'Paver Base Calculator',
  shortTitle: 'Paver Base',
  description: 'Estimate how much crushed stone base and bedding sand you may need for paver patios, walkways, and small hardscape projects.',
  metaTitle: 'Paver Base Calculator - Stone & Sand Estimator',
  metaDescription: 'Calculate how much crushed stone base and bedding sand you need for your paver patio or walkway. Get accurate estimates in tons and cubic yards.',
  primaryKeyword: 'paver base calculator',
  secondaryKeywords: ['patio base calculator', 'how much sand for pavers', 'paver sand calculator', 'class 2 base calculator'],
  userIntent: 'User wants to calculate the volume and tons of base rock and sand needed for a paver hardscape project.',
  inputs: [
    {
      id: 'mode',
      label: 'Area Shape',
      type: 'select',
      defaultValue: 'rectangle',
      options: [
        { label: 'Rectangular Area (L x W)', value: 'rectangle' },
        { label: 'I know the Square Footage', value: 'squareFeet' }
      ]
    },
    {
      id: 'lengthFeet',
      label: 'Length',
      type: 'number',
      defaultValue: 20,
      unit: 'ft',
      min: 0,
      showIf: (inputs) => inputs.mode === 'rectangle'
    },
    {
      id: 'widthFeet',
      label: 'Width',
      type: 'number',
      defaultValue: 10,
      unit: 'ft',
      min: 0,
      showIf: (inputs) => inputs.mode === 'rectangle'
    },
    {
      id: 'knownSquareFeet',
      label: 'Total Square Footage',
      type: 'number',
      defaultValue: 200,
      unit: 'sq ft',
      min: 0,
      showIf: (inputs) => inputs.mode === 'squareFeet'
    },
    {
      id: 'baseDepthInches',
      label: 'Base Rock Depth (e.g. Class 2)',
      type: 'number',
      defaultValue: 4,
      unit: 'in',
      min: 0,
      helpText: 'Minimum 4 inches for patios/walks; 8-10+ inches for driveways.'
    },
    {
      id: 'sandDepthInches',
      label: 'Bedding Sand Depth',
      type: 'number',
      defaultValue: 1,
      unit: 'in',
      min: 0,
      helpText: '1 inch is the industry standard for bedding sand.'
    },
    {
      id: 'wastePercentage',
      label: 'Waste & Compaction Factor',
      type: 'number',
      defaultValue: 10,
      unit: '%',
      min: 0,
      step: 1,
      helpText: 'Base rock shrinks when compacted. Add at least 10-15%.'
    },
    {
      id: 'baseDensity',
      label: 'Base Material Density',
      type: 'select',
      defaultValue: 1.4,
      options: [
        { label: 'Crushed Stone/Class 2 (~1.4 Tons/Yard)', value: 1.4 },
        { label: 'Dense Graded/Item 4 (~1.5 Tons/Yard)', value: 1.5 },
      ],
      helpText: 'Density varies by exact material and moisture.'
    },
    {
      id: 'sandDensity',
      label: 'Sand Density',
      type: 'select',
      defaultValue: 1.35,
      options: [
        { label: 'Concrete Sand (~1.35 Tons/Yard)', value: 1.35 },
        { label: 'Mason Sand (~1.30 Tons/Yard)', value: 1.3 },
      ]
    }
  ],
  outputs: [
    { id: 'baseTons', label: 'Base Rock (Tons)', unit: 'Tons', type: 'primary' },
    { id: 'sandTons', label: 'Bedding Sand (Tons)', unit: 'Tons', type: 'primary' },
    { id: 'baseCubicYards', label: 'Base Rock (Volume)', unit: 'yd^3', type: 'secondary' },
    { id: 'sandCubicYards', label: 'Bedding Sand (Volume)', unit: 'yd^3', type: 'secondary' },
    { id: 'totalAreaSqFt', label: 'Total Area', unit: 'sq ft', type: 'secondary' },
    { id: 'warning', label: 'Recommendation', type: 'warning' }
  ],
  calculate: (inputs) => {
    const result = calculatePaverBase({
      mode: inputs.mode || 'rectangle',
      lengthFeet: Number(inputs.lengthFeet) || 0,
      widthFeet: Number(inputs.widthFeet) || 0,
      knownSquareFeet: Number(inputs.knownSquareFeet) || 0,
      baseDepthInches: Number(inputs.baseDepthInches) || 0,
      sandDepthInches: Number(inputs.sandDepthInches) || 0,
      baseDensityTonsPerCy: Number(inputs.baseDensity) || 1.4,
      sandDensityTonsPerCy: Number(inputs.sandDensity) || 1.35,
      wastePercent: Number(inputs.wastePercentage) || 0
    });

    return {
      baseTons: result.baseTons,
      sandTons: result.sandTons,
      baseCubicYards: result.baseCubicYards,
      sandCubicYards: result.sandCubicYards,
      totalAreaSqFt: result.totalAreaSqFt,
      warning: result.warnings.join(' ')
    };
  },
  formulaExplanation: 'The formula calculates the volume of both the crushed stone base and the bedding sand layer independently. It converts depth to feet (inches divided by 12) and multiplies by the square footage to find cubic feet for each. After adding the waste factor, it calculates cubic yards. Finally, it multiplies cubic yards by the respective material densities (~1.4 tons for base, ~1.35 for sand) to estimate the total tonnage you should order from the quarry.',
  assumptions: [
    'Subgrade is relatively flat and excavated cleanly.',
    'Material densities are estimates. Exact weight depends on the local quarry and moisture content.'
  ],
  warnings: [
    'Proper installation requires mechanical compaction of the crushed stone base in two-inch lifts (layers). Compaction reduces the physical volume, which is why a 10-15% waste/compaction buffer is essential.'
  ],
  exampleCalculation: {
    inputSummary: 'Building a 20x10 foot patio. Using 4 inches of crushed stone base, 1 inch of bedding sand, and a 10% waste/compaction factor:',
    steps: [
      'Area: 20 × 10 = 200 square feet',
      'Base volume: 200 × (4 ÷ 12) = 66.67 cubic feet',
      'Sand volume: 200 × (1 ÷ 12) = 16.67 cubic feet',
      'Add 10% waste to base: 66.67 × 1.10 = 73.34 ft^3, or 2.72 yd^3',
      'Add 10% waste to sand: 16.67 × 1.10 = 18.34 ft^3, or 0.68 yd^3',
      'Convert base to tons: 2.72 × 1.4 = 3.8 tons of base',
      'Convert sand to tons: 0.68 × 1.35 = 0.92 tons of sand'
    ],
    resultSummary: 'You need ~3.8 tons of base rock and ~0.92 tons of sand.'
  },
  faqs: [
    {
      question: 'How deep should my paver base be?',
      answer: 'Typically, pedestrian walkways and patios require a minimum of 4 to 6 inches of compacted base. Driveways subject to vehicular traffic require 8 to 12 inches (or more, depending on local freeze-thaw cycles and clay soil).'
    },
    {
      question: 'What kind of sand should I use for the bedding layer?',
      answer: 'You should use coarse, angular sand like "Concrete Sand" (also known as ASTM C33 sand). Do NOT use play sand or mason sand, as the grains are too round and fine, which will cause your pavers to shift over time or wash out.'
    },
    {
      question: 'Do I need base rock? Can I just put pavers on dirt?',
      answer: 'Laying pavers directly on dirt or just sand without a gravel base is guaranteed to fail. The pavers will settle unevenly, heave during winter, and grow weeds. A solid, compacted base is the only way to build a patio that lasts.'
    },
    {
      question: 'How do I compact the base?',
      answer: 'For anything larger than a small walkway, rent a vibratory plate compactor. You must lay the base rock in "lifts" of 2 to 3 inches at a time, wetting it slightly, and running the compactor over it before adding the next lift.'
    },
    {
      question: 'Should I put landscape fabric under the base?',
      answer: 'Yes. You should lay a high-quality woven geotextile fabric directly over the bare dirt subgrade, *before* adding the crushed stone base. This separation layer prevents mud from pumping up into your clean gravel base over the years.'
    }
  ],
  relatedCalculators: ['gravel-calculator', 'retaining-wall-calculator', 'concrete-slab-calculator'],
  testCases: [
    { name: 'Standard 20x10', inputs: { mode: 'rectangle', lengthFeet: 20, widthFeet: 10, baseDepthInches: 4, sandDepthInches: 1, baseDensity: 1.4, sandDensity: 1.35, wastePercentage: 0 }, expectedOutputs: { baseTons: 1.73, sandTons: 0.42 } },
    { name: 'Known Sq Ft base', inputs: { mode: 'squareFeet', knownSquareFeet: 250, baseDepthInches: 6, sandDepthInches: 1, baseDensity: 1.4, sandDensity: 1.35, wastePercentage: 10 }, expectedOutputs: { baseTons: 7.13, sandTons: 1.15 } },
    { name: 'Zero calculations', inputs: { mode: 'rectangle', lengthFeet: 0, widthFeet: 10, baseDepthInches: 4, sandDepthInches: 1, baseDensity: 1.4, sandDensity: 1.35, wastePercentage: 0 }, expectedOutputs: { baseTons: 0, sandTons: 0 } }
  ]
};

const raisedBedSoilCalculator: CalculatorConfig = {
  id: 'raised-bed-soil',
  slug: 'raised-bed-soil-calculator',
  category: 'Landscaping',
  title: 'Raised Garden Bed Soil Calculator',
  shortTitle: 'Garden Beds',
  description: 'Estimate how much potting soil or raised bed mix you may need to fill your new garden beds.',
  metaTitle: 'Raised Garden Bed Soil Calculator - Bags & Yards Estimator',
  metaDescription: 'Calculate how much soil you need to fill your raised garden beds. Get estimates in cubic yards, cubic feet, and number of bags, plus a custom DIY mix ratio.',
  primaryKeyword: 'raised garden bed soil calculator',
  secondaryKeywords: ['soil calculator', 'how much soil for raised bed', 'yards of soil calculator', 'potting soil calculator'],
  userIntent: 'User wants to calculate the volume of soil needed to fill their raised garden beds and how many bags or bulk yards to purchase.',
  inputs: [
    {
      id: 'bedCount',
      label: 'Number of Beds',
      type: 'number',
      defaultValue: 1,
      min: 1
    },
    {
      id: 'lengthFeet',
      label: 'Bed Length',
      type: 'number',
      defaultValue: 8,
      unit: 'ft',
      min: 0
    },
    {
      id: 'widthFeet',
      label: 'Bed Width',
      type: 'number',
      defaultValue: 4,
      unit: 'ft',
      min: 0
    },
    {
      id: 'heightInches',
      label: 'Bed Height / Depth',
      type: 'number',
      defaultValue: 12,
      unit: 'in',
      min: 0
    },
    {
      id: 'fillPercentage',
      label: 'Fill Percentage',
      type: 'number',
      defaultValue: 100,
      unit: '%',
      min: 1,
      max: 100,
      helpText: 'If you are using logs/branches in the bottom (Hugelkultur), lower this (e.g., 50%).'
    },
    {
      id: 'bagSizeValue',
      label: 'Soil Bag Size',
      type: 'number',
      defaultValue: 1.5,
      min: 0
    },
    {
      id: 'bagSizeUnit',
      label: 'Bag Size Unit',
      type: 'select',
      defaultValue: 'cubicFeet',
      options: [
        { label: 'Cubic Feet (cf)', value: 'cubicFeet' },
        { label: 'Dry Quarts (qt)', value: 'quarts' }
      ]
    },
    {
      id: 'wastePercentage',
      label: 'Settling / Buffer Factor',
      type: 'number',
      defaultValue: 10,
      unit: '%',
      min: 0,
      step: 1,
      helpText: 'Fluffy soil settles heavily after the first few waterings. Add 10-20% extra.'
    }
  ],
  outputs: [
    { id: 'totalVolumeCubicYards', label: 'Bulk Soil Volume', unit: 'Cubic Yards', type: 'primary' },
    { id: 'bagsNeeded', label: 'Bags Required', unit: 'Bags', type: 'primary' },
    { id: 'totalVolumeCubicFeet', label: 'Total Volume', unit: 'Cubic Feet', type: 'secondary' },
    { id: 'mixTopsoilCuFt', label: 'DIY Mix: Topsoil (50%)', unit: 'ft^3', type: 'secondary' },
    { id: 'mixCompostCuFt', label: 'DIY Mix: Compost (30%)', unit: 'ft^3', type: 'secondary' },
    { id: 'mixAerationCuFt', label: 'DIY Mix: Peat/Perlite (20%)', unit: 'ft^3', type: 'secondary' },
    { id: 'warning', label: 'Important Note', type: 'warning' }
  ],
  calculate: (inputs) => {
    const result = calculateRaisedBed({
      lengthFeet: Number(inputs.lengthFeet) || 0,
      widthFeet: Number(inputs.widthFeet) || 0,
      heightInches: Number(inputs.heightInches) || 0,
      bedCount: Number(inputs.bedCount) || 1,
      fillPercentage: Number(inputs.fillPercentage) || 100,
      bagSizeValue: Number(inputs.bagSizeValue) || 1.5,
      bagSizeUnit: (inputs.bagSizeUnit || 'cubicFeet') as 'cubicFeet' | 'quarts',
      wastePercent: Number(inputs.wastePercentage) || 0
    });

    return {
      bagsNeeded: result.bagsNeeded,
      totalVolumeCubicYards: result.totalVolumeCubicYards,
      totalVolumeCubicFeet: result.totalVolumeCubicFeet,
      mixTopsoilCuFt: result.mixTopsoilCuFt,
      mixCompostCuFt: result.mixCompostCuFt,
      mixAerationCuFt: result.mixAerationCuFt,
      warning: result.warnings.join(' ')
    };
  },
  formulaExplanation: 'Raised bed volume = length × width × height in feet. If you are partially filling the bed, the calculator reduces the height by your fill percentage, then multiplies by the number of beds. A settling factor can be added because fresh soil often compresses over time. Cubic feet are divided by 27 to find cubic yards. For bags measured in quarts, quarts are converted to cubic feet using the standard US dry quart conversion.',
  assumptions: [
    'Beds are perfectly rectangular.',
    'Assumes standard US dry quart conversion for soil potting bags (1 cubic foot = ~25.7 dry quarts).'
  ],
  warnings: [
    'Soil inevitably settles over time. Always overbuy or plan to top-dress again in the fall.'
  ],
  exampleCalculation: {
    inputSummary: 'Filling an 8 ft by 4 ft raised bed that is 12 inches tall, 100% full. Using 1.5 cubic foot bags and 10% for settling:',
    steps: [
      'Convert height to feet: 12 inches = 1 foot',
      'Base volume: 8 × 4 × 1 = 32 cubic feet',
      'Add 10% settling factor: 32 × 1.10 = 35.2 cubic feet',
      'Convert to yards: 35.2 ÷ 27 ≈ 1.3 cubic yards',
      'Calculate bags: 35.2 ÷ 1.5 = 23.4 bags',
      'Round up to nearest whole bag: 24 bags needed.'
    ],
    resultSummary: 'You need 24 (1.5 cu ft) bags or approx 1.3 bulk cubic yards.'
  },
  faqs: [
    {
      question: 'Can I use regular garden topsoil in my raised bed?',
      answer: 'Standard heavy topsoil by itself is usually too dense for a raised bed. It will compact and resist water drainage. You should amend it. A popular standard mix is 50% topsoil, 30% organic compost, and 20% aeration materials (like peat moss, coconut coir, vermiculite, or perlite).'
    },
    {
      question: 'What is Hugelkultur?',
      answer: 'Hugelkultur is a raised bed filling method where you place large decaying logs, branches, and organic yard waste at the bottom of a deep raised bed, and only put 6-12 (inches) of quality soil on top. It saves a tremendous amount of money on soil and holds water well, but causes significant soil sinking in the first two years.'
    },
    {
      question: 'How do I convert quarts of potting soil to cubic feet?',
      answer: 'Potting soil in the United States is legally measured in "dry quarts". There are approximately 25.714 dry quarts in a cubic foot. So a large 50-quart bag of soil is just shy of 2 cubic feet (1.94 cu ft) while a 32-quart bag is about 1.25 cubic feet.'
    },
    {
      question: 'Should I buy my soil in bags or by the truckload (bulk)?',
      answer: 'If you need more than 2 cubic yards of soil (e.g., more than fifty 1.5 cu-ft bags), buying bulk soil from a local landscape supplier is almost always cheaper. They will dump a load of special "raised bed mix" (often a 50/50 loam & compost blend) in your driveway.'
    },
    {
      question: 'Why did my soil level drop so much after a few months?',
      answer: 'New potting soil and compost are fluffy and full of air. As you water the plants and gravity takes hold, the soil mechanically compacts. Furthermore, the organic matter inside the soil actively decomposes, physically vanishing into thin air (and into your plants). This is completely normal; just top it off!'
    }
  ],
  relatedCalculators: ['mulch-calculator', 'gravel-calculator', 'paver-base-calculator'],
  testCases: [
    { name: 'Standard 8x4x1 bed', inputs: { bedCount: 1, lengthFeet: 8, widthFeet: 4, heightInches: 12, fillPercentage: 100, bagSizeValue: 1.5, bagSizeUnit: 'cubicFeet', wastePercentage: 0 }, expectedOutputs: { bagsNeeded: 22, totalVolumeCubicYards: 1.19 } },
    { name: 'Hugelkultur 50% fill', inputs: { bedCount: 1, lengthFeet: 8, widthFeet: 4, heightInches: 24, fillPercentage: 50, bagSizeValue: 2, bagSizeUnit: 'cubicFeet', wastePercentage: 0 }, expectedOutputs: { bagsNeeded: 16 } },
    { name: 'Quarts conversion', inputs: { bedCount: 1, lengthFeet: 4, widthFeet: 4, heightInches: 12, fillPercentage: 100, bagSizeValue: 50, bagSizeUnit: 'quarts', wastePercentage: 0 }, expectedOutputs: { bagsNeeded: 9 } },
    { name: 'Multiple beds with waste', inputs: { bedCount: 3, lengthFeet: 6, widthFeet: 3, heightInches: 12, fillPercentage: 100, bagSizeValue: 2, bagSizeUnit: 'cubicFeet', wastePercentage: 10 }, expectedOutputs: { bagsNeeded: 30, totalVolumeCubicFeet: 59.4 } },
    { name: 'Zero calculations', inputs: { bedCount: 1, lengthFeet: 0, widthFeet: 4, heightInches: 12, fillPercentage: 100, bagSizeValue: 1.5, bagSizeUnit: 'cubicFeet', wastePercentage: 0 }, expectedOutputs: { bagsNeeded: 0 } }
  ]
};

const gravelCalculator: CalculatorConfig = {
  id: 'gravel-calculator',
  slug: 'gravel-calculator',
  category: 'Landscaping',
  title: 'Gravel Calculator',
  shortTitle: 'Gravel',
  description: 'Estimate how much gravel, crushed stone, or sand you may need for driveways, paths, patios, and drainage areas based on your dimensions and material type.',
  metaTitle: 'Gravel Calculator - Tons & Cubic Yards Estimator',
  metaDescription: 'Calculate how much gravel, crushed stone, pea gravel, or sand you need for your landscaping or driveway project. Get accurate estimates in tons and cubic yards.',
  primaryKeyword: 'gravel calculator',
  secondaryKeywords: ['how much gravel do i need', 'crushed stone calculator', 'pea gravel calculator', 'tons of gravel calculator'],
  userIntent: 'User wants to calculate the volume and tons of gravel or stone needed for a landscape or hardscape area.',
  inputs: [
    {
      id: 'mode',
      label: 'Area Shape',
      type: 'select',
      defaultValue: 'rectangle',
      options: [
        { label: 'Rectangular Area (L x W)', value: 'rectangle' },
        { label: 'Circular Area', value: 'circle' },
        { label: 'I know the Square Footage', value: 'squareFeet' }
      ]
    },
    {
      id: 'lengthFeet',
      label: 'Length',
      type: 'number',
      defaultValue: 20,
      unit: 'ft',
      min: 0,
      showIf: (inputs) => inputs.mode === 'rectangle'
    },
    {
      id: 'widthFeet',
      label: 'Width',
      type: 'number',
      defaultValue: 10,
      unit: 'ft',
      min: 0,
      showIf: (inputs) => inputs.mode === 'rectangle'
    },
    {
      id: 'diameterFeet',
      label: 'Diameter',
      type: 'number',
      defaultValue: 10,
      unit: 'ft',
      min: 0,
      showIf: (inputs) => inputs.mode === 'circle'
    },
    {
      id: 'knownSquareFeet',
      label: 'Total Square Footage',
      type: 'number',
      defaultValue: 200,
      unit: 'sq ft',
      min: 0,
      showIf: (inputs) => inputs.mode === 'squareFeet'
    },
    {
      id: 'depthInches',
      label: 'Gravel Depth',
      type: 'number',
      defaultValue: 4,
      unit: 'in',
      min: 1,
      helpText: '4 inches is standard for paths and light driveways.'
    },
    {
      id: 'materialDensity',
      label: 'Material Type (Density)',
      type: 'select',
      defaultValue: 1.4,
      options: [
        { label: 'Crushed Stone/Gravel (~1.4 Tons/Yard)', value: 1.4 },
        { label: 'Pea Gravel (~1.4 Tons/Yard)', value: 1.4 },
        { label: 'River Rock (~1.5 Tons/Yard)', value: 1.5 },
        { label: 'Sand (~1.3 Tons/Yard)', value: 1.3 }
      ],
      helpText: 'Density varies by quarry and exact material.'
    },
    {
      id: 'wastePercentage',
      label: 'Waste & Compaction Factor',
      type: 'number',
      defaultValue: 10,
      unit: '%',
      min: 0,
      step: 1,
      helpText: 'Add 10-15% for waste and compaction on soft bases.'
    }
  ],
  outputs: [
    { id: 'totalTons', label: 'Estimated Tons', unit: 'Tons', type: 'primary' },
    { id: 'totalVolumeCubicYards', label: 'Bulk Volume', unit: 'Cubic Yards', type: 'primary' },
    { id: 'totalAreaSqFt', label: 'Total Area', unit: 'sq ft', type: 'secondary' },
    { id: 'totalVolumeCubicFeet', label: 'Total Volume', unit: 'ft^3', type: 'secondary' },
    { id: 'warning', label: 'Recommendation', type: 'warning' },
    { id: ' densityNote', label: 'Verification Needed', type: 'note' }
  ],
  calculate: (inputs) => {
    const result = calculateGravel({
      mode: inputs.mode || 'rectangle',
      lengthFeet: Number(inputs.lengthFeet) || 0,
      widthFeet: Number(inputs.widthFeet) || 0,
      diameterFeet: Number(inputs.diameterFeet) || 0,
      knownSquareFeet: Number(inputs.knownSquareFeet) || 0,
      depthInches: Number(inputs.depthInches) || 0,
      materialDensityTonsPerCy: Number(inputs.materialDensity) || 1.4,
      wastePercent: Number(inputs.wastePercentage) || 0
    });

    return {
      totalTons: result.totalTons,
      totalVolumeCubicYards: result.totalVolumeCubicYards,
      totalAreaSqFt: result.totalAreaSqFt,
      totalVolumeCubicFeet: result.totalVolumeCubicFeet,
      warning: result.warnings.join(' '),
      ' densityNote': 'Gravel densities are estimates. Always verify the exact pounds-per-yard with your local quarry or supplier.'
    };
  },
  formulaExplanation: 'Rectangle area = length × width. Circle area = π × radius². Volume = area × depth in feet. Cubic yards = cubic feet ÷ 27. Tons = cubic yards × material density. Density varies by supplier, material type, and moisture content.',
  assumptions: [
    'Calculations assume a relatively flat surface.',
    'Material densities are rules-of-thumb. Exact weight depends on moisture content and specific rock type.'
  ],
  warnings: [
    'Crushed stone bases (like Crusher Run) intended for vehicle traffic must be mechanically compacted, meaning you will need slightly more volume than the raw dimensions suggest.'
  ],
  exampleCalculation: {
    inputSummary: 'Filling a 20x10 foot driveway extension with 4 inches of crushed stone. Using a 10% waste/compaction factor:',
    steps: [
      'Area: 20 × 10 = 200 square feet',
      'Convert depth to feet: 4 in ÷ 12 = 0.333 ft',
      'Volume: 200 × 0.333 ≈ 66.67 cubic feet',
      'Add 10% waste: 66.67 × 1.10 = 73.34 cubic feet',
      'Convert to yards: 73.34 ÷ 27 ≈ 2.72 cubic yards',
      'Convert to tons: 2.72 × 1.4 tons per cubic yard ≈ 3.8 tons'
    ],
    resultSummary: 'You need approximately 3.8 tons (or 2.7 cubic yards) of crushed stone.'
  },
  faqs: [
    {
      question: 'How deep should I lay gravel?',
      answer: 'For a walking path, 2 to 3 inches is usually sufficient. For a driveway or patio base, a minimum of 4 inches of compacted crushed stone is recommended. Heavy vehicle traffic may require 8 inches or more.'
    },
    {
      question: 'What is the difference between crushed stone and pea gravel?',
      answer: 'Crushed stone has irregular, jagged edges that lock together when compacted, making it an excellent stable base for driveways and patios. Pea gravel consists of small, smooth, rounded river stones that do not lock together; it is better suited for decorative garden beds or top dressing.'
    },
    {
      question: 'How many tons are in a cubic yard of gravel?',
      answer: 'A standard rule of thumb is that 1 cubic yard of standard crushed gravel weighs approximately 1.4 tons (2,800 lbs). However, this can range from 1.3 to 1.5 tons depending on the specific rock type and how wet it is.'
    },
    {
      question: 'Should I put landscape fabric under gravel?',
      answer: 'Yes, it is highly recommended to lay heavy-duty woven geotextile fabric (not cheap weed barrier) under gravel driveways and paths. It prevents weeds, but more importantly, it prevents the gravel from slowly sinking into the mud below over time.'
    },
    {
      question: 'Why do I need to account for compaction?',
      answer: 'When you use a plate compactor on a base rock like "crusher run" or "item 4," the vibration forces the smaller dust and stone particles into the air gaps between the larger rocks. This shrinks the overall volume of the pile by 10-15%.'
    }
  ],
  relatedCalculators: ['mulch-calculator', 'raised-bed-soil-calculator', 'paver-base-calculator'],
  testCases: [
    { name: 'Standard 20x10', inputs: { mode: 'rectangle', lengthFeet: 20, widthFeet: 10, depthInches: 4, materialDensity: 1.4, wastePercentage: 0 }, expectedOutputs: { totalVolumeCubicYards: 2.47, totalTons: 3.46 } },
    { name: 'Circular fire pit', inputs: { mode: 'circle', diameterFeet: 12, depthInches: 2, materialDensity: 1.4, wastePercentage: 0 }, expectedOutputs: { totalVolumeCubicYards: 0.70, totalTons: 0.98 } },
    { name: 'Known Sq Ft base', inputs: { mode: 'squareFeet', knownSquareFeet: 500, depthInches: 4, materialDensity: 1.5, wastePercentage: 10 }, expectedOutputs: { totalVolumeCubicYards: 6.79, totalTons: 10.19 } },
    { name: 'Zero calculations', inputs: { mode: 'rectangle', lengthFeet: 0, widthFeet: 10, depthInches: 4, materialDensity: 1.4, wastePercentage: 0 }, expectedOutputs: { totalTons: 0 } }
  ]
};

const mulchCalculator: CalculatorConfig = {
  id: 'mulch-calculator',
  slug: 'mulch-calculator',
  category: 'Landscaping',
  title: 'Mulch Calculator',
  shortTitle: 'Mulch',
  description: 'Estimate how much mulch you may need for garden beds, landscape beds, tree rings, and paths based on your area and preferred depth.',
  metaTitle: 'Mulch Calculator - Bulk & Bags Estimator',
  metaDescription: 'Calculate how much mulch you need for your landscaping project. Get accurate estimates in cubic yards, cubic feet, and number of bags.',
  primaryKeyword: 'mulch calculator',
  secondaryKeywords: ['how much mulch do i need', 'mulch bag calculator', 'bulk mulch calculator', 'landscaping mulch calculator'],
  userIntent: 'User wants to calculate the volume of mulch needed for a landscape area and determine how many bags or bulk yards to buy.',
  inputs: [
    {
      id: 'mode',
      label: 'Area Shape',
      type: 'select',
      defaultValue: 'rectangle',
      options: [
        { label: 'Rectangular Bed (L x W)', value: 'rectangle' },
        { label: 'Circular Bed/Tree Ring', value: 'circle' },
        { label: 'I know the Square Footage', value: 'squareFeet' }
      ]
    },
    {
      id: 'lengthFeet',
      label: 'Length',
      type: 'number',
      defaultValue: 10,
      unit: 'ft',
      min: 0,
      showIf: (inputs) => inputs.mode === 'rectangle'
    },
    {
      id: 'widthFeet',
      label: 'Width',
      type: 'number',
      defaultValue: 5,
      unit: 'ft',
      min: 0,
      showIf: (inputs) => inputs.mode === 'rectangle'
    },
    {
      id: 'diameterFeet',
      label: 'Diameter',
      type: 'number',
      defaultValue: 6,
      unit: 'ft',
      min: 0,
      showIf: (inputs) => inputs.mode === 'circle'
    },
    {
      id: 'knownSquareFeet',
      label: 'Total Square Footage',
      type: 'number',
      defaultValue: 100,
      unit: 'sq ft',
      min: 0,
      showIf: (inputs) => inputs.mode === 'squareFeet'
    },
    {
      id: 'depthInches',
      label: 'Mulch Depth',
      type: 'number',
      defaultValue: 3,
      unit: 'in',
      min: 1,
      helpText: '2 to 3 inches is standard for most garden beds.'
    },
    {
      id: 'bagSizeCubicFeet',
      label: 'Bag Size',
      type: 'select',
      defaultValue: 2,
      options: [
        { label: '2 Cubic Feet (Standard)', value: 2 },
        { label: '3 Cubic Feet (Large)', value: 3 },
        { label: '1.5 Cubic Feet', value: 1.5 }
      ]
    },
    {
      id: 'wastePercentage',
      label: 'Waste Factor',
      type: 'number',
      defaultValue: 5,
      unit: '%',
      min: 0,
      step: 1,
      helpText: 'Add a small waste buffer for spillage or uneven ground.'
    }
  ],
  outputs: [
    { id: 'totalVolumeCubicYards', label: 'Bulk Mulch', unit: 'Cubic Yards', type: 'primary' },
    { id: 'bagsNeeded', label: 'Bags Required', unit: 'Bags', type: 'primary' },
    { id: 'totalAreaSqFt', label: 'Total Area', unit: 'sq ft', type: 'secondary' },
    { id: 'totalVolumeCubicFeet', label: 'Total Volume', unit: 'ft^3', type: 'secondary' },
    { id: 'warning', label: 'Recommendation', type: 'warning' }
  ],
  calculate: (inputs) => {
    const result = calculateMulch({
      mode: inputs.mode || 'rectangle',
      lengthFeet: Number(inputs.lengthFeet) || 0,
      widthFeet: Number(inputs.widthFeet) || 0,
      diameterFeet: Number(inputs.diameterFeet) || 0,
      knownSquareFeet: Number(inputs.knownSquareFeet) || 0,
      depthInches: Number(inputs.depthInches) || 0,
      bagSizeCubicFeet: Number(inputs.bagSizeCubicFeet) || 2,
      wastePercent: Number(inputs.wastePercentage) || 0
    });

    return {
      bagsNeeded: result.bagsNeeded,
      totalVolumeCubicYards: result.totalVolumeCubicYards,
      totalAreaSqFt: result.totalAreaSqFt,
      totalVolumeCubicFeet: result.totalVolumeCubicFeet,
      warning: result.warnings.join(' ')
    };
  },
  formulaExplanation: 'Rectangle area = length × width. Circle area = π × (diameter ÷ 2)². Mulch volume = area × depth in feet. Cubic yards = cubic feet ÷ 27. Bag count = required cubic feet ÷ bag size, rounded up to the next whole bag.',
  assumptions: [
    'Calculations assume a relatively flat landscape surface.',
    'Assumes standard bag labeling is accurate.'
  ],
  warnings: [
    'Always spread mulch evenly. Piling mulch directly against tree trunks (mulch volcanos) can cause rot and disease.'
  ],
  exampleCalculation: {
    inputSummary: 'Covering a 10 foot by 15 foot rectangular bed with 3 inches of mulch. Using typical 2 cubic foot bags and 5% waste:',
    steps: [
      'Area: 10 × 15 = 150 square feet',
      'Convert depth to feet: 3 in ÷ 12 = 0.25 ft',
      'Volume: 150 × 0.25 = 37.5 cubic feet',
      'Add 5% waste: 37.5 × 1.05 ≈ 39.38 cubic feet',
      'Convert to yards: 39.38 ÷ 27 ≈ 1.46 cubic yards',
      'Calculate bags using 2 cu ft bags: 39.38 ÷ 2 ≈ 19.69',
      'Round up to 20 bags.'
    ],
    resultSummary: 'You need 20 bags (or about 1.5 cubic yards) of mulch.'
  },
  faqs: [
    {
      question: 'How deep should I apply mulch?',
      answer: 'For most applications, a layer of 2 to 3 inches is ideal. If you apply less than 2 inches, weeds can easily push through and the soil will dry out quickly. If you apply more than 4 inches, you risk starving plant roots of oxygen and encouraging fungal diseases.'
    },
    {
      question: 'Should I buy bags or bulk mulch?',
      answer: 'Generally, if you need more than 2 or 3 cubic yards, buying bulk mulch and having it delivered is significantly cheaper than buying bags, and it avoids massive amounts of plastic waste. However, bags are easier to transport yourself and carry to backyards or tight spaces.'
    },
    {
      question: 'How many bags of mulch are in a cubic yard?',
      answer: 'There are 27 cubic feet in one cubic yard. If you are using standard 2 cubic foot bags, you need 13.5 bags, rounded up to 14 bags, to make one cubic yard. If you are using 3 cubic foot bags, you need 9 bags for one cubic yard.'
    },
    {
      question: 'What is a "mulch volcano" and why is it bad?',
      answer: 'A "mulch volcano" is the improper practice of piling mulch high up against the bark of a tree trunk. Trees need their root flare exposed. Piling mulch against the bark traps moisture, leading to rot, fungal disease, and rodent damage, which can ultimately kill the tree.'
    },
    {
      question: 'Does old mulch turn into soil?',
      answer: 'Yes! Organic mulches like wood chips, bark, and shredded leaves decompose over time, adding valuable organic matter and nutrients back into your soil. Because it breaks down, you will typically need to "top dress" your beds with a thin fresh layer every year or two.'
    }
  ],
  relatedCalculators: ['gravel-calculator', 'raised-bed-soil-calculator', 'paver-base-calculator'],
  testCases: [
    { name: 'Standard 10x10', inputs: { mode: 'rectangle', lengthFeet: 10, widthFeet: 10, depthInches: 3, bagSizeCubicFeet: 2, wastePercentage: 0 }, expectedOutputs: { bagsNeeded: 13, totalVolumeCubicYards: 0.93 } },
    { name: 'Tree Ring', inputs: { mode: 'circle', diameterFeet: 6, depthInches: 2, bagSizeCubicFeet: 2, wastePercentage: 0 }, expectedOutputs: { bagsNeeded: 3, totalAreaSqFt: 28.27 } },
    { name: 'Known Sq Ft', inputs: { mode: 'squareFeet', knownSquareFeet: 500, depthInches: 3, bagSizeCubicFeet: 3, wastePercentage: 5 }, expectedOutputs: { bagsNeeded: 44, totalVolumeCubicYards: 4.86 } },
    { name: 'Too shallow warning', inputs: { mode: 'rectangle', lengthFeet: 10, widthFeet: 10, depthInches: 1, bagSizeCubicFeet: 2, wastePercentage: 0 }, expectedOutputs: { bagsNeeded: 5 } },
    { name: 'Zero calculations', inputs: { mode: 'rectangle', lengthFeet: 0, widthFeet: 10, depthInches: 3, bagSizeCubicFeet: 2, wastePercentage: 0 }, expectedOutputs: { bagsNeeded: 0 } }
  ]
};

const footingCalculator: CalculatorConfig = {
  id: 'concrete-footing',
  slug: 'concrete-footing-calculator',
  category: 'Concrete',
  title: 'Concrete Footing Calculator',
  shortTitle: 'Footings',
  description: 'Estimate concrete volume for rectangular footings used under walls, small structures, posts, and foundations.',
  metaTitle: 'Concrete Footing Calculator - Volume & Bags Estimate',
  metaDescription: 'Estimate the concrete needed for rectangular footings, including total volume and estimated bags (40lb, 60lb, 80lb).',
  primaryKeyword: 'concrete footing calculator',
  secondaryKeywords: ['concrete calculator for footings', 'how much concrete for a footing', 'footing concrete estimate', 'rectangular footing calculator'],
  userIntent: 'User wants to calculate the concrete required to pour rectangular footings.',
  inputs: [
    {
      id: 'footingCount',
      label: 'Number of Footings',
      type: 'number',
      defaultValue: 1,
      min: 1
    },
    {
      id: 'lengthFeet',
      label: 'Footing Length',
      type: 'number',
      defaultValue: 10,
      unit: 'ft',
      min: 0,
      helpText: 'Enter length in feet. If continuous, enter total length.'
    },
    {
      id: 'widthInches',
      label: 'Footing Width',
      type: 'number',
      defaultValue: 12,
      unit: 'in',
      min: 0
    },
    {
      id: 'depthInches',
      label: 'Footing Depth / Thickness',
      type: 'number',
      defaultValue: 12,
      unit: 'in',
      min: 0
    },
    {
      id: 'bagSize',
      label: 'Bag Size',
      type: 'select',
      defaultValue: 80,
      options: [
        { label: '80-lb bag (~0.60 ft^3 yield)', value: 80 },
        { label: '60-lb bag (~0.45 ft^3 yield)', value: 60 },
        { label: '50-lb bag (~0.375 ft^3 yield)', value: 50 },
        { label: '40-lb bag (~0.30 ft^3 yield)', value: 40 }
      ]
    },
    {
      id: 'wastePercentage',
      label: 'Waste Factor',
      type: 'number',
      defaultValue: 10,
      unit: '%',
      min: 0,
      step: 1
    }
  ],
  outputs: [
    { id: 'bagsNeeded', label: 'Bags Required', unit: 'Bags', type: 'primary' },
    { id: 'volumePerFootingCubicFeet', label: 'Volume per Footing', unit: 'ft^3', type: 'secondary' },
    { id: 'totalVolumeCubicFeet', label: 'Total Volume', unit: 'ft^3', type: 'secondary' },
    { id: 'totalVolumeCubicYards', label: 'Total Volume', unit: 'yd^3', type: 'secondary' },
    { id: 'warning', label: 'Important Note', type: 'warning' },
    { id: 'yieldNote', label: 'Verification Needed', type: 'note' }
  ],
  calculate: (inputs) => {
    const result = calculateFooting({
      footingCount: Number(inputs.footingCount) || 0,
      lengthFeet: Number(inputs.lengthFeet) || 0,
      widthInches: Number(inputs.widthInches) || 0,
      depthInches: Number(inputs.depthInches) || 0,
      bagSize: Number(inputs.bagSize) as 40 | 50 | 60 | 80,
      wastePercent: Number(inputs.wastePercentage) || 0
    });

    return {
      bagsNeeded: result.bagsNeeded,
      volumePerFootingCubicFeet: result.volumePerFootingCubicFeet,
      totalVolumeCubicFeet: result.totalVolumeCubicFeet,
      totalVolumeCubicYards: result.totalVolumeCubicYards,
      warning: result.warnings.join(' '),
      yieldNote: 'Bag yields vary by manufacturer. Always verify the yield on the bag packaging.'
    };
  },
  formulaExplanation: 'Footing volume = length × width × depth, with inches converted to feet first. Total volume = one footing volume × number of footings. The calculator applies your waste percentage, then divides by the selected bag yield to estimate total bags.',
  assumptions: [
    'The footings are perfect rectangular prisms.',
    'Standard average concrete bag yields are used.'
  ],
  warnings: [
    'Footing dimensions are often strictly controlled by local building codes based on frost lines and structural loads.',
    'For structural projects, always consult a professional engineer or architect.'
  ],
  exampleCalculation: {
    inputSummary: 'Pouring 2 footings, each 8 feet long, 16 inches wide, and 12 inches deep. Using 80-lb bags with 10% waste:',
    steps: [
      'Convert 16 inches to feet: 16 ÷ 12 ≈ 1.33 ft',
      'Convert 12 inches to feet: 12 ÷ 12 = 1 ft',
      'Volume for one footing: 8 × 1.33 × 1 ≈ 10.66 ft^3',
      'Multiply by 2 footings: 10.66 × 2 = 21.32 ft^3',
      'Add 10% waste: 21.32 × 1.10 = 23.45 ft^3',
      'Divide by 80-lb yield: 23.45 ÷ 0.60 = 39.08 bags',
      'Round up to nearest bag: 40 bags.'
    ],
    resultSummary: 'You need 40 80-lb bags for the two footings.'
  },
  faqs: [
    {
      question: 'How deep should a concrete footing be?',
      answer: 'Footing depth depends on local building codes and the frostline. In colder climates, footings must extend below the frost line (which can be 48 inches or deeper) to prevent freezing and thawing from lifting the structure.'
    },
    {
      question: 'How wide should a footing be?',
      answer: 'As a general rule, a footing should be twice as wide as the wall or structure it supports. So, an 8-inch block wall would generally have a 16-inch wide footing.'
    },
    {
      question: 'Do I need rebar in my footings?',
      answer: 'Yes, almost all structural footings require steel rebar to provide tensile strength to the concrete and help prevent cracking. The size and spacing of rebar will be determined by your project plans or local codes.'
    },
    {
      question: 'Can I pour footings directly in a dirt trench?',
      answer: 'Often yes, a technique known as "earth-formed footings" is common if the soil is firm and cohesive enough to act as a form. However, if the soil is loose or sandy, you may need to build wooden forms.'
    },
    {
      question: 'How many bags of concrete can I comfortably mix by hand?',
      answer: 'Mixing concrete by hand is physically demanding work. Most DIYers find that anything over 30 to 45 bags (around 1 cubic yard) is better suited for a concrete delivery truck or a portable power mixer.'
    }
  ],
  relatedCalculators: ['concrete-bag-calculator', 'post-hole-concrete-calculator', 'sonotube-concrete-calculator', 'concrete-slab-calculator'],
  testCases: [
    { name: '1 standard footing', inputs: { footingCount: 1, lengthFeet: 10, widthInches: 12, depthInches: 12, bagSize: 80, wastePercentage: 0 }, expectedOutputs: { bagsNeeded: 17 } },
    { name: '4 footings with waste', inputs: { footingCount: 4, lengthFeet: 10, widthInches: 12, depthInches: 12, bagSize: 80, wastePercentage: 10 }, expectedOutputs: { bagsNeeded: 74 } },
    { name: 'Zero length', inputs: { footingCount: 1, lengthFeet: 0, widthInches: 12, depthInches: 12, bagSize: 80, wastePercentage: 0 }, expectedOutputs: { bagsNeeded: 0 } },
    { name: '60lb bag yield', inputs: { footingCount: 1, lengthFeet: 5, widthInches: 24, depthInches: 6, bagSize: 60, wastePercentage: 0 }, expectedOutputs: { bagsNeeded: 12 } },
    { name: 'Large volume truck warning', inputs: { footingCount: 1, lengthFeet: 40, widthInches: 24, depthInches: 12, bagSize: 80, wastePercentage: 0 }, expectedOutputs: { bagsNeeded: 134 } }
  ]
};

const sonotubeCalculator: CalculatorConfig = {
  id: 'sonotube-concrete',
  slug: 'sonotube-concrete-calculator',
  category: 'Concrete',
  title: 'Sonotube Concrete Calculator',
  shortTitle: 'Sonotubes',
  description: 'Estimate how many bags of concrete you may need to fill round concrete form tubes for deck piers, columns, and structural footings.',
  metaTitle: 'Sonotube Concrete Calculator - Deck Footings & Piers',
  metaDescription: 'Calculate how many bags of concrete (40lb, 60lb, 80lb) you need to fill round concrete forms and Sonotubes for your deck footings or columns.',
  primaryKeyword: 'sonotube concrete calculator',
  secondaryKeywords: ['concrete tube calculator', 'how much concrete for sonotube', 'concrete form tube calculator', 'deck footing calculator'],
  userIntent: 'User wants to calculate the concrete required to fill a certain number of cylindrical concrete forming tubes.',
  inputs: [
    {
      id: 'tubeCount',
      label: 'Number of Tubes',
      type: 'number',
      defaultValue: 1,
      min: 1
    },
    {
      id: 'diameterInches',
      label: 'Tube Diameter',
      type: 'number',
      defaultValue: 8,
      unit: 'in',
      min: 1
    },
    {
      id: 'height',
      label: 'Tube Height / Depth',
      type: 'number',
      defaultValue: 4,
      min: 0,
      helpText: 'Enter the total length of the tube that will receive concrete.'
    },
    {
      id: 'heightUnit',
      label: 'Height Unit',
      type: 'select',
      defaultValue: 'feet',
      options: [
        { label: 'Feet', value: 'feet' },
        { label: 'Inches', value: 'inches' }
      ]
    },
    {
      id: 'bagSize',
      label: 'Bag Size',
      type: 'select',
      defaultValue: 80,
      options: [
        { label: '80-lb bag (~0.60 ft^3 yield)', value: 80 },
        { label: '60-lb bag (~0.45 ft^3 yield)', value: 60 },
        { label: '50-lb bag (~0.375 ft^3 yield)', value: 50 },
        { label: '40-lb bag (~0.30 ft^3 yield)', value: 40 }
      ]
    },
    {
      id: 'wastePercentage',
      label: 'Waste Factor',
      type: 'number',
      defaultValue: 5,
      unit: '%',
      min: 0,
      step: 1,
      helpText: 'Since forms are contained, waste can be lower (5%). Add more if hand-mixing causes spills.'
    }
  ],
  outputs: [
    { id: 'bagsNeeded', label: 'Bags Required', unit: 'Bags', type: 'primary' },
    { id: 'volumePerTubeCubicFeet', label: 'Volume per Tube', unit: 'ft^3', type: 'secondary' },
    { id: 'totalVolumeCubicFeet', label: 'Total Volume', unit: 'ft^3', type: 'secondary' },
    { id: 'totalVolumeCubicYards', label: 'Total Volume', unit: 'yd^3', type: 'secondary' },
    { id: 'warning', label: 'Important Note', type: 'warning' },
    { id: 'yieldNote', label: 'Verification Needed', type: 'note' }
  ],
  calculate: (inputs) => {
    const result = calculateSonotube({
      tubeCount: Number(inputs.tubeCount) || 0,
      diameterInches: Number(inputs.diameterInches) || 0,
      height: Number(inputs.height) || 0,
      heightUnit: (inputs.heightUnit || 'feet') as ('feet' | 'inches'),
      bagSize: Number(inputs.bagSize) as 40 | 50 | 60 | 80,
      wastePercent: Number(inputs.wastePercentage) || 0
    });

    return {
      bagsNeeded: result.bagsNeeded,
      volumePerTubeCubicFeet: result.volumePerTubeCubicFeet,
      totalVolumeCubicFeet: result.totalVolumeCubicFeet,
      totalVolumeCubicYards: result.totalVolumeCubicYards,
      warning: result.warnings.join(' '),
      yieldNote: 'Bag yields vary by manufacturer. Always verify the yield on the bag packaging.'
    };
  },
  formulaExplanation: 'Tube radius in feet = diameter ÷ 2 ÷ 12. Cylinder volume = π × radius² × height. Total volume = one tube volume × number of tubes. The calculator applies your waste factor, then divides by the selected bag yield to estimate total bags.',
  assumptions: [
    'The concrete form tube expands minimally when wet (bulging can slightly increase required concrete).',
    'Standard industry average yields are used for bag sizing.'
  ],
  warnings: [
    'This calculator is for volumetric estimates only, not structural engineering.',
    'Always set structural footings below the local frost line and size the base (belled footing or Bigfoot system) according to local soil load-bearing capacity.'
  ],
  exampleCalculation: {
    inputSummary: 'Filling two 10-inch diameter tubes that are each 4 feet deep. Using 80-lb bags and 5% waste:',
    steps: [
      'Convert diameter to radius in feet: 10 ÷ 2 ÷ 12 ≈ 0.4167 ft',
      'Volume of one cylinder: π × 0.4167² × 4 ≈ 2.181 ft^3',
      'Multiply by 2 tubes: 2.181 × 2 = 4.363 ft^3',
      'Add 5% waste: 4.363 × 1.05 ≈ 4.58 ft^3',
      'Divide by 80-lb yield: 4.58 ÷ 0.60 = 7.63 bags',
      'Round up to nearest whole bag = 8 bags.'
    ],
    resultSummary: 'You need 8 80-lb bags for the two tubes.'
  },
  faqs: [
    {
      question: 'How many bags of concrete for an 8-inch sonotube?',
      answer: 'An 8-inch sonotube requires roughly 0.35 cubic feet of concrete per linear foot. That means a 4-foot deep 8-inch tube needs about 1.4 cubic feet of concrete, which is just over two 80-lb bags, or three 60-lb bags, without counting waste.'
    },
    {
      question: 'How many bags of concrete for a 12-inch sonotube?',
      answer: 'A 12-inch tube requires 0.785 cubic feet of concrete per linear foot. A 4-foot deep 12-inch tube requires 3.14 cubic feet of concrete, which translates to about six 80-lb bags (rounding up and accounting for a small waste factor).'
    },
    {
      question: 'Do I need a flared footing at the bottom of the tube?',
      answer: 'Many building codes require a flared footing (like a Bigfoot system or hand-dug bell) for load-bearing decks, especially in soft soil. This calculator only estimates the straight cylindrical tube section. Any flared base will require extra concrete.'
    },
    {
      question: 'Can I leave the cardboard tube in the ground?',
      answer: 'Yes, the below-grade portion of a cardboard concrete form is usually left in the dirt where it safely degrades over time. The above-grade portion should be stripped off once the concrete cures to improve appearance and prevent moisture wicking against any wood posts.'
    },
    {
      question: 'How do I keep the tubes from floating up?',
      answer: 'Wet concrete is dense and fluid. If water pools in the hole, or if you pour too quickly, cardboard tubes can occasionally "float" upward. Backfilling a little dirt around the exterior base before pouring, or screwing a wooden stake to the side of the tube and driving it into the earth, secures it.'
    }
  ],
  relatedCalculators: ['post-hole-concrete-calculator', 'concrete-footing-calculator', 'concrete-bag-calculator'],
  testCases: [
    { name: '1 standard tube', inputs: { tubeCount: 1, diameterInches: 8, height: 4, heightUnit: 'feet', wastePercentage: 0, bagSize: 80 }, expectedOutputs: { bagsNeeded: 3 } },
    { name: '10 standard tubes', inputs: { tubeCount: 10, diameterInches: 8, height: 4, heightUnit: 'feet', wastePercentage: 0, bagSize: 80 }, expectedOutputs: { bagsNeeded: 24 } },
    { name: '10 tubes with 10% waste', inputs: { tubeCount: 10, diameterInches: 8, height: 4, heightUnit: 'feet', wastePercentage: 10, bagSize: 80 }, expectedOutputs: { bagsNeeded: 26 } },
    { name: 'Invalid zero dimensions', inputs: { tubeCount: 0, diameterInches: 8, height: 4, heightUnit: 'feet', wastePercentage: 0, bagSize: 80 }, expectedOutputs: { bagsNeeded: 0 } },
    { name: 'Inches calculations', inputs: { tubeCount: 1, diameterInches: 12, height: 48, heightUnit: 'inches', wastePercentage: 0, bagSize: 60 }, expectedOutputs: { bagsNeeded: 7 } }
  ]
};

const postHoleCalculator: CalculatorConfig = {
  id: 'post-hole-concrete',
  slug: 'post-hole-concrete-calculator',
  category: 'Concrete',
  title: 'Post Hole Concrete Calculator',
  shortTitle: 'Post Holes',
  description: 'Estimate how much concrete you may need for setting fence posts, deck footings, and mailbox posts. Calculates volume per hole while subtracting the space taken up by the post itself.',
  metaTitle: 'Post Hole Concrete Calculator - Fence & Deck Posts',
  metaDescription: 'Calculate how many bags of concrete you need for fence posts and deck footings. Automatically subtracts post volume for accurate estimates.',
  primaryKeyword: 'post hole concrete calculator',
  secondaryKeywords: ['fence post concrete calculator', 'how much concrete for a fence post', 'concrete per post hole', 'deck footing concrete calculator'],
  userIntent: 'User wants to calculate the concrete required to set a specific number of posts in holes.',
  inputs: [
    {
      id: 'postCount',
      label: 'Number of Posts',
      type: 'number',
      defaultValue: 1,
      min: 1
    },
    {
      id: 'holeDiameter',
      label: 'Hole Diameter',
      type: 'number',
      defaultValue: 8,
      unit: 'in',
      min: 1,
      helpText: 'Typical rule of thumb is hole diameter = 3x post width'
    },
    {
      id: 'holeDepth',
      label: 'Hole Depth',
      type: 'number',
      defaultValue: 24,
      unit: 'in',
      min: 1,
      helpText: 'Check local building codes for frost line requirements'
    },
    {
      id: 'postShape',
      label: 'Post Shape',
      type: 'select',
      defaultValue: 'square',
      options: [
        { label: 'Square (e.g., 4x4, 6x6)', value: 'square' },
        { label: 'Round (Pipe or Log)', value: 'round' }
      ]
    },
    {
      id: 'postWidth',
      label: 'Post Width / Diameter',
      type: 'number',
      defaultValue: 3.5,
      unit: 'in',
      min: 0,
      helpText: 'Note: A standard "4x4" lumber post is actually 3.5" x 3.5".'
    },
    {
      id: 'bagSize',
      label: 'Bag Size',
      type: 'select',
      defaultValue: 80,
      options: [
        { label: '80-lb bag (~0.60 ft^3 yield)', value: 80 },
        { label: '60-lb bag (~0.45 ft^3 yield)', value: 60 },
        { label: '50-lb bag (~0.375 ft^3 yield)', value: 50 },
        { label: '40-lb bag (~0.30 ft^3 yield)', value: 40 }
      ]
    },
    {
      id: 'wastePercentage',
      label: 'Waste Factor',
      type: 'number',
      defaultValue: 10,
      unit: '%',
      min: 0,
      step: 1
    }
  ],
  outputs: [
    { id: 'bagsNeeded', label: 'Bags Required', unit: 'Bags', type: 'primary' },
    { id: 'volumePerHoleCubicFeet', label: 'Concrete per Hole', unit: 'ft^3', type: 'secondary' },
    { id: 'totalVolumeCubicFeet', label: 'Total Volume', unit: 'ft^3', type: 'secondary' },
    { id: 'totalVolumeCubicYards', label: 'Total Volume', unit: 'yd^3', type: 'secondary' },
    { id: 'warning', label: 'Safety & Layout', type: 'warning' },
    { id: 'yieldNote', label: 'Verification Needed', type: 'note' }
  ],
  calculate: (inputs) => {
    const result = calculatePostHole({
      postCount: Number(inputs.postCount) || 0,
      holeDiameterInches: Number(inputs.holeDiameter) || 0,
      holeDepthInches: Number(inputs.holeDepth) || 0,
      postShape: (inputs.postShape || 'square') as ('square' | 'round'),
      postWidthInches: Number(inputs.postWidth) || 0,
      bagSize: Number(inputs.bagSize) as 40 | 50 | 60 | 80,
      wastePercent: Number(inputs.wastePercentage) || 0
    });

    return {
      bagsNeeded: result.bagsNeeded,
      volumePerHoleCubicFeet: result.volumePerHoleCubicFeet,
      totalVolumeCubicFeet: result.totalVolumeCubicFeet,
      totalVolumeCubicYards: result.totalVolumeCubicYards,
      warning: result.warnings.join(' '),
      yieldNote: 'Bag yields vary by manufacturer. Always verify the yield on the bag packaging.'
    };
  },
  formulaExplanation: 'Hole volume = π × radius² × depth. Post volume = post width × post width × buried depth. Concrete per hole = hole volume minus post volume. The calculator multiplies by the number of holes, applies your waste factor, and divides by the selected bag yield.',
  assumptions: [
    'The post is embedded all the way to the bottom of the hole.',
    'The hole is a perfect cylinder (in reality, hand-dug holes frequently taper or bell out, consuming more concrete).',
    'Standard industry average yields are used for bag sizing.'
  ],
  warnings: [
    'This calculator is for volumetric estimates only, not structural engineering.',
    'Always set posts below the local frost line to prevent seasonal heaving.'
  ],
  exampleCalculation: {
    inputSummary: 'Setting three standard 4x4 posts (which measure 3.5" x 3.5") in 8-inch diameter holes that are 24 inches deep. Using 80-lb bags and 10% waste:',
    steps: [
      'Hole volume: π × 4² × 24 ≈ 1,206.37 cubic inches',
      'Post volume: 3.5 × 3.5 × 24 = 294 cubic inches',
      'Concrete per hole: 1,206.37 - 294 = 912.37 cubic inches',
      'Convert to cubic feet: 912.37 ÷ 1728 ≈ 0.528 ft^3',
      'Multiply by 3 posts: 0.528 × 3 = 1.584 ft^3',
      'Add 10% waste: 1.584 × 1.10 = 1.742 ft^3',
      'Divide by 80-lb yield: 1.742 ÷ 0.60 = 2.90 bags',
      'Round up to nearest whole bag = 3 bags.'
    ],
    resultSummary: 'You need 3 80-lb bags for the three posts.'
  },
  faqs: [
    {
      question: 'How wide should my post hole be?',
      answer: 'A general rule of thumb for fence posts is that the hole diameter should be about three times the width of the post. So, a 4x4 post (which actually measures 3.5 inches wide) needs an approximately 10 to 11 inch hole. This gives 3+ inches of concrete thickness completely surrounding the timber.'
    },
    {
      question: 'How deep should my fence post holes be?',
      answer: 'Typically, posts should be buried at a depth equal to one-third to one-half of the above-ground height. However, the absolute most critical rule is that the bottom of the footing **must sit beneath the local frost line**, otherwise winter freezing and thawing will heave the post out of the ground.'
    },
    {
      question: 'Should the post sit in the dirt or on concrete?',
      answer: 'For wood posts, many builders recommend adding 2 to 4 inches of gravel or a small concrete footer at the very bottom of the hole before sinking the post. This keeps the wood from constantly wicked moisture directly from the earth.'
    },
    {
      question: 'Do I need to mix concrete in a wheelbarrow for posts?',
      answer: 'Not always. If you are using "fast-setting" concrete mix (often sold in red bags), you can actually pour the dry mix directly around the braced post in the hole, and simply pour water over it according to the bag directions. Standard concrete mixes, however, should be properly pre-mixed with water.'
    },
    {
      question: 'Why subtract the post volume?',
      answer: 'Because the post takes up space! If you only calculated the volume of the 12-inch cylinder hole, you would vastly overbuy concrete. An 8-inch hole, 24-inches deep, holds about 0.70 cubic feet. But a 4x4 post takes up roughly 0.17 cubic feet of that space, lowering the actual concrete demand.'
    }
  ],
  relatedCalculators: ['concrete-bag-calculator', 'sonotube-concrete-calculator', 'concrete-footing-calculator', 'concrete-slab-calculator'],
  testCases: [
    { name: '1 standard hole', inputs: { postCount: 1, holeDiameter: 8, holeDepth: 24, postShape: 'square', postWidth: 3.5, wastePercentage: 0, bagSize: 80 }, expectedOutputs: { bagsNeeded: 1 } },
    { name: '10 standard holes', inputs: { postCount: 10, holeDiameter: 8, holeDepth: 24, postShape: 'square', postWidth: 3.5, wastePercentage: 0, bagSize: 80 }, expectedOutputs: { bagsNeeded: 9 } },
    { name: '10 holes with 10% waste', inputs: { postCount: 10, holeDiameter: 8, holeDepth: 24, postShape: 'square', postWidth: 3.5, wastePercentage: 10, bagSize: 80 }, expectedOutputs: { bagsNeeded: 10 } },
    { name: 'Invalid zero dimensions', inputs: { postCount: 0, holeDiameter: 8, holeDepth: 24, postShape: 'square', postWidth: 3.5, wastePercentage: 0, bagSize: 80 }, expectedOutputs: { bagsNeeded: 0 } },
    { name: 'Round post calculation', inputs: { postCount: 1, holeDiameter: 10, holeDepth: 36, postShape: 'round', postWidth: 4, wastePercentage: 0, bagSize: 60 }, expectedOutputs: { bagsNeeded: 4 } }
  ]
};

const concreteBagsCalculator: CalculatorConfig = {
    id: 'concrete-bags',
    slug: 'concrete-bag-calculator',
    category: 'Concrete',
    title: 'Concrete Bag Calculator',
    shortTitle: 'Concrete Bags',
    description: 'Estimate how many bags of concrete you may need for your project. Enter your project dimensions or a known volume, and select your bag size (40-lb, 50-lb, 60-lb, or 80-lb).',
    metaTitle: 'Concrete Bag Calculator - How Many Bags Do I Need?',
    metaDescription: 'Estimate how many 80lb, 60lb, 50lb, or 40lb bags of concrete you may need for your project. Fast, free DIY material calculator.',
    primaryKeyword: 'concrete bag calculator',
    secondaryKeywords: ['how many bags of concrete do i need', '80 lb concrete bag volume', '60 lb concrete bag volume', 'concrete bags per yard'],
    userIntent: 'User wants to know the number of concrete bags to buy for a project.',
    inputs: [
      {
        id: 'mode',
        label: 'Calculation Mode',
        type: 'select',
        defaultValue: 'dimensions',
        options: [
          { label: 'By Dimensions (Length x Width x Depth)', value: 'dimensions' },
          { label: 'By Known Volume (Cubic Feet/Yards)', value: 'volume' }
        ]
      },
      {
        id: 'length',
        label: 'Length',
        type: 'number',
        defaultValue: 10,
        unit: 'ft',
        min: 0,
        showIf: (inputs) => inputs.mode === 'dimensions'
      },
      {
        id: 'width',
        label: 'Width',
        type: 'number',
        defaultValue: 10,
        unit: 'ft',
        min: 0,
        showIf: (inputs) => inputs.mode === 'dimensions'
      },
      {
        id: 'thickness',
        label: 'Thickness / Depth',
        type: 'number',
        defaultValue: 4,
        unit: 'in',
        min: 0,
        showIf: (inputs) => inputs.mode === 'dimensions'
      },
      {
        id: 'knownVolume',
        label: 'Known Volume',
        type: 'number',
        defaultValue: 1,
        min: 0,
        showIf: (inputs) => inputs.mode === 'volume'
      },
      {
        id: 'volumeUnit',
        label: 'Volume Unit',
        type: 'select',
        defaultValue: 'cubicYards',
        options: [
          { label: 'Cubic Yards', value: 'cubicYards' },
          { label: 'Cubic Feet', value: 'cubicFeet' }
        ],
        showIf: (inputs) => inputs.mode === 'volume'
      },
      {
        id: 'bagSize',
        label: 'Bag Size',
        type: 'select',
        defaultValue: 80,
        options: [
          { label: '80-lb bag (~0.60 ft^3 yield)', value: 80 },
          { label: '60-lb bag (~0.45 ft^3 yield)', value: 60 },
          { label: '50-lb bag (~0.375 ft^3 yield)', value: 50 },
          { label: '40-lb bag (~0.30 ft^3 yield)', value: 40 }
        ]
      },
      {
        id: 'wastePercentage',
        label: 'Waste Factor',
        type: 'number',
        defaultValue: 10,
        unit: '%',
        min: 0,
        step: 1,
        helpText: '10% waste is standard for mixing loss and spill pages.'
      }
    ],
    outputs: [
      { id: 'bagsNeeded', label: 'Bags Required', unit: 'Bags', type: 'primary' },
      { id: 'totalCubicFeet', label: 'Total Volume', unit: 'Cubic Feet', type: 'secondary' },
      { id: 'totalCubicYards', label: 'Total Volume', unit: 'Cubic Yards', type: 'secondary' },
      { id: 'totalWeightLbs', label: 'Total Dry Weight', unit: 'lbs', type: 'secondary' },
      { id: 'warning', label: 'Delivery Recommendation', type: 'warning' },
      { id: 'yieldNote', label: 'Verification Needed', type: 'note' }
    ],
    calculate: (inputs) => {
      const result = calculateConcreteBags({
        mode: inputs.mode || 'dimensions',
        lengthFeet: Number(inputs.length) || 0,
        widthFeet: Number(inputs.width) || 0,
        thicknessInches: Number(inputs.thickness) || 0,
        knownVolume: Number(inputs.knownVolume) || 0,
        volumeUnit: inputs.volumeUnit || 'cubicYards',
        bagSize: Number(inputs.bagSize) as 40 | 50 | 60 | 80,
        wastePercent: Number(inputs.wastePercentage) || 0
      });

      return {
        bagsNeeded: result.bagsNeeded,
        totalCubicFeet: result.totalCubicFeet,
        totalCubicYards: result.totalCubicYards,
        totalWeightLbs: result.totalWeightLbs,
        warning: result.warnings.join(' '),
        yieldNote: 'Bag yields vary by manufacturer. Always verify the yield on the bag packaging.'
      };
    },
    formulaExplanation: 'When calculating by dimensions, volume in cubic feet = length × width × thickness in feet. To estimate bags, the calculator divides total cubic feet, including your waste factor, by the estimated yield of the selected bag size. Typical yields are 0.60 ft^3 for 80-lb, 0.45 ft^3 for 60-lb, 0.375 ft^3 for 50-lb, and 0.30 ft^3 for 40-lb bags.',
    assumptions: [
      'Calculations assume standard manufacturer bag yields. Actual yields may vary slightly by brand or mix type.',
      'If using dimension mode, we assume the subgrade form is rectangular.'
    ],
    warnings: [
      'Concrete bags are extremely heavy. Make sure your vehicle or trailer is rated for the payload (an average pallet weighs over 3,000 lbs).'
    ],
    exampleCalculation: {
      inputSummary: 'For a 5ft x 5ft AC unit pad that is 4 inches thick. Using 60-lb bags and a 10% waste factor:',
      steps: [
        'Convert 4 inches to feet: 4 ÷ 12 = 0.333 ft',
        'Base volume: 5 × 5 × 0.333 = 8.333 ft^3',
        'Add 10% waste: 8.333 × 1.10 = 9.167 ft^3',
        'Divide by bag yield: 9.167 ÷ 0.45 = 20.37 bags',
        'Round up to the nearest whole bag: 21 bags needed.'
      ],
      resultSummary: 'You need 21 60-lb bags.'
    },
    faqs: [
      {
        question: 'How many bags of concrete is in a cubic yard?',
        answer: 'Since there are 27 cubic feet in a cubic yard, you need about forty-five 80-lb bags (27 / 0.6), sixty 60-lb bags (27 / 0.45), or ninety 40-lb bags (27 / 0.3) to make one cubic yard.'
      },
      {
        question: 'How many 80-lb bags are on a pallet?',
        answer: 'A common pallet of 80-lb bags contains 42 bags, weighing about 3,360 lbs. Be sure your vehicle can handle this payload.'
      },
      {
        question: 'What is the yield of a single 60-lb bag of concrete?',
        answer: 'A standard 60-lb bag of concrete mix yields approximately 0.45 cubic feet when mixed with water.'
      },
      {
        question: 'When should I have a concrete truck deliver instead of using bags?',
        answer: 'Any project requiring more than 1 cubic yard of concrete (over 45 80-lb bags) is much easier to have delivered via a ready-mix truck. Hand mixing large quantities is labor-intensive and often risks cold joints in your project.'
      },
      {
        question: 'How do I know my true bag yield?',
        answer: 'While 0.60, 0.45, and 0.30 cubic feet are standard rules of thumb, specialized mixes like "high-yield" or lightweight concrete might produce more volume per bag. Check the back of the specific product bag for the manufacturer\'s rated yield.'
      }
    ],
    relatedCalculators: ['concrete-slab-calculator', 'concrete-footing-calculator', 'sonotube-concrete-calculator', 'post-hole-concrete-calculator'],
    testCases: [
      { name: 'Standard 80lb dimensions', inputs: { mode: 'dimensions', length: 5, width: 5, thickness: 4, wastePercentage: 0, bagSize: 80 }, expectedOutputs: { bagsNeeded: 14 } },
      { name: 'Standard 60lb dimensions', inputs: { mode: 'dimensions', length: 5, width: 5, thickness: 4, wastePercentage: 0, bagSize: 60 }, expectedOutputs: { bagsNeeded: 19 } },
      { name: 'Volume CF 80lb with waste', inputs: { mode: 'volume', knownVolume: 10, volumeUnit: 'cubicFeet', bagSize: 80, wastePercentage: 10 }, expectedOutputs: { bagsNeeded: 19 } },
      { name: 'Volume CY 40lb with waste', inputs: { mode: 'volume', knownVolume: 1, volumeUnit: 'cubicYards', bagSize: 40, wastePercentage: 5 }, expectedOutputs: { bagsNeeded: 95 } },
      { name: 'Zero dimensions', inputs: { mode: 'dimensions', length: 0, width: 5, thickness: 4, bagSize: 80, wastePercentage: 0 }, expectedOutputs: { bagsNeeded: 0 } },
      { name: 'Zero volume', inputs: { mode: 'volume', knownVolume: 0, volumeUnit: 'cubicFeet', bagSize: 80, wastePercentage: 0 }, expectedOutputs: { bagsNeeded: 0 } },
      { name: 'Large job dimension', inputs: { mode: 'dimensions', length: 20, width: 20, thickness: 4, bagSize: 80, wastePercentage: 0 }, expectedOutputs: { bagsNeeded: 223 } },
      { name: '50lb bag yield', inputs: { mode: 'volume', knownVolume: 10, volumeUnit: 'cubicFeet', bagSize: 50, wastePercentage: 0 }, expectedOutputs: { bagsNeeded: 27 } },
      { name: 'Max fraction roundup', inputs: { mode: 'volume', knownVolume: 0.61, volumeUnit: 'cubicFeet', bagSize: 80, wastePercentage: 0 }, expectedOutputs: { bagsNeeded: 2 } },
      { name: '1 cubic yard perfectly', inputs: { mode: 'volume', knownVolume: 1, volumeUnit: 'cubicYards', bagSize: 80, wastePercentage: 0 }, expectedOutputs: { bagsNeeded: 45 } }
    ]
  };

const calculatorConfigs: CalculatorConfig[] = [
  retainingWallCalculator,
  paverBaseCalculator,
  raisedBedSoilCalculator,
  gravelCalculator,
  mulchCalculator,
  footingCalculator,
  sonotubeCalculator,
  postHoleCalculator,
  concreteBagsCalculator,
  {
    id: 'concrete-slab',
    slug: 'concrete-slab-calculator',
    category: 'Concrete',
    title: 'Concrete Slab Calculator',
    shortTitle: 'Concrete Slab',
    description: 'Planning a patio, driveway, or garage floor? This concrete slab calculator helps you estimate how much concrete to order based on your measurements, whether you need cubic yards for a ready-mix truck or bag counts for hand mixing.',
    metaTitle: 'Concrete Slab Calculator - Cubic Yards & Bags | DIY Materials',
    metaDescription: 'Estimate concrete volume in cubic yards and approximate 40lb, 60lb, and 80lb premixed bag counts for your slab project.',
    primaryKeyword: 'concrete slab calculator',
    secondaryKeywords: ['concrete calculator for slab', 'how much concrete for a slab', 'concrete yards for slab', 'concrete bag calculator for slab', 'concrete patio calculator'],
    userIntent: 'User wants to know how much concrete to buy, in cubic yards or bags, for a flat rectangular pour.',
    inputs: [
      {
        id: 'length',
        label: 'Slab Length',
        type: 'number',
        defaultValue: 10,
        unit: 'ft',
        min: 0,
        placeholder: 'e.g., 10'
      },
      {
        id: 'width',
        label: 'Slab Width',
        type: 'number',
        defaultValue: 10,
        unit: 'ft',
        min: 0,
        placeholder: 'e.g., 10'
      },
      {
        id: 'thickness',
        label: 'Slab Thickness',
        type: 'number',
        defaultValue: 4,
        unit: 'in',
        min: 0,
        placeholder: 'e.g., 4',
        helpText: 'Standard patio/sidewalk is 4".'
      },
      {
        id: 'wastePercentage',
        label: 'Waste Factor',
        type: 'number',
        defaultValue: 10,
        unit: '%',
        min: 0,
        step: 1,
        helpText: '10% is recommended for uneven subgrades.'
      }
    ],
    outputs: [
      { id: 'cubicYards', label: 'Concrete Required', unit: 'Cubic Yards', type: 'primary' },
      { id: 'cubicFeet', label: 'Volume', unit: 'Cubic Feet', type: 'secondary' },
      { id: 'bags80lb', label: '80-lb Bags', unit: 'Bags', type: 'material', description: 'Assumes ~0.60 cu ft yield per bag.' },
      { id: 'bags60lb', label: '60-lb Bags', unit: 'Bags', type: 'material', description: 'Assumes ~0.45 cu ft yield per bag.' },
      { id: 'bags40lb', label: '40-lb Bags', unit: 'Bags', type: 'material', description: 'Assumes ~0.30 cu ft yield per bag.' },
      { id: 'weightWarning', label: 'Delivery Recommendation', type: 'warning' },
      { id: 'yieldNote', label: 'Bag Yield Verification required', type: 'note' }
    ],
    calculate: (inputs) => {
      const { length, width, thickness, wastePercentage } = inputs;
      const result = calculateConcreteSlab({
        lengthFeet: Number(length) || 0,
        widthFeet: Number(width) || 0,
        thicknessInches: Number(thickness) || 0,
        wastePercent: Number(wastePercentage) || 0
      });

      return {
        cubicYards: result.cubicYards,
        cubicFeet: result.cubicFeet,
        bags80lb: result.eightyPoundBags,
        bags60lb: result.sixtyPoundBags,
        bags40lb: result.fortyPoundBags,
        weightWarning: result.warnings.join(' '),
        yieldNote: 'Bag yields may vary by manufacturer. Check your specific bag to confirm it yields the assumed volume (80-lb = ~0.60 ft^3, 60-lb = ~0.45 ft^3, 40-lb = ~0.30 ft^3).'
      };
    },
    formulaExplanation: 'Slab volume in cubic feet = length × width × thickness in feet. Cubic yards = cubic feet ÷ 27. Bag counts are estimated by dividing total cubic feet by the assumed yield for each bag size, then rounding up.',
    assumptions: [
      'Subgrade is reasonably leveled and compacted.',
      'Forms are close to the dimensions specified.',
      'A waste factor accounts for spillage, uneven subgrade, and mixing loss.'
    ],
    warnings: [
      'Concrete weighs about 150 lbs per cubic foot. Ensure your vehicle can safely transport the bags.',
      'Estimates are mathematical. Ordering slightly more ensures you do not run dry during a pour.',
      'Properly compact your subgrade and use a gravel base to prevent severe cracking over time.'
    ],
    exampleCalculation: {
      inputSummary: 'For a 10ft x 10ft patio that is 4 inches thick. Using a 10% waste factor:',
      steps: [
        'Convert thickness to feet: 4 ÷ 12 = 0.333 feet',
        'Calculate cubic feet: 10 × 10 × 0.333 = 33.33 ft^3',
        'Add 10% waste: 33.33 × 1.10 = 36.67 ft^3 total',
        'Convert to cubic yards: 36.67 ÷ 27 = 1.36 yd^3',
        'Calculate 80-lb bags using 0.60 ft^3 yield: 36.67 ÷ 0.60 = 61.12, then round up to 62 bags'
      ],
      resultSummary: 'You need 1.36 cubic yards of concrete, or 62 80-lb bags.'
    },
    howToUse: `
1. **Measure Length and Width**: Measure the layout of your subgrade form. Measurements must be in feet.
2. **Measure Thickness**: The standard thickness for a patio or sidewalk is 4 inches. Enter your slab depth in inches.
3. **Set Waste Percentage**: Usually kept at 10%. Variations in bottom depth and side forms can quickly use up extra concrete.
4. **Read Output**: The calculator returns total cubic yards for a truck delivery and approximate bag counts if you are hand-mixing.
    `,
    additionalSections: [
      {
        title: 'How Much Waste Factor to Add',
        markdown: `No subgrade is magically flat. Over-digging your base or setting forms imperfectly means you will likely use more concrete than the exact mathematical volume.\n\n* **Standard pours**: Always add 10% extra. It is vastly cheaper than having a truck wait or running short mid-pour.\n* **Irregular bases (like heavy aggregate)**: Consider raising your waste to 15%.\n* **Perfectly boxed deck footings**: You can safely drop down to 5%.`
      },
      {
        title: 'Bagged Concrete vs. Ready-Mix Truck',
        markdown: `Running out of concrete while the edge is curing creates a structural "cold joint," ruining the surface.\n\n* **Use Bagged Concrete** when the job requires less than a yard. Anything under 30 bags (roughly 0.70 cubic yards) can reasonably be hand-mixed in a wheelbarrow or portable mixer.\n* **Use Ready-Mix Trucks** for anything over one cubic yard. Hand-mixing 50+ bags of concrete before it cures is physically exhausting and frequently ruins the final finish because the timing is off. A short-load fee from a ready-mix company pays for itself in saved labor and a better finish.`
      },
      {
        title: 'Common DIY Mistakes',
        markdown: `* **Forgetting the base layer**: Slabs poured straight into dirt will crack when the ground freezes and thaws. You need a compacted 4" crushed gravel base.\n* **Buying only the raw math amount**: The math assumes a perfectly flat, geometrically clean form. You will usually spill some material, and forms are rarely perfect.\n* **Underestimating the weight**: A single pallet of 80-lb bags weighs over 3,000 lbs. If your half-ton pickup tries to carry that, you'll ruin your suspension. Take two trips or get it delivered.`
      },
      {
        title: 'When to Call a Professional',
        markdown: `Pouring concrete is permanent. Consider hiring a pro if:\n\n* You are pouring a driveway for heavy RVs (which needs an engineered subbase, thickened edges, and rebar).\n* You are pouring an attached garage floor where sloping correctly away from the house structure is critical.\n* You live somewhere with severe freeze-thaw cycles and require a specialized air-entrained mix.`
      }
    ],
    faqs: [
      {
        question: 'How thick should a concrete slab be?',
        answer: 'For a patio or walkway, 4 inches is standard. For a driveway carrying passenger vehicles, 4 to 6 inches is expected. Heavy equipment or RVs generally require 6 to 8 inches of thickness with reinforcement.'
      },
      {
        question: 'Why do I need a waste factor?',
        answer: 'Subgrades are rarely perfectly flat. Variations in depth, forms bulging, and spillage during mixing mean you will almost always use more concrete than the exact mathematical volume. 10% is standard practice.'
      },
      {
        question: 'When should I order a delivery truck vs mixing bags?',
        answer: 'The general rule of thumb is that any job requiring more than 1 cubic yard (about forty-five 80-lb bags) is physically demanding and usually cheaper/faster to do with a ready-mix truck delivery.'
      },
      {
        question: 'How many 80lb bags are on a pallet?',
        answer: 'Typically, a pallet contains 42 80-lb bags (3,360 lbs total). Be sure your vehicle or trailer can handle this extreme weight before picking it up.'
      },
      {
        question: 'Do I need rebar or wire mesh?',
        answer: 'For standard 4-inch patios or walkways, wire mesh or fiber-reinforced concrete is often sufficient. If the slab will bear heavy loads or is in an area with freeze-thaw cycles, #3 or #4 rebar on chairs is highly recommended.'
      }
    ],
    relatedCalculators: [
      'concrete-bag-calculator',
      'concrete-footing-calculator',
      'sonotube-concrete-calculator',
      'post-hole-concrete-calculator',
      'paver-base-calculator'
    ],
    monetizationPlacements: ['home-depot-concrete-banner', 'local-contractor-lead-widget'],
    testCases: [
      {
        name: 'Basic 10x10x4 slab with 10% waste',
        inputs: { length: 10, width: 10, thickness: 4, wastePercentage: 10 },
        expectedOutputs: { cubicYards: 1.36, cubicFeet: 36.67, bags80lb: 62, bags60lb: 82, bags40lb: 123 },
        notes: 'Typical patio, checks standard waste application and bag ceiling.'
      },
      {
        name: 'Small 5x5 AC pad 4 inches thick with 5% waste',
        inputs: { length: 5, width: 5, thickness: 4, wastePercentage: 5 },
        expectedOutputs: { cubicYards: 0.32, cubicFeet: 8.75, bags80lb: 15, bags60lb: 20, bags40lb: 30 },
        notes: 'Checking lower bound volumes.'
      },
      {
        name: 'Large 24x24 garage 6 inches thick 10% waste',
        inputs: { length: 24, width: 24, thickness: 6, wastePercentage: 10 },
        expectedOutputs: { cubicYards: 11.73, cubicFeet: 316.80, bags80lb: 528, bags60lb: 704, bags40lb: 1056 },
        notes: 'Requires Ready-Mix warning logic.'
      },
      {
        name: 'Deep 1x1 post base 12 inches thick 0% waste',
        inputs: { length: 1, width: 1, thickness: 12, wastePercentage: 0 },
        expectedOutputs: { cubicYards: 0.04, cubicFeet: 1.00, bags80lb: 2, bags60lb: 3, bags40lb: 4 },
        notes: 'Very small precise volume, tests 0 waste boundary and basic division.'
      },
      {
        name: 'Long 10x2 walkway 4 inches thick 15% waste',
        inputs: { length: 10, width: 2, thickness: 4, wastePercentage: 15 },
        expectedOutputs: { cubicYards: 0.28, cubicFeet: 7.67, bags80lb: 13, bags60lb: 18, bags40lb: 26 },
        notes: 'Checks floating point multiplication paths.'
      }
    ]
  }
];

export const calculators: CalculatorConfig[] = calculatorConfigs.map((calculator) => ({
  reviewedDate: 'June 2026',
  ...calculator,
}));

export function getCalculatorBySlug(slug: string): CalculatorConfig | undefined {
  return calculators.find(c => c.slug === slug);
}

export function getRelatedCalculators(slugs: string[]): CalculatorConfig[] {
  return slugs
    .map((slug) => calculators.find((calculator) => calculator.slug === slug))
    .filter((calculator): calculator is CalculatorConfig => Boolean(calculator));
}

export interface GuideExample {
  title: string;
  steps: string[];
  result: string;
}

export interface GuideFaq {
  question: string;
  answer: string;
}

export interface GuideConfig {
  slug: string;
  category: 'Concrete' | 'Landscaping' | 'Hardscaping';
  title: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  h1: string;
  shortAnswer: string;
  explanation: string[];
  formula: string;
  example: GuideExample;
  mistakes: string[];
  calculatorSlug: string;
  calculatorLinkText: string;
  relatedGuideSlugs: string[];
  relatedCalculatorSlugs: string[];
  faqs: GuideFaq[];
  reviewedDate: string;
}

export const guides: GuideConfig[] = [
  {
    slug: 'how-much-concrete-do-i-need',
    category: 'Concrete',
    title: 'How Much Concrete Do I Need?',
    metaTitle: 'How Much Concrete Do I Need? Slabs, Bags & Yards',
    metaDescription: 'Learn how to estimate concrete in cubic feet, cubic yards, and bags before buying materials for a slab, footing, post hole, or small pour.',
    description: 'Estimate concrete volume in cubic feet, cubic yards, or bags before buying or quoting a pour.',
    h1: 'How Much Concrete Do I Need?',
    shortAnswer: 'To estimate concrete, multiply length x width x thickness in feet to get cubic feet, then divide by 27 for cubic yards. Add a waste factor, usually 5% to 10% for small DIY pours, and verify bag yield or ready-mix requirements before buying.',
    explanation: [
      'Concrete estimates start with volume. For a rectangular slab, pad, or footing, measure length and width in feet, then convert thickness from inches to feet.',
      'For bagged concrete, divide total cubic feet by the yield printed on the bag. For ready-mix, convert cubic feet to cubic yards. Contractors and small crews can use the same process for quick quote checks, but structural work should be verified against plans and code.',
    ],
    formula: 'Volume = length x width x thickness in feet. Cubic yards = cubic feet / 27. Bags = cubic feet / bag yield, rounded up.',
    example: {
      title: 'Example: 10 ft x 12 ft slab, 4 inches thick',
      steps: [
        'Convert 4 inches to feet: 4 / 12 = 0.333 ft',
        'Find volume: 10 x 12 x 0.333 = about 40 cubic feet',
        'Convert to cubic yards: 40 / 27 = about 1.48 cubic yards',
        'Add 10% waste: 1.48 x 1.10 = about 1.63 cubic yards',
      ],
      result: 'You would plan for about 1.6 cubic yards of concrete, then confirm with your ready-mix supplier or bag yield.',
    },
    mistakes: [
      'Forgetting to convert inches to feet before multiplying.',
      'Buying only the raw math amount with no waste factor.',
      'Using bag counts for a large pour that may be better suited for ready-mix delivery.',
      'Skipping code, reinforcement, or subbase requirements for structural work.',
    ],
    calculatorSlug: 'concrete-slab-calculator',
    calculatorLinkText: 'Use the concrete slab calculator',
    relatedGuideSlugs: ['how-much-concrete-for-10x10-slab', 'concrete-bags-vs-ready-mix', 'how-many-80lb-bags-of-concrete-in-a-yard'],
    relatedCalculatorSlugs: ['concrete-slab-calculator', 'concrete-bag-calculator', 'concrete-footing-calculator'],
    faqs: [
      {
        question: 'How do I calculate concrete for a slab?',
        answer: 'Multiply length by width by thickness in feet. Divide cubic feet by 27 to get cubic yards, then add a waste factor.',
      },
      {
        question: 'Should I order extra concrete?',
        answer: 'Usually yes. A small buffer helps account for uneven subgrade, forms, spillage, and measurement differences.',
      },
      {
        question: 'Can this replace engineering plans?',
        answer: 'No. Use it for planning quantities. Structural pours, permits, reinforcement, and code requirements should be verified professionally.',
      },
    ],
    reviewedDate: 'June 2026',
  },
  {
    slug: 'how-much-concrete-for-10x10-slab',
    category: 'Concrete',
    title: 'How Much Concrete for a 10x10 Slab?',
    metaTitle: 'How Much Concrete for a 10x10 Slab?',
    metaDescription: 'Estimate concrete for a 10x10 slab at common thicknesses, including cubic yards and bag planning notes.',
    description: 'A quick guide to concrete quantities for a common 10x10 slab.',
    h1: 'How Much Concrete for a 10x10 Slab?',
    shortAnswer: 'A 10x10 slab that is 4 inches thick needs about 33.3 cubic feet, or 1.23 cubic yards, before waste. With a 10% waste factor, plan for about 1.36 cubic yards.',
    explanation: [
      'A 10x10 slab is 100 square feet. The amount of concrete depends on thickness. Patios and walkways are often 4 inches thick, while driveways or heavier loads may need more depth and reinforcement.',
      'For a homeowner, this helps with store or delivery planning. For a contractor or small crew, it is a fast check before quoting, but final quantities should match site conditions and project specs.',
    ],
    formula: 'Cubic feet = 10 x 10 x thickness in feet. Cubic yards = cubic feet / 27.',
    example: {
      title: 'Example: 10x10 slab at 4 inches thick',
      steps: [
        'Convert thickness: 4 / 12 = 0.333 ft',
        'Calculate volume: 10 x 10 x 0.333 = 33.3 cubic feet',
        'Convert to yards: 33.3 / 27 = 1.23 cubic yards',
        'Add 10% waste: 1.23 x 1.10 = 1.36 cubic yards',
      ],
      result: 'A practical estimate is about 1.36 cubic yards for a 10x10x4 slab with waste included.',
    },
    mistakes: [
      'Assuming all 10x10 slabs use the same amount of concrete regardless of thickness.',
      'Forgetting that bag yield varies by manufacturer.',
      'Ignoring gravel base, compaction, reinforcement, or slope requirements.',
    ],
    calculatorSlug: 'concrete-slab-calculator',
    calculatorLinkText: 'Calculate your slab concrete',
    relatedGuideSlugs: ['how-much-concrete-do-i-need', 'concrete-bags-vs-ready-mix', 'how-many-80lb-bags-of-concrete-in-a-yard'],
    relatedCalculatorSlugs: ['concrete-slab-calculator', 'concrete-bag-calculator'],
    faqs: [
      {
        question: 'How many cubic yards are in a 10x10 slab?',
        answer: 'At 4 inches thick, a 10x10 slab is about 1.23 cubic yards before waste and about 1.36 cubic yards with 10% waste.',
      },
      {
        question: 'How thick should a 10x10 slab be?',
        answer: 'Many patios and walkways use 4 inches, but driveways, heavy loads, and structural uses may require more thickness and reinforcement.',
      },
    ],
    reviewedDate: 'June 2026',
  },
  {
    slug: 'how-many-80lb-bags-of-concrete-in-a-yard',
    category: 'Concrete',
    title: 'How Many 80lb Bags of Concrete in a Yard?',
    metaTitle: 'How Many 80lb Bags of Concrete in a Yard?',
    metaDescription: 'Learn the common 80lb concrete bag yield and how many bags are needed for one cubic yard of concrete.',
    description: 'Understand 80lb concrete bag yield before choosing bags or ready-mix.',
    h1: 'How Many 80lb Bags of Concrete in a Yard?',
    shortAnswer: 'One cubic yard is 27 cubic feet. If an 80lb concrete bag yields about 0.60 cubic feet, it takes about 45 bags to make one cubic yard. Always check the yield printed on your bag.',
    explanation: [
      'Bag yield varies by mix and manufacturer. The common planning assumption for an 80lb bag is about 0.60 cubic feet after mixing.',
      'Forty-five 80lb bags is heavy and labor-intensive. For bigger pours, homeowners and crews should compare bag mixing against ready-mix delivery logistics.',
    ],
    formula: 'Bags per yard = 27 cubic feet / bag yield. With 0.60 cubic feet per 80lb bag: 27 / 0.60 = 45 bags.',
    example: {
      title: 'Example: 1.5 cubic yards using 80lb bags',
      steps: [
        'Convert yards to cubic feet: 1.5 x 27 = 40.5 cubic feet',
        'Divide by 80lb bag yield: 40.5 / 0.60 = 67.5 bags',
        'Round up because partial bags are not practical: 68 bags',
      ],
      result: 'A 1.5 yard pour would take about 68 80lb bags, assuming 0.60 cubic feet per bag.',
    },
    mistakes: [
      'Using bag weight as if it were volume.',
      'Forgetting to round up to whole bags.',
      'Underestimating the weight and mixing time for dozens of bags.',
    ],
    calculatorSlug: 'concrete-bag-calculator',
    calculatorLinkText: 'Use the concrete bag calculator',
    relatedGuideSlugs: ['concrete-bags-vs-ready-mix', 'how-much-concrete-do-i-need', 'how-much-concrete-for-10x10-slab'],
    relatedCalculatorSlugs: ['concrete-bag-calculator', 'concrete-slab-calculator'],
    faqs: [
      {
        question: 'Is 45 bags always exactly one yard?',
        answer: 'It is a common estimate based on 0.60 cubic feet per bag. Check the yield printed on your specific bag.',
      },
      {
        question: 'Is a yard of concrete too much to mix by hand?',
        answer: 'For many DIYers, yes. One yard is a lot of mixing, lifting, and timing. Ready-mix may be more practical.',
      },
    ],
    reviewedDate: 'June 2026',
  },
  {
    slug: 'concrete-bags-vs-ready-mix',
    category: 'Concrete',
    title: 'Concrete Bags vs Ready-Mix',
    metaTitle: 'Concrete Bags vs Ready-Mix: Which Should You Use?',
    metaDescription: 'Compare bagged concrete and ready-mix concrete for small slabs, pads, post holes, and larger pours using volume, labor, access, and timing.',
    description: 'A practical way to decide between hand-mixing bags and ordering ready-mix.',
    h1: 'Concrete Bags vs Ready-Mix',
    shortAnswer: 'Bagged concrete works well for small pours, repairs, post holes, and pads. Ready-mix is usually more practical for larger slabs or pours where timing, consistency, and volume matter. Use volume first, then choose the method that fits the job.',
    explanation: [
      'Bagged concrete is easy to buy in small quantities and can be useful when access is tight. It also requires lifting, mixing, water control, and enough time to place the concrete before it stiffens.',
      'Ready-mix is delivered already mixed and is better suited to larger pours, but it requires access, scheduling, forms ready to go, and planning for placement.',
    ],
    formula: 'Start with volume: cubic yards = cubic feet / 27. Then compare that volume against bag counts, labor, access, and pour timing.',
    example: {
      title: 'Example: small pad versus patio',
      steps: [
        'A small 3 ft x 3 ft x 4 in pad is about 3 cubic feet before waste, which is manageable with bags.',
        'A 10 ft x 12 ft x 4 in patio is about 40 cubic feet before waste, or about 1.48 cubic yards.',
        'That larger patio can require many bags and careful timing, so ready-mix may be worth considering.',
      ],
      result: 'Use bags for small contained pours; consider ready-mix when volume, timing, or consistency becomes difficult.',
    },
    mistakes: [
      'Only comparing material quantity and ignoring labor.',
      'Starting a large bagged pour without enough help or mixing capacity.',
      'Scheduling ready-mix before forms, base, reinforcement, and access are ready.',
    ],
    calculatorSlug: 'concrete-slab-calculator',
    calculatorLinkText: 'Estimate slab yards and bag counts',
    relatedGuideSlugs: ['how-much-concrete-do-i-need', 'how-many-80lb-bags-of-concrete-in-a-yard', 'how-much-concrete-for-10x10-slab'],
    relatedCalculatorSlugs: ['concrete-slab-calculator', 'concrete-bag-calculator'],
    faqs: [
      {
        question: 'When should I stop using bags?',
        answer: 'There is no universal cutoff, but once a job needs dozens of bags, compare the labor, timing, and consistency against ready-mix delivery.',
      },
      {
        question: 'Are bag yields always the same?',
        answer: 'No. Check the product label. Specialized mixes can have different yields.',
      },
    ],
    reviewedDate: 'June 2026',
  },
  {
    slug: 'how-much-mulch-do-i-need',
    category: 'Landscaping',
    title: 'How Much Mulch Do I Need?',
    metaTitle: 'How Much Mulch Do I Need? Bags & Cubic Yards',
    metaDescription: 'Estimate mulch for garden beds, tree rings, and landscape areas using area, depth, cubic feet, cubic yards, and bag size.',
    description: 'Estimate mulch volume for beds, tree rings, and landscape projects.',
    h1: 'How Much Mulch Do I Need?',
    shortAnswer: 'Measure the bed area, choose a depth, and calculate volume. For most beds, 2 to 3 inches of mulch is common. Cubic feet = area x depth in feet, and cubic yards = cubic feet / 27.',
    explanation: [
      'Mulch is usually estimated by volume. You can calculate from a rectangle, circle, or known square footage.',
      'Homeowners can use this for store trips, while landscapers and small crews can use it as a quick check before ordering bulk mulch or planning bags.',
    ],
    formula: 'Mulch volume = square feet x depth in feet. Cubic yards = cubic feet / 27. Bags = cubic feet / bag size.',
    example: {
      title: 'Example: 150 square feet at 3 inches deep',
      steps: [
        'Convert depth: 3 / 12 = 0.25 ft',
        'Find cubic feet: 150 x 0.25 = 37.5 cubic feet',
        'Convert to yards: 37.5 / 27 = 1.39 cubic yards',
        'Using 2 cubic foot bags: 37.5 / 2 = 18.75, rounded up to 19 bags',
      ],
      result: 'Plan for about 1.4 cubic yards or 19 two-cubic-foot bags before adding any extra buffer.',
    },
    mistakes: [
      'Applying mulch too deep around plants.',
      'Piling mulch against tree trunks.',
      'Forgetting that bag sizes vary.',
      'Measuring bed width or depth too casually.',
    ],
    calculatorSlug: 'mulch-calculator',
    calculatorLinkText: 'Use the mulch calculator',
    relatedGuideSlugs: ['how-many-bags-of-mulch-in-a-yard', 'how-much-soil-for-raised-bed', 'how-much-gravel-do-i-need'],
    relatedCalculatorSlugs: ['mulch-calculator', 'raised-bed-soil-calculator', 'gravel-calculator'],
    faqs: [
      {
        question: 'How deep should mulch be?',
        answer: 'For many landscape beds, 2 to 3 inches is common. Avoid piling mulch against stems or tree trunks.',
      },
      {
        question: 'Should I buy mulch bags or bulk mulch?',
        answer: 'That depends on volume, access, storage, and cleanup. Use the estimate to compare practical options without relying on generic pricing.',
      },
    ],
    reviewedDate: 'June 2026',
  },
  {
    slug: 'how-many-bags-of-mulch-in-a-yard',
    category: 'Landscaping',
    title: 'How Many Bags of Mulch in a Yard?',
    metaTitle: 'How Many Bags of Mulch in a Cubic Yard?',
    metaDescription: 'Learn how many 2 cubic foot or 3 cubic foot bags of mulch equal one cubic yard, and how to estimate bag counts.',
    description: 'Convert bulk cubic yards of mulch into common bag counts.',
    h1: 'How Many Bags of Mulch in a Yard?',
    shortAnswer: 'One cubic yard equals 27 cubic feet. That is 13.5 two-cubic-foot bags, rounded up to 14 bags, or 9 three-cubic-foot bags.',
    explanation: [
      'Mulch bags are usually sold by volume, often 2 cubic feet or 3 cubic feet. Bulk mulch is commonly sold by the cubic yard.',
      'This conversion helps homeowners compare hauling bags with ordering bulk mulch, and helps landscape crews check quick material counts.',
    ],
    formula: 'Bags per cubic yard = 27 cubic feet / bag size in cubic feet.',
    example: {
      title: 'Example: 3 cubic yards using 2 cubic foot bags',
      steps: [
        'Convert yards to cubic feet: 3 x 27 = 81 cubic feet',
        'Divide by bag size: 81 / 2 = 40.5 bags',
        'Round up to whole bags: 41 bags',
      ],
      result: 'Three cubic yards is about 41 two-cubic-foot bags.',
    },
    mistakes: [
      'Forgetting to round up partial bags.',
      'Mixing cubic yards and cubic feet without converting.',
      'Assuming every bag at the store is the same size.',
    ],
    calculatorSlug: 'mulch-calculator',
    calculatorLinkText: 'Estimate mulch bags and yards',
    relatedGuideSlugs: ['how-much-mulch-do-i-need', 'how-much-soil-for-raised-bed', 'how-much-gravel-do-i-need'],
    relatedCalculatorSlugs: ['mulch-calculator', 'raised-bed-soil-calculator'],
    faqs: [
      {
        question: 'How many 2 cubic foot mulch bags are in a yard?',
        answer: 'One cubic yard is 27 cubic feet, so it equals 13.5 two-cubic-foot bags. Round up to 14 bags.',
      },
      {
        question: 'How many 3 cubic foot mulch bags are in a yard?',
        answer: 'One cubic yard equals 9 three-cubic-foot bags.',
      },
    ],
    reviewedDate: 'June 2026',
  },
  {
    slug: 'how-much-gravel-do-i-need',
    category: 'Landscaping',
    title: 'How Much Gravel Do I Need?',
    metaTitle: 'How Much Gravel Do I Need? Cubic Yards & Tons',
    metaDescription: 'Estimate gravel, crushed stone, or pea gravel by area, depth, cubic yards, and tons for paths, patios, and drainage areas.',
    description: 'Estimate gravel volume and tonnage for paths, patios, and drainage projects.',
    h1: 'How Much Gravel Do I Need?',
    shortAnswer: 'Measure the area and depth. Cubic feet = area x depth in feet. Cubic yards = cubic feet / 27. Tons are estimated by multiplying cubic yards by material density, which varies by supplier and moisture.',
    explanation: [
      'Gravel can be sold by cubic yard, ton, or bag. Volume is the starting point; weight depends on material type, density, moisture, and supplier measurement.',
      'DIYers can use this to plan a path or bed. Contractors and landscapers can use it for quick field checks before confirming with the supplier.',
    ],
    formula: 'Volume = area x depth. Cubic yards = cubic feet / 27. Tons = cubic yards x tons per cubic yard.',
    example: {
      title: 'Example: 200 square feet at 4 inches deep',
      steps: [
        'Convert depth: 4 / 12 = 0.333 ft',
        'Find cubic feet: 200 x 0.333 = about 66.7 cubic feet',
        'Convert to yards: 66.7 / 27 = about 2.47 cubic yards',
        'Estimate tons using 1.4 tons per cubic yard: 2.47 x 1.4 = about 3.46 tons',
      ],
      result: 'Plan for about 2.5 cubic yards or 3.5 tons before waste, then verify supplier density.',
    },
    mistakes: [
      'Using tons without checking supplier density.',
      'Forgetting compaction for base materials.',
      'Choosing decorative gravel for a compacted base.',
      'Skipping fabric or drainage planning where needed.',
    ],
    calculatorSlug: 'gravel-calculator',
    calculatorLinkText: 'Use the gravel calculator',
    relatedGuideSlugs: ['how-much-gravel-for-driveway', 'how-much-paver-base-do-i-need', 'how-much-mulch-do-i-need'],
    relatedCalculatorSlugs: ['gravel-calculator', 'paver-base-calculator', 'mulch-calculator'],
    faqs: [
      {
        question: 'How many tons are in a cubic yard of gravel?',
        answer: 'A common estimate is about 1.3 to 1.5 tons per cubic yard, but exact weight depends on material and moisture.',
      },
      {
        question: 'How deep should gravel be?',
        answer: 'Decorative areas may use a few inches. Driveways and compacted bases often need more depth depending on traffic, soil, and climate.',
      },
    ],
    reviewedDate: 'June 2026',
  },
  {
    slug: 'how-much-gravel-for-driveway',
    category: 'Landscaping',
    title: 'How Much Gravel for a Driveway?',
    metaTitle: 'How Much Gravel for a Driveway?',
    metaDescription: 'Estimate driveway gravel by length, width, depth, cubic yards, and tons, with practical notes about compaction and supplier density.',
    description: 'Plan driveway gravel volume and tonnage before calling a supplier.',
    h1: 'How Much Gravel for a Driveway?',
    shortAnswer: 'For a driveway, multiply length x width x depth in feet to estimate cubic feet. Divide by 27 for cubic yards, then multiply by supplier density to estimate tons. Driveway depths vary by base condition, traffic, and material.',
    explanation: [
      'Driveways often need more than a thin decorative layer. A stable driveway may involve subbase, base stone, top stone, compaction, drainage, and edge conditions.',
      'Use the math for a planning estimate, then confirm depth and material type with a local supplier or contractor, especially for clay soil, freeze-thaw climates, or heavy vehicles.',
    ],
    formula: 'Driveway gravel volume = length x width x depth in feet. Cubic yards = cubic feet / 27. Tons = cubic yards x density.',
    example: {
      title: 'Example: 40 ft x 10 ft driveway at 4 inches deep',
      steps: [
        'Area: 40 x 10 = 400 square feet',
        'Convert depth: 4 / 12 = 0.333 ft',
        'Volume: 400 x 0.333 = about 133.3 cubic feet',
        'Cubic yards: 133.3 / 27 = about 4.94 cubic yards',
        'Tons at 1.4 tons per yard: 4.94 x 1.4 = about 6.9 tons',
      ],
      result: 'A planning estimate is about 5 cubic yards or 7 tons before compaction and supplier verification.',
    },
    mistakes: [
      'Only adding a thin top layer when the base has failed.',
      'Ignoring drainage or soft soil.',
      'Using rounded decorative stone where compacted base stone is needed.',
      'Assuming one density works for every gravel product.',
    ],
    calculatorSlug: 'gravel-calculator',
    calculatorLinkText: 'Estimate driveway gravel',
    relatedGuideSlugs: ['how-much-gravel-do-i-need', 'how-much-paver-base-do-i-need'],
    relatedCalculatorSlugs: ['gravel-calculator', 'paver-base-calculator'],
    faqs: [
      {
        question: 'How deep should driveway gravel be?',
        answer: 'It depends on existing base, soil, traffic, and climate. A refresh layer is different from a new driveway base.',
      },
      {
        question: 'Should driveway gravel be compacted?',
        answer: 'Base layers usually should be compacted. Compaction changes volume, so include a buffer and verify with your supplier.',
      },
    ],
    reviewedDate: 'June 2026',
  },
  {
    slug: 'how-much-soil-for-raised-bed',
    category: 'Landscaping',
    title: 'How Much Soil for a Raised Bed?',
    metaTitle: 'How Much Soil for a Raised Garden Bed?',
    metaDescription: 'Estimate raised bed soil in cubic feet, cubic yards, and bags using bed length, width, height, and fill percentage.',
    description: 'Estimate soil volume for raised garden beds before buying bags or bulk mix.',
    h1: 'How Much Soil for a Raised Bed?',
    shortAnswer: 'Raised bed soil volume = length x width x height in feet. Cubic yards = cubic feet / 27. Bags = cubic feet / bag volume. Add a settling buffer because soil often compresses after watering.',
    explanation: [
      'Raised beds are simple volume calculations, but bag sizes vary and soil settles. If you fill the bottom with logs, branches, or other material, reduce the fill percentage.',
      'Home gardeners can use this to avoid underbuying bags. Landscapers and small crews can use it to plan bulk soil deliveries and staged material lists.',
    ],
    formula: 'Soil volume = bed count x length x width x fill height in feet. Cubic yards = cubic feet / 27.',
    example: {
      title: 'Example: one 8 ft x 4 ft bed, 12 inches deep',
      steps: [
        'Convert height: 12 inches = 1 ft',
        'Volume: 8 x 4 x 1 = 32 cubic feet',
        'Add 10% settling buffer: 32 x 1.10 = 35.2 cubic feet',
        'Convert to yards: 35.2 / 27 = about 1.3 cubic yards',
      ],
      result: 'Plan for about 35 cubic feet, or about 1.3 cubic yards, before checking bag size or bulk mix details.',
    },
    mistakes: [
      'Forgetting that soil settles after watering.',
      'Confusing quarts, cubic feet, and cubic yards.',
      'Filling a tall bed completely with expensive bagged mix when a partial-fill method is intended.',
    ],
    calculatorSlug: 'raised-bed-soil-calculator',
    calculatorLinkText: 'Use the raised bed soil calculator',
    relatedGuideSlugs: ['how-much-mulch-do-i-need', 'how-many-bags-of-mulch-in-a-yard', 'how-much-gravel-do-i-need'],
    relatedCalculatorSlugs: ['raised-bed-soil-calculator', 'mulch-calculator'],
    faqs: [
      {
        question: 'How many cubic feet are in a cubic yard of soil?',
        answer: 'There are 27 cubic feet in one cubic yard.',
      },
      {
        question: 'Should I add extra soil for settling?',
        answer: 'Usually yes. Fresh soil often settles after watering, especially in deep beds.',
      },
    ],
    reviewedDate: 'June 2026',
  },
  {
    slug: 'how-much-paver-base-do-i-need',
    category: 'Hardscaping',
    title: 'How Much Paver Base Do I Need?',
    metaTitle: 'How Much Paver Base Do I Need?',
    metaDescription: 'Estimate crushed stone paver base and bedding sand for patios, walkways, and hardscape projects using area and depth.',
    description: 'Estimate paver base stone and bedding sand before building a patio or walkway.',
    h1: 'How Much Paver Base Do I Need?',
    shortAnswer: 'Paver base volume = area x base depth in feet. Bedding sand is calculated separately, often around 1 inch deep. Convert cubic feet to cubic yards by dividing by 27, then estimate tons using material density.',
    explanation: [
      'Paver projects usually need a compacted crushed stone base and a separate bedding sand layer. Base depth depends on traffic, soil, drainage, and climate.',
      'This guide is useful for homeowners planning patios and for hardscape crews checking material quantities before ordering.',
    ],
    formula: 'Base cubic feet = area x base depth in feet. Sand cubic feet = area x sand depth in feet. Cubic yards = cubic feet / 27.',
    example: {
      title: 'Example: 200 square foot patio',
      steps: [
        'Base depth: 4 inches / 12 = 0.333 ft',
        'Base volume: 200 x 0.333 = about 66.7 cubic feet',
        'Base yards: 66.7 / 27 = about 2.47 cubic yards',
        'Sand depth: 1 inch / 12 = 0.083 ft',
        'Sand volume: 200 x 0.083 = about 16.7 cubic feet',
      ],
      result: 'Plan for about 2.5 cubic yards of base plus about 0.6 cubic yards of bedding sand before waste and compaction.',
    },
    mistakes: [
      'Skipping compacted base stone.',
      'Using too much bedding sand.',
      'Forgetting that base material compacts.',
      'Not adjusting depth for driveway loads, poor soil, or freeze-thaw conditions.',
    ],
    calculatorSlug: 'paver-base-calculator',
    calculatorLinkText: 'Use the paver base calculator',
    relatedGuideSlugs: ['how-much-gravel-do-i-need', 'how-much-gravel-for-driveway', 'how-much-concrete-do-i-need'],
    relatedCalculatorSlugs: ['paver-base-calculator', 'gravel-calculator', 'retaining-wall-calculator'],
    faqs: [
      {
        question: 'How deep should paver base be?',
        answer: 'Patios and walkways often need several inches of compacted base. Driveways or poor soils may require more depth.',
      },
      {
        question: 'Do I calculate bedding sand separately?',
        answer: 'Yes. Base stone and bedding sand are different layers and should be estimated separately.',
      },
    ],
    reviewedDate: 'June 2026',
  },
];

export function getGuideBySlug(slug: string): GuideConfig | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export function getRelatedGuides(slugs: string[]): GuideConfig[] {
  return slugs
    .map((slug) => guides.find((guide) => guide.slug === slug))
    .filter((guide): guide is GuideConfig => Boolean(guide));
}

export function getGuidesForCalculator(calculatorSlug: string): GuideConfig[] {
  return guides.filter((guide) => (
    guide.calculatorSlug === calculatorSlug || guide.relatedCalculatorSlugs.includes(calculatorSlug)
  ));
}

export function getGuidesByCategory(category: GuideConfig['category']): GuideConfig[] {
  return guides.filter((guide) => guide.category === category);
}

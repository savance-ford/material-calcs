export type InputType = 'number' | 'select' | 'checkbox' | 'radio' | 'unitToggle';

export interface CalculatorInput {
  id: string;
  label: string;
  type: InputType;
  options?: { label: string; value: string | number | boolean }[];
  defaultValue: any;
  unit?: string;
  helperText?: string;
  helpText?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  showIf?: (inputs: Record<string, any>) => boolean;
}

export type OutputType = 'primary' | 'secondary' | 'material' | 'cost' | 'warning' | 'note';

export interface CalculatorOutput {
  id: string;
  label: string;
  unit?: string;
  type: OutputType;
  description?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ExampleCalculation {
  inputSummary: string;
  steps: string[];
  resultSummary: string;
}

export interface TestCase {
  name: string;
  inputs: Record<string, any>;
  expectedOutputs: Record<string, any>;
  notes?: string;
}

export interface CalculatorConfig {
  id: string;
  slug: string;
  category: string;
  title: string;
  shortTitle: string;
  description: string;
  
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  userIntent: string;

  inputs: CalculatorInput[];
  outputs: CalculatorOutput[];
  calculate: (inputs: Record<string, any>) => Record<string, any>;
  
  formulaExplanation: string;
  assumptions: string[];
  warnings: string[];
  exampleCalculation: ExampleCalculation;
  howToUse?: string; // Markdown text
  additionalSections?: { title: string; markdown: string }[];
  faqs: FAQ[];
  relatedCalculators: string[];
  monetizationPlacements?: string[];
  testCases: TestCase[];
}

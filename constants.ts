
import { RiskLevel, ExposureLevel, FindingCategoryLevel } from './types';

// Legacy or general purpose risk level thresholds
export const RISK_LEVEL_THRESHOLDS: Record<RiskLevel, { min: number, max: number }> = {
  [RiskLevel.LOW]: { min: 0, max: 10 },
  [RiskLevel.MEDIUM]: { min: 11, max: 25 },
  [RiskLevel.HIGH]: { min: 26, max: 40 },
  [RiskLevel.CRITICAL]: { min: 41, max: Infinity },
};

// Tailwind CSS classes for general risk level display
export const RISK_LEVEL_COLORS: Record<RiskLevel, string> = {
  [RiskLevel.LOW]: "bg-risk-low",
  [RiskLevel.MEDIUM]: "bg-risk-medium",
  [RiskLevel.HIGH]: "bg-risk-high",
  [RiskLevel.CRITICAL]: "bg-risk-critical",
};

export const RISK_LEVEL_TEXT_COLORS: Record<RiskLevel, string> = {
  [RiskLevel.LOW]: "text-risk-low",
  [RiskLevel.MEDIUM]: "text-risk-medium",
  [RiskLevel.HIGH]: "text-risk-high",
  [RiskLevel.CRITICAL]: "text-risk-critical",
};

// Hex colors for charts
export const CHART_HEX_RISK_LEVEL_COLORS: Record<RiskLevel, string> = {
  [RiskLevel.LOW]: '#22c55e', // Green
  [RiskLevel.MEDIUM]: '#eab308', // Yellow
  [RiskLevel.HIGH]: '#f97316', // Orange
  [RiskLevel.CRITICAL]: '#ef4444', // Red
};
// Hex colors for Exposure Levels (example, can be adjusted)
export const CHART_HEX_EXPOSURE_LEVEL_COLORS: Record<ExposureLevel, string> = {
  [ExposureLevel.A]: '#4ade80', // Lighter Green
  [ExposureLevel.B]: '#86efac', 
  [ExposureLevel.C]: '#fde047', // Lighter Yellow
  [ExposureLevel.D]: '#fed7aa', // Lighter Orange
  [ExposureLevel.E]: '#fecaca', // Lighter Red
};

export const CHART_HEX_SURVEILLANCE_STATUS_COLORS = {
  OPEN: '#facc15', // Tailwind Yellow-400
  COMPLETED: '#4ade80', // Tailwind Green-400
};


// Weights for legacy risk calculation (to be phased out)
export const WEIGHT_AIRCRAFT_FREQUENCY = 2;
export const WEIGHT_ENVIRONMENTAL_COMPLEXITY = 2;
export const WEIGHT_OCCURRENCES_SCORE = 1;


// RBS Calculation Weights and Parameters

// From Slide 17: F(P) = wc*C(p) - wd*D(p) + wi*I(p)
export const RBS_WEIGHT_COMPLIANCE = 0.75;      // wc
export const RBS_WEIGHT_DEVIATION = 1.00;       // wd
export const RBS_WEIGHT_IMPROVEMENT = 0.25;     // wi

// From Slide 19: C(p) related
export const RBS_COMPLIANCE_FINDING_WEIGHTS = {
  ncp: 0.50, // Non-Compliance (Red)
  ncf: 0.35, // Non-Conformance (Yellow)
  nad: 0.15, // Non-Adherence (Green)
};

// From Slide 20: D(p) related
export const RBS_DEVIATION_CATEGORY_WEIGHTS = {
  accident: 0.50,
  seriousIncident: 0.35,
  incident: 0.15,
};

// From Slide 21: I(p) related, Nn weights for corrective actions
export const RBS_CORRECTIVE_ACTION_WEIGHTS = {
  rootCause: 0.25,
  hazardIdentified: 0.50,
  riskAssessed: 0.75,
  riskMitigated: 1.00,
};

// Overall Performance Score (F(P) or "hasil ORP") to Risk Indicator Level ("nilai IDR" 1-5)
// Based on Slide 29
export const RBS_PERFORMANCE_TO_INDICATOR_LEVEL: Array<{thresholdMax: number, level: number, label: string}> = [
  { thresholdMax: 35, level: 5, label: "Sangat Tinggi ORP" }, // 0-35
  { thresholdMax: 60, level: 4, label: "Tinggi ORP" },       // >35-60
  { thresholdMax: 75, level: 3, label: "Sedang ORP" },        // >60-75 (Adjusted from slide's 60<70)
  { thresholdMax: 85, level: 2, label: "Rendah ORP" },       // >75-85
  { thresholdMax: Infinity, level: 1, label: "Sangat Rendah ORP" } // >85-100+
];


// RBS Matrix: ExposureLevel (Rows A-E) vs RiskIndicatorLevel (Cols 1-5)
// Values are suggested surveillance cycle in months.
// Key: `${ExposureLevel}${RiskIndicatorLevel}`, e.g., "A1", "E5"
// Based on example matrix from slide 26/31
// Frekuensi RBS (Risk Indicator Level): 1 (Sangat Rendah), 2 (Rendah), 3 (Sedang), 4 (Tinggi), 5 (Sangat Tinggi)
// Eksposure Indikator (FIde): A (Sangat Rendah), B (Rendah), C (Sedang), D (Tinggi), E (Sangat Tinggi)
// Example from slide 26: Airline E (1A) -> 18 months, Airline C (4D) -> 6 months
export const RBS_MATRIX_SURVEILLANCE_CYCLES: Record<string, number> = {
  // Exposure A (Sangat Rendah)
  "A1": 18, "A2": 18, "A3": 12, "A4": 12, "A5": 6,
  // Exposure B (Rendah)
  "B1": 18, "B2": 12, "B3": 12, "B4": 6,  "B5": 6,
  // Exposure C (Sedang)
  "C1": 12, "C2": 12, "C3": 6,  "C4": 6,  "C5": 6,
  // Exposure D (Tinggi)
  "D1": 12, "D2": 6,  "D3": 6,  "D4": 6,  "D5": 6,
  // Exposure E (Sangat Tinggi)
  "E1": 12, "E2": 6,  "E3": 6,  "E4": 6,  "E5": 6,
};
// For visualization, map the key (e.g. "1A" from slide 26) to matrix cells
export const RBS_MATRIX_CELL_KEYS: Record<ExposureLevel, Record<number, string>> = {
    [ExposureLevel.E]: { 1: "1E", 2: "2E", 3: "3E", 4: "4E", 5: "5E" }, // Top row in slide example
    [ExposureLevel.D]: { 1: "1D", 2: "2D", 3: "3D", 4: "4D", 5: "5D" },
    [ExposureLevel.C]: { 1: "1C", 2: "2C", 3: "3C", 4: "4C", 5: "5C" },
    [ExposureLevel.B]: { 1: "1B", 2: "2B", 3: "3B", 4: "4B", 5: "5B" },
    [ExposureLevel.A]: { 1: "1A", 2: "2A", 3: "3A", 4: "4A", 5: "5A" }, // Bottom row in slide example
};


export const MOCK_OPERATOR_LOGOS = [
  "https://picsum.photos/seed/garuda/100/50",
  "https://picsum.photos/seed/lionair/100/50",
  "https://picsum.photos/seed/citilink/100/50",
  "https://picsum.photos/seed/sriwijaya/100/50",
  "https://picsum.photos/seed/batikair/100/50",
];

export const FINDING_CATEGORY_OPTIONS = [
  { value: FindingCategoryLevel.LEVEL_1, label: "Level 1 (Non-Compliance) - Target 15 days" },
  { value: FindingCategoryLevel.LEVEL_2, label: "Level 2 (Non-Conformance) - Target 30 days" },
  { value: FindingCategoryLevel.LEVEL_3, label: "Level 3 (Non-Adherence) - Target 60 days" },
];

export const FINDING_CATEGORY_TARGET_DAYS: Record<FindingCategoryLevel, number> = {
  [FindingCategoryLevel.LEVEL_1]: 15,
  [FindingCategoryLevel.LEVEL_2]: 30,
  [FindingCategoryLevel.LEVEL_3]: 60,
};

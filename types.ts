
export interface LegacyRiskFactors {
  aircraftFrequency: number; // Scale 1-5 (Very Low to Very High)
  environmentalComplexity: number; // Scale 1-5
  occurrences: Occurrence[];
}

export interface ComplexityFactors {
  annualFlightCount: number;
  numEmployees: number;
  numAircraft: number;
  numAircraftModels: number;
  numDestinations: number;
  hasInternationalOps: boolean; // true for 'Ya', false for 'Tidak'
  avgFleetAge: number; // years
  numDomesticBases: number;
}

export interface ComplianceFindingCounts {
  ncp: number; // Non-Compliance
  ncf: number; // Non-Conformance
  nad: number; // Non-Adherence
}

export interface ComplianceData {
  findings: ComplianceFindingCounts;
  totalChecklistItems: number; // N_checklist_items from slide 19
}

export interface DeviationData {
  accidentCount: number;
  seriousIncidentCount: number;
  incidentCount: number;
  totalFlightCycles: number;
}

export interface ImprovementData {
  totalDeviationsNd: number; 
  totalFindingsNf: number; 
  correctiveActionsRootCause: number;    
  correctiveActionsHazardIdentified: number; 
  correctiveActionsRiskAssessed: number;    
  correctiveActionsRiskMitigated: number;   
  totalCorrectiveActionsAppliedToFindings: number; 
  totalCorrectiveActionsAppliedToDeviations: number; 
}

export enum FindingCategoryLevel {
  LEVEL_1 = "Level 1 (Non-Compliance)", // Target +15 days
  LEVEL_2 = "Level 2 (Non-Conformance)", // Target +30 days
  LEVEL_3 = "Level 3 (Non-Adherence)",   // Target +60 days
}

export interface SurveillanceFinding {
  id: string;
  dateAdded: string; // ISO date string
  finding: string;
  findingCategory: FindingCategoryLevel; // New field
  rootCauseAnalysis: string;
  correctiveActionPlan: string;
  correctiveActionTaken: string; // What was actually done
  targetCompletionDate: string; // ISO date string - Will be calculated
  isCompleted: boolean;
  actualCompletionDate?: string; // ISO date string, set when isCompleted is true
}

export interface Operator {
  id: string;
  name: string;
  aocNumber: string;
  logoUrl?: string;
  lastUpdated: string; // ISO date string

  complexityFactors: ComplexityFactors;
  complianceData: ComplianceData;
  deviationData: DeviationData;
  improvementData: ImprovementData;
  surveillanceFindings?: SurveillanceFinding[]; 

  exposureScore: number;
  exposureLevel: ExposureLevel; 
  
  complianceFactorScore: number; 
  deviationFactorScore: number;  
  improvementFactorScore: number;
  overallPerformanceScore: number; 
  
  riskIndicatorLevel: number; 
  finalRiskCategoryKey: string; 
  suggestedSurveillanceCycleMonths: number; 

  legacyRiskFactors: LegacyRiskFactors;
  legacyOverallRiskScore: number;
  legacyOverallRiskLevel: RiskLevel; 
}

export interface Occurrence {
  id: string;
  date: string; // ISO date string
  type: OccurrenceType; 
  severity: SeverityLevel;
  description: string;
}

export enum OccurrenceType {
  INCIDENT = "Incident",
  ACCIDENT = "Accident",
  SERIOUS_INCIDENT = "Serious Incident", 
  SAFETY_REPORT = "Safety Report", 
  SDR = "SDR", 
  OTHER = "Other",
}

export enum SeverityLevel {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
  CRITICAL = "Critical",
}

export enum RiskLevel { 
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
  CRITICAL = "Critical"
}

export const SEVERITY_WEIGHTS: Record<SeverityLevel, number> = {
  [SeverityLevel.LOW]: 1,
  [SeverityLevel.MEDIUM]: 3,
  [SeverityLevel.HIGH]: 5,
  [SeverityLevel.CRITICAL]: 10,
};

export const AIRCRAFT_FREQUENCY_OPTIONS = [
  { value: 1, label: "1 - Very Low (e.g., <100 flights/month)" },
  { value: 2, label: "2 - Low (e.g., 100-500 flights/month)" },
  { value: 3, label: "3 - Medium (e.g., 500-1000 flights/month)" },
  { value: 4, label: "4 - High (e.g., 1000-2000 flights/month)" },
  { value: 5, label: "5 - Very High (e.g., >2000 flights/month)" },
];

export const ENV_COMPLEXITY_OPTIONS = [
  { value: 1, label: "1 - Very Low (e.g., simple routes, stable weather)" },
  { value: 2, label: "2 - Low (e.g., some complex routes or varied weather)" },
  { value: 3, label: "3 - Medium (e.g., challenging airports, frequent adverse weather)" },
  { value: 4, label: "4 - High (e.g., mountainous terrain, severe weather patterns)" },
  { value: 5, label: "5 - Very High (e.g., extreme environments, consistently difficult operations)" },
];

export enum ExposureLevel {
  A = "A", 
  B = "B", 
  C = "C", 
  D = "D", 
  E = "E"  
}

export const DEFAULT_COMPLEXITY_FACTORS: ComplexityFactors = {
  annualFlightCount: 0,
  numEmployees: 0,
  numAircraft: 0,
  numAircraftModels: 0,
  numDestinations: 0,
  hasInternationalOps: false,
  avgFleetAge: 0,
  numDomesticBases: 0,
};

export const DEFAULT_COMPLIANCE_DATA: ComplianceData = {
  findings: { ncp: 0, ncf: 0, nad: 0 },
  totalChecklistItems: 100, 
};

export const DEFAULT_DEVIATION_DATA: DeviationData = {
  accidentCount: 0,
  seriousIncidentCount: 0,
  incidentCount: 0,
  totalFlightCycles: 1000, 
};

export const DEFAULT_IMPROVEMENT_DATA: ImprovementData = {
  totalDeviationsNd: 0,
  totalFindingsNf: 0,
  correctiveActionsRootCause: 0,
  correctiveActionsHazardIdentified: 0,
  correctiveActionsRiskAssessed: 0,
  correctiveActionsRiskMitigated: 0,
  totalCorrectiveActionsAppliedToFindings: 0,
  totalCorrectiveActionsAppliedToDeviations: 0,
};

export const DEFAULT_LEGACY_RISK_FACTORS: LegacyRiskFactors = {
  aircraftFrequency: 1,
  environmentalComplexity: 1,
  occurrences: [],
};

export const DEFAULT_SURVEILLANCE_FINDING_FORM_STATE: Omit<SurveillanceFinding, 'id' | 'isCompleted' | 'dateAdded' | 'actualCompletionDate' | 'targetCompletionDate'> = {
  finding: '',
  findingCategory: FindingCategoryLevel.LEVEL_3, // Default category
  rootCauseAnalysis: '',
  correctiveActionPlan: '',
  correctiveActionTaken: '',
};

export interface UserProfile {
  id: string; 
  name?: string;
  email?: string;
  picture?: string;
}

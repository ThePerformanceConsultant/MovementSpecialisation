
export interface Measurements {
  height: string;
  totalLeg: string;
  lowerLeg: string;
  wingspan: string;
  lowerArm: string;
  upperArm: string;
}

export interface CalculatedResults {
  femurLength: number;
  tibiaFemurRatio: number;
  legHeightRatio: number;
  wingspanMinusHeight: number;
  ulnaHumerusRatio: number;
}

export type TibiaClassification = 'short' | 'average' | 'long';
export type UlnaClassification = 'short' | 'average' | 'long';
export type LegClassification = 'short' | 'average' | 'long';
export type ArmClassification = 'short' | 'average' | 'long';

export interface Classifications {
  tibia: TibiaClassification;
  ulna: UlnaClassification;
  legs: LegClassification;
  arms: ArmClassification;
  legStrategy: 'short' | 'long';
  armStrategy: 'short' | 'long';
}

export interface ExerciseCategory {
  title: string;
  strategy: string;
  examples: string[];
  notes?: string;
}

export interface RecommendationCategory {
  title: string;
  description: string;
  categories: ExerciseCategory[];
  mobilityConsiderations?: {
    tightOveractive: string[];
    weakUnderactive: string[];
    symptoms: string[];
    prehab: string[];
  };
}

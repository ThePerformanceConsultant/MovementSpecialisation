
import { Measurements, CalculatedResults, Classifications, TibiaClassification, UlnaClassification, LegClassification, ArmClassification } from '../types';

export function calculateResults(measurements: Measurements): CalculatedResults {
  const height = parseFloat(measurements.height);
  const totalLeg = parseFloat(measurements.totalLeg);
  const lowerLeg = parseFloat(measurements.lowerLeg);
  const wingspan = parseFloat(measurements.wingspan);
  const lowerArm = parseFloat(measurements.lowerArm);
  const upperArm = parseFloat(measurements.upperArm);

  const femurLength = totalLeg - lowerLeg;
  const tibiaFemurRatio = (lowerLeg / femurLength) * 100;
  const legHeightRatio = (totalLeg / height) * 100;
  const wingspanMinusHeight = wingspan - height;
  const ulnaHumerusRatio = (lowerArm / upperArm) * 100;

  return {
    femurLength,
    tibiaFemurRatio,
    legHeightRatio,
    wingspanMinusHeight,
    ulnaHumerusRatio,
  };
}

export function classifyAthlete(results: CalculatedResults): Classifications {
  const tibia = classifyTibia(results.tibiaFemurRatio);
  const ulna = classifyUlna(results.ulnaHumerusRatio);
  const legs = classifyLegs(results.legHeightRatio);
  const arms = classifyArms(results.wingspanMinusHeight);

  let legStrategy: 'short' | 'long';
  if (legs === 'short') {
    legStrategy = 'short';
  } else if (legs === 'long') {
    legStrategy = 'long';
  } else {
    legStrategy = (tibia === 'long') ? 'short' : 'long';
  }

  let armStrategy: 'short' | 'long';
  if (arms === 'short') {
    armStrategy = 'short';
  } else if (arms === 'long') {
    armStrategy = 'long';
  } else {
    armStrategy = (ulna === 'long') ? 'short' : 'long';
  }

  return {
    tibia,
    ulna,
    legs,
    arms,
    legStrategy,
    armStrategy,
  };
}

function classifyTibia(ratio: number): TibiaClassification {
  if (ratio < 79) return 'short';
  if (ratio <= 84) return 'average';
  return 'long';
}

function classifyUlna(ratio: number): UlnaClassification {
  if (ratio < 79) return 'short';
  if (ratio <= 84) return 'average';
  return 'long';
}

function classifyLegs(ratio: number): LegClassification {
  if (ratio < 44) return 'short';
  if (ratio <= 47) return 'average';
  return 'long';
}

function classifyArms(difference: number): ArmClassification {
  if (difference < 1) return 'short';
  if (difference <= 5) return 'average';
  return 'long';
}

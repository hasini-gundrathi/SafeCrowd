
import { Zone, AlertStatus } from './types';

export const DENSITY_THRESHOLDS = {
  WARNING: 60,
  CRITICAL: 80,
};

export const UPDATE_INTERVAL = 2000; // ms

export const INITIAL_ZONES: Zone[] = [
  { id: 'A1', density: 15, peopleCount: 37, confidence: 92.1 }, { id: 'A2', density: 20, peopleCount: 50, confidence: 94.5 }, { id: 'A3', density: 18, peopleCount: 45, confidence: 93.3 }, { id: 'A4', density: 25, peopleCount: 62, confidence: 91.8 },
  { id: 'B1', density: 30, peopleCount: 75, confidence: 95.0 }, { id: 'B2', density: 45, peopleCount: 112, confidence: 96.1 }, { id: 'B3', density: 40, peopleCount: 100, confidence: 95.8 }, { id: 'B4', density: 32, peopleCount: 80, confidence: 94.2 },
  { id: 'C1', density: 22, peopleCount: 55, confidence: 93.9 }, { id: 'C2', density: 35, peopleCount: 87, confidence: 95.5 }, { id: 'C3', density: 28, peopleCount: 70, confidence: 92.7 }, { id: 'C4', density: 15, peopleCount: 37, confidence: 91.2 },
  { id: 'D1', density: 10, peopleCount: 25, confidence: 90.5 }, { id: 'D2', density: 12, peopleCount: 30, confidence: 91.1 }, { id: 'D3', density: 14, peopleCount: 35, confidence: 92.3 }, { id: 'D4', density: 19, peopleCount: 47, confidence: 93.6 },
];

export const ALERT_CONFIG = {
  [AlertStatus.NORMAL]: {
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    textColor: 'text-green-400',
    title: 'Status: Normal',
    message: 'Crowd levels are within safe limits. All systems operational.'
  },
  [AlertStatus.WARNING]: {
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    textColor: 'text-yellow-400',
    title: 'Status: Warning',
    message: 'Increased crowd density detected in some areas. Monitor closely.'
  },
  [AlertStatus.CRITICAL]: {
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    textColor: 'text-red-500',
    title: 'Status: CRITICAL ALERT',
    message: 'Dangerous crowd levels reached. Initiate safety protocols immediately.'
  }
};
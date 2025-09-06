export enum AlertStatus {
  NORMAL = 'NORMAL',
  WARNING = 'WARNING',
  CRITICAL = 'CRITICAL',
}

export interface CrowdDataPoint {
  timestamp: number;
  density: number;
}

export interface Zone {
  id: string;
  density: number;
  peopleCount: number;
  confidence: number;
}

export type LogType = 'SYSTEM' | 'DENSITY' | 'CCTV';

export interface LogEntry {
  timestamp: string;
  message: string;
  type: LogType;
}

export interface CrowdData {
  zones: Zone[];
  history: CrowdDataPoint[];
  alertStatus: AlertStatus;
  logs: LogEntry[];
  currentDensity: number;
  peakDensity: number;
  prediction: number;
}
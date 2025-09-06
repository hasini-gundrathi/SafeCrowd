import { useState, useEffect, useCallback } from 'react';
import { CrowdData, AlertStatus, CrowdDataPoint, Zone, LogEntry, LogType } from '../types';
import { DENSITY_THRESHOLDS, UPDATE_INTERVAL, INITIAL_ZONES } from '../constants';

export const useCrowdData = (): CrowdData => {
  const [zones, setZones] = useState<Zone[]>(INITIAL_ZONES);
  const [history, setHistory] = useState<CrowdDataPoint[]>([]);
  const [alertStatus, setAlertStatus] = useState<AlertStatus>(AlertStatus.NORMAL);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [peakDensity, setPeakDensity] = useState<number>(0);
  const [currentDensity, setCurrentDensity] = useState<number>(0);
  const [prediction, setPrediction] = useState<number>(0);

  const addLog = useCallback((message: string, type: LogType) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    const newLog: LogEntry = { timestamp, message, type };
    setLogs(prev => [newLog, ...prev.slice(0, 19)]);
  }, []);

  // Main simulation loop for gradual changes and overall metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setZones(currentZones => {
        // 1. Update zone densities to simulate fluctuations
        const newZones = currentZones.map(zone => {
          let fluctuation = (Math.random() - 0.45) * 4; // General ebb and flow
          if (alertStatus === AlertStatus.WARNING) fluctuation += Math.random() * 0.5;
          if (alertStatus === AlertStatus.CRITICAL) fluctuation += Math.random();
          
          const newDensity = Math.max(0, Math.min(100, zone.density + fluctuation));
          const peopleCount = Math.floor(newDensity * 2.5 + (Math.random() - 0.5) * 5);
          const confidence = Math.min(99.9, 90 + newDensity * 0.1 + (Math.random() - 0.5) * 10);

          return { ...zone, density: newDensity, peopleCount: Math.max(0, peopleCount), confidence };
        });

        // 2. Calculate average density
        const totalDensity = newZones.reduce((acc, z) => acc + z.density, 0);
        const avgDensity = totalDensity / newZones.length;
        setCurrentDensity(avgDensity);
        
        if(avgDensity > peakDensity) {
          setPeakDensity(avgDensity);
        }

        // 3. Update history for the chart and run prediction
        const newHistoryPoint: CrowdDataPoint = { timestamp: Date.now(), density: avgDensity };
        setHistory(prevHistory => {
            const newHistory = [...prevHistory.slice(-59), newHistoryPoint];

            // Predictive Analytics Logic
            if (newHistory.length >= 10) {
                const relevantHistory = newHistory.slice(-10);
                const firstPoint = relevantHistory[0];
                const lastPoint = relevantHistory[relevantHistory.length - 1];

                const densityChange = lastPoint.density - firstPoint.density;
                const timeChange = lastPoint.timestamp - firstPoint.timestamp;

                if (timeChange > 0) {
                    const rateOfChangePerMs = densityChange / timeChange;
                    const PREDICTION_HORIZON_MS = 30000; // 30 seconds
                    const predictedDensityChange = rateOfChangePerMs * PREDICTION_HORIZON_MS;
                    
                    const predictedDensity = avgDensity + predictedDensityChange;
                    const clampedPrediction = Math.max(0, Math.min(100, predictedDensity));
                    setPrediction(clampedPrediction);
                }
            } else {
                setPrediction(avgDensity);
            }
            return newHistory;
        });

        // 4. Determine alert status
        let newStatus = AlertStatus.NORMAL;
        if (avgDensity >= DENSITY_THRESHOLDS.CRITICAL) {
          newStatus = AlertStatus.CRITICAL;
        } else if (avgDensity >= DENSITY_THRESHOLDS.WARNING) {
          newStatus = AlertStatus.WARNING;
        }
        
        if (newStatus !== alertStatus) {
          setAlertStatus(newStatus);
          if (newStatus === AlertStatus.CRITICAL) {
            addLog(`CRITICAL! Avg density at ${avgDensity.toFixed(1)}%`, 'DENSITY');
          } else if (newStatus === AlertStatus.WARNING) {
            addLog(`Warning: Avg density escalating to ${avgDensity.toFixed(1)}%`, 'DENSITY');
          } else {
            addLog(`Status Normal: Avg density back to ${avgDensity.toFixed(1)}%`, 'DENSITY');
          }
        }
        return newZones;
      });
    }, UPDATE_INTERVAL);

    // Initial log
    if (logs.length === 0) {
      addLog("System initialized. Monitoring started.", 'SYSTEM');
    }
    
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertStatus, peakDensity, addLog]);

  // Secondary loop to simulate periodic CCTV-AI detected events
  useEffect(() => {
    const cctvInterval = setInterval(() => {
      setZones(prevZones => {
        const targetZoneIndex = Math.floor(Math.random() * prevZones.length);
        const surgeIncrease = 15 + Math.random() * 20; // A significant, sudden spike
        
        const newZones = [...prevZones];
        const targetZone = newZones[targetZoneIndex];
        
        const newDensity = Math.min(100, targetZone.density + surgeIncrease);
        const newPeopleCount = Math.floor(newDensity * 2.5);
        const newConfidence = 98.5 + Math.random() * 1.4; // High confidence for surge events

        newZones[targetZoneIndex] = {
            ...targetZone,
            density: newDensity,
            peopleCount: newPeopleCount,
            confidence: newConfidence
        };
        
        addLog(`Density surge detected in Zone ${targetZone.id}.`, 'CCTV');
        return newZones;
      });
    }, 7500); // CCTV event every 7.5 seconds

    return () => clearInterval(cctvInterval);
  }, [addLog]);


  return { zones, history, alertStatus, logs, currentDensity, peakDensity, prediction };
};
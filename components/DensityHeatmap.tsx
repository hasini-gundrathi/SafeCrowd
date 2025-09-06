
import React from 'react';
import { Zone } from '../types';

interface DensityHeatmapProps {
  zones: Zone[];
}

const getDensityColor = (density: number): string => {
  if (density > 85) return 'bg-red-600';
  if (density > 75) return 'bg-red-500';
  if (density > 65) return 'bg-orange-500';
  if (density > 55) return 'bg-amber-500';
  if (density > 45) return 'bg-yellow-400';
  if (density > 35) return 'bg-lime-400';
  if (density > 25) return 'bg-green-400';
  return 'bg-sky-400';
};

const DensityHeatmap: React.FC<DensityHeatmapProps> = ({ zones }) => {
  return (
    <div className="grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-3 p-2 bg-slate-900 rounded-lg">
      {zones.map(zone => (
        <div 
          key={zone.id} 
          className="group relative aspect-square transition-transform duration-300 hover:-translate-y-1"
          title={`Zone ${zone.id}: ${zone.density.toFixed(1)}%`}
        >
          <div className={`w-full h-full rounded-md ${getDensityColor(zone.density)} flex items-center justify-center transition-all duration-300 ease-in-out`}>
            <span className="text-slate-900 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {zone.density.toFixed(0)}%
            </span>
          </div>
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-slate-400">
            {zone.id}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DensityHeatmap;

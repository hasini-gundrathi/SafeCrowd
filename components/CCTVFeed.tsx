import React from 'react';
import { Zone } from '../types';
import { CameraIcon } from './icons';

interface CCTVFeedProps {
  zones: Zone[];
}

const CCTVFeed: React.FC<CCTVFeedProps> = ({ zones }) => {
  // Select 4 zones to represent the camera feeds
  const cameraZones = [
    zones.find(z => z.id === 'A2'),
    zones.find(z => z.id === 'B3'),
    zones.find(z => z.id === 'C1'),
    zones.find(z => z.id === 'D4'),
  ].filter(Boolean) as Zone[];

  const getFeedColor = (density: number): string => {
    if (density > 80) return 'border-red-500';
    if (density > 60) return 'border-yellow-500';
    return 'border-slate-700';
  };
  
  const getFeedIndicatorColor = (density: number): string => {
    if (density > 80) return 'bg-red-500';
    if (density > 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-slate-800/50 p-4 sm:p-6 rounded-xl border border-slate-700/50 shadow-lg h-full">
      <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center">
        <CameraIcon className="w-5 h-5 mr-2 text-sky-400" />
        Live CCTV Feeds
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {cameraZones.map((zone) => (
          <div key={zone.id} className={`relative overflow-hidden aspect-video rounded-lg p-2 border-2 ${getFeedColor(zone.density)} bg-slate-900 flex flex-col justify-between transition-colors duration-300`}>
            {/* Scanner Animation */}
            <div className="absolute top-0 left-0 w-full h-1 bg-sky-400/50 scanner-line" style={{ transform: 'translateY(-10%)' }} />

            <div className="flex justify-between items-center text-xs text-slate-400 z-10">
              <span className="font-mono">CAM-{zone.id}</span>
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${getFeedIndicatorColor(zone.density)} animate-pulse`}></div>
                <span className="font-mono">REC</span>
              </div>
            </div>
            <div className="text-center z-10">
              <span className="text-2xl font-bold text-slate-200">{zone.density.toFixed(1)}%</span>
              <p className="text-xs text-slate-500">Density</p>
            </div>
            <div className="z-10 text-xs text-slate-500 font-mono flex justify-between px-1">
              <span>People: {zone.peopleCount}</span>
              <span>Conf: {zone.confidence.toFixed(1)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CCTVFeed;
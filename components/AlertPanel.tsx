
import React from 'react';
import { AlertStatus } from '../types';
import { ALERT_CONFIG } from '../constants';
import { BellIcon } from './icons';

interface AlertPanelProps {
  status: AlertStatus;
}

const AlertPanel: React.FC<AlertPanelProps> = ({ status }) => {
  const config = ALERT_CONFIG[status];
  const isAlerting = status === AlertStatus.WARNING || status === AlertStatus.CRITICAL;

  return (
    <div className={`p-4 rounded-xl border ${config.borderColor} ${config.bgColor} flex items-start space-x-4 transition-all duration-300 ${isAlerting ? 'shadow-lg shadow-red-500/10' : ''}`}>
      <div className={`p-2 rounded-full ${isAlerting ? 'animate-pulse' : ''} ${config.bgColor} border ${config.borderColor}`}>
        <BellIcon className={`h-6 w-6 ${config.textColor}`} />
      </div>
      <div>
        <h3 className={`font-bold text-lg ${config.textColor}`}>{config.title}</h3>
        <p className="text-slate-300">{config.message}</p>
      </div>
    </div>
  );
};

export default AlertPanel;

import React from 'react';
import { LogEntry } from '../types';
import { TerminalIcon, BellIcon, CameraIcon } from './icons';

interface EventLogProps {
  logs: LogEntry[];
}

// FIX: Changed component props to accept the full log entry to access its message.
const LogIcon: React.FC<{ log: LogEntry }> = ({ log }) => {
  switch (log.type) {
    case 'CCTV':
      return <CameraIcon className="w-4 h-4 text-purple-400 flex-shrink-0" />;
    case 'DENSITY':
      // FIX: Correctly reference `log.message` instead of the undefined `event.message`.
      const isCritical = log.message.includes('CRITICAL');
      const isWarning = log.message.includes('Warning');
      const color = isCritical ? 'text-red-400' : isWarning ? 'text-yellow-400' : 'text-green-400';
      return <BellIcon className={`w-4 h-4 ${color} flex-shrink-0`} />;
    case 'SYSTEM':
    default:
      return <TerminalIcon className="w-4 h-4 text-slate-500 flex-shrink-0" />;
  }
};

const getLogColor = (log: LogEntry): string => {
    if (log.type === 'DENSITY') {
        if (log.message.includes('CRITICAL')) return 'text-red-400';
        if (log.message.includes('Warning')) return 'text-yellow-400';
        if (log.message.includes('Normal')) return 'text-green-400';
    }
    if (log.type === 'CCTV') return 'text-purple-300';
    return 'text-slate-400';
}

const EventLog: React.FC<EventLogProps> = ({ logs }) => {
  return (
    <div className="h-64 overflow-y-auto space-y-2.5 pr-2">
      {logs.map((log, index) => (
        <div key={index} className="flex items-start space-x-3">
            {/* FIX: Pass the entire log object to LogIcon. */}
            <LogIcon log={log} />
            <p className={`text-sm font-mono leading-tight ${getLogColor(log)}`}>
                <span className="text-slate-500 mr-2">{log.timestamp}</span>
                {log.type === 'CCTV' ? 'CCTV-AI: ' : ''}{log.message}
            </p>
        </div>
      ))}
    </div>
  );
};

export default EventLog;

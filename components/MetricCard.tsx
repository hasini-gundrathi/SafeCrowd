
import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  statusColor?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, statusColor = 'text-slate-200' }) => {
  return (
    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 shadow-lg flex items-center space-x-6 transition-transform duration-300 hover:scale-105 hover:border-slate-600">
      <div className="p-4 bg-slate-700/50 rounded-full">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-400">{title}</p>
        <p className={`text-3xl font-bold ${statusColor}`}>{value}</p>
      </div>
    </div>
  );
};

export default MetricCard;


import React from 'react';
import { useCrowdData } from '../hooks/useCrowdData';
import MetricCard from './MetricCard';
import DensityChart from './DensityChart';
import AlertPanel from './AlertPanel';
import DensityHeatmap from './DensityHeatmap';
import EventLog from './EventLog';
import CCTVFeed from './CCTVFeed';
import { UsersIcon, PeakIcon, StatusIcon, CameraIcon, PredictionIcon } from './icons';
import { ALERT_CONFIG } from '../constants';

const Dashboard: React.FC = () => {
  const { zones, history, alertStatus, logs, currentDensity, peakDensity, prediction } = useCrowdData();
  const statusConfig = ALERT_CONFIG[alertStatus];

  return (
    <div className="space-y-6">
      <AlertPanel status={alertStatus} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <MetricCard
          title="Current Avg. Density"
          value={`${currentDensity.toFixed(1)}%`}
          icon={<UsersIcon className="w-8 h-8 text-sky-400" />}
          statusColor={statusConfig.textColor}
        />
        <MetricCard
          title="Peak Density Today"
          value={`${peakDensity.toFixed(1)}%`}
          icon={<PeakIcon className="w-8 h-8 text-amber-400" />}
        />
        <MetricCard
          title="Predicted Density (30s)"
          value={`${prediction.toFixed(1)}%`}
          icon={<PredictionIcon className="w-8 h-8 text-fuchsia-400" />}
        />
        <MetricCard
          title="System Status"
          value={statusConfig.title.replace('Status: ', '')}
          icon={<StatusIcon className={`w-8 h-8 ${statusConfig.textColor}`} />}
          statusColor={statusConfig.textColor}
        />
        <MetricCard
          title="Active Cameras"
          value="4 / 4"
          icon={<CameraIcon className="w-8 h-8 text-purple-400" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-800/50 p-4 sm:p-6 rounded-xl border border-slate-700/50 shadow-lg">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">Density Trend (Last 60s)</h3>
          <DensityChart data={history} status={alertStatus} prediction={prediction} />
        </div>
        <div className="bg-slate-800/50 p-4 sm:p-6 rounded-xl border border-slate-700/50 shadow-lg">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">Live Event Log</h3>
          <EventLog logs={logs} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-800/50 p-4 sm:p-6 rounded-xl border border-slate-700/50 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">Venue Heatmap</h3>
            <DensityHeatmap zones={zones} />
        </div>
        <CCTVFeed zones={zones} />
      </div>

    </div>
  );
};

export default Dashboard;
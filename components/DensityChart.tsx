
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { CrowdDataPoint, AlertStatus } from '../types';
import { DENSITY_THRESHOLDS } from '../constants';

interface DensityChartProps {
  data: CrowdDataPoint[];
  status: AlertStatus;
  prediction: number;
}

const DensityChart: React.FC<DensityChartProps> = ({ data, status, prediction }) => {
  const chartColor = status === AlertStatus.CRITICAL ? '#ef4444' : status === AlertStatus.WARNING ? '#f59e0b' : '#38bdf8';
  
  const formattedData = data.map(d => ({
    ...d,
    time: new Date(d.timestamp).toLocaleTimeString([], { minute: '2-digit', second: '2-digit' })
  }));

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <AreaChart
          data={formattedData}
          margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartColor} stopOpacity={0.4}/>
              <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#94a3b8" fontSize={12} domain={[0, 100]} unit="%" tickLine={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ 
                backgroundColor: 'rgba(30, 41, 59, 0.8)', 
                borderColor: '#475569',
                borderRadius: '0.5rem',
                color: '#e2e8f0'
            }}
            labelStyle={{ color: '#94a3b8' }}
            formatter={(value) => [`${(value as number).toFixed(1)}%`, 'Density']}
          />
          <Area type="monotone" dataKey="density" stroke={chartColor} strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" />
          
          <ReferenceLine 
            y={prediction} 
            label={{ value: `Pred: ${prediction.toFixed(1)}%`, position: 'insideTopRight', fill: '#e2e8f0', fontSize: 12, dy: 10, dx: -10 }} 
            stroke="#f472b6" 
            strokeDasharray="4 4" 
            strokeWidth={2}
            ifOverflow="extendDomain"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DensityChart;
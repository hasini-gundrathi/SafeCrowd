
import React from 'react';
import { UsersIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/70 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
             <div className="p-2 bg-sky-500/10 rounded-lg">
                <UsersIcon className="h-6 w-6 text-sky-400" />
            </div>
            <h1 className="text-xl font-bold text-slate-100 tracking-tight">
              Stampede Control Dashboard
            </h1>
          </div>
          <div className="text-sm font-medium text-slate-400">
            Real-Time Monitoring
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

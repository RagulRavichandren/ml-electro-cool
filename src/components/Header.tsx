import React from 'react';
import { Cpu, Zap, BarChart3, History, Info, Sparkles, Presentation, Activity } from 'lucide-react';

interface HeaderProps {
  activeTab: 'predict' | 'metrics' | 'history' | 'about' | 'presentation' | 'icepak';
  setActiveTab: (tab: 'predict' | 'metrics' | 'history' | 'about' | 'presentation' | 'icepak') => void;
  historyCount: number;
}

interface TabItem {
  id: 'predict' | 'metrics' | 'history' | 'about' | 'presentation' | 'icepak';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, historyCount }) => {
  const tabs: TabItem[] = [
    { id: 'predict', label: 'Predict', icon: Zap },
    { id: 'icepak', label: 'Icepak Verification', icon: Activity },
    { id: 'metrics', label: 'Model Metrics', icon: BarChart3 },
    { id: 'history', label: 'History', icon: History, count: historyCount },
    { id: 'about', label: 'Framework', icon: Info },
    { id: 'presentation', label: 'Presentation (PPT)', icon: Presentation },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-slate-100 sticky top-0 z-50 backdrop-blur-md bg-slate-900/95">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 p-0.5 shadow-lg shadow-blue-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-blue-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white">
                ThermalML <span className="font-light text-slate-400">· Heat Sink & Fan Selection</span>
              </h1>
              <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Sparkles className="w-3 h-3" /> RF + XGBoost
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Physics-informed machine learning ensemble trained on 800 CFD design cases
            </p>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 self-end sm:self-auto bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700/60 text-xs text-slate-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-medium text-emerald-400">Model ready</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400 text-[11px] font-mono">v2.4 Ensemble</span>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="border-t border-slate-800/80 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-2.5 px-4 text-xs font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-blue-500 text-blue-400 bg-blue-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

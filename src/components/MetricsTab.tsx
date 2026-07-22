import React from 'react';
import {
  REGRESSION_METRICS,
  CLASSIFICATION_METRICS,
  FEATURE_IMPORTANCE,
  RMSE_DATA
} from '../utils/thermalModel';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { BarChart3, CheckCircle2, Cpu, Database, Award, Target, Activity } from 'lucide-react';

export const MetricsTab: React.FC = () => {
  const avgR2 = (
    REGRESSION_METRICS.reduce((s, r) => s + r.val, 0) / REGRESSION_METRICS.length
  ).toFixed(3);

  const rmseColors = ['#3b82f6', '#3b82f6', '#3b82f6', '#10b981', '#6366f1'];

  return (
    <div className="space-y-6">
      {/* Top 4 Key Performance Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-circuit-card border border-slate-800/80 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <span className="text-2xl font-bold text-slate-100 font-mono">800</span>
            <span className="text-xs text-slate-400 block font-medium">Training Cases</span>
          </div>
        </div>

        <div className="bg-circuit-card border border-slate-800/80 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <span className="text-2xl font-bold text-emerald-400 font-mono">{avgR2}</span>
            <span className="text-xs text-slate-400 block font-medium">Avg R² Score</span>
          </div>
        </div>

        <div className="bg-circuit-card border border-slate-800/80 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-2xl font-bold text-slate-100 font-mono">98.3%</span>
            <span className="text-xs text-slate-400 block font-medium">Avg Clf Accuracy</span>
          </div>
        </div>

        <div className="bg-circuit-card border border-slate-800/80 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <span className="text-2xl font-bold text-sky-400 font-mono">RF+XGB</span>
            <span className="text-xs text-slate-400 block font-medium">Ensemble Machine</span>
          </div>
        </div>
      </div>

      {/* Grid of 4 Detailed Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Regression R2 Scores */}
        <div className="bg-circuit-card border border-slate-800/80 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Regression R² Scores (Ensemble)
              </h3>
            </div>
            <span className="text-[11px] text-emerald-400 font-mono">Higher is better</span>
          </div>

          <div className="space-y-3">
            {REGRESSION_METRICS.map((row, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-medium">{row.name}</span>
                  <span className="font-mono font-bold" style={{ color: row.col }}>
                    {row.disp}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(row.val * 100).toFixed(1)}%`,
                      backgroundColor: row.col,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-2 border-t border-slate-800/60">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              ≥0.95 On Target
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              &lt;0.90 Acceptable
            </span>
          </div>
        </div>

        {/* Card 2: Classification Accuracy */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Classification Accuracy
              </h3>
            </div>
            <span className="text-[11px] text-indigo-400 font-mono">Soft-Vote Probability</span>
          </div>

          <div className="space-y-4 pt-1">
            {CLASSIFICATION_METRICS.map((row, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-medium">{row.name}</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {row.disp}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full rounded-full transition-all duration-500 bg-emerald-500"
                    style={{
                      width: `${(row.val * 100).toFixed(0)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
            <span className="text-slate-200 font-semibold block">Decision Thresholds:</span>
            <p className="text-[11px] text-slate-400">
              Material: AL1050 (&lt;80W), AL6061 (80-200W), Copper (&gt;200W)
            </p>
            <p className="text-[11px] text-slate-400">
              Finish: Natural (&lt;2.5 W/cm²), Anodized (2.5-5.0 W/cm²), Black Anodized (&gt;5.0 W/cm²)
            </p>
          </div>
        </div>

        {/* Card 3: Feature Importance */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Feature Importance — Fan CFM
              </h3>
            </div>
            <span className="text-[11px] text-blue-400 font-mono">Normalized Gini</span>
          </div>

          <div className="space-y-2.5">
            {FEATURE_IMPORTANCE.map((row, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-mono text-[11px]">{row.name}</span>
                  <span className="font-mono font-bold text-blue-400">{row.disp}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full rounded-full bg-blue-500"
                    style={{ width: `${(row.val * 210).toFixed(0)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 4: RMSE Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-sky-400" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                RMSE per Regression Target
              </h3>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">Lower is better</span>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={RMSE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="target" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }}
                  formatter={(val: any, name: any, item: any) => [`${val} ${item.payload.unit}`, 'RMSE']}
                />
                <Bar dataKey="rmse" radius={[6, 6, 0, 0]}>
                  {RMSE_DATA.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={rmseColors[index % rmseColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[11px] text-slate-400 text-center pt-2 border-t border-slate-800/60">
            Average prediction error across 160 test validation samples
          </div>
        </div>
      </div>
    </div>
  );
};

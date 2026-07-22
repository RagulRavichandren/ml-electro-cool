import React from 'react';
import { Cpu, CheckCircle2, Layers, Database, Sparkles, Sliders, ShieldCheck } from 'lucide-react';

export const FrameworkTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-circuit-card border border-slate-800/80 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">ThermalML Architecture & Framework</h2>
            <p className="text-xs text-slate-400">
              Physics-informed ensemble machine learning for thermal dissipation engineering
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* System Inputs */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <Sliders className="w-4 h-4 text-blue-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">System Inputs</h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-300 font-mono">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                Power dissipation (W)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                Heat flux (W/cm²)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                Heat source area (mm²)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                Available length / width / height (mm)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                Ambient temperature (°C)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                Forced / natural air cooling mode
              </li>
            </ul>
          </div>

          {/* Model Outputs */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">Model Outputs</h3>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 text-[11px] block mb-1 font-semibold uppercase">Regression Targets</span>
                <ul className="space-y-1 text-slate-300 font-mono">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Heat sink: length, width, height (mm)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Fin count
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Required fan airflow (CFM)
                  </li>
                </ul>
              </div>

              <div>
                <span className="text-slate-400 text-[11px] block mb-1 font-semibold uppercase">Classification Targets</span>
                <ul className="space-y-1 text-slate-300 font-mono">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Material (AL1050 / AL6061 / Copper)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Surface finish (Natural / Anodized / Black Anodized)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Fan category (Low / Medium / High CFM)
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Algorithms */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">Algorithms</h3>
            </div>
            <div className="space-y-2.5 text-xs">
              <div>
                <span className="font-bold text-slate-200">Random Forest: </span>
                <span className="text-slate-400">200 estimators, max_depth=12. Robust ensemble of decision trees, handles non-linearity well.</span>
              </div>
              <div>
                <span className="font-bold text-slate-200">XGBoost: </span>
                <span className="text-slate-400">200 estimators, lr=0.05. Gradient boosting with subsample=0.8, reduces overfitting.</span>
              </div>
              <div>
                <span className="font-bold text-slate-200">Ensemble Strategy: </span>
                <span className="text-slate-400">Regression outputs use weighted arithmetic mean of RF + XGB predictions. Classification uses soft-voting on class probabilities.</span>
              </div>
            </div>
          </div>

          {/* Dataset */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <Database className="w-4 h-4 text-sky-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">Dataset & Validation</h3>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Size:</span>
                <span className="font-mono text-slate-200">800 synthetic CFD design cases</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Split:</span>
                <span className="font-mono text-slate-200">80% train / 20% test</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Source:</span>
                <span className="font-mono text-slate-200">Physics-informed generation (ANSYS Fluent / OpenFOAM)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Upgrade Path:</span>
                <span className="font-mono text-emerald-400">Plug-and-play ready for experimental CFD CSV data</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

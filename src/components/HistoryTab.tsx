import React, { useState } from 'react';
import { PredictionResult } from '../types/thermal';
import { History, Trash2, Search, ArrowRight, Fan, Flame, Box, Check, Copy, Download, FileSpreadsheet } from 'lucide-react';

interface HistoryTabProps {
  history: PredictionResult[];
  onClearHistory: () => void;
  onSelectPrediction: (prediction: PredictionResult) => void;
}

export const HistoryTab: React.FC<HistoryTabProps> = ({
  history,
  onClearHistory,
  onSelectPrediction,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredHistory = history.filter((h) => {
    const q = searchQuery.toLowerCase();
    return (
      h.inputs.power.toString().includes(q) ||
      h.material.val.toLowerCase().includes(q) ||
      h.fanCategory.val.toLowerCase().includes(q) ||
      h.surfaceFinish.val.toLowerCase().includes(q)
    );
  });

  const handleCopySingle = (e: React.MouseEvent, h: PredictionResult) => {
    e.stopPropagation();
    const text = `ThermalML Log [${h.timestamp}]: Power: ${h.inputs.power}W | Sink: ${h.regression.hs_len.toFixed(1)}x${h.regression.hs_wid.toFixed(1)}x${h.regression.hs_hgt.toFixed(1)}mm (${h.regression.fins} fins) | Airflow: ${h.regression.cfm.toFixed(1)} CFM | Mat: ${h.material.val} | Finish: ${h.surfaceFinish.val}`;
    navigator.clipboard.writeText(text);
    setCopiedId(h.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportCSV = () => {
    if (history.length === 0) return;

    const headers = [
      'Log ID',
      'Timestamp',
      'Power (W)',
      'Heat Source Area (mm2)',
      'Heat Flux (W/cm2)',
      'Envelope Max Len (mm)',
      'Envelope Max Wid (mm)',
      'Envelope Max Hgt (mm)',
      'Ambient Temp (C)',
      'Airflow Mode',
      'Predicted Length (mm)',
      'Predicted Width (mm)',
      'Predicted Height (mm)',
      'Fin Count',
      'Airflow (CFM)',
      'Material Selection',
      'Surface Finish',
      'Fan Category',
      'Icepak Junction Temp (C)',
      'Icepak Thermal Res (C/W)',
      'Icepak Pressure Drop (Pa)',
      'Recommendation'
    ];

    const rows = history.map((h) => [
      `"${h.id}"`,
      `"${h.timestamp}"`,
      h.inputs.power,
      h.inputs.area,
      h.inputs.flux.toFixed(2),
      h.inputs.maxLen,
      h.inputs.maxWid,
      h.inputs.maxHgt,
      h.inputs.temp,
      h.inputs.forced ? 'Forced Convection' : 'Natural Convection',
      h.regression.hs_len.toFixed(1),
      h.regression.hs_wid.toFixed(1),
      h.regression.hs_hgt.toFixed(1),
      h.regression.fins,
      h.regression.cfm.toFixed(1),
      `"${h.material.val}"`,
      `"${h.surfaceFinish.val}"`,
      `"${h.fanCategory.val}"`,
      h.icepak ? h.icepak.junctionTemp : 'N/A',
      h.icepak ? h.icepak.thermalResistance : 'N/A',
      h.icepak ? h.icepak.pressureDrop : 'N/A',
      `"${h.recommendation.replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `thermalml_prediction_history_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-circuit-card border border-slate-800/80 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-blue-400" />
          <div>
            <h3 className="text-sm font-bold text-slate-100 font-serif-tnr">Inference History Logs</h3>
            <p className="text-xs text-slate-400 font-serif-tnr">
              {history.length} evaluation{history.length === 1 ? '' : 's'} recorded in current session
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 w-40 sm:w-44 font-serif-tnr"
            />
          </div>

          {/* Export CSV Button */}
          {history.length > 0 && (
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow-md cursor-pointer font-serif-tnr"
              title="Download full history as CSV for offline analysis"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          )}

          {/* Clear Button */}
          {history.length > 0 && (
            <button
              onClick={onClearHistory}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-semibold transition-colors cursor-pointer font-serif-tnr"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* History List Table */}
      {history.length === 0 ? (
        <div className="text-center py-12 space-y-2">
          <History className="w-8 h-8 text-slate-600 mx-auto stroke-1" />
          <p className="text-xs text-slate-400 font-medium">No predictions recorded yet.</p>
          <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
            Run an ML evaluation in the Predict tab to save and compare heat sink recommendations.
          </p>
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="text-center py-8 text-xs text-slate-400">
          No history entries match your filter search.
        </div>
      ) : (
        <div className="divide-y divide-slate-800/60">
          {filteredHistory.map((h) => (
            <div
              key={h.id}
              onClick={() => onSelectPrediction(h)}
              className="py-3.5 px-2 hover:bg-slate-800/40 rounded-xl transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
            >
              {/* Left Side: Power & Material Badges */}
              <div className="flex items-center gap-3">
                <div className="w-12 text-center py-1 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-xs font-bold font-mono text-blue-400">{h.inputs.power}W</span>
                  <span className="text-[9px] text-slate-500 block uppercase">Power</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-bold border"
                      style={{
                        backgroundColor: `${h.material.color}15`,
                        borderColor: `${h.material.color}40`,
                        color: h.material.color,
                      }}
                    >
                      {h.material.val}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-bold border"
                      style={{
                        backgroundColor: `${h.surfaceFinish.color}15`,
                        borderColor: `${h.surfaceFinish.color}40`,
                        color: h.surfaceFinish.color,
                      }}
                    >
                      {h.surfaceFinish.val}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-bold border"
                      style={{
                        backgroundColor: `${h.fanCategory.color}15`,
                        borderColor: `${h.fanCategory.color}40`,
                        color: h.fanCategory.color,
                      }}
                    >
                      {h.fanCategory.val}
                    </span>
                  </div>

                  <div className="text-xs text-slate-300 font-mono">
                    {h.regression.hs_len.toFixed(1)} × {h.regression.hs_wid.toFixed(1)} × {h.regression.hs_hgt.toFixed(1)} mm ·{' '}
                    <span className="text-indigo-400">{h.regression.fins} fins</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Airflow & Actions */}
              <div className="flex items-center gap-4 self-end sm:self-auto">
                <div className="text-right">
                  <span className="text-xs font-bold font-mono text-sky-400 block">
                    {h.regression.cfm.toFixed(0)} CFM
                  </span>
                  <span className="text-[10px] text-slate-500">{h.timestamp}</span>
                </div>

                <button
                  onClick={(e) => handleCopySingle(e, h)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-slate-700"
                  title="Copy log entry"
                >
                  {copiedId === h.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>

                <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { ThermalInputs, PredictionResult } from '../types/thermal';
import { runPrediction, PRESET_CONFIGS } from '../utils/thermalModel';
import { HeatSinkVisualizer } from './HeatSinkVisualizer';
import {
  Flame,
  Zap,
  Maximize2,
  Thermometer,
  Wind,
  Box,
  Layers,
  Fan,
  Cpu,
  Sparkles,
  Check,
  Copy,
  Clock,
  RotateCcw,
  Sliders,
  Activity
} from 'lucide-react';

interface PredictTabProps {
  onNewPrediction: (prediction: PredictionResult) => void;
  latestPrediction: PredictionResult | null;
}

export const PredictTab: React.FC<PredictTabProps> = ({ onNewPrediction, latestPrediction }) => {
  // Input State initialized with defaults
  const [inputs, setInputs] = useState<ThermalInputs>({
    power: 120,
    flux: 0.75,
    area: 1600,
    len: 100,
    wid: 100,
    hgt: 50,
    temp: 35,
    forced: true,
  });

  const [isCalculating, setIsCalculating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (key: keyof ThermalInputs, value: number | boolean) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handlePredict = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const res = runPrediction(inputs);
      onNewPrediction(res);
      setIsCalculating(false);
    }, 250); // subtle calculation animation pulse
  };

  const loadPreset = (presetInputs: ThermalInputs) => {
    setInputs(presetInputs);
    const res = runPrediction(presetInputs);
    onNewPrediction(res);
  };

  const handleCopyReport = () => {
    if (!latestPrediction) return;
    const { regression, material, surfaceFinish, fanCategory, volume, recommendation } = latestPrediction;
    const text = `ThermalML Recommendation Report
---------------------------------
Power: ${latestPrediction.inputs.power} W | Flux: ${latestPrediction.inputs.flux} W/cm²
Heat Sink Geometry: ${regression.hs_len.toFixed(1)} x ${regression.hs_wid.toFixed(1)} x ${regression.hs_hgt.toFixed(1)} mm
Fins Count: ${regression.fins} | Volume: ${volume} cm³
Airflow Required: ${regression.cfm.toFixed(1)} CFM
Material: ${material.val} (${(material.conf * 100).toFixed(0)}% confidence)
Surface Finish: ${surfaceFinish.val} (${(surfaceFinish.conf * 100).toFixed(0)}% confidence)
Fan Class: ${fanCategory.val} (${(fanCategory.conf * 100).toFixed(0)}% confidence)

Recommendation:
${recommendation}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Preset Quick Loader */}
      <div className="bg-circuit-card border border-slate-800/80 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-md backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Design Presets
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PRESET_CONFIGS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => loadPreset(p.inputs)}
              className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 transition-all text-left flex flex-col cursor-pointer"
            >
              <span className="font-semibold text-blue-400">{p.label}</span>
              <span className="text-[10px] text-slate-400 truncate">{p.description}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Form Parameters (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card 1: Heat Source */}
          <div className="bg-circuit-card border border-slate-800/80 rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2">
              <Flame className="w-4 h-4 text-orange-400" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Heat Source Specifications
              </h3>
            </div>


            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs text-slate-300 font-medium">Power Dissipation (W)</label>
                  <span className="text-xs font-mono font-bold text-blue-400">{inputs.power} W</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="300"
                  step="5"
                  value={inputs.power}
                  onChange={(e) => handleInputChange('power', parseFloat(e.target.value))}
                  className="w-full accent-blue-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                  <span>10 W</span>
                  <span>300 W</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs text-slate-300 font-medium">Heat Flux (W/cm²)</label>
                  <span className="text-xs font-mono font-bold text-orange-400">{inputs.flux.toFixed(2)} W/cm²</span>
                </div>
                <input
                  type="number"
                  min="0.01"
                  max="60"
                  step="0.01"
                  value={inputs.flux}
                  onChange={(e) => handleInputChange('flux', parseFloat(e.target.value) || 0.01)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs text-slate-300 font-medium">Heat Source Area (mm²)</label>
                  <span className="text-xs font-mono font-bold text-slate-300">{inputs.area} mm²</span>
                </div>
                <input
                  type="number"
                  min="400"
                  max="6400"
                  step="100"
                  value={inputs.area}
                  onChange={(e) => handleInputChange('area', parseFloat(e.target.value) || 400)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Geometry Constraints */}
          <div className="bg-circuit-card border border-slate-800/80 rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2">
              <Maximize2 className="w-4 h-4 text-blue-400" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Geometry Envelope Constraints
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Length (mm)</label>
                <input
                  type="number"
                  min="60"
                  max="200"
                  value={inputs.len}
                  onChange={(e) => handleInputChange('len', parseFloat(e.target.value) || 60)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Width (mm)</label>
                <input
                  type="number"
                  min="60"
                  max="200"
                  value={inputs.wid}
                  onChange={(e) => handleInputChange('wid', parseFloat(e.target.value) || 60)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">Available Height (mm)</label>
              <input
                type="number"
                min="20"
                max="80"
                value={inputs.hgt}
                onChange={(e) => handleInputChange('hgt', parseFloat(e.target.value) || 20)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Card 3: Environment */}
          <div className="bg-circuit-card border border-slate-800/80 rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2">
              <Thermometer className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Operating Environment
              </h3>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs text-slate-300 font-medium">Ambient Temperature (°C)</label>
                <span className="text-xs font-mono font-bold text-emerald-400">{inputs.temp} °C</span>
              </div>
              <input
                type="range"
                min="20"
                max="55"
                value={inputs.temp}
                onChange={(e) => handleInputChange('temp', parseFloat(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Forced Air Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-medium text-slate-200">Forced Air Cooling</span>
              </div>
              <button
                type="button"
                onClick={() => handleInputChange('forced', !inputs.forced)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  inputs.forced ? 'bg-blue-600' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    inputs.forced ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Run Prediction Button */}
          <button
            onClick={handlePredict}
            disabled={isCalculating}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white font-semibold text-sm rounded-2xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer border border-blue-400/30 active:scale-[0.98]"
          >
            {isCalculating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Running ML Ensemble Inference...</span>
              </>
            ) : (
              <>
                <Cpu className="w-4 h-4" />
                <span>Run ML Prediction</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Output Results (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {!latestPrediction ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[460px] space-y-3">
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-slate-500">
                <Box className="w-10 h-10 stroke-[1.5]" />
              </div>
              <h3 className="text-base font-semibold text-slate-200">No Active Inference</h3>
              <p className="text-xs text-slate-400 max-w-sm">
                Adjust input parameters on the left or load a preset, then click <strong className="text-blue-400">Run ML Prediction</strong> to evaluate thermal dimensions.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Interactive Visualizer */}
              <HeatSinkVisualizer prediction={latestPrediction} />

              {/* Calculated Heat Sink Geometry Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Box className="w-4 h-4 text-blue-400" />
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Calculated Heat Sink Dimensions
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    Predicted at {latestPrediction.timestamp}
                  </span>
                </div>

                {/* Geometry Metrics Grid */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 text-center">
                    <span className="text-xl font-bold font-mono text-blue-400">
                      {latestPrediction.regression.hs_len.toFixed(1)}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">Length (mm)</span>
                  </div>
                  <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 text-center">
                    <span className="text-xl font-bold font-mono text-blue-400">
                      {latestPrediction.regression.hs_wid.toFixed(1)}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">Width (mm)</span>
                  </div>
                  <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 text-center">
                    <span className="text-xl font-bold font-mono text-blue-400">
                      {latestPrediction.regression.hs_hgt.toFixed(1)}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">Height (mm)</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 text-center">
                    <span className="text-xl font-bold font-mono text-indigo-400">
                      {latestPrediction.regression.fins}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">Fin Count</span>
                  </div>
                  <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 text-center">
                    <span className="text-xl font-bold font-mono text-sky-400">
                      {latestPrediction.regression.cfm.toFixed(1)}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">Fan CFM</span>
                  </div>
                  <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 text-center">
                    <span className="text-xl font-bold font-mono text-emerald-400">
                      {latestPrediction.volume}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">Volume (cm³)</span>
                  </div>
                </div>
              </div>

              {/* Material & Fan Classification Confidence */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Material & Fan Classification
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Material */}
                  <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 space-y-2">
                    <span className="text-[11px] text-slate-400 font-medium block">Material</span>
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold border"
                        style={{
                          backgroundColor: `${latestPrediction.material.color}20`,
                          borderColor: `${latestPrediction.material.color}40`,
                          color: latestPrediction.material.color
                        }}>
                        {latestPrediction.material.val}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {(latestPrediction.material.conf * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(latestPrediction.material.conf * 100).toFixed(0)}%`,
                          backgroundColor: latestPrediction.material.color
                        }}
                      />
                    </div>
                  </div>

                  {/* Surface Finish */}
                  <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 space-y-2">
                    <span className="text-[11px] text-slate-400 font-medium block">Surface Finish</span>
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold border"
                        style={{
                          backgroundColor: `${latestPrediction.surfaceFinish.color}20`,
                          borderColor: `${latestPrediction.surfaceFinish.color}40`,
                          color: latestPrediction.surfaceFinish.color
                        }}>
                        {latestPrediction.surfaceFinish.val}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {(latestPrediction.surfaceFinish.conf * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(latestPrediction.surfaceFinish.conf * 100).toFixed(0)}%`,
                          backgroundColor: latestPrediction.surfaceFinish.color
                        }}
                      />
                    </div>
                  </div>

                  {/* Fan Category */}
                  <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 space-y-2">
                    <span className="text-[11px] text-slate-400 font-medium block">Fan Category</span>
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold border"
                        style={{
                          backgroundColor: `${latestPrediction.fanCategory.color}20`,
                          borderColor: `${latestPrediction.fanCategory.color}40`,
                          color: latestPrediction.fanCategory.color
                        }}>
                        {latestPrediction.fanCategory.val}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {(latestPrediction.fanCategory.conf * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(latestPrediction.fanCategory.conf * 100).toFixed(0)}%`,
                          backgroundColor: latestPrediction.fanCategory.color
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Design Recommendation Text Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Engineering Recommendation
                  </h3>
                  <button
                    onClick={handleCopyReport}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors border border-slate-700 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy Report</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs leading-relaxed text-slate-300 bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 font-mono">
                  {latestPrediction.recommendation}
                </p>
              </div>

              {/* Ansys Icepak Solution Verification Mini Card */}
              {latestPrediction.icepak && (
                <div className="bg-circuit-card border border-blue-500/30 rounded-2xl p-4 space-y-3 shadow-md">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-blue-400 animate-pulse" />
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                        Ansys Icepak CFD Verification
                      </h3>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {latestPrediction.icepak.verifiedStatus} (Tj = {latestPrediction.icepak.junctionTemp}°C)
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs font-serif-tnr">
                    <div className="p-2 bg-slate-950/80 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Junction Temp</span>
                      <span className="font-mono font-bold text-orange-400">{latestPrediction.icepak.junctionTemp}°C</span>
                    </div>
                    <div className="p-2 bg-slate-950/80 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Thermal Res.</span>
                      <span className="font-mono font-bold text-blue-400">{latestPrediction.icepak.thermalResistance}°C/W</span>
                    </div>
                    <div className="p-2 bg-slate-950/80 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Press. Drop</span>
                      <span className="font-mono font-bold text-sky-400">{latestPrediction.icepak.pressureDrop} Pa</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { PredictionResult } from '../types/thermal';
import { Fan, Flame, ArrowRight, Layers, Box, Cpu } from 'lucide-react';

interface VisualizerProps {
  prediction: PredictionResult;
}

export const HeatSinkVisualizer: React.FC<VisualizerProps> = ({ prediction }) => {
  const { regression, material, surfaceFinish, inputs } = prediction;
  const { hs_len, hs_wid, hs_hgt, fins, cfm } = regression;

  // Determine material gradient / color
  let baseColor = '#94a3b8'; // default AL
  let finColor = '#cbd5e1';
  let accentBorder = '#64748b';

  if (material.val === 'Copper') {
    baseColor = '#c2410c';
    finColor = '#ea580c';
    accentBorder = '#9a3412';
  } else if (material.val === 'AL6061') {
    baseColor = '#475569';
    finColor = '#64748b';
    accentBorder = '#334155';
  } else if (surfaceFinish.val === 'Black Anodized') {
    baseColor = '#18181b';
    finColor = '#27272a';
    accentBorder = '#3f3f46';
  } else if (surfaceFinish.val === 'Anodized') {
    baseColor = '#3b82f6';
    finColor = '#60a5fa';
    accentBorder = '#2563eb';
  }

  // Calculate scaled fin lines for SVG visualization
  const finCount = Math.min(Math.max(fins, 4), 28);
  const finPositions = Array.from({ length: finCount }, (_, i) => {
    return 30 + (i * (200 / (finCount - 1 || 1)));
  });

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 backdrop-blur-md shadow-xl text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between z-10 mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Box className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            3D Schematic & Airflow Vector
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-0.5 rounded-full text-xs font-medium border"
            style={{ backgroundColor: `${material.color}15`, borderColor: `${material.color}40`, color: material.color }}>
            {material.val}
          </span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-300 font-mono text-[11px]">
            {hs_len.toFixed(0)}×{hs_wid.toFixed(0)}×{hs_hgt.toFixed(0)} mm
          </span>
        </div>
      </div>

      {/* Main SVG Render Canvas */}
      <div className="relative w-full h-52 flex items-center justify-center my-2 z-10">
        <svg viewBox="0 0 340 200" className="w-full h-full drop-shadow-2xl overflow-visible">
          <defs>
            <linearGradient id="heatGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#f97316" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="baseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={baseColor} />
              <stop offset="100%" stopColor={accentBorder} />
            </linearGradient>
          </defs>

          {/* Airflow Direction Indicators */}
          {inputs.forced && (
            <g className="animate-pulse">
              <path d="M 10 90 L 40 90 M 32 84 L 40 90 L 32 96" stroke="#38bdf8" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 10 110 L 40 110 M 32 104 L 40 110 L 32 116" stroke="#38bdf8" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <text x="12" y="75" fill="#38bdf8" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
                {cfm.toFixed(0)} CFM Airflow
              </text>
            </g>
          )}

          {/* Baseplate / Heat Spreader Isometric */}
          <polygon
            points="50,150 250,150 290,120 90,120"
            fill="url(#baseGradient)"
            stroke={accentBorder}
            strokeWidth="1.5"
          />
          <polygon
            points="50,150 250,150 250,165 50,165"
            fill={accentBorder}
            stroke={baseColor}
            strokeWidth="1"
          />

          {/* Heat Source Block (Die Base) */}
          <polygon
            points="120,165 180,165 195,155 135,155"
            fill="#dc2626"
            className="animate-pulse"
          />
          <text x="150" y="180" fill="#f87171" fontSize="9" textAnchor="middle" fontWeight="bold">
            Heat Source ({inputs.power}W)
          </text>

          {/* Heat dissipation glow */}
          <polygon
            points="50,150 250,150 290,120 90,120"
            fill="url(#heatGradient)"
          />

          {/* Fins Array */}
          {finPositions.map((xPos, idx) => {
            const h = Math.min(Math.max(hs_hgt * 1.3, 30), 80);
            return (
              <g key={idx}>
                {/* Fin face */}
                <polygon
                  points={`${xPos},120 ${xPos + 2},120 ${xPos + 2},${120 - h} ${xPos},${120 - h}`}
                  fill={finColor}
                  stroke={accentBorder}
                  strokeWidth="0.5"
                />
                {/* Fin top angle */}
                <polygon
                  points={`${xPos},${120 - h} ${xPos + 2},${120 - h} ${xPos + 18},${105 - h} ${xPos + 16},${105 - h}`}
                  fill={finColor}
                  opacity="0.8"
                />
              </g>
            );
          })}

          {/* Dimension Markers */}
          {/* Length */}
          <line x1="50" y1="158" x2="250" y2="158" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />
          <text x="150" y="156" fill="#cbd5e1" fontSize="9" textAnchor="middle" fontWeight="bold">
            L: {hs_len.toFixed(0)}mm
          </text>

          {/* Height */}
          <line x1="298" y1="120" x2="298" y2={120 - Math.min(Math.max(hs_hgt * 1.3, 30), 80)} stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />
          <text x="312" y={120 - (Math.min(Math.max(hs_hgt * 1.3, 30), 80) / 2)} fill="#cbd5e1" fontSize="9" textAnchor="middle" fontWeight="bold">
            H: {hs_hgt.toFixed(0)}mm
          </text>
        </svg>
      </div>

      {/* Bottom Summary Bar */}
      <div className="grid grid-cols-3 gap-2 bg-slate-950/60 rounded-xl p-2.5 border border-slate-800/80 z-10 text-center">
        <div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Fin Count</span>
          <span className="text-sm font-bold text-slate-100 flex items-center justify-center gap-1">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            {fins} Fins
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Heat Flux</span>
          <span className="text-sm font-bold text-slate-100 flex items-center justify-center gap-1">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            {inputs.flux.toFixed(2)} W/cm²
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Fan Requirement</span>
          <span className="text-sm font-bold text-slate-100 flex items-center justify-center gap-1">
            <Fan className="w-3.5 h-3.5 text-sky-400" />
            {cfm.toFixed(0)} CFM
          </span>
        </div>
      </div>
    </div>
  );
};

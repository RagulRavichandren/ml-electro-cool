import React, { useState, useEffect } from 'react';
import {
  Presentation,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  FileText,
  Copy,
  Check,
  Cpu,
  Flame,
  BarChart3,
  CheckCircle2,
  Box,
  Layers,
  Wind,
  Sparkles,
  Zap,
  Globe,
  Settings,
  HelpCircle,
  Database,
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  content: React.ReactNode;
  notes: string;
}

export const PresentationTab: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [copied, setCopied] = useState(false);

  // Auto-play timer
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const slides: Slide[] = [
    // SLIDE 1: Title
    {
      id: 1,
      category: 'Project Title',
      title: 'ThermalML — ML-Powered Electronic Cooling',
      subtitle: 'Heat Sink & Fan Selection Software via Physics-Informed Ensembles',
      notes: 'Welcome to the ThermalML presentation by Dept. of CSE (AI & ML), Mangayarkarasi College of Engineering. Presenting a Random Forest + XGBoost ensemble trained on 800 CFD cases.',
      content: (
        <div className="flex flex-col items-center justify-center text-center space-y-5 py-4 my-auto">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-500 to-blue-500 p-0.5 shadow-2xl shadow-orange-500/30 flex items-center justify-center my-1">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
              <Cpu className="w-10 h-10 text-amber-400 animate-pulse" />
            </div>
          </div>

          <div className="space-y-2 max-w-2xl">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-serif-tnr leading-none">
              ThermalML
            </h1>
            <p className="text-base sm:text-xl text-amber-400 font-serif-tnr font-semibold">
              ML-Powered Electronic Cooling: Heat Sink & Fan Selection
            </p>
            <p className="text-xs sm:text-sm text-slate-300 font-serif-tnr max-w-lg mx-auto">
              Random Forest + XGBoost Ensemble · 800 CFD Training Cases · Physics-Informed Model
            </p>
          </div>

          <div className="pt-3 border-t border-slate-800/80 w-full max-w-md space-y-1">
            <p className="text-xs text-slate-400 font-serif-tnr">
              Dept. of CSE (AI & ML) · Mangayarkarasi College of Engineering
            </p>
            <p className="text-xs font-bold text-slate-200 font-serif-tnr">
              Ragul R
            </p>
          </div>
        </div>
      ),
    },

    // SLIDE 2: Problem Statement
    {
      id: 2,
      category: 'Problem Statement',
      title: 'Why Manual Heat Sink Selection Fails',
      subtitle: 'Traditional thermal design workflows are bottlenecked by simulation cost, expert dependency, and limited scalability.',
      notes: 'Iterative numerical CFD simulations take hours to run, making rapid hardware dimensioning impossible during early development cycles.',
      content: (
        <div className="space-y-4 my-auto py-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-slate-900/90 border-t-2 border-t-orange-500 border-x border-b border-slate-800 p-3.5 rounded-xl space-y-1.5">
              <div className="text-xl">⏱</div>
              <h3 className="text-xs font-bold text-slate-100 font-serif-tnr">Time-Consuming</h3>
              <p className="text-[11px] text-slate-400 font-serif-tnr leading-relaxed">
                Traditional CFD simulations in ANSYS Fluent / OpenFOAM take hours to days per design iteration.
              </p>
            </div>

            <div className="bg-slate-900/90 border-t-2 border-t-orange-500 border-x border-b border-slate-800 p-3.5 rounded-xl space-y-1.5">
              <div className="text-xl">💸</div>
              <h3 className="text-xs font-bold text-slate-100 font-serif-tnr">High Cost</h3>
              <p className="text-[11px] text-slate-400 font-serif-tnr leading-relaxed">
                Expert thermal engineers and licensed simulation software cost thousands per project.
              </p>
            </div>

            <div className="bg-slate-900/90 border-t-2 border-t-orange-500 border-x border-b border-slate-800 p-3.5 rounded-xl space-y-1.5">
              <div className="text-xl">⚠️</div>
              <h3 className="text-xs font-bold text-slate-100 font-serif-tnr">Error-Prone</h3>
              <p className="text-[11px] text-slate-400 font-serif-tnr leading-relaxed">
                Manual selection from datasheets misses complex interactions between power, geometry, and ambient conditions.
              </p>
            </div>

            <div className="bg-slate-900/90 border-t-2 border-t-orange-500 border-x border-b border-slate-800 p-3.5 rounded-xl space-y-1.5">
              <div className="text-xl">🔁</div>
              <h3 className="text-xs font-bold text-slate-100 font-serif-tnr">Not Scalable</h3>
              <p className="text-[11px] text-slate-400 font-serif-tnr leading-relaxed">
                Industrial-scale electronics cooling requires evaluating hundreds of design variants simultaneously.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-blue-500/10 border border-orange-500/30 rounded-xl p-3 flex items-center gap-3">
            <ArrowRight className="w-5 h-5 text-orange-400 shrink-0" />
            <p className="text-xs text-slate-200 font-serif-tnr">
              <strong className="text-orange-400">ThermalML Solution:</strong> Replace iterative CFD with a trained ML ensemble that predicts optimal designs in milliseconds.
            </p>
          </div>
        </div>
      ),
    },

    // SLIDE 3: Data Pipeline
    {
      id: 3,
      category: 'Data Pipeline',
      title: 'Where the Training Data Comes From',
      subtitle: 'A multi-source dataset combining CFD simulations, industry standards, and real-world manufacturer catalogs.',
      notes: 'Combining CFD numerical simulations with JEDEC standards and manufacturer datasets ensures high practical fidelity.',
      content: (
        <div className="space-y-4 my-auto py-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl space-y-1.5">
              <span className="text-[10px] font-mono text-orange-400 block font-bold">PRIMARY</span>
              <h3 className="text-xs font-bold text-slate-100 font-serif-tnr">ANSYS Fluent</h3>
              <p className="text-[11px] text-slate-400 font-serif-tnr leading-relaxed">
                CFD simulations for forced convection heat sink geometries. Exports surface temperature and pressure drop data.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl space-y-1.5">
              <span className="text-[10px] font-mono text-orange-400 block font-bold">PRIMARY</span>
              <h3 className="text-xs font-bold text-slate-100 font-serif-tnr">OpenFOAM</h3>
              <p className="text-[11px] text-slate-400 font-serif-tnr leading-relaxed">
                Open-source CFD solver for parametric sweeps over fin count, geometry, and fan velocity profiles.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl space-y-1.5">
              <span className="text-[10px] font-mono text-blue-400 block font-bold">STANDARDS</span>
              <h3 className="text-xs font-bold text-slate-100 font-serif-tnr">JEDEC / ASHRAE</h3>
              <p className="text-[11px] text-slate-400 font-serif-tnr leading-relaxed">
                Standard operating conditions (JEDEC JESD51, ASHRAE A1–A4) used to set ambient temperature and airflow bounds.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl space-y-1.5">
              <span className="text-[10px] font-mono text-emerald-400 block font-bold">VALIDATION</span>
              <h3 className="text-xs font-bold text-slate-100 font-serif-tnr">Manufacturer Catalogs</h3>
              <p className="text-[11px] text-slate-400 font-serif-tnr leading-relaxed">
                Heat sink catalogs (Wakefield-Vette, Aavid, Boyd) and fan specs (Delta, Nidec, Sanyo Denki) for validation.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-slate-800/80 text-center">
            <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-base font-bold font-mono text-sky-400">800</span>
              <span className="text-[10px] text-slate-400 block font-serif-tnr">Design Cases Generated</span>
            </div>
            <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-base font-bold font-mono text-orange-400">10W – 300W</span>
              <span className="text-[10px] text-slate-400 block font-serif-tnr">Power Range</span>
            </div>
            <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-base font-bold font-mono text-indigo-400">8</span>
              <span className="text-[10px] text-slate-400 block font-serif-tnr">Input Features Captured</span>
            </div>
            <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-base font-bold font-mono text-emerald-400">11</span>
              <span className="text-[10px] text-slate-400 block font-serif-tnr">Output Targets</span>
            </div>
          </div>
        </div>
      ),
    },

    // SLIDE 4: Data Validation
    {
      id: 4,
      category: 'Data Validation',
      title: 'Ensuring Dataset Quality & Physical Consistency',
      subtitle: 'Six validation layers guarantee that every training case is physically meaningful and statistically clean.',
      notes: 'Outliers are removed via IQR bounds and cross-verified against real manufacturer datasheets to prevent unphysical geometry recommendations.',
      content: (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-auto py-1">
          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl space-y-1">
            <span className="text-[10px] font-mono font-bold text-orange-400">01. Range Validation</span>
            <h4 className="text-xs font-bold text-slate-100 font-serif-tnr">Physical Clamping</h4>
            <p className="text-[11px] text-slate-400 font-serif-tnr leading-relaxed">
              Power: 10–300W · Flux: 0.01–60 W/cm² · Ambient: 20–55°C. Geometry within JEDEC JESD51-2.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl space-y-1">
            <span className="text-[10px] font-mono font-bold text-orange-400">02. Physics Consistency</span>
            <h4 className="text-xs font-bold text-slate-100 font-serif-tnr">Sanity Rules</h4>
            <p className="text-[11px] text-slate-400 font-serif-tnr leading-relaxed">
              fan_cfm &gt; 0 for forced cooling, fin count increases monotonically with power, HS volume ≤ envelope.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl space-y-1">
            <span className="text-[10px] font-mono font-bold text-orange-400">03. Outlier Removal</span>
            <h4 className="text-xs font-bold text-slate-100 font-serif-tnr">IQR Filtering</h4>
            <p className="text-[11px] text-slate-400 font-serif-tnr leading-relaxed">
              IQR method (Q1 − 1.5×IQR to Q3 + 1.5×IQR) applied. Unphysical outliers replaced via re-simulation.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl space-y-1">
            <span className="text-[10px] font-mono font-bold text-orange-400">04. Datasheet Cross-Check</span>
            <h4 className="text-xs font-bold text-slate-100 font-serif-tnr">Catalog Match</h4>
            <p className="text-[11px] text-slate-400 font-serif-tnr leading-relaxed">
              20% of cases compared against Aavid / Wakefield catalogs. Max 8% deviation accepted.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl space-y-1">
            <span className="text-[10px] font-mono font-bold text-orange-400">05. Train/Test Integrity</span>
            <h4 className="text-xs font-bold text-slate-100 font-serif-tnr">Stratified 80/20</h4>
            <p className="text-[11px] text-slate-400 font-serif-tnr leading-relaxed">
              Stratified split on power_W bands prevents data leakage. Verified via MD5 hash integrity checks.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl space-y-1">
            <span className="text-[10px] font-mono font-bold text-orange-400">06. Label Consistency</span>
            <h4 className="text-xs font-bold text-slate-100 font-serif-tnr">Thermodynamics</h4>
            <p className="text-[11px] text-slate-400 font-serif-tnr leading-relaxed">
              Copper assigned only when power &gt; 200W matching conduction thermodynamics Q = k·A·ΔT/d.
            </p>
          </div>
        </div>
      ),
    },

    // SLIDE 5: Model I/O
    {
      id: 5,
      category: 'Model I/O',
      title: 'System Inputs & Predicted Outputs',
      subtitle: '8 input features → 8 predicted outputs spanning regression (geometry, airflow) and classification (material, finish, fan class).',
      notes: 'Inputs cover electronic dissipated power and geometric envelopes, mapping directly to heat sink length, width, height, fin density, and material properties.',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-auto py-1">
          {/* Inputs Column */}
          <div className="bg-slate-900/90 border border-orange-500/30 p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>⬇</span> 8 System Input Features
              </h3>
              <span className="text-[10px] font-mono text-slate-400">Feature Vector X</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 font-serif-tnr">
              <li className="flex justify-between"><span>Power Dissipation:</span> <strong className="font-mono text-slate-100">10 – 300 W</strong></li>
              <li className="flex justify-between"><span>Heat Flux:</span> <strong className="font-mono text-slate-100">0.01 – 60 W/cm²</strong></li>
              <li className="flex justify-between"><span>Source Heat Area:</span> <strong className="font-mono text-slate-100">400 – 6400 mm²</strong></li>
              <li className="flex justify-between"><span>Available Length:</span> <strong className="font-mono text-slate-100">60 – 200 mm</strong></li>
              <li className="flex justify-between"><span>Available Width:</span> <strong className="font-mono text-slate-100">60 – 200 mm</strong></li>
              <li className="flex justify-between"><span>Available Height:</span> <strong className="font-mono text-slate-100">20 – 80 mm</strong></li>
              <li className="flex justify-between"><span>Ambient Temperature:</span> <strong className="font-mono text-slate-100">20 – 55 °C</strong></li>
              <li className="flex justify-between"><span>Forced Cooling Mode:</span> <strong className="font-mono text-blue-400">Binary (0 / 1)</strong></li>
            </ul>
          </div>

          {/* Outputs Column */}
          <div className="bg-slate-900/90 border border-blue-500/30 p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>⬆</span> 8 Predicted Model Outputs
              </h3>
              <span className="text-[10px] font-mono text-slate-400">Predictions Ŷ</span>
            </div>
            <div className="space-y-2 text-xs font-serif-tnr">
              <div>
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block mb-1">Regression Dimensions:</span>
                <p className="text-slate-300 font-mono text-[11px]">
                  Length (mm) · Width (mm) · Height (mm) · Fin Count · Fan CFM
                </p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">Classification Categories:</span>
                <p className="text-slate-300 font-mono text-[11px]">
                  Material (AL1050 / AL6061 / Copper)<br />
                  Surface Finish (Natural / Anodized / Black)<br />
                  Fan Class (Low / Medium / High CFM)
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // SLIDE 6: Algorithms
    {
      id: 6,
      category: 'Algorithms',
      title: 'Ensemble ML Framework Architecture',
      subtitle: 'Two complementary tree-based learners combined via soft-voting to balance bias, variance, and calibration.',
      notes: 'Random Forest mitigates variance through bagging while XGBoost minimizes bias through gradient boosting, combining into a highly robust ensemble.',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-auto py-1">
          <div className="bg-slate-900/90 border-t-2 border-t-emerald-500 border-x border-b border-slate-800 p-3.5 rounded-xl space-y-2">
            <h3 className="text-xs font-bold text-emerald-400 font-serif-tnr flex items-center gap-1.5">
              <span>🌳</span> Random Forest Regressor
            </h3>
            <ul className="text-xs text-slate-300 space-y-1 font-mono">
              <li>• n_estimators: 200 trees</li>
              <li>• max_depth: 12</li>
              <li>• n_jobs: -1 (parallel)</li>
              <li>• feature_sampling: sqrt(N)</li>
              <li>• Aggregation: Bootstrap</li>
            </ul>
          </div>

          <div className="bg-slate-900/90 border-t-2 border-t-orange-500 border-x border-b border-slate-800 p-3.5 rounded-xl space-y-2">
            <h3 className="text-xs font-bold text-orange-400 font-serif-tnr flex items-center gap-1.5">
              <span>⚡</span> XGBoost Regressor
            </h3>
            <ul className="text-xs text-slate-300 space-y-1 font-mono">
              <li>• n_estimators: 200</li>
              <li>• learning_rate: 0.05</li>
              <li>• max_depth: 6</li>
              <li>• subsample: 0.8</li>
              <li>• colsample_bytree: 0.8</li>
            </ul>
          </div>

          <div className="bg-slate-900/90 border-t-2 border-t-blue-500 border-x border-b border-slate-800 p-3.5 rounded-xl space-y-2">
            <h3 className="text-xs font-bold text-blue-400 font-serif-tnr flex items-center gap-1.5">
              <span>🔗</span> Ensemble Strategy
            </h3>
            <div className="text-[11px] font-mono text-slate-300 space-y-1 bg-slate-950 p-2 rounded-lg border border-slate-800">
              <p><strong className="text-sky-300">Regression:</strong><br />Ŷ = (RF_pred + XGB_pred) / 2</p>
              <p><strong className="text-orange-300">Classification:</strong><br />Class = argmax((RF_prob + XGB_prob)/2)</p>
            </div>
          </div>
        </div>
      ),
    },

    // SLIDE 7: Pipeline
    {
      id: 7,
      category: 'Pipeline',
      title: 'End-to-End ML Execution Pipeline',
      subtitle: 'Six sequential stages from raw CFD data to validated thermal design predictions.',
      notes: 'Every stage maintains strict physics validation checks, ensuring predictions respect thermal boundary conditions.',
      content: (
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 my-auto py-2">
          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl space-y-1">
            <span className="text-[10px] font-mono font-bold text-orange-400">01. Collection</span>
            <h4 className="text-xs font-bold text-slate-100 font-serif-tnr">CFD Runs</h4>
            <p className="text-[10px] text-slate-400 font-serif-tnr leading-tight">
              ANSYS & OpenFOAM CFD data (800 cases).
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl space-y-1">
            <span className="text-[10px] font-mono font-bold text-orange-400">02. Validation</span>
            <h4 className="text-xs font-bold text-slate-100 font-serif-tnr">Cleaning</h4>
            <p className="text-[10px] text-slate-400 font-serif-tnr leading-tight">
              Range checks & IQR outlier filtering.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl space-y-1">
            <span className="text-[10px] font-mono font-bold text-orange-400">03. Features</span>
            <h4 className="text-xs font-bold text-slate-100 font-serif-tnr">Preprocess</h4>
            <p className="text-[10px] text-slate-400 font-serif-tnr leading-tight">
              StandardScaler & LabelEncoder.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl space-y-1">
            <span className="text-[10px] font-mono font-bold text-orange-400">04. Training</span>
            <h4 className="text-xs font-bold text-slate-100 font-serif-tnr">Fit Models</h4>
            <p className="text-[10px] text-slate-400 font-serif-tnr leading-tight">
              RF + XGBoost fit across 8 targets.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl space-y-1">
            <span className="text-[10px] font-mono font-bold text-orange-400">05. Ensemble</span>
            <h4 className="text-xs font-bold text-slate-100 font-serif-tnr">Prediction</h4>
            <p className="text-[10px] text-slate-400 font-serif-tnr leading-tight">
              Averaging & soft-voting aggregation.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl space-y-1">
            <span className="text-[10px] font-mono font-bold text-emerald-400">06. Evaluation</span>
            <h4 className="text-xs font-bold text-slate-100 font-serif-tnr">5-Fold CV</h4>
            <p className="text-[10px] text-slate-400 font-serif-tnr leading-tight">
              R², RMSE, MAE metrics verification.
            </p>
          </div>
        </div>
      ),
    },

    // SLIDE 8: Results
    {
      id: 8,
      category: 'Results',
      title: 'Model Benchmarks & Performance Metrics',
      subtitle: 'Evaluated across 800 synthetic CFD benchmark cases using 5-fold cross validation.',
      notes: 'Overall average R² score reaches 0.937 across dimensional targets, with classification accuracy up to 100% for material and surface finish selection.',
      content: (
        <div className="space-y-4 my-auto py-1">
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-xl">
              <span className="text-lg font-bold font-mono text-emerald-400 block">0.937</span>
              <span className="text-[10px] text-slate-400 font-serif-tnr">Avg R² Score</span>
            </div>
            <div className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-xl">
              <span className="text-lg font-bold font-mono text-blue-400 block">98.3%</span>
              <span className="text-[10px] text-slate-400 font-serif-tnr">Avg Classification Acc</span>
            </div>
            <div className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-xl">
              <span className="text-lg font-bold font-mono text-indigo-400 block">6.59</span>
              <span className="text-[10px] text-slate-400 font-serif-tnr">Avg RMSE</span>
            </div>
            <div className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-xl">
              <span className="text-lg font-bold font-mono text-orange-400 block">5-Fold</span>
              <span className="text-[10px] text-slate-400 font-serif-tnr">Cross-Validated</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-serif-tnr">
            <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl space-y-1">
              <h4 className="font-bold text-sky-400 border-b border-slate-800 pb-1 text-[11px]">
                Regression Performance
              </h4>
              <div className="space-y-1 font-mono text-[11px]">
                <div className="flex justify-between"><span>Fan CFM:</span> <strong className="text-emerald-400">R² = 0.977</strong></div>
                <div className="flex justify-between"><span>Fin Count:</span> <strong className="text-emerald-400">R² = 0.935</strong></div>
                <div className="flex justify-between"><span>HS Length:</span> <strong className="text-emerald-400">R² = 0.916</strong></div>
                <div className="flex justify-between"><span>HS Width:</span> <strong className="text-emerald-400">R² = 0.907</strong></div>
                <div className="flex justify-between"><span>HS Height:</span> <strong className="text-amber-400">R² = 0.878</strong></div>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl space-y-1">
              <h4 className="font-bold text-emerald-400 border-b border-slate-800 pb-1 text-[11px]">
                Classification Accuracy & Features
              </h4>
              <div className="space-y-1 font-mono text-[11px]">
                <div className="flex justify-between"><span>Material Selection:</span> <strong className="text-emerald-400">100.0%</strong></div>
                <div className="flex justify-between"><span>Surface Finish:</span> <strong className="text-emerald-400">100.0%</strong></div>
                <div className="flex justify-between"><span>Fan Category:</span> <strong className="text-emerald-400">95.0%</strong></div>
                <p className="text-[10px] text-amber-300 font-serif-tnr pt-1 border-t border-slate-800">
                  Top Feature: Power (0.412) · Forced Air (0.198) · Heat Flux (0.134)
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // SLIDE 9: Applications
    {
      id: 9,
      category: 'Applications',
      title: 'Electronic Cooling Use Cases',
      subtitle: 'Deployable across industries where thermal management directly impacts reliability, cost, and performance.',
      notes: 'From high-power server racks to compact automotive ECUs, ThermalML adapts sizing predictions to specific domain constraints.',
      content: (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-auto py-1">
          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl space-y-1">
            <div className="text-lg">🖥</div>
            <h4 className="text-xs font-bold text-slate-100 font-serif-tnr">Server & Data Centers</h4>
            <p className="text-[11px] text-slate-400 font-serif-tnr leading-relaxed">
              Auto-select heat sinks for CPUs/GPUs under variable TDP loads. Reduces CAPEX by preventing over-engineering.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl space-y-1">
            <div className="text-lg">⚡</div>
            <h4 className="text-xs font-bold text-slate-100 font-serif-tnr">Power Electronics</h4>
            <p className="text-[11px] text-slate-400 font-serif-tnr leading-relaxed">
              Fast selection for IGBT/MOSFET inverter modules where switching losses generate high localized heat flux (&gt;5 W/cm²).
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl space-y-1">
            <div className="text-lg">🚗</div>
            <h4 className="text-xs font-bold text-slate-100 font-serif-tnr">Automotive ECUs</h4>
            <p className="text-[11px] text-slate-400 font-serif-tnr leading-relaxed">
              Thermal design for engine control units operating at 45–85°C ambient under hood. AL6061 anodized sinks most common.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl space-y-1">
            <div className="text-lg">📡</div>
            <h4 className="text-xs font-bold text-slate-100 font-serif-tnr">Telecom Base Stations</h4>
            <p className="text-[11px] text-slate-400 font-serif-tnr leading-relaxed">
              High-power RF amplifiers (50–300W) under 24/7 continuous load. Copper or AL6061 with Black Anodized finish.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl space-y-1">
            <div className="text-lg">💡</div>
            <h4 className="text-xs font-bold text-slate-100 font-serif-tnr">LED Drivers</h4>
            <p className="text-[11px] text-slate-400 font-serif-tnr leading-relaxed">
              Moderate power (10–80W) with compact geometry constraints. AL1050 natural finish typically sufficient.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl space-y-1">
            <div className="text-lg">🏭</div>
            <h4 className="text-xs font-bold text-slate-100 font-serif-tnr">Industrial Control</h4>
            <p className="text-[11px] text-slate-400 font-serif-tnr leading-relaxed">
              Wide ambient range (20–55°C), forced cooling common. Identifies when fan upgrade is needed vs passive sink.
            </p>
          </div>
        </div>
      ),
    },

    // SLIDE 10: Future Scope
    {
      id: 10,
      category: 'Future Scope',
      title: 'Enhancements & Next Steps Roadmap',
      subtitle: 'Roadmap toward production-grade accuracy, deployment, and ECAD integration.',
      notes: 'Future iterations will integrate deep learning Graph Neural Networks and real-time CFD API connectors.',
      content: (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-auto py-1">
          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl space-y-1">
            <div className="text-lg">🧠</div>
            <h4 className="text-xs font-bold text-slate-100 font-serif-tnr">Deep Learning (GNNs)</h4>
            <p className="text-[11px] text-slate-400 font-serif-tnr leading-relaxed">
              Replace ensembles with physics-informed Graph Neural Networks for complex 3D non-rectilinear shapes.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl space-y-1">
            <div className="text-lg">📊</div>
            <h4 className="text-xs font-bold text-slate-100 font-serif-tnr">Real CFD Stream</h4>
            <p className="text-[11px] text-slate-400 font-serif-tnr leading-relaxed">
              Direct transfer learning from 1000+ experimental ANSYS Fluent simulation files for maximum fidelity.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl space-y-1">
            <div className="text-lg">♻️</div>
            <h4 className="text-xs font-bold text-slate-100 font-serif-tnr">Active Learning Loop</h4>
            <p className="text-[11px] text-slate-400 font-serif-tnr leading-relaxed">
              Model queries new CFD runs only for uncertain design regions, reducing total simulation cost by 60–70%.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl space-y-1">
            <div className="text-lg">🌐</div>
            <h4 className="text-xs font-bold text-slate-100 font-serif-tnr">Web Microservices</h4>
            <p className="text-[11px] text-slate-400 font-serif-tnr leading-relaxed">
              FastAPI + React REST API wrapper allowing thermal engineers to query predictions seamlessly in browser.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl space-y-1">
            <div className="text-lg">📱</div>
            <h4 className="text-xs font-bold text-slate-100 font-serif-tnr">ECAD Integration</h4>
            <p className="text-[11px] text-slate-400 font-serif-tnr leading-relaxed">
              Plugin for Altium Designer / KiCad to auto-recommend thermal components directly during PCB layout.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl space-y-1">
            <div className="text-lg">⚗️</div>
            <h4 className="text-xs font-bold text-slate-100 font-serif-tnr">Multi-Objective Pareto</h4>
            <p className="text-[11px] text-slate-400 font-serif-tnr leading-relaxed">
              Pareto front optimization balancing thermal resistance, weight, cost, and acoustic noise simultaneously.
            </p>
          </div>
        </div>
      ),
    },

    // SLIDE 11: Thank You
    {
      id: 11,
      category: 'Conclusion',
      title: 'Thank You',
      subtitle: 'ThermalML — ML-Based Electronic Cooling Design',
      notes: 'Thank you for reviewing the ThermalML project deck. Open for technical questions and discussion.',
      content: (
        <div className="flex flex-col items-center justify-center text-center space-y-5 py-6 my-auto">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-500 to-blue-500 p-0.5 shadow-2xl shadow-orange-500/30 flex items-center justify-center">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-amber-400 animate-pulse" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-blue-400 font-serif-tnr">
              Thank You
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-serif-tnr">
              ThermalML — ML-Based Electronic Cooling Design
            </p>
          </div>

          <div className="space-y-1.5 text-xs text-slate-400 font-serif-tnr border-t border-slate-800/80 pt-4 w-full max-w-md">
            <p>Dept. of CSE (AI & ML) · Mangayarkarasi College of Engineering</p>
            <p className="font-bold text-slate-200">Ragul R</p>
            <p className="text-amber-400 font-mono pt-1">Random Forest + XGBoost Ensemble · Avg R² 0.937 · Accuracy 98.3%</p>
          </div>

          <div className="px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-mono font-bold tracking-wider uppercase">
            Questions & Discussion
          </div>
        </div>
      ),
    },
  ];

  const current = slides[currentSlide];

  const handleCopyOutline = () => {
    const text = slides
      .map(
        (s) => `Slide ${s.id}: ${s.title}\nCategory: ${s.category}\nSubtitle: ${s.subtitle}\nNotes: ${s.notes}\n---\n`
      )
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Slide Deck Navigation Header */}
      <div className="bg-circuit-card border border-slate-800/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
            <Presentation className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100 font-serif-tnr">
              ThermalML Presentation Deck (11 Slides)
            </h2>
            <p className="text-xs text-slate-400 font-serif-tnr">
              Slide {currentSlide + 1} of {slides.length} · {current.category}
            </p>
          </div>
        </div>

        {/* Controls Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer font-serif-tnr ${
              isPlaying
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause' : 'Auto Play'}</span>
          </button>

          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer font-serif-tnr ${
              showNotes
                ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Presenter Notes</span>
          </button>

          <button
            onClick={handleCopyOutline}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold transition-all cursor-pointer font-serif-tnr"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy PPT Text'}</span>
          </button>
        </div>
      </div>

      {/* Main Presentation View Screen */}
      <div className="relative bg-circuit-card border-2 border-slate-800 rounded-2xl min-h-[460px] p-6 sm:p-8 shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Background circuit glow effect */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Slide Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/20 font-serif-tnr">
              {current.category}
            </span>
            <span className="text-xs text-slate-500 font-serif-tnr">• Slide {current.id} of {slides.length}</span>
          </div>

          <div className="text-xs text-slate-400 font-serif-tnr font-semibold">
            ThermalML Academic Presentation
          </div>
        </div>

        {/* Slide Body */}
        <div className="my-4 z-10 flex flex-col justify-center min-h-[280px]">
          {current.id !== 1 && current.id !== 11 && (
            <div className="mb-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white font-serif-tnr">
                {current.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-serif-tnr mt-0.5">
                {current.subtitle}
              </p>
            </div>
          )}

          {current.content}
        </div>

        {/* Slide Footer Controls */}
        <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 z-10">
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700/80 transition-all cursor-pointer"
              title="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-slate-400 font-serif-tnr px-2 font-mono">
              {currentSlide + 1} / {slides.length}
            </span>
            <button
              onClick={nextSlide}
              className="p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700/80 transition-all cursor-pointer"
              title="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx ? 'w-5 bg-orange-500' : 'w-2 bg-slate-700 hover:bg-slate-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Presenter Notes Bar */}
      {showNotes && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-1 text-xs text-slate-300 font-serif-tnr">
          <span className="text-orange-400 font-bold block uppercase tracking-wider text-[10px]">
            Presenter Notes (Slide {current.id})
          </span>
          <p className="leading-relaxed text-slate-300">{current.notes}</p>
        </div>
      )}

      {/* Thumbnail Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-6 md:grid-cols-11 gap-1.5 pt-2">
        {slides.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlide(idx)}
            className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
              currentSlide === idx
                ? 'bg-orange-500/20 border-orange-500 text-white shadow-md'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <span className="text-[9px] font-bold text-orange-400 block uppercase font-serif-tnr">
              S{s.id}
            </span>
            <span className="text-[10px] font-serif-tnr truncate block font-medium">
              {s.category}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

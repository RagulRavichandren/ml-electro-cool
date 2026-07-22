import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PredictTab } from './components/PredictTab';
import { MetricsTab } from './components/MetricsTab';
import { HistoryTab } from './components/HistoryTab';
import { FrameworkTab } from './components/FrameworkTab';
import { PresentationTab } from './components/PresentationTab';
import { IcepakVerification } from './components/IcepakVerification';
import { PredictionResult } from './types/thermal';
import { runPrediction } from './utils/thermalModel';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'predict' | 'metrics' | 'history' | 'about' | 'presentation' | 'icepak'>('predict');
  const [history, setHistory] = useState<PredictionResult[]>([]);
  const [latestPrediction, setLatestPrediction] = useState<PredictionResult | null>(null);

  // Auto-run initial prediction on mount for immediate interactive state
  useEffect(() => {
    const initialRes = runPrediction({
      power: 120,
      flux: 0.75,
      area: 1600,
      len: 100,
      wid: 100,
      hgt: 50,
      temp: 35,
      forced: true,
    });
    setLatestPrediction(initialRes);
    setHistory([initialRes]);
  }, []);

  const handleNewPrediction = (pred: PredictionResult) => {
    setLatestPrediction(pred);
    setHistory((prev) => [pred, ...prev]);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleSelectPredictionFromHistory = (pred: PredictionResult) => {
    setLatestPrediction(pred);
    setActiveTab('predict');
  };

  return (
    <div className="min-h-screen bg-electronic-board text-slate-100 font-serif-tnr selection:bg-blue-500 selection:text-white flex flex-col justify-between">
      {/* Header & Tabs Navigation */}
      <div>
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          historyCount={history.length}
        />

        {/* Main Workspace Container */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full">
          <AnimatePresence mode="wait">
            {activeTab === 'predict' && (
              <motion.div
                key="predict"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
              >
                <PredictTab
                  onNewPrediction={handleNewPrediction}
                  latestPrediction={latestPrediction}
                />
              </motion.div>
            )}

            {activeTab === 'metrics' && (
              <motion.div
                key="metrics"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
              >
                <MetricsTab />
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
              >
                <HistoryTab
                  history={history}
                  onClearHistory={handleClearHistory}
                  onSelectPrediction={handleSelectPredictionFromHistory}
                />
              </motion.div>
            )}

            {activeTab === 'about' && (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
              >
                <FrameworkTab />
              </motion.div>
            )}

            {activeTab === 'presentation' && (
              <motion.div
                key="presentation"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
              >
                <PresentationTab />
              </motion.div>
            )}

            {activeTab === 'icepak' && (
              <motion.div
                key="icepak"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
              >
                <IcepakVerification prediction={latestPrediction} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/50 py-4 mt-8 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            ThermalML — Physics-Informed Machine Learning for Heat Sink & Fan Selection
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            Ensemble Evaluation Engine · RF + XGBoost
          </span>
        </div>
      </footer>
    </div>
  );
}

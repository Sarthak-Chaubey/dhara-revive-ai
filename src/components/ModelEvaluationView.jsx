// ModelEvaluationView.jsx
import React, { useState } from 'react';
import { 
  BarChart3, 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  FileCheck, 
  TrendingUp, 
  Compass, 
  Cpu, 
  Sparkles,
  Info
} from 'lucide-react';
import { 
  MODEL_BENCHMARKS, 
  AHP_CRITERIA, 
  AHP_WEIGHTS, 
  AHP_MATRIX, 
  AHP_METRICS,
  ROC_CURVE_DATA 
} from '../data/modelsData';

export default function ModelEvaluationView() {
  const [activeTab, setActiveTab] = useState('benchmarks'); // 'benchmarks' | 'ahp' | 'roc'

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-blue-900/30 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-3">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Objectives O2, O6 & RQ2: Spatial Cross-Validation & Baseline Comparison</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Model Benchmarking & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Evaluation Lab</span>
            </h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Evaluating machine learning models (Gradient Boosting, Random Forest) against the classical Analytic Hierarchy Process (AHP) baseline under rigorous 5-fold Spatial Block Cross-Validation to eliminate spatial autocorrelation bias.
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-xl text-left shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Top Performing Model</span>
            <div className="text-xl font-black text-cyan-400 mt-0.5">XGBoost (AUC: 0.912)</div>
            <p className="text-xs text-slate-400 mt-1">+13.0% improvement over AHP baseline</p>
          </div>
        </div>
      </div>

      {/* Evaluation Sub-Tabs */}
      <div className="flex items-center space-x-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 max-w-md">
        <button
          onClick={() => setActiveTab('benchmarks')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'benchmarks' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          Classifier Comparison (Table R2)
        </button>
        <button
          onClick={() => setActiveTab('ahp')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'ahp' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          AHP Matrix & CR (Table R3)
        </button>
        <button
          onClick={() => setActiveTab('roc')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'roc' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          ROC Performance Curves
        </button>
      </div>

      {/* Tab 1: Classifier Comparison Table (R2 Table from Proposal) */}
      {activeTab === 'benchmarks' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">
                  Table R2: Classifier Performance Across Spatial Folds
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Mean &plusmn; standard deviation evaluated across 5 spatially independent catchment blocks
                </p>
              </div>
              <span className="text-[10px] bg-slate-800 text-cyan-400 px-3 py-1 rounded-full border border-slate-700 font-semibold">
                Spatially Blocked CV
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Model / Architecture</th>
                    <th className="py-3 px-4">Role / Category</th>
                    <th className="py-3 px-4 text-cyan-400">ROC-AUC</th>
                    <th className="py-3 px-4 text-emerald-400">PR-AUC</th>
                    <th className="py-3 px-4">F1-Score</th>
                    <th className="py-3 px-4">Accuracy</th>
                    <th className="py-3 px-4">Recall (Critical)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 font-mono">
                  {MODEL_BENCHMARKS.map((item, idx) => (
                    <tr 
                      key={idx} 
                      className={`hover:bg-slate-800/40 transition-colors ${item.isBest ? 'bg-blue-950/20' : ''}`}
                    >
                      <td className="py-3.5 px-4 font-sans font-bold text-white flex items-center space-x-2">
                        {item.isBest && <span className="w-2 h-2 rounded-full bg-cyan-400"></span>}
                        <span>{item.model}</span>
                        {item.isBest && (
                          <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.2 rounded font-sans border border-cyan-500/30">
                            Best
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-sans text-slate-400">{item.category}</td>
                      <td className="py-3.5 px-4 font-bold text-cyan-300">{item.rocAuc}</td>
                      <td className="py-3.5 px-4 font-bold text-emerald-300">{item.prAuc}</td>
                      <td className="py-3.5 px-4 text-slate-200">{item.f1Score}</td>
                      <td className="py-3.5 px-4 text-slate-200">{item.accuracy}</td>
                      <td className="py-3.5 px-4 text-rose-300 font-bold">{item.recall}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-950 border-t border-slate-800 text-xs text-slate-400 flex items-start space-x-2">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <p>
                <strong>Evaluation Insight (Proposal RQ2):</strong> Gradient Boosting achieves an ROC-AUC of <strong>0.912</strong> versus AHP baseline <strong>0.782</strong>. Random splitting yields artificially inflated scores (&gt;0.97) due to spatial proximity of testing points; Spatial Block CV guarantees real-world generalization to unmonitored tribal valleys.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: AHP Multi-Criteria Pairwise Matrix & Consistency Ratio (Table R3) */}
      {activeTab === 'ahp' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white">
                  Table R3: Analytic Hierarchy Process (AHP) Pairwise Comparison Matrix
                </h3>
                <p className="text-xs text-slate-400">
                  Hydrogeological expert weights for recharge zone suitability benchmark
                </p>
              </div>

              {/* Consistency Badge */}
              <div className="flex items-center space-x-2 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-300">
                  CR = {AHP_METRICS.cr} (Target &lt; 0.10) &mdash; PASS
                </span>
              </div>
            </div>

            {/* Matrix Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-center text-xs font-mono">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider">
                    <th className="py-2.5 px-3 text-left font-sans">Criteria</th>
                    {AHP_CRITERIA.map((crit, idx) => (
                      <th key={idx} className="py-2.5 px-3">{crit}</th>
                    ))}
                    <th className="py-2.5 px-3 text-cyan-400 font-sans">AHP Weight</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {AHP_MATRIX.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-800/40">
                      <td className="py-2.5 px-3 text-left font-sans font-bold text-white">
                        {AHP_CRITERIA[rIdx]}
                      </td>
                      {row.map((val, cIdx) => (
                        <td 
                          key={cIdx} 
                          className={`py-2.5 px-3 ${rIdx === cIdx ? 'text-slate-500 font-bold' : val > 1 ? 'text-cyan-300' : 'text-slate-400'}`}
                        >
                          {val.toFixed(2)}
                        </td>
                      ))}
                      <td className="py-2.5 px-3 font-bold text-cyan-400 bg-slate-950">
                        {(AHP_WEIGHTS[rIdx] * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mathematical Consistency Proof Card */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-950/80 p-4 rounded-xl border border-slate-800 font-mono">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-sans">Principal Eigenvalue (&lambda;max)</span>
                <strong className="text-white text-base font-bold">{AHP_METRICS.lambdaMax}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-sans">Consistency Index (CI)</span>
                <strong className="text-white text-base font-bold">{AHP_METRICS.ci}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-sans">Random Index (RI, n=6)</span>
                <strong className="text-white text-base font-bold">{AHP_METRICS.ri}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-sans">Consistency Ratio (CR)</span>
                <strong className="text-emerald-400 text-base font-bold">{AHP_METRICS.cr} &lt; 0.10</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: ROC Performance Curves */}
      {activeTab === 'roc' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">
                Receiver Operating Characteristic (ROC) Comparison
              </h3>
              <p className="text-xs text-slate-400">
                True Positive Rate vs False Positive Rate for Spring Vulnerability Identification
              </p>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <span className="flex items-center space-x-1.5 text-cyan-400">
                <span className="w-3 h-0.5 bg-cyan-400 inline-block"></span>
                <span>XGBoost (0.912)</span>
              </span>
              <span className="flex items-center space-x-1.5 text-emerald-400">
                <span className="w-3 h-0.5 bg-emerald-400 inline-block"></span>
                <span>Random Forest (0.885)</span>
              </span>
              <span className="flex items-center space-x-1.5 text-amber-400">
                <span className="w-3 h-0.5 bg-amber-400 inline-block"></span>
                <span>AHP Baseline (0.782)</span>
              </span>
              <span className="flex items-center space-x-1.5 text-slate-500">
                <span className="w-3 h-0.5 bg-slate-500 inline-block"></span>
                <span>Logistic Reg (0.724)</span>
              </span>
            </div>
          </div>

          {/* Clean Visual SVG Graph for ROC curves */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 relative">
            <div className="h-64 sm:h-80 w-full flex items-center justify-center">
              <svg viewBox="0 0 500 300" className="w-full h-full">
                {/* Grid Lines */}
                {[0, 60, 120, 180, 240, 300].map((y) => (
                  <line key={`y-${y}`} x1="40" y1={y} x2="480" y2={y} stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                ))}
                {[40, 128, 216, 304, 392, 480].map((x) => (
                  <line key={`x-${x}`} x1={x} y1="0" x2={x} y2="260" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                ))}

                {/* Random Chance Diagonal */}
                <line x1="40" y1="260" x2="480" y2="20" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* XGBoost Curve (Cyan) */}
                <path
                  d="M 40 260 C 80 120, 120 40, 480 20"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                />

                {/* Random Forest Curve (Emerald) */}
                <path
                  d="M 40 260 C 90 145, 140 55, 480 20"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                />

                {/* AHP Baseline Curve (Amber) */}
                <path
                  d="M 40 260 C 120 180, 180 90, 480 20"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />

                {/* Logistic Regression (Slate) */}
                <path
                  d="M 40 260 C 140 200, 220 120, 480 20"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                />

                {/* Axes */}
                <line x1="40" y1="260" x2="480" y2="260" stroke="#64748b" strokeWidth="2" />
                <line x1="40" y1="260" x2="40" y2="20" stroke="#64748b" strokeWidth="2" />

                {/* Labels */}
                <text x="240" y="285" fill="#94a3b8" fontSize="11" textAnchor="middle">False Positive Rate (1 - Specificity)</text>
                <text x="15" y="140" fill="#94a3b8" fontSize="11" textAnchor="middle" transform="rotate(-90 15 140)">True Positive Rate (Sensitivity)</text>
              </svg>
            </div>

            <div className="mt-4 text-center text-xs text-slate-400">
              ROC comparison demonstrating superior discriminating capacity of non-linear gradient tree boosting over linear and heuristic models in high-relief terrain.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

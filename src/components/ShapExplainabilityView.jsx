// ShapExplainabilityView.jsx
import React, { useState } from 'react';
import { 
  Activity, 
  HelpCircle, 
  CheckCircle2, 
  BarChart2, 
  ShieldCheck, 
  TrendingUp, 
  Info, 
  FileCheck2,
  Sparkles
} from 'lucide-react';
import { SPRINGS_DATA } from '../data/springsData';
import { GLOBAL_SHAP_IMPORTANCE } from '../data/modelsData';

export default function ShapExplainabilityView({ onSelectSpring }) {
  const [selectedSpringId, setSelectedSpringId] = useState(SPRINGS_DATA[0].id);

  const currentSpring = SPRINGS_DATA.find(s => s.id === selectedSpringId) || SPRINGS_DATA[0];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 border border-purple-900/30 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-3">
              <Activity className="w-3.5 h-3.5" />
              <span>Objective O3 & RQ3: Explainable AI Decision Support</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              SHAP Factor Attribution & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Hydrogeological Audit</span>
            </h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              In public-sector water governance, black-box ML predictions cannot be audited. Using Shapley Additive exPlanations (SHAP), DharaRevive decomposes every spring’s risk score into verifiable hydro-environmental drivers grounded in physics.
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-xl text-left shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Hydrological Agreement</span>
            <div className="text-xl font-black text-emerald-400 mt-0.5">94.8% Consistency</div>
            <p className="text-xs text-slate-400 mt-1">Concurrence with NITI Aayog guidelines</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Global Feature Importance (Table R1 from Proposal) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <BarChart2 className="w-4 h-4 text-purple-400" />
                <span>Global Feature Importance (Table R1)</span>
              </h3>
              <p className="text-xs text-slate-400">Mean |SHAP| value across study region</p>
            </div>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
              5-Fold Spatial CV
            </span>
          </div>

          <div className="space-y-3.5 pt-2">
            {GLOBAL_SHAP_IMPORTANCE.map((item) => {
              const barWidth = `${(item.meanAbsShap / 0.3) * 100}%`;
              return (
                <div key={item.rank} className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center space-x-2">
                      <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-300">
                        #{item.rank}
                      </span>
                      <strong className="text-slate-200">{item.feature}</strong>
                    </div>
                    <span className="font-mono text-purple-300 font-bold">{item.meanAbsShap.toFixed(3)}</span>
                  </div>

                  {/* Horizontal Bar */}
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden mb-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-indigo-400 h-full rounded-full transition-all duration-500"
                      style={{ width: barWidth }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="truncate pr-2">{item.domainRole}</span>
                    <span className="text-slate-500 shrink-0">AHP: {(item.ahpWeight * 100).toFixed(0)}%</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-purple-950/20 border border-purple-900/30 rounded-xl text-xs text-purple-200/90 flex items-start space-x-2">
            <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <p>
              Confirming hypothesis 7.3: <strong>Rainfall anomaly</strong> and <strong>terrain slope</strong> dominate risk variance, matching findings from Kishtwar [1] and Garhwal [13].
            </p>
          </div>
        </div>

        {/* Right Side: Per-Spring Local SHAP Breakdown */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Per-Spring SHAP Waterfall Decomposition</span>
              </h3>
              <p className="text-xs text-slate-400">Inspect exact causal drivers for any selected spring</p>
            </div>

            {/* Dropdown to pick Spring */}
            <select
              value={selectedSpringId}
              onChange={(e) => setSelectedSpringId(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
            >
              {SPRINGS_DATA.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.id}: {s.name} ({s.status})
                </option>
              ))}
            </select>
          </div>

          {/* Current Spring Summary Card */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-white">{currentSpring.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                  currentSpring.status === 'Critical' ? 'bg-rose-500/20 text-rose-300' :
                  currentSpring.status === 'Vulnerable' ? 'bg-amber-500/20 text-amber-300' :
                  'bg-emerald-500/20 text-emerald-300'
                }`}>
                  {currentSpring.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {currentSpring.village}, {currentSpring.block} Block &bull; Tribe: {currentSpring.dominantTribe}
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 block uppercase">Calculated Risk Index</span>
              <span className="text-2xl font-black text-purple-400">
                {(currentSpring.vulnerabilityScore * 100).toFixed(0)}%
              </span>
            </div>
          </div>

          {/* Local SHAP Waterfall Contributions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Factor Shift from Regional Baseline (E[f(x)] = 0.42)
            </h4>

            {currentSpring.shapValues.map((factor, idx) => {
              const isRiskIncrease = factor.direction === 'increases_risk';
              const percentShift = Math.abs(factor.impact * 100).toFixed(1);

              return (
                <div key={idx} className="bg-slate-950/90 p-3.5 rounded-xl border border-slate-800 hover:border-slate-700 transition-all">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-slate-200">{factor.feature}</span>
                    <span className={`font-mono font-bold flex items-center space-x-1 ${
                      isRiskIncrease ? 'text-rose-400' : 'text-emerald-400'
                    }`}>
                      <span>{isRiskIncrease ? `+${percentShift}%` : `-${percentShift}%`}</span>
                      <span className="text-[10px] text-slate-400 font-normal">
                        ({isRiskIncrease ? 'Vulnerability Push' : 'Protective Factor'})
                      </span>
                    </span>
                  </div>

                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden my-2">
                    <div
                      className={`h-full rounded-full ${
                        isRiskIncrease
                          ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                          : 'bg-gradient-to-r from-teal-400 to-emerald-500'
                      }`}
                      style={{ width: `${Math.min(100, Math.abs(factor.impact) * 220)}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-slate-400 leading-normal">
                    {factor.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Scientific Rationale Summary */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
            <div className="font-semibold text-slate-200 flex items-center space-x-2">
              <FileCheck2 className="w-4 h-4 text-emerald-400" />
              <span>Hydrogeological Synthesis for Nodal Officers</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              For <strong>{currentSpring.name}</strong>, acute discharge depletion is heavily aggravated by a <strong>{currentSpring.rainfallAnomalyPct}% monsoon precipitation deficit</strong> coupled with a <strong>{currentSpring.slopeDeg}° hillside slope</strong> that discharges torrential precipitation before it can penetrate the skeletal <em>{currentSpring.soilType}</em> vadose zone. Implementing upper-slope continuous contour trenches will directly counteract this {Math.abs(currentSpring.shapValues[0].impact * 100).toFixed(0)}% risk driver.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

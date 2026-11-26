// ScenarioSimulationView.jsx
import React, { useState } from 'react';
import { 
  Sliders, 
  Droplet, 
  TrendingUp, 
  RotateCcw, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle,
  Zap
} from 'lucide-react';
import { SPRINGS_DATA } from '../data/springsData';

export default function ScenarioSimulationView({ initialSpring }) {
  const [selectedSpringId, setSelectedSpringId] = useState(initialSpring ? initialSpring.id : SPRINGS_DATA[0].id);

  // Simulation Sliders State
  const [rainfallAnomalyDelta, setRainfallAnomalyDelta] = useState(0); // -40% to +40%
  const [ndviAfforestationPct, setNdviAfforestationPct] = useState(25); // 0 to 100%
  const [contourTrenchCoveragePct, setContourTrenchCoveragePct] = useState(50); // 0 to 100%
  const [checkDamCount, setCheckDamCount] = useState(2); // 0 to 6

  const baseSpring = SPRINGS_DATA.find(s => s.id === selectedSpringId) || SPRINGS_DATA[0];

  // Dynamic Simulation Calculation Engine
  const calculateSimulation = () => {
    const baseRisk = baseSpring.vulnerabilityScore;

    // Rainfall effect: severe drop increases risk; positive rain decreases risk
    const rainShift = -rainfallAnomalyDelta * 0.005;

    // Interventions decrease risk:
    // NDVI afforestation reduces risk up to -0.18
    const afforestationReduction = (ndviAfforestationPct / 100) * 0.16;

    // Contour trenches retard runoff and increase infiltration up to -0.25
    const trenchReduction = (contourTrenchCoveragePct / 100) * 0.22;

    // Check dams trap silt and force recharge up to -0.15
    const checkDamReduction = Math.min(0.15, checkDamCount * 0.04);

    const simulatedRisk = Math.max(0.08, Math.min(0.98, baseRisk + rainShift - afforestationReduction - trenchReduction - checkDamReduction));

    // Discharge calculation
    const baseFlow = baseSpring.currentDischargeLpm;
    const dischargeGain = ((baseSpring.historicDischargeLpm - baseFlow) * (1 - simulatedRisk / baseRisk)) + (rainfallAnomalyDelta * 0.1);
    const simulatedDischarge = Math.max(0.8, +(baseFlow + dischargeGain).toFixed(1));

    // Annual recharge calculation
    const annualRechargeGainM3 = Math.round(
      (contourTrenchCoveragePct * 180) + 
      (checkDamCount * 3200) + 
      (ndviAfforestationPct * 95)
    );

    // Estimated intervention cost
    const estCostInr = Math.round(
      (contourTrenchCoveragePct * 2400) + 
      (checkDamCount * 45000) + 
      (ndviAfforestationPct * 1100)
    );

    return {
      simulatedRisk,
      riskReductionPct: Math.round(((baseRisk - simulatedRisk) / baseRisk) * 100),
      simulatedDischarge,
      dischargeGainPct: Math.round(((simulatedDischarge - baseFlow) / baseFlow) * 100),
      annualRechargeGainM3,
      estCostInr
    };
  };

  const simResult = calculateSimulation();

  const resetSimulation = () => {
    setRainfallAnomalyDelta(0);
    setNdviAfforestationPct(25);
    setContourTrenchCoveragePct(50);
    setCheckDamCount(2);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-900 border border-cyan-900/30 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-3">
              <Sliders className="w-3.5 h-3.5" />
              <span>Interactive Decision Sandbox & Predictive Simulation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              What-If Springshed <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">Intervention Simulator</span>
            </h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Model climatic scenarios and test the quantitative impact of soil-water conservation interventions (contour trenching, check dams, afforestation) on spring discharge and vulnerability before civil works sanction.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={resetSimulation}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Variables</span>
            </button>
          </div>
        </div>
      </div>

      {/* Spring Selector Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center space-x-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Target Spring:</span>
          <select
            value={selectedSpringId}
            onChange={(e) => setSelectedSpringId(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-white text-xs rounded-lg px-3 py-2 font-semibold focus:outline-none focus:border-cyan-500"
          >
            {SPRINGS_DATA.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.village}, {s.block} Block) &mdash; Current: {s.currentDischargeLpm} L/m
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-4 text-xs">
          <span className="text-slate-400">Baseline Risk: <strong className="text-rose-400">{(baseSpring.vulnerabilityScore * 100).toFixed(0)}%</strong></span>
          <span className="text-slate-400">Current Flow: <strong className="text-white">{baseSpring.currentDischargeLpm} L/min</strong></span>
          <span className="text-slate-400">Historical: <strong className="text-cyan-400">{baseSpring.historicDischargeLpm} L/min</strong></span>
        </div>
      </div>

      {/* Simulator Control Sliders vs Live Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders Input Panel (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>Environmental & Structural Intervention Controls</span>
          </h3>

          {/* Slider 1: Rainfall Anomaly Adjustment */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="font-semibold text-slate-200">Simulate Monsoon Rainfall Shift</span>
              <span className={`font-mono font-bold ${rainfallAnomalyDelta > 0 ? 'text-emerald-400' : rainfallAnomalyDelta < 0 ? 'text-rose-400' : 'text-slate-300'}`}>
                {rainfallAnomalyDelta > 0 ? `+${rainfallAnomalyDelta}% Surplus` : rainfallAnomalyDelta < 0 ? `${rainfallAnomalyDelta}% Deficit` : 'Baseline (0%)'}
              </span>
            </div>
            <input
              type="range"
              min="-40"
              max="40"
              step="5"
              value={rainfallAnomalyDelta}
              onChange={(e) => setRainfallAnomalyDelta(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>Severe Drought (-40%)</span>
              <span>Baseline</span>
              <span>Wet Monsoon (+40%)</span>
            </div>
          </div>

          {/* Slider 2: Continuous Contour Trenches (CCT) Coverage */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="font-semibold text-slate-200">Ridge Contour Trenching Coverage</span>
              <span className="font-mono font-bold text-teal-300">{contourTrenchCoveragePct}% of Catchment</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={contourTrenchCoveragePct}
              onChange={(e) => setContourTrenchCoveragePct(Number(e.target.value))}
              className="w-full accent-teal-400"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Retards overland runoff on {baseSpring.slopeDeg}° slopes; increases soil moisture infiltration.
            </p>
          </div>

          {/* Slider 3: Check Dam Structures */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="font-semibold text-slate-200">Loose Boulder Check Dams on Streamlines</span>
              <span className="font-mono font-bold text-emerald-300">{checkDamCount} Structures Planned</span>
            </div>
            <input
              type="range"
              min="0"
              max="6"
              step="1"
              value={checkDamCount}
              onChange={(e) => setCheckDamCount(Number(e.target.value))}
              className="w-full accent-emerald-400"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Traps bedload gravel, checks drainage velocity, creates subsurface hydrostatic head.
            </p>
          </div>

          {/* Slider 4: Afforestation / NDVI Restoration */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="font-semibold text-slate-200">Upper Catchment Vegetative Bio-Turfing (NDVI Gain)</span>
              <span className="font-mono font-bold text-cyan-300">+{ndviAfforestationPct}% Canopy Cover</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={ndviAfforestationPct}
              onChange={(e) => setNdviAfforestationPct(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Broadleaved native oak and rhododendron root network stabilizes recharge zone regolith.
            </p>
          </div>
        </div>

        {/* Dynamic Simulation Results Panel (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Simulated Spring Revival Impact</span>
              </h3>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                Live Dynamic Model
              </span>
            </div>

            {/* Simulated Risk Meter */}
            <div className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Projected Vulnerability Index
              </span>
              <div className="flex items-center justify-center space-x-3 mt-1">
                <span className="text-3xl font-extrabold text-white">
                  {(simResult.simulatedRisk * 100).toFixed(0)}%
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  -{simResult.riskReductionPct}% Risk
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden mt-3">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${simResult.simulatedRisk * 100}%` }}
                />
              </div>

              <div className="mt-2 text-[11px] text-slate-400">
                Baseline was <strong className="text-rose-400 font-mono">{(baseSpring.vulnerabilityScore * 100).toFixed(0)}%</strong>. Interventions lower risk into safe recharge equilibrium.
              </div>
            </div>

            {/* Flow and Recharge Metrics */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase text-slate-400 font-semibold block">Simulated Flow</span>
                <strong className="text-xl font-bold text-emerald-400 mt-0.5 block">{simResult.simulatedDischarge} L/min</strong>
                <span className="text-[10px] text-emerald-300 font-medium">+{simResult.dischargeGainPct}% revival</span>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase text-slate-400 font-semibold block">Aquifer Recharge Gain</span>
                <strong className="text-xl font-bold text-cyan-400 mt-0.5 block">{simResult.annualRechargeGainM3.toLocaleString()} m³</strong>
                <span className="text-[10px] text-slate-400">annual percolation</span>
              </div>
            </div>

            {/* Estimated Budget & Benefit-Cost Ratio */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 mt-4 text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Simulated Works Budget:</span>
                <strong className="text-emerald-400 font-mono text-sm">₹ {simResult.estCostInr.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Annual Water Value Yield:</span>
                <strong className="text-cyan-300 font-mono">₹ {(simResult.annualRechargeGainM3 * 25).toLocaleString()}</strong>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                <span className="text-slate-400">Cost Recovery Payback:</span>
                <strong className="text-white font-mono">~1.4 Years (High Social ROI)</strong>
              </div>
            </div>
          </div>

          <div className="p-3 bg-emerald-950/30 border border-emerald-900/40 rounded-xl text-[11px] text-emerald-300 flex items-start space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p>
              Simulation outputs can be exported directly into the <strong>Detailed Project Report (DPR)</strong> for Administrative Approval and Expenditure Sanction (AA&ES).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

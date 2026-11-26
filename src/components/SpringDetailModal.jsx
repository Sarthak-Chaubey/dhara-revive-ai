// SpringDetailModal.jsx
import React from 'react';
import { 
  X, 
  MapPin, 
  Droplet, 
  TrendingDown, 
  Mountain, 
  Layers, 
  Activity, 
  ShieldAlert, 
  DollarSign, 
  Clock, 
  FileText,
  Sliders,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export default function SpringDetailModal({ spring, onClose, onOpenSimulator }) {
  if (!spring) return null;

  const isCritical = spring.status === 'Critical';
  const dischargeLossPct = Math.round(((spring.historicDischargeLpm - spring.currentDischargeLpm) / spring.historicDischargeLpm) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 border-b border-slate-800 flex items-start justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                {spring.id}
              </span>
              <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                spring.status === 'Critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                spring.status === 'Vulnerable' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                spring.status === 'Seasonal' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}>
                {spring.status} Status ({Math.round(spring.vulnerabilityScore * 100)}% Risk)
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                {spring.dominantTribe} Tribal Habitation
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">{spring.name}</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{spring.village}, Block: <strong className="text-slate-300">{spring.block}</strong>, Dist: {spring.district}</span>
              <span className="text-slate-600">&bull;</span>
              <span>Coord: [{spring.coordinates[0].toFixed(4)}, {spring.coordinates[1].toFixed(4)}]</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Key Hydrological Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500">Current Flow</span>
              <div className="text-xl font-bold text-rose-400 mt-0.5">{spring.currentDischargeLpm} L/min</div>
              <span className="text-[10px] text-slate-400">Historic: {spring.historicDischargeLpm} L/m (-{dischargeLossPct}%)</span>
            </div>

            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500">Elevation & Slope</span>
              <div className="text-xl font-bold text-cyan-400 mt-0.5">{spring.elevation}m</div>
              <span className="text-[10px] text-slate-400">Slope: {spring.slopeDeg}° ({spring.aspect})</span>
            </div>

            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500">Rainfall Anomaly</span>
              <div className={`text-xl font-bold mt-0.5 ${spring.rainfallAnomalyPct < -20 ? 'text-rose-400' : 'text-amber-400'}`}>
                {spring.rainfallAnomalyPct}%
              </div>
              <span className="text-[10px] text-slate-400">Annual: {spring.annualRainfallMm} mm</span>
            </div>

            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500">Dependent Community</span>
              <div className="text-xl font-bold text-amber-300 mt-0.5">{spring.servedPopulation.toLocaleString()}</div>
              <span className="text-[10px] text-slate-400">{spring.dependentHouseholds} tribal households</span>
            </div>
          </div>

          {/* Geological & Hydrogeological Characteristics */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs">
            <h4 className="font-bold text-slate-300 uppercase tracking-wider text-[11px] mb-3 flex items-center space-x-2">
              <Mountain className="w-4 h-4 text-emerald-400" />
              <span>Hydrogeological Catchment Attributes</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-slate-300">
              <div>
                <span className="text-slate-500 block">Bedrock Lithology</span>
                <strong className="text-slate-200">{spring.geology}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Soil Classification & Infiltration</span>
                <strong className="text-slate-200">{spring.soilType} ({spring.soilInfiltrationMmHr} mm/hr)</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Lineament / Fracture Proximity</span>
                <strong className="text-slate-200">{spring.lineamentDistM}m from mapped tectonic trace</strong>
              </div>
            </div>
          </div>

          {/* Explainable AI (SHAP) Factor Attribution */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center space-x-2">
                <Activity className="w-4 h-4 text-purple-400" />
                <span>SHAP Factor Attribution (Why is this spring at risk?)</span>
              </h4>
              <span className="text-[10px] text-purple-400 font-semibold bg-purple-950/40 border border-purple-800/40 px-2 py-0.5 rounded">
                Objective O3 & RQ3 Compliant
              </span>
            </div>

            <div className="space-y-2.5">
              {spring.shapValues.map((shap, idx) => (
                <div key={idx} className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-slate-200">{shap.feature}</span>
                    <span className={`font-mono font-bold ${shap.direction === 'increases_risk' ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {shap.impact > 0 ? `+${(shap.impact * 100).toFixed(0)}%` : `${(shap.impact * 100).toFixed(0)}%`} Risk Shift
                    </span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden mb-1">
                    <div 
                      className={`h-full rounded-full ${shap.direction === 'increases_risk' ? 'bg-gradient-to-r from-orange-500 to-rose-500' : 'bg-gradient-to-r from-teal-500 to-emerald-500'}`}
                      style={{ width: `${Math.min(100, Math.abs(shap.impact) * 200)}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">{shap.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Engineering Intervention Plan */}
          <div className="bg-gradient-to-br from-emerald-950/40 via-slate-950 to-slate-900 p-5 rounded-xl border border-emerald-500/30">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-emerald-300 text-xs uppercase tracking-wider flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Recommended Engineering Recharge Intervention (Objective O4 & RQ4)</span>
              </h4>
              <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                Rank #{spring.recommendedIntervention.priorityRank}
              </span>
            </div>

            <div className="bg-slate-900/90 p-3.5 rounded-lg border border-slate-800 mb-4">
              <div className="text-base font-bold text-white text-emerald-200">
                {spring.recommendedIntervention.type}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Secondary Measure: <span className="text-slate-300">{spring.recommendedIntervention.secondary}</span>
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Target Catchment Zone: <span className="text-cyan-300 font-semibold">{spring.recommendedIntervention.catchmentZone}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Estimated Sanction</span>
                <strong className="text-emerald-400 text-sm">₹ {spring.recommendedIntervention.estimatedCostInr.toLocaleString()}</strong>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Annual Recharge Gain</span>
                <strong className="text-cyan-400 text-sm">{spring.recommendedIntervention.annualRechargeM3.toLocaleString()} m³/yr</strong>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Construction Time</span>
                <strong className="text-amber-300 text-sm">{spring.recommendedIntervention.implementationTimeDays} Days</strong>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Scheme Funding</span>
                <strong className="text-slate-200 text-xs">{spring.recommendedIntervention.schemeAlignment}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              if (onOpenSimulator) onOpenSimulator(spring);
            }}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-800/40 text-xs font-semibold cursor-pointer transition-colors"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Open in What-If Simulator</span>
          </button>

          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

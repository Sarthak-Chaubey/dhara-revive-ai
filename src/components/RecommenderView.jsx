// RecommenderView.jsx
import React, { useState } from 'react';
import { 
  Layers, 
  CheckCircle2, 
  ShieldAlert, 
  HelpCircle, 
  Compass, 
  Hammer, 
  FileSpreadsheet, 
  DollarSign, 
  Mountain, 
  Droplet,
  ArrowRight,
  Info
} from 'lucide-react';
import { RECHARGE_STRUCTURES_CATALOG } from '../data/modelsData';

export default function RecommenderView() {
  const [activeStructure, setActiveStructure] = useState(RECHARGE_STRUCTURES_CATALOG[0]);

  // Interactive Rule Tester State
  const [testSlope, setTestSlope] = useState(18);
  const [testSoil, setTestSoil] = useState('permeable');
  const [testStreamOrder, setTestStreamOrder] = useState('gully');
  const [testLineamentDist, setTestLineamentDist] = useState(120);

  // Evaluate rule recommendation dynamically based on hydrology rules
  const evaluateRule = () => {
    if (testLineamentDist < 50) {
      return RECHARGE_STRUCTURES_CATALOG[4]; // Subsurface Lineament Shaft
    }
    if (testSlope > 20 && testStreamOrder === 'gully') {
      return RECHARGE_STRUCTURES_CATALOG[2]; // Gully Plugging
    }
    if (testSlope >= 10 && testSlope <= 25 && testStreamOrder === 'overland') {
      return RECHARGE_STRUCTURES_CATALOG[0]; // Contour Trenches
    }
    if (testSlope <= 15 && (testStreamOrder === '1st' || testStreamOrder === '2nd')) {
      return RECHARGE_STRUCTURES_CATALOG[1]; // Loose Boulder Check Dam
    }
    if (testSlope < 8) {
      return RECHARGE_STRUCTURES_CATALOG[3]; // Recharge Basin Pond
    }
    return RECHARGE_STRUCTURES_CATALOG[0];
  };

  const recommendedResult = evaluateRule();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-950/40 via-slate-900 to-slate-900 border border-teal-900/30 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Objective O4 & RQ4: Transparent Rule-Based Decision Matrix</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Recharge Structure <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Engineering Recommender</span>
            </h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Why rule-based? As documented in Proposal Section 5, public labelled datasets of structural failures do not exist. A transparent rule engine based on NITI Aayog/IWMI [6] hydrogeology guidelines ensures complete auditability for Ministry officials and watershed engineers.
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-xl text-left shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Norm Alignment</span>
            <div className="text-xl font-black text-teal-400 mt-0.5">WDC-PMKSY 2.0</div>
            <p className="text-xs text-slate-400 mt-1">Conforms to DoLR (2021) guidelines</p>
          </div>
        </div>
      </div>

      {/* Interactive Rule Tester Sandbox */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Hammer className="w-4 h-4 text-emerald-400" />
              <span>Live Hydrogeological Rule Engine Tester</span>
            </h3>
            <p className="text-xs text-slate-400">Input field catchment characteristics to test deterministic structural recommendation</p>
          </div>
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-lg">
            Active Rule Engine
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800 mb-6">
          {/* Slope Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Catchment Slope</span>
              <strong className="text-white font-mono">{testSlope}°</strong>
            </div>
            <input
              type="range"
              min="2"
              max="40"
              value={testSlope}
              onChange={(e) => setTestSlope(Number(e.target.value))}
              className="w-full accent-teal-400"
            />
            <span className="text-[10px] text-slate-500">
              {testSlope < 8 ? 'Gentle valley bench' : testSlope < 22 ? 'Moderate hill slope' : 'Steep alpine escarpment'}
            </span>
          </div>

          {/* Stream Drainage Order */}
          <div>
            <label className="text-xs text-slate-400 block mb-1">Drainage Channel / Flow Type</label>
            <select
              value={testStreamOrder}
              onChange={(e) => setTestStreamOrder(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-2"
            >
              <option value="overland">Overland Sheet Flow (Hill Ridge)</option>
              <option value="gully">Eroding Torrential Gully</option>
              <option value="1st">1st Order Streamlet</option>
              <option value="2nd">2nd Order Mountain Creek</option>
            </select>
          </div>

          {/* Soil Permeability */}
          <div>
            <label className="text-xs text-slate-400 block mb-1">Soil Regolith Permeability</label>
            <select
              value={testSoil}
              onChange={(e) => setTestSoil(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-2"
            >
              <option value="permeable">High Permeability (Sandy Loam / Colluvium)</option>
              <option value="skeletal">Thin Skeletal / Stony Cryic</option>
              <option value="clay">Dense Impermeable Clay</option>
            </select>
          </div>

          {/* Lineament Distance */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Tectonic Lineament Proximity</span>
              <strong className="text-white font-mono">{testLineamentDist}m</strong>
            </div>
            <input
              type="range"
              min="10"
              max="300"
              value={testLineamentDist}
              onChange={(e) => setTestLineamentDist(Number(e.target.value))}
              className="w-full accent-teal-400"
            />
            <span className="text-[10px] text-slate-500">
              {testLineamentDist < 50 ? 'Direct fracture corridor' : 'Regional matrix flow'}
            </span>
          </div>
        </div>

        {/* Engine Output Banner */}
        <div className="bg-gradient-to-r from-emerald-950/50 via-slate-950 to-slate-900 p-4 rounded-xl border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Recommender Result</span>
            <div className="text-lg font-bold text-white mt-0.5 flex items-center space-x-2">
              <span>{recommendedResult.name}</span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">{recommendedResult.mechanism}</p>
          </div>

          <div className="shrink-0 flex items-center space-x-3">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">Unit Cost Norm</span>
              <strong className="text-emerald-400 text-sm">{recommendedResult.unitCostInr}</strong>
            </div>
            <button
              onClick={() => setActiveStructure(recommendedResult)}
              className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-md"
            >
              <span>View Full Specs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Structure Catalog & Technical Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Structure Selector Tabs (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 mb-2">
            Standard Recharge Structure Catalog
          </h3>
          {RECHARGE_STRUCTURES_CATALOG.map((struct) => {
            const isSelected = activeStructure.id === struct.id;
            return (
              <button
                key={struct.id}
                onClick={() => setActiveStructure(struct)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-slate-800 border-teal-500 shadow-md ring-1 ring-teal-500/40'
                    : 'bg-slate-900/90 border-slate-800 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{struct.name}</span>
                  <span className="text-[10px] font-mono text-teal-400">{struct.id}</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">{struct.category}</div>
                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Slope: {struct.suitableSlope}</span>
                  <span className="text-emerald-400 font-semibold">{struct.annualRechargeYield}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Structure Specification Card (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono font-bold text-teal-400 bg-teal-950/60 border border-teal-800/60 px-2 py-0.5 rounded">
                {activeStructure.id} &bull; {activeStructure.category}
              </span>
              <h3 className="text-xl font-bold text-white mt-1.5">{activeStructure.name}</h3>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase text-slate-400 block font-semibold">Standard Unit Cost</span>
              <strong className="text-emerald-400 text-lg font-bold">{activeStructure.unitCostInr}</strong>
            </div>
          </div>

          {/* Operational Mechanism */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Hydrological Working Mechanism
            </span>
            <p className="text-xs text-slate-200 leading-relaxed">
              {activeStructure.mechanism}
            </p>
          </div>

          {/* Hydrological Suitability Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Slope Gradient Threshold</span>
              <strong className="text-cyan-400 text-sm mt-0.5 block">{activeStructure.suitableSlope}</strong>
              <p className="text-[11px] text-slate-400 mt-1">Prevents structural scouring or excessive ponding</p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Target Soil & Regolith</span>
              <strong className="text-amber-300 text-sm mt-0.5 block">{activeStructure.suitableSoil}</strong>
              <p className="text-[11px] text-slate-400 mt-1">Ensures vertical permeability into aquifer</p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Land Use / Vegetation (LULC)</span>
              <strong className="text-slate-200 text-sm mt-0.5 block">{activeStructure.suitableLulc}</strong>
              <p className="text-[11px] text-slate-400 mt-1">Identified from Bhuvan LULC & Sentinel-2</p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Recharge Volume & Lifespan</span>
              <strong className="text-emerald-400 text-sm mt-0.5 block">{activeStructure.annualRechargeYield}</strong>
              <p className="text-[11px] text-slate-400 mt-1">Design Lifespan: {activeStructure.lifespanYears}</p>
            </div>
          </div>

          {/* Engineering Specifications & Scheme Financing */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-3">
            <div>
              <span className="text-slate-400 font-semibold block text-[11px]">Engineering Construction Specifications:</span>
              <p className="text-slate-300 text-[11px] mt-0.5 font-mono">{activeStructure.specifications}</p>
            </div>

            <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <span className="text-slate-400 text-[11px]">Eligible Central & State Schemes:</span>
              <div className="flex items-center space-x-2">
                {activeStructure.schemes.map((sch, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-semibold">
                    {sch}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

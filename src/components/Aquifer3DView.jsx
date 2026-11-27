// Aquifer3DView.jsx - Interactive Subsurface Hydrogeological Cross-Section & Vadose Zone Simulator
// Visualizes Patent FIG. 1 & FIG. 2: Catchment recharge, fracture lineament infiltration, vadose zone physics, and spring discharge

import React, { useState, useMemo } from 'react';
import { 
  Layers, 
  Droplet, 
  CloudRain, 
  Sliders, 
  Activity, 
  Compass, 
  Mountain, 
  TrendingUp, 
  Award, 
  Sparkles, 
  ShieldCheck,
  Zap,
  RefreshCw,
  Info
} from 'lucide-react';

export default function Aquifer3DView() {
  // Hydrogeological Simulation Inputs
  const [rainfallRate, setRainfallRate] = useState(65); // mm/hr
  const [forestCanopy, setForestCanopy] = useState(70); // %
  const [lineamentDensity, setLineamentDensity] = useState(0.75); // 0 to 1
  const [soilPermeability, setSoilPermeability] = useState(0.60); // 0 (clay) to 1 (gravel)
  const [showStructures, setShowStructures] = useState(true); // WDC-PMKSY structures

  // Physics Calculations based on Darcy's Law & Water Balance
  // Runoff Coefficient C = 0.85 - 0.50*(forest/100) - 0.20*(soil)
  const runoffCoeff = useMemo(() => {
    const raw = 0.85 - (0.45 * (forestCanopy / 100)) - (0.25 * soilPermeability);
    return Math.max(0.15, Math.min(0.90, raw));
  }, [forestCanopy, soilPermeability]);

  // Overland Runoff (m^3/hr)
  const surfaceRunoff = useMemo(() => {
    return Math.round(rainfallRate * runoffCoeff * 14.5);
  }, [rainfallRate, runoffCoeff]);

  // Infiltration to Vadose Zone (m^3/hr)
  const infiltrationRate = useMemo(() => {
    const rechargePotential = (1 - runoffCoeff) * (0.4 + 0.6 * lineamentDensity);
    return Math.round(rainfallRate * rechargePotential * 12.2);
  }, [rainfallRate, runoffCoeff, lineamentDensity]);

  // Spring Discharge Flow (Litres Per Minute)
  const springDischarge = useMemo(() => {
    const base = infiltrationRate * 1.85;
    const structureBonus = showStructures ? base * 0.35 : 0;
    return Math.round(base + structureBonus);
  }, [infiltrationRate, showStructures]);

  // Aquifer Travel Time Lag (Days from Ridge to Spring Orifice)
  const travelLagDays = useMemo(() => {
    const velocity = (soilPermeability * 0.6 + lineamentDensity * 0.8) + 0.1;
    return Math.max(4, Math.round(45 / velocity));
  }, [soilPermeability, lineamentDensity]);

  // Aquifer Water Table Height (visual percentage 20% to 75%)
  const waterTableHeight = useMemo(() => {
    const normalized = Math.min(100, (infiltrationRate / 700) * 100);
    return 25 + normalized * 0.45;
  }, [infiltrationRate]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-cyan-950/80 via-slate-900 to-emerald-950/80 border border-cyan-800/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-2">
              <Mountain className="w-3.5 h-3.5" />
              <span>3D Geological Cross-Section Visualizer</span>
              <span className="text-cyan-400 text-[10px]">&bull; Patent FIG. 1 & 2 Vadose Model</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Subsurface Aquifer & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Spring Infiltration Dynamics</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Interactive physics simulation visualizing precipitation infiltration on mountain ridges, fracture lineament connectivity, vadose zone percolation, and unconfined spring emergence.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowStructures(!showStructures)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg cursor-pointer ${
                showStructures
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>{showStructures ? 'WDC-PMKSY Structures: ON' : 'Recharge Structures: OFF'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Visual Cross-Section (Left 8 cols) + Hydrogeology Sliders (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive 2D/3D Geological Cutaway (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="text-xs font-bold text-white uppercase tracking-wider">Himalayan Catchment Profile (Vertical Cross-Section)</span>
            </div>
            <div className="flex items-center space-x-3 text-xs text-slate-400">
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-500/80"></span>
                <span className="text-[11px]">Vadose Soil</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-cyan-500/80"></span>
                <span className="text-[11px]">Water Table</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-700"></span>
                <span className="text-[11px]">Bedrock</span>
              </span>
            </div>
          </div>

          {/* SVG Geological Interactive Canvas */}
          <div className="relative w-full h-[380px] sm:h-[440px] bg-gradient-to-b from-sky-950/40 via-slate-950 to-slate-900 rounded-xl overflow-hidden border border-slate-800/80 shadow-inner">
            {/* Rainfall Precipitation Animation Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
              <svg className="w-full h-full">
                <defs>
                  <pattern id="rainPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="4" y2="15" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="2,3" />
                  </pattern>
                </defs>
                <rect width="100%" height="45%" fill="url(#rainPattern)" />
              </svg>
            </div>

            {/* SVG Mountain Ridge & Subsurface Strata */}
            <svg viewBox="0 0 800 420" className="w-full h-full preserve-3d" preserveAspectRatio="none">
              <defs>
                {/* Geological Soil Gradient */}
                <linearGradient id="soilGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#854d0e" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#451a03" stopOpacity="0.95" />
                </linearGradient>

                {/* Saturated Aquifer Water Table Gradient */}
                <linearGradient id="aquiferWaterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#0284c7" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0.95" />
                </linearGradient>

                {/* Impermeable Bedrock Gradient */}
                <linearGradient id="bedrockGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#334155" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
              </defs>

              {/* 1. Deep Impermeable Bedrock Stratum */}
              <path
                d="M 0 280 Q 250 290, 500 310 T 800 330 L 800 420 L 0 420 Z"
                fill="url(#bedrockGradient)"
              />

              {/* 2. Saturated Aquifer Zone (Dynamic Height based on infiltration) */}
              <path
                d={`M 0 ${340 - waterTableHeight * 1.2} Q 280 ${350 - waterTableHeight * 1.4}, 520 280 L 800 290 L 800 340 L 0 340 Z`}
                fill="url(#aquiferWaterGradient)"
                className="transition-all duration-700 ease-out"
              />

              {/* 3. Unsaturated Vadose Zone / Soil Strata */}
              <path
                d="M 0 120 Q 200 170, 420 230 T 800 310 L 800 340 L 0 340 Z"
                fill="url(#soilGradient)"
                opacity="0.75"
              />

              {/* 4. Natural Mountain Slope Top Surface */}
              <path
                d="M 0 110 Q 200 160, 420 220 T 800 300"
                fill="none"
                stroke="#10b981"
                strokeWidth="7"
                strokeLinecap="round"
              />

              {/* Forest Vegetation Canopy on Upper Ridge */}
              {forestCanopy > 20 && (
                <g className="text-emerald-500 fill-current opacity-90 transition-opacity">
                  <circle cx="40" cy="100" r="14" fill="#059669" />
                  <circle cx="70" cy="115" r="16" fill="#047857" />
                  <circle cx="110" cy="125" r="18" fill="#059669" />
                  <circle cx="150" cy="140" r="14" fill="#047857" />
                  <circle cx="190" cy="155" r="15" fill="#059669" />
                  <circle cx="230" cy="170" r="13" fill="#047857" />
                </g>
              )}

              {/* Fracture Lineament Pathways (Secondary Porosity Infiltration Routes) */}
              <g stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="5,4" className="opacity-75">
                <path d="M 90 125 L 140 230 L 120 280" />
                <path d="M 180 155 L 240 250 L 260 295" />
                <path d="M 280 185 L 340 260 L 370 290" />
                <path d="M 370 210 L 410 270" />
              </g>

              {/* Spring Orifice (Break in Slope Discharge Point at X=520, Y=250) */}
              <g transform="translate(520, 245)">
                {/* Emerging Gushing Spring Stream */}
                <ellipse cx="0" cy="10" rx="14" ry="6" fill="#38bdf8" className="animate-pulse" />
                <path
                  d="M 5 12 Q 70 30, 160 55 T 280 65"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <circle cx="0" cy="8" r="6" fill="#0284c7" />
                {/* Marker Pin */}
                <circle cx="0" cy="0" r="10" fill="#f43f5e" className="animate-ping opacity-75" />
                <circle cx="0" cy="0" r="6" fill="#f43f5e" />
              </g>

              {/* WDC-PMKSY 2.0 Conservation Structures (Contour Trenches & Check Dams) */}
              {showStructures && (
                <g className="transition-all duration-500">
                  {/* Percolation Pit / Basin on Upper Slope */}
                  <g transform="translate(130, 142)">
                    <rect x="-10" y="-4" width="24" height="12" rx="3" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
                    <text x="-8" y="24" fill="#fbbf24" fontSize="10" fontWeight="bold">Percolation Pit</text>
                  </g>

                  {/* Staggered Contour Trench */}
                  <g transform="translate(250, 180)">
                    <rect x="-12" y="-4" width="28" height="10" rx="2" fill="#d97706" stroke="#78350f" strokeWidth="1.5" />
                    <text x="-12" y="22" fill="#fbbf24" fontSize="10" fontWeight="bold">Contour Trench</text>
                  </g>

                  {/* Gabion Check Dam */}
                  <g transform="translate(390, 215)">
                    <polygon points="-6,10 6,10 4,-6 -4,-6" fill="#64748b" stroke="#334155" strokeWidth="2" />
                    <text x="-10" y="25" fill="#94a3b8" fontSize="10" fontWeight="bold">Check Dam</text>
                  </g>
                </g>
              )}

              {/* Labels on Cross-Section */}
              <text x="30" y="75" fill="#34d399" fontSize="12" fontWeight="bold">Alpine Recharge Catchment</text>
              <text x="540" y="235" fill="#f43f5e" fontSize="12" fontWeight="bold">Spring Orifice Emergence</text>
              <text x="20" y="380" fill="#64748b" fontSize="11" fontWeight="bold">Impermeable Crystalline Bedrock</text>
              <text x="650" y="325" fill="#38bdf8" fontSize="11" fontWeight="bold">Vadose Plume</text>
            </svg>

            {/* Bottom Real-Time Physics Telemetry HUD */}
            <div className="absolute bottom-3 left-3 right-3 bg-slate-950/85 backdrop-blur-md border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-slate-400">Spring Discharge:</span>
                <strong className="text-cyan-300 font-mono text-sm">{springDischarge} L/min</strong>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${springDischarge > 25 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                  {springDischarge > 25 ? 'Perennial' : 'Deficit (<25)'}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-slate-400">Infiltration:</span>
                <strong className="text-emerald-300 font-mono text-sm">{infiltrationRate} m³/hr</strong>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-slate-400">Overland Runoff:</span>
                <strong className="text-amber-300 font-mono text-sm">{surfaceRunoff} m³/hr</strong>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-slate-400">Aquifer Lag Time:</span>
                <strong className="text-white font-mono text-sm">{travelLagDays} Days</strong>
              </div>
            </div>
          </div>

          {/* Patent Innovation Note */}
          <div className="mt-4 p-3 bg-slate-800/60 border border-slate-700/60 rounded-xl flex items-start space-x-3 text-xs text-slate-300">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p>
              <strong className="text-white">Patent Claim Correlation (FIG. 1, FIG. 2)</strong>: This cross-section links precipitation inputs with lineament fracture conductivity and root-zone retention. Adding WDC-PMKSY contour trenches intercepts overland runoff, boosting effective recharge by <strong className="text-emerald-400">+35%</strong>.
            </p>
          </div>
        </div>

        {/* Right: Hydrogeology Sliders & Controls (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col space-y-5">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                <span>Catchment Simulation Sliders</span>
              </h3>
              <p className="text-[11px] text-slate-400">Adjust parameters to see real-time groundwater response</p>
            </div>
            <button
              onClick={() => {
                setRainfallRate(65);
                setForestCanopy(70);
                setLineamentDensity(0.75);
                setSoilPermeability(0.60);
              }}
              title="Reset default values"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Slider 1: Rainfall Rate */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium flex items-center space-x-1.5">
                <CloudRain className="w-3.5 h-3.5 text-sky-400" />
                <span>Precipitation Event</span>
              </span>
              <strong className="text-sky-300 font-mono">{rainfallRate} mm/hr</strong>
            </div>
            <input
              type="range"
              min="10"
              max="150"
              value={rainfallRate}
              onChange={(e) => setRainfallRate(Number(e.target.value))}
              className="w-full accent-sky-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>Light Rain (10mm)</span>
              <span>Monsoon Cloudburst (150mm)</span>
            </div>
          </div>

          {/* Slider 2: Forest Canopy */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Forest Canopy Density</span>
              </span>
              <strong className="text-emerald-300 font-mono">{forestCanopy}%</strong>
            </div>
            <input
              type="range"
              min="5"
              max="95"
              value={forestCanopy}
              onChange={(e) => setForestCanopy(Number(e.target.value))}
              className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>Barren/Deforested (5%)</span>
              <span>Dense Sacred Grove (95%)</span>
            </div>
          </div>

          {/* Slider 3: Lineament Fracture Density */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Tectonic Lineament Density</span>
              </span>
              <strong className="text-cyan-300 font-mono">{(lineamentDensity * 100).toFixed(0)}%</strong>
            </div>
            <input
              type="range"
              min="0.10"
              max="0.95"
              step="0.05"
              value={lineamentDensity}
              onChange={(e) => setLineamentDensity(Number(e.target.value))}
              className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>Massive Rock (Low)</span>
              <span>Extensive Fractures (High)</span>
            </div>
          </div>

          {/* Slider 4: Soil Permeability */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>Vadose Hydraulic Conductivity</span>
              </span>
              <strong className="text-amber-300 font-mono">{soilPermeability < 0.35 ? 'Clayey' : soilPermeability < 0.70 ? 'Loamy Soil' : 'Sandy Gravel'}</strong>
            </div>
            <input
              type="range"
              min="0.10"
              max="0.95"
              step="0.05"
              value={soilPermeability}
              onChange={(e) => setSoilPermeability(Number(e.target.value))}
              className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>Low (Clay)</span>
              <span>High (Gravelly Sand)</span>
            </div>
          </div>

          {/* Hydrogeological Efficiency Gauge */}
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Catchment Recharge Efficiency</div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300">Runoff Fraction:</span>
              <span className="font-mono text-rose-400 font-bold">{(runoffCoeff * 100).toFixed(0)}%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300">Effective Infiltration:</span>
              <span className="font-mono text-emerald-400 font-bold">{((1 - runoffCoeff) * 100).toFixed(0)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden flex">
              <div style={{ width: `${(1 - runoffCoeff) * 100}%` }} className="bg-emerald-500 h-full" />
              <div style={{ width: `${runoffCoeff * 100}%` }} className="bg-rose-500 h-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

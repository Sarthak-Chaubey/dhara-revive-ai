// DashboardOverview.jsx
import React from 'react';
import { 
  Droplet, 
  AlertTriangle, 
  TrendingDown, 
  Users, 
  Compass, 
  ShieldCheck, 
  Sparkles,
  Layers,
  Calendar,
  Building2
} from 'lucide-react';
import { KPI_METRICS, STUDY_REGION } from '../data/springsData';

export default function DashboardOverview({ selectedBlock, setSelectedBlock, filterStatus, setFilterStatus, searchQuery, setSearchQuery }) {
  return (
    <div className="space-y-6">
      {/* Hero Banner with Study Region & Capstone Context */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/70 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-60 h-60 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart India Hackathon 2026 | Decision-Support System</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              AI-Based Spring Revival & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Recharge Planning</span> for Tribal Areas
            </h1>
            <p className="mt-2.5 text-sm sm:text-base text-slate-300 leading-relaxed">
              Addressing <strong className="text-white">SIH26240 (Ministry of Tribal Affairs)</strong>: An explainable hydrogeological decision engine combining machine learning vulnerability scoring, springshed recharge zone delineation, and rule-based soil-water conservation engineering.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center space-x-1.5 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60">
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                <span>Region: <strong className="text-slate-200">{STUDY_REGION.name}</strong></span>
              </span>
              <span className="flex items-center space-x-1.5 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>Tribal Groups: <strong className="text-slate-200">{STUDY_REGION.dominantTribes.join(', ')}</strong></span>
              </span>
              <span className="flex items-center space-x-1.5 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60">
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Nodal Scheme: <strong className="text-slate-200">WDC-PMKSY 2.0 / DoLR</strong></span>
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <div className="bg-slate-800/80 border border-slate-700/80 p-3.5 rounded-xl text-center">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Priority Action Required</div>
              <div className="text-2xl font-black text-rose-400 mt-0.5">14 Springs Critical</div>
              <div className="text-xs text-slate-400 mt-0.5">Discharge fallen below potable threshold</div>
            </div>
          </div>
        </div>
      </div>

      {/* 5 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Springs Mapped */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Inventory Springs</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Droplet className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-white">{KPI_METRICS.totalSprings}</span>
            <span className="text-xs text-slate-400">across 4 blocks</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
            <span className="text-rose-400 font-medium">{KPI_METRICS.criticalSprings} Critical</span>
            <span className="text-amber-400 font-medium">{KPI_METRICS.seasonalSprings} Seasonal</span>
            <span className="text-emerald-400 font-medium">{KPI_METRICS.perennialSprings} Stable</span>
          </div>
        </div>

        {/* Card 2: Discharge Reduction */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Avg Flow Depletion</span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-rose-400">{KPI_METRICS.avgDischargeDropPct}%</span>
            <span className="text-xs text-slate-400">vs 10-yr normal</span>
          </div>
          <p className="mt-2 text-xs text-slate-400 truncate">
            Monsoon rainfall deficit & accelerated slope runoff
          </p>
        </div>

        {/* Card 3: Tribal Beneficiaries Protected */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Tribal Population</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-amber-300">{KPI_METRICS.totalDependentTribalPop.toLocaleString()}</span>
            <span className="text-xs text-slate-400">inhabitants</span>
          </div>
          <p className="mt-2 text-xs text-slate-400 truncate">
            Pangwala, Gaddi & Gujjar remote hamlets
          </p>
        </div>

        {/* Card 4: Revival Investment & Yield */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Annual Recharge Gain</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-emerald-400">{KPI_METRICS.estAnnualRechargePotentialM3}</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
            <span>Budget: <strong className="text-white">{KPI_METRICS.estRevivalBudgetInr}</strong></span>
            <span className="text-emerald-400">100% WDC Grantable</span>
          </div>
        </div>
      </div>

      {/* Filter and Query Control Bar */}
      <div className="bg-slate-900/90 border border-slate-800/90 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="w-full md:w-72">
          <input
            type="text"
            placeholder="Search spring, village, or tribe..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Status Filter */}
          <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            {['All', 'Critical', 'Vulnerable', 'Seasonal', 'Perennial'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  filterStatus === status
                    ? status === 'Critical' ? 'bg-rose-500 text-white font-bold' :
                      status === 'Vulnerable' ? 'bg-amber-500 text-slate-950 font-bold' :
                      status === 'Seasonal' ? 'bg-yellow-500 text-slate-950 font-bold' :
                      status === 'Perennial' ? 'bg-emerald-500 text-white font-bold' :
                      'bg-slate-700 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Block Dropdown */}
          <select
            value={selectedBlock}
            onChange={(e) => setSelectedBlock(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"
          >
            <option value="All">All Tribal Blocks</option>
            {STUDY_REGION.blocks.map((b) => (
              <option key={b} value={b}>{b} Block</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

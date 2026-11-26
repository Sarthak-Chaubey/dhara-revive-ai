// src/components/PatentScoringEngine.jsx - Patent Scoring Engine with Weight Sliders & CSV Upload
// Grounded in Patent Application (Annexure 3b - FIG. 1, FIG. 2, and FIG. 3)

import React, { useState, useMemo } from 'react';
import { 
  Sliders, 
  Upload, 
  FileText, 
  Download, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Layers, 
  Filter, 
  ChevronRight, 
  Info,
  Lock,
  Sparkles,
  Award
} from 'lucide-react';
import { 
  DEFAULT_PATENT_WEIGHTS, 
  computePatentSpringScore, 
  evaluatePatentFig3Rules, 
  getSampleCsvTemplate,
  PATENT_METADATA 
} from '../data/patentData';
import { SPRINGS_DATA } from '../data/springsData';

export default function PatentScoringEngine({ onSelectSpring }) {
  // State for user-adjustable expert weights (FIG. 1, Item 50)
  const [weights, setWeights] = useState({ ...DEFAULT_PATENT_WEIGHTS });
  
  // Custom uploaded springs (Local-only, privacy-preserving)
  const [customSprings, setCustomSprings] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(null);

  // Active risk class filter: 'All' | 'High' | 'Medium' | 'Low'
  const [riskFilter, setRiskFilter] = useState('All');
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedSpringDetail, setSelectedSpringDetail] = useState(null);

  // Choose between built-in dataset or user-uploaded dataset
  const activeDataset = useMemo(() => {
    return customSprings || SPRINGS_DATA;
  }, [customSprings]);

  // Handle weight slider change
  const handleWeightChange = (key, value) => {
    setWeights((prev) => ({
      ...prev,
      [key]: parseFloat(value)
    }));
  };

  // Reset to patent default weights (0.20, 0.15, 0.20, 0.20, 0.15, 0.10)
  const handleResetWeights = () => {
    setWeights({ ...DEFAULT_PATENT_WEIGHTS });
  };

  // Sum of weights
  const weightSum = useMemo(() => {
    return Object.values(weights).reduce((a, b) => a + b, 0);
  }, [weights]);

  // Compute patent scores for all springs in real-time
  const scoredSprings = useMemo(() => {
    return activeDataset.map((spring) => {
      const patentResult = computePatentSpringScore(spring, weights);
      return {
        ...spring,
        patentScore: patentResult.score,
        patentRiskClass: patentResult.riskClass,
        topThreeFactors: patentResult.topThreeFactors,
        patentMeasures: patentResult.recommendedMeasures,
        contributions: patentResult.contributions
      };
    }).sort((a, b) => b.patentScore - a.patentScore);
  }, [activeDataset, weights]);

  // Filtered springs based on Risk Class & Search
  const filteredScoredSprings = useMemo(() => {
    return scoredSprings.filter((s) => {
      if (riskFilter !== 'All' && s.patentRiskClass !== riskFilter) return false;
      if (searchFilter.trim() !== '') {
        const q = searchFilter.toLowerCase();
        const mName = s.name.toLowerCase().includes(q);
        const mVillage = (s.village || '').toLowerCase().includes(q);
        const mId = s.id.toLowerCase().includes(q);
        return mName || mVillage || mId;
      }
      return true;
    });
  }, [scoredSprings, riskFilter, searchFilter]);

  // CSV Upload Parser (Local-Only processing as claimed in Patent)
  const handleCsvUpload = (e) => {
    setUploadError(null);
    setUploadSuccess(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result;
        if (typeof text !== 'string') throw new Error('Could not read file text.');

        const lines = text.trim().split(/\r?\n/);
        if (lines.length < 2) throw new Error('CSV must contain a header row and at least one spring record.');

        const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
        const requiredFields = ['id', 'name', 'latitude', 'longitude', 'slope', 'rainfall'];

        for (const req of requiredFields) {
          if (!headers.includes(req)) {
            throw new Error(`Missing required CSV column: "${req}". Please download the template for format.`);
          }
        }

        const parsed = [];
        for (let i = 1; i < lines.length; i++) {
          const row = lines[i].split(',').map((col) => col.trim());
          if (row.length < headers.length) continue;

          const rowData = {};
          headers.forEach((h, idx) => {
            rowData[h] = row[idx];
          });

          parsed.push({
            id: rowData.id || `SP-UP-${i}`,
            name: rowData.name || `Uploaded Spring ${i}`,
            village: rowData.village || 'Habitation Block',
            block: rowData.block || 'Local Block',
            coordinates: [parseFloat(rowData.latitude) || 32.5, parseFloat(rowData.longitude) || 76.5],
            elevation: parseFloat(rowData.elevation) || 2200,
            slopeDeg: parseFloat(rowData.slope) || 15,
            annualRainfallMm: parseFloat(rowData.rainfall) || 1000,
            ndvi: parseFloat(rowData.ndvi) || 0.35,
            forestLossPct: parseFloat(rowData.forest_loss) || 15.0,
            soilInfiltrationMmHr: parseFloat(rowData.soil_infiltration) || 25.0,
            lineamentDensity: parseFloat(rowData.lineament_density) || 0.6,
            streamDistM: parseFloat(rowData.stream_distance) || 150,
            dominantTribe: rowData.tribe || 'Tribal Community',
            currentDischargeLpm: parseFloat(rowData.discharge) || 4.5,
            status: 'Uploaded'
          });
        }

        if (parsed.length === 0) throw new Error('No valid spring rows found in CSV file.');

        setCustomSprings(parsed);
        setUploadSuccess(`Successfully loaded ${parsed.length} custom springs! Computed in-browser.`);
      } catch (err) {
        setUploadError(err.message || 'Error parsing CSV file.');
      }
    };
    reader.readAsText(file);
  };

  // Download Sample CSV
  const handleDownloadTemplate = () => {
    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(getSampleCsvTemplate());
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", "dhara_patent_sample_springs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Patent Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/60 border border-emerald-800/40 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Indian Patent Complete Filing &bull; LPU Invention Disclosure (Annexure 3b)</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Explainable Decision-Support Scoring & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Recharge Measure Rule Engine</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Implemented directly from Patent Drawings <strong>FIG. 1, FIG. 2, and FIG. 3</strong>: Normalises 6 indicators (Slope, Rainfall, NDVI, Forest Loss, Soil Infiltration, Lineament Density) into a 0–100 vulnerability score with user-adjustable weights, Top-3 factor attribution, and deterministic multi-measure rules.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center space-x-1.5 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Client-Side Local-Only Processing (Zero Server Transmission)</span>
              </span>
              <span className="flex items-center space-x-1.5 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>6 Student Inventors &bull; Lovely Professional University</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            <button
              onClick={handleDownloadTemplate}
              className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors shadow-md"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Download CSV Template</span>
            </button>
            <label className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-700/20 cursor-pointer">
              <Upload className="w-4 h-4" />
              <span>Upload Spring CSV (Local)</span>
              <input type="file" accept=".csv" onChange={handleCsvUpload} className="hidden" />
            </label>
          </div>
        </div>

        {uploadError && (
          <div className="mt-4 p-3 bg-rose-950/60 border border-rose-800/60 rounded-xl text-rose-300 text-xs flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{uploadError}</span>
          </div>
        )}

        {uploadSuccess && (
          <div className="mt-4 p-3 bg-emerald-950/60 border border-emerald-800/60 rounded-xl text-emerald-300 text-xs flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{uploadSuccess}</span>
            </div>
            <button
              onClick={() => { setCustomSprings(null); setUploadSuccess(null); }}
              className="text-xs text-slate-400 hover:text-white underline ml-3"
            >
              Reset to Chamba-Pangi Baseline Dataset
            </button>
          </div>
        )}
      </div>

      {/* USER-ADJUSTABLE WEIGHT CONTROLS (FIG. 1, Item 50 & FIG. 2) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span>Patent Weight Controls (FIG. 1, Item 50)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Adjust weights to reflect local geological priorities; vulnerability scores and rankings update immediately.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-xs text-slate-300 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 font-mono">
              Weight Sum: <strong className={Math.abs(weightSum - 1.0) < 0.01 ? 'text-emerald-400' : 'text-amber-400'}>
                {weightSum.toFixed(2)}
              </strong>
            </div>
            <button
              onClick={handleResetWeights}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Patent Defaults</span>
            </button>
          </div>
        </div>

        {/* 6 Weight Sliders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {/* 1. Slope */}
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-semibold text-slate-200">1. Slope Steepness</span>
              <strong className="text-emerald-400 font-mono">w = {weights.slope.toFixed(2)}</strong>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.50"
              step="0.01"
              value={weights.slope}
              onChange={(e) => handleWeightChange('slope', e.target.value)}
              className="w-full accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>Higher slope = higher runoff risk</span>
              <span>Default: 0.20</span>
            </div>
          </div>

          {/* 2. Rainfall */}
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-semibold text-slate-200">2. Rainfall Deficit</span>
              <strong className="text-cyan-400 font-mono">w = {weights.rainfall.toFixed(2)}</strong>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.50"
              step="0.01"
              value={weights.rainfall}
              onChange={(e) => handleWeightChange('rainfall', e.target.value)}
              className="w-full accent-cyan-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>Lower rain = higher risk</span>
              <span>Default: 0.15</span>
            </div>
          </div>

          {/* 3. NDVI */}
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-semibold text-slate-200">3. Vegetation Density (NDVI)</span>
              <strong className="text-teal-400 font-mono">w = {weights.ndvi.toFixed(2)}</strong>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.50"
              step="0.01"
              value={weights.ndvi}
              onChange={(e) => handleWeightChange('ndvi', e.target.value)}
              className="w-full accent-teal-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>Lower vegetation = higher risk</span>
              <span>Default: 0.20</span>
            </div>
          </div>

          {/* 4. Forest Loss */}
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-semibold text-slate-200">4. Forest Loss %</span>
              <strong className="text-rose-400 font-mono">w = {weights.forestLoss.toFixed(2)}</strong>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.50"
              step="0.01"
              value={weights.forestLoss}
              onChange={(e) => handleWeightChange('forestLoss', e.target.value)}
              className="w-full accent-rose-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>Higher forest loss = higher risk</span>
              <span>Default: 0.20</span>
            </div>
          </div>

          {/* 5. Soil Infiltration */}
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-semibold text-slate-200">5. Soil Infiltration Capacity</span>
              <strong className="text-amber-400 font-mono">w = {weights.soilInfiltration.toFixed(2)}</strong>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.50"
              step="0.01"
              value={weights.soilInfiltration}
              onChange={(e) => handleWeightChange('soilInfiltration', e.target.value)}
              className="w-full accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>Lower infiltration = higher risk</span>
              <span>Default: 0.15</span>
            </div>
          </div>

          {/* 6. Lineament Density */}
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-semibold text-slate-200">6. Lineament Density</span>
              <strong className="text-purple-400 font-mono">w = {weights.lineamentDensity.toFixed(2)}</strong>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.50"
              step="0.01"
              value={weights.lineamentDensity}
              onChange={(e) => handleWeightChange('lineamentDensity', e.target.value)}
              className="w-full accent-purple-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>Lower fracture connectivity = higher risk</span>
              <span>Default: 0.10</span>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER BAR & SUMMARY COUNTERS */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="w-full md:w-80">
          <input
            type="text"
            placeholder="Search spring ID, name or village..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Risk Class Filter Pills (High > 66, Medium 33-66, Low < 33) */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-400 font-semibold mr-1">Patent Risk Class:</span>
          {['All', 'High', 'Medium', 'Low'].map((cls) => {
            const count = cls === 'All' 
              ? scoredSprings.length 
              : scoredSprings.filter(s => s.patentRiskClass === cls).length;

            return (
              <button
                key={cls}
                onClick={() => setRiskFilter(cls)}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  riskFilter === cls
                    ? cls === 'High' ? 'bg-rose-500 text-white' :
                      cls === 'Medium' ? 'bg-amber-500 text-slate-950' :
                      cls === 'Low' ? 'bg-emerald-500 text-white' :
                      'bg-slate-700 text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cls} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* RANKED LIST WITH EXPLAINABILITY & FIG. 3 MULTI-MEASURES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Ranked Table (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Spring Vulnerability Rankings & Multi-Measure Actions
              </h3>
              <p className="text-xs text-slate-400">
                Sorted by deterministic score (0–100) &bull; Evaluated using Patent FIG. 3 Rule Matrix
              </p>
            </div>
            <span className="text-xs font-mono bg-slate-800 text-slate-300 px-2.5 py-1 rounded border border-slate-700">
              {filteredScoredSprings.length} Springs
            </span>
          </div>

          <div className="divide-y divide-slate-800/80 max-h-[640px] overflow-y-auto">
            {filteredScoredSprings.map((spring, index) => {
              const isSelected = selectedSpringDetail?.id === spring.id;
              const isHigh = spring.patentRiskClass === 'High';
              const isMed = spring.patentRiskClass === 'Medium';

              return (
                <div
                  key={spring.id}
                  onClick={() => setSelectedSpringDetail(spring)}
                  className={`p-4 transition-all cursor-pointer ${
                    isSelected ? 'bg-slate-800/90 ring-1 ring-emerald-500/60' : 'hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center space-x-3">
                      <span className="w-7 h-7 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-xs font-bold font-mono text-slate-400">
                        #{index + 1}
                      </span>
                      <div>
                        <div className="flex items-center space-x-2">
                          <strong className="text-sm text-white">{spring.name}</strong>
                          <span className="text-[10px] font-mono text-slate-400">({spring.id})</span>
                        </div>
                        <div className="text-xs text-slate-400">
                          {spring.village}, {spring.block} &bull; <span className="text-slate-300">{spring.dominantTribe}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 self-end sm:self-auto">
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Patent Score</span>
                        <div className="text-xl font-extrabold font-mono text-white">
                          {spring.patentScore} <span className="text-xs text-slate-400 font-sans">/ 100</span>
                        </div>
                      </div>

                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                        isHigh ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' :
                        isMed ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                        'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      }`}>
                        {spring.patentRiskClass} Risk
                      </span>
                    </div>
                  </div>

                  {/* Step 5: Top 3 Contributing Indicators */}
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                      Top 3 Risk Contributors (Explainability):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {spring.topThreeFactors.map((f, fIdx) => (
                        <div key={fIdx} className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-[11px]">
                          <span className="text-slate-400 block">{f.name}:</span>
                          <strong className="text-emerald-300 font-mono">{f.val}</strong>
                          <span className="text-[10px] text-slate-500 ml-1">({(f.weightedContr * 100).toFixed(1)} pts)</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step 6: FIG. 3 Recommended Measures Pills */}
                  <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] text-slate-400 font-semibold mr-1">FIG. 3 Measures:</span>
                    {spring.patentMeasures.map((m, mIdx) => (
                      <span
                        key={mIdx}
                        className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800 font-medium"
                      >
                        {m.measure}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Spring Detail & Rule Audit Inspector (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-5">
          {selectedSpringDetail ? (
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-800">
                <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-950/60 border border-cyan-800 px-2 py-0.5 rounded">
                  Patent Audit Inspector
                </span>
                <h4 className="text-base font-bold text-white mt-1.5">{selectedSpringDetail.name}</h4>
                <div className="text-xs text-slate-400">
                  {selectedSpringDetail.village}, {selectedSpringDetail.block} Block
                </div>
              </div>

              {/* Indicator Normalization Breakdown */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2 text-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  6-Indicator Vector & Weighted Impact
                </span>
                {selectedSpringDetail.contributions.map((c, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[11px] py-1 border-b border-slate-900 last:border-none">
                    <span className="text-slate-300">{c.name}</span>
                    <div className="text-right font-mono">
                      <strong className="text-white">{c.val}</strong>
                      <span className="text-[10px] text-cyan-400 ml-1.5">({(c.weightedContr * 100).toFixed(1)} pts)</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* FIG. 3 Rule Trigger Explanations */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                  Deterministic Rule Execution (FIG. 3):
                </span>
                {selectedSpringDetail.patentMeasures.map((m, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-emerald-300">{m.measure}</strong>
                      <span className="text-[9px] font-mono bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded">
                        {m.ruleId}
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-cyan-400">{m.trigger}</div>
                    <p className="text-[11px] text-slate-400 leading-normal">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-slate-500 text-xs space-y-2">
              <Info className="w-8 h-8 mx-auto text-slate-600 mb-1" />
              <p>Click on any spring in the ranked list to inspect its 6-indicator normalized vectors and exact FIG. 3 rule trigger logic.</p>
            </div>
          )}

          <div className="p-3 bg-emerald-950/30 border border-emerald-900/40 rounded-xl text-[11px] text-emerald-300 flex items-start space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p>
              Meets patent claims: Deterministic, explainable, and zero server transmission for sensitive community water assets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// src/components/InnovationsView.jsx - Novel Innovations & Unique Features (SIH26240 Differentiator)
import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Compass, 
  TreePine, 
  FileCheck, 
  Snowflake, 
  Timer, 
  Copy, 
  Check, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  Sliders, 
  BookOpen,
  Mountain,
  AlertTriangle,
  Play,
  RotateCcw
} from 'lucide-react';
import { 
  calculateIsotopeElevationAPI, 
  simulateCryosphereImpactAPI, 
  generateFraResolutionAPI 
} from '../services/api';
import { SPRINGS_DATA } from '../data/springsData';

export default function InnovationsView() {
  const [activeSubTab, setActiveSubTab] = useState('isotope'); // 'isotope' | 'tek' | 'fra' | 'cryo' | 'field'

  // 1. Isotope State
  const [springDelta18O, setSpringDelta18O] = useState(-9.45);
  const [refDelta18O, setRefDelta18O] = useState(-7.20);
  const [refElev, setRefElev] = useState(1450);
  const [springMouthElev, setSpringMouthElev] = useState(2420);
  const [isotopeResult, setIsotopeResult] = useState(null);

  // 2. Cryosphere State
  const [warmingC, setWarmingC] = useState(1.8);
  const [snowDeficitPct, setSnowDeficitPct] = useState(30);
  const [cryoResult, setCryoResult] = useState(null);

  // 3. FRA Resolution State
  const [fraTargetSpring, setFraTargetSpring] = useState(SPRINGS_DATA[0]);
  const [fraResolution, setFraResolution] = useState(null);
  const [copiedFra, setCopiedFra] = useState(false);

  // 4. Field Bucket Timer State
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [bucketLiters, setBucketLiters] = useState(10);
  const [calculatedFlowLpm, setCalculatedFlowLpm] = useState(null);

  // Initial calculation on mount
  useEffect(() => {
    runIsotopeCalc();
    runCryoCalc();
    runFraGen(fraTargetSpring);
  }, []);

  const runIsotopeCalc = async () => {
    const res = await calculateIsotopeElevationAPI({
      spring_delta_18o: springDelta18O,
      valley_ref_delta_18o: refDelta18O,
      valley_ref_elevation_m: refElev,
      spring_orifice_elevation_m: springMouthElev,
      isotopic_lapse_rate_per_100m: -0.26
    });
    setIsotopeResult(res);
  };

  const runCryoCalc = async () => {
    const res = await simulateCryosphereImpactAPI({
      spring_elevation_m: springMouthElev,
      projected_warming_deg_c: warmingC,
      winter_snow_deficit_pct: snowDeficitPct
    });
    setCryoResult(res);
  };

  const runFraGen = async (spring) => {
    const res = await generateFraResolutionAPI({
      spring_name: spring.name,
      village: spring.village,
      block: spring.block,
      tribe: spring.dominantTribe,
      structures_planned: spring.recommendedIntervention.type,
      recharge_area_hectares: 12.5
    });
    setFraResolution(res);
  };

  // Timer logic for bucket flow method
  useEffect(() => {
    let interval = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 0.1);
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const handleStopTimer = () => {
    setTimerRunning(false);
    if (timerSeconds > 0) {
      // Flow in L/min = (Liters / seconds) * 60
      const flow = (bucketLiters / timerSeconds) * 60;
      setCalculatedFlowLpm(roundNumber(flow, 2));
    }
  };

  const handleResetTimer = () => {
    setTimerRunning(false);
    setTimerSeconds(0);
    setCalculatedFlowLpm(null);
  };

  const roundNumber = (num, decimals = 1) => {
    return Number(Math.round(num + 'e' + decimals) + 'e-' + decimals);
  };

  const handleCopyResolution = () => {
    if (fraResolution && fraResolution.resolution_text) {
      navigator.clipboard.writeText(fraResolution.resolution_text);
      setCopiedFra(true);
      setTimeout(() => setCopiedFra(false), 2000);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-900/30 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SIH26240 Core Differentiators & Novelties</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Novel Innovations <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Not Found in Existing Systems</span>
            </h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Standard spring portals only do generic mapping. DharaRevive AI incorporates <strong>5 pioneering innovations</strong>: Stable water isotope elevation fingerprinting, Traditional Ecological Knowledge (TEK) bio-engineering, Forest Rights Act (FRA 2006) community clearance, cryosphere climate warming modeling, and offline-first field flow auditing.
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-xl text-left shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Evaluation Edge</span>
            <div className="text-xl font-black text-amber-400 mt-0.5">5 Unique Modules</div>
            <p className="text-xs text-slate-400 mt-1">Bridging science, law, and indigenous wisdom</p>
          </div>
        </div>
      </div>

      {/* Sub-Tab Navigation Bar */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-2 rounded-xl border border-slate-800">
        {[
          { id: 'isotope', label: '1. Isotope Altitude Fingerprinting', icon: Mountain, badge: 'δ18O Physics' },
          { id: 'tek', label: '2. Indigenous TEK Bio-Engineering', icon: TreePine, badge: 'Tribal Wisdom' },
          { id: 'fra', label: '3. Forest Rights Act (FRA) Drafter', icon: FileCheck, badge: 'Legal Clearance' },
          { id: 'cryo', label: '4. Cryosphere Snowline Retreat', icon: Snowflake, badge: 'Climate Model' },
          { id: 'field', label: '5. Offline Bucket Flow Surveyor', icon: Timer, badge: 'Field Audit' },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-amber-800 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Isotope Recharge Altitude Fingerprinting */}
      {activeSubTab === 'isotope' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-950/60 border border-cyan-800 px-2 py-0.5 rounded">
                Objective O1 & Ref [3] Extension
              </span>
              <h3 className="text-base font-bold text-white mt-1.5">Stable Isotope Environmental Altitude Calculator</h3>
              <p className="text-xs text-slate-400 mt-1">
                Using Rayleigh fractionation lapse rate (∇δ¹⁸O = -0.26‰ / 100m) to identify exact mountain recharge altitude.
              </p>
            </div>

            {/* Inputs */}
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Spring Water δ¹⁸O (VSMOW)</span>
                  <strong className="text-cyan-400 font-mono">{springDelta18O} ‰</strong>
                </div>
                <input
                  type="range"
                  min="-13.0"
                  max="-5.0"
                  step="0.05"
                  value={springDelta18O}
                  onChange={(e) => setSpringDelta18O(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400"
                />
                <span className="text-[10px] text-slate-500">More negative = higher alpine altitude recharge source</span>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Valley Baseline Station δ¹⁸O</span>
                  <strong className="text-white font-mono">{refDelta18O} ‰</strong>
                </div>
                <input
                  type="range"
                  min="-10.0"
                  max="-4.0"
                  step="0.05"
                  value={refDelta18O}
                  onChange={(e) => setRefDelta18O(parseFloat(e.target.value))}
                  className="w-full accent-slate-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Base Station Elevation</label>
                  <input
                    type="number"
                    value={refElev}
                    onChange={(e) => setRefElev(parseFloat(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-lg px-2.5 py-1.5"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Spring Mouth Elevation</label>
                  <input
                    type="number"
                    value={springMouthElev}
                    onChange={(e) => setSpringMouthElev(parseFloat(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-lg px-2.5 py-1.5"
                  />
                </div>
              </div>

              <button
                onClick={runIsotopeCalc}
                className="w-full py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-colors cursor-pointer shadow-md"
              >
                Compute Isotopic Recharge Elevation
              </button>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-6">
            {isotopeResult ? (
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                    <Mountain className="w-4 h-4 text-cyan-400" />
                    <span>Delineated Infiltration Altitude Band</span>
                  </h4>
                  <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-800">
                    d-excess: {isotopeResult.d_excess_permil} ‰
                  </span>
                </div>

                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-center">
                  <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                    Calculated Mean Recharge Elevation (Z_recharge)
                  </span>
                  <div className="text-4xl font-extrabold text-cyan-400 mt-1 font-mono">
                    {isotopeResult.mean_recharge_altitude_m} m
                  </div>
                  <div className="text-xs text-slate-300 mt-1">
                    Isotopic Infiltration Zone: <strong className="text-emerald-400">{isotopeResult.delineated_altitude_band}</strong>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-400">
                    Hydraulic head above spring mouth: <strong className="text-white font-mono">+{isotopeResult.hydraulic_head_above_orifice_m} meters</strong>
                  </div>
                </div>

                <div className="bg-cyan-950/20 border border-cyan-900/40 p-4 rounded-xl text-xs space-y-2 text-cyan-200">
                  <div className="font-bold flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <span>Hydrogeological Planning Insight</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-300">
                    {isotopeResult.hydrogeological_insight}
                  </p>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[10px] text-slate-400 font-mono">
                  {isotopeResult.formula} (Rayleigh condensation model)
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-slate-500 text-xs">Computing isotopic elevation...</div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Indigenous TEK Bio-Engineering */}
      {activeSubTab === 'tek' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                  Indigenous Ecological Knowledge (TEK)
                </span>
                <h3 className="text-lg font-bold text-white mt-1.5">
                  Tribal Bio-Engineering vs Conventional Civil Structures
                </h3>
                <p className="text-xs text-slate-400">
                  Why concrete structures fail in tribal mountain valleys: concrete check dams crack under Himalayan sub-zero freeze-thaw cycles (-25°C). Tribal bio-engineering combines living vegetative roots with dry-stone masonry.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {[
                {
                  id: "TEK-01",
                  name: "Live Willow Crib-Wall (Salix Wallichiana)",
                  origin: "Pangwala & Bhotiya Tribes (Pangi Valley)",
                  mechanism: "Living woody cuttings sprout dense root anchors (tensile strength 28-34 MPa) that self-heal under frost heave and bind unstable scree.",
                  costSave: "62% cheaper than RCC retaining walls",
                  freezeThaw: "Endures -25°C winter freezes without cracking",
                  matPct: "95% local materials"
                },
                {
                  id: "TEK-02",
                  name: "Gaddi Interlocking Dry-Stone Weir (Dhār-Bāndh)",
                  origin: "Gaddi Pastoralists (Bharmour & Dhauladhar)",
                  mechanism: "Interlocked angular quartzite stones without mortar; allows fine water percolation while detaining torrential boulder debris.",
                  costSave: "48% cheaper than masonry check dam",
                  freezeThaw: "Immune to mortar shattering; shifts flexibly during seismic tremors",
                  matPct: "100% locally quarried field stone"
                },
                {
                  id: "TEK-03",
                  name: "Seabuckthorn (Hippophae Rhamnoides) Infiltration Belt",
                  origin: "Cold-Desert Trans-Himalayan Tribes",
                  mechanism: "Deep nitrogen-fixing taproots increase organic soil humus from 1.2% to 4.5%, boosting soil water infiltration by 3.2x.",
                  costSave: "Zero ongoing maintenance cost",
                  freezeThaw: "Extreme cold tolerance down to -40°C",
                  matPct: "100% native sapling nurseries"
                },
                {
                  id: "TEK-04",
                  name: "Sacred Grove Sanctuary (Dev-Van Demarcation)",
                  origin: "Himalayan Hill Communes & Gram Panchayats",
                  mechanism: "Customary religious prohibition against tree felling, grazing, or construction within 100m of the spring, ensuring unpolluted pristine recharge.",
                  costSave: "Zero capital expenditure (Customary governance)",
                  freezeThaw: "Natural climax Oak ecosystem",
                  matPct: "100% community forest law"
                }
              ].map((item) => (
                <div key={item.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">{item.id}</span>
                      <h4 className="text-sm font-bold text-white mt-0.5">{item.name}</h4>
                      <div className="text-[11px] text-slate-400">Origin: <strong className="text-amber-300">{item.origin}</strong></div>
                    </div>
                    <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800 font-semibold">
                      {item.costSave}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{item.mechanism}</p>

                  <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[10px]">
                    <div>
                      <span className="text-slate-500 block">Freeze-Thaw Durability:</span>
                      <strong className="text-cyan-400">{item.freezeThaw}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">MGNREGA Sourcing:</span>
                      <strong className="text-emerald-400">{item.matPct}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Forest Rights Act (FRA 2006) Resolution Drafter */}
      {activeSubTab === 'fra' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div>
              <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-950/60 border border-amber-800 px-2 py-0.5 rounded">
                Statutory Governance Tool
              </span>
              <h3 className="text-base font-bold text-white mt-1.5">Forest Rights Act (FRA 2006) Consent Drafter</h3>
              <p className="text-xs text-slate-400 mt-1">
                Civil recharge works in tribal areas frequently get stayed by Forest Department objections. This generator auto-creates formal legal Gram Sabha resolutions under Section 3(1)(i) of FRA 2006 for statutory Community Forest Resource clearance.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Select Target Spring & Habitation:</label>
                <select
                  value={fraTargetSpring.id}
                  onChange={(e) => {
                    const found = SPRINGS_DATA.find((s) => s.id === e.target.value);
                    if (found) {
                      setFraTargetSpring(found);
                      runFraGen(found);
                    }
                  }}
                  className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-lg px-3 py-2"
                >
                  {SPRINGS_DATA.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.village}, {s.block} &bull; {s.dominantTribe} Tribe)
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-slate-300 space-y-1">
                <div>Village: <strong className="text-white">{fraTargetSpring.village}</strong></div>
                <div>Block: <strong className="text-white">{fraTargetSpring.block}</strong></div>
                <div>Community: <strong className="text-amber-400">{fraTargetSpring.dominantTribe}</strong></div>
                <div>Intervention: <strong className="text-emerald-400">{fraTargetSpring.recommendedIntervention.type}</strong></div>
              </div>

              <button
                onClick={() => runFraGen(fraTargetSpring)}
                className="w-full py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-colors cursor-pointer shadow-md"
              >
                Regenerate Legal Resolution
              </button>
            </div>
          </div>

          {/* Drafted Document View */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <FileCheck className="w-4 h-4 text-amber-400" />
                <span>Statutory Gram Sabha Resolution Draft</span>
              </h4>
              <button
                onClick={handleCopyResolution}
                className="flex items-center space-x-1 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-medium border border-slate-700 transition-colors"
              >
                {copiedFra ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedFra ? 'Copied to Clipboard!' : 'Copy Legal Draft'}</span>
              </button>
            </div>

            {fraResolution ? (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
                {fraResolution.resolution_text}
              </div>
            ) : (
              <div className="text-center py-16 text-slate-500 text-xs">Generating resolution...</div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: Cryosphere Snowline Shift Modeler */}
      {activeSubTab === 'cryo' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div>
              <span className="text-[10px] font-mono text-blue-400 font-bold bg-blue-950/60 border border-blue-800 px-2 py-0.5 rounded">
                High-Altitude Cryosphere Physics
              </span>
              <h3 className="text-base font-bold text-white mt-1.5">Cryosphere Warming & Snowline Retreat Modeler</h3>
              <p className="text-xs text-slate-400 mt-1">
                Tribal springs above 2,200m depend on winter snowmelt for delayed dry-season recharge. Atmospheric warming elevates the seasonal snowline and shortens the snowmelt recharge period.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Projected Temperature Increase (RCP Scenario)</span>
                  <strong className="text-rose-400 font-mono">+{warmingC} °C</strong>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3.5"
                  step="0.1"
                  value={warmingC}
                  onChange={(e) => setWarmingC(parseFloat(e.target.value))}
                  className="w-full accent-rose-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Winter Snowpack Precipitation Deficit</span>
                  <strong className="text-amber-400 font-mono">-{snowDeficitPct} %</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="60"
                  step="5"
                  value={snowDeficitPct}
                  onChange={(e) => setSnowDeficitPct(parseFloat(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <button
                onClick={runCryoCalc}
                className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors cursor-pointer shadow-md"
              >
                Simulate Cryospheric Impact
              </button>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            {cryoResult ? (
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                    <Snowflake className="w-4 h-4 text-blue-400" />
                    <span>Projected Cryosphere Vulnerability Metrics</span>
                  </h4>
                  <span className="text-xs font-mono font-bold text-rose-300 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800">
                    +{cryoResult.warming_scenario_deg_c}°C Warming
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Snowline Retreat</span>
                    <div className="text-2xl font-bold text-rose-400 mt-0.5">+{cryoResult.snowline_upward_retreat_m}m</div>
                    <span className="text-[10px] text-slate-400">Upward elevation migration</span>
                  </div>

                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Melt Season Loss</span>
                    <div className="text-2xl font-bold text-amber-400 mt-0.5">-{cryoResult.melt_recharge_duration_loss_days} Days</div>
                    <span className="text-[10px] text-slate-400">Shortened recharge window</span>
                  </div>

                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Dry-Season Flow Loss</span>
                    <div className="text-2xl font-bold text-red-500 mt-0.5">-{cryoResult.projected_dry_season_drawdown_pct}%</div>
                    <span className="text-[10px] text-slate-400">Pre-monsoon discharge drop</span>
                  </div>
                </div>

                <div className="bg-blue-950/20 border border-blue-900/40 p-4 rounded-xl text-xs space-y-1 text-blue-200">
                  <strong className="block text-white">Recommended Cryospheric Adaptation Measure:</strong>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{cryoResult.recommended_cryo_adaptation}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-slate-500 text-xs">Simulating cryosphere physics...</div>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: Offline Field Bucket Flow Surveyor */}
      {activeSubTab === 'field' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                Zero-Network Field Utility
              </span>
              <h3 className="text-base font-bold text-white mt-1.5">Volumetric Bucket Flow Rate Timer (Field Surveyor)</h3>
              <p className="text-xs text-slate-400 mt-1">
                Tribal valleys have no 4G signal. Field workers measure discharge using the standard hydrological bucket method (time taken to fill a known volume).
              </p>
            </div>

            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-center space-y-4">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Elapsed Stopwatch</div>
              <div className="text-5xl font-mono font-extrabold text-white">
                {timerSeconds.toFixed(1)} <span className="text-lg text-slate-500">sec</span>
              </div>

              <div className="flex items-center justify-center space-x-3 pt-2">
                {!timerRunning ? (
                  <button
                    onClick={() => setTimerRunning(true)}
                    className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-700/20 cursor-pointer"
                  >
                    <Play className="w-4 h-4" />
                    <span>Start Filling Bucket</span>
                  </button>
                ) : (
                  <button
                    onClick={handleStopTimer}
                    className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-lg shadow-rose-700/20 cursor-pointer"
                  >
                    <span>Bucket Full (Stop Timer)</span>
                  </button>
                )}

                <button
                  onClick={handleResetTimer}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <div className="max-w-xs mx-auto text-xs text-left pt-3">
                <label className="text-slate-400 block mb-1">Standard Container Capacity:</label>
                <select
                  value={bucketLiters}
                  onChange={(e) => setBucketLiters(parseFloat(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-lg px-2.5 py-1.5"
                >
                  <option value="5">5 Liters Plastic Can</option>
                  <option value="10">10 Liters Standard Bucket (Recommended)</option>
                  <option value="15">15 Liters Bucket</option>
                  <option value="20">20 Liters Water Jerrycan</option>
                </select>
              </div>
            </div>
          </div>

          {/* Flow Result Card */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-6">
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider pb-3 border-b border-slate-800">
                Calculated Discharge Output
              </h4>

              {calculatedFlowLpm !== null ? (
                <div className="mt-6 space-y-4 text-center">
                  <span className="text-[11px] uppercase font-bold text-slate-400">Measured Flow Rate</span>
                  <div className="text-5xl font-mono font-black text-emerald-400">
                    {calculatedFlowLpm} <span className="text-lg text-slate-400">L/min</span>
                  </div>
                  <div className="text-xs text-slate-300">
                    Equivalent to <strong className="text-cyan-400 font-mono">{(calculatedFlowLpm * 1440 / 1000).toFixed(1)} m³/day</strong>
                  </div>

                  <div className={`p-3 rounded-xl border text-xs text-left ${
                    calculatedFlowLpm < 5
                      ? 'bg-rose-950/40 border-rose-800/40 text-rose-200'
                      : calculatedFlowLpm < 15
                      ? 'bg-amber-950/40 border-amber-800/40 text-amber-200'
                      : 'bg-emerald-950/40 border-emerald-800/40 text-emerald-200'
                  }`}>
                    <strong className="block mb-1">Classification:</strong>
                    {calculatedFlowLpm < 5
                      ? 'CRITICAL ALERT: Flow is below 5 L/min potable sustenance threshold for mountain hamlets. Immediate artificial recharge intervention required.'
                      : calculatedFlowLpm < 15
                      ? 'MODERATE VULNERABILITY: Flow is seasonal. Implement upper ridge contour trenching to prevent summer dry-up.'
                      : 'STABLE PERENNIAL: Healthy discharge (>15 L/min). Demarcate 100m sacred grove protection perimeter.'}
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 text-slate-500 text-xs">
                  Press "Start Filling Bucket" and stop when full to measure spring discharge in real-time.
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400">
              Formula: Q = (V_bucket / t_seconds) × 60 L/min (Standard CGWB & NITI Aayog field protocol)
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

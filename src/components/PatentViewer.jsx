// src/components/PatentViewer.jsx - Complete LPU Invention Disclosure (Annexure 3b) Viewer
import React, { useState } from 'react';
import { 
  Award, 
  FileCheck, 
  Users, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink, 
  Download,
  BookOpen,
  Share2,
  Check,
  Building2,
  ShieldCheck
} from 'lucide-react';
import { PATENT_METADATA, PRIOR_ART_COMPARISON } from '../data/patentData';

export default function PatentViewer() {
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'inventors' | 'drawings' | 'priorArt' | 'noc'

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Patent Hero Banner */}
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border border-amber-900/40 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>Invention Disclosure Form &bull; Annexure 3b Complete Filing</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight">
              {PATENT_METADATA.title}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Applicant: <strong className="text-white">{PATENT_METADATA.applicant}</strong> &bull; Domestic Indian Patent Application
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              {PATENT_METADATA.keywords.slice(0, 4).map((kw, i) => (
                <span key={i} className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-[10px]">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-xl text-left shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Inventorship</span>
            <div className="text-lg font-bold text-amber-400 mt-0.5">6 Student Inventors</div>
            <div className="text-xs text-slate-300">Lovely Professional University</div>
            <div className="text-[11px] text-emerald-400 mt-1 font-semibold">&bull; Filing Options: Complete Specification</div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-2 rounded-xl border border-slate-800">
        {[
          { id: 'summary', label: 'Invention Summary & Problem' },
          { id: 'inventors', label: '6 Inventors (LPU Students)' },
          { id: 'drawings', label: 'Patent Drawings (FIG. 1, 2 & 3)' },
          { id: 'priorArt', label: 'Prior Art & Novelty Table' },
          { id: 'noc', label: 'LPU No Objection Certificate (NOC)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: Invention Summary & Objectives */}
      {activeTab === 'summary' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6 text-xs sm:text-sm">
          <div>
            <h3 className="text-base font-bold text-white mb-2 uppercase tracking-wider text-amber-300">
              Problem Addressed by the Invention
            </h3>
            <p className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-300 leading-relaxed text-justify">
              Natural springs are the primary source of drinking and domestic water for a large number of tribal and hill habitations in India, yet a significant proportion of them are drying up or turning seasonal because of climate variability, deforestation and land-use change. A NITI Aayog assessment, summarised by the Department of Land Resources, estimates that nearly half of the perennial springs in the Indian Himalayan Region have already dried up or become seasonal. Springshed management has since been included as an activity under PMKSY 2.0 (WDC).
              <br /><br />
              Currently, planners rely on field hydrogeology and isotope studies (accurate but slow, costly and dependent on specialists) or generic ML studies that predict flow but stop short of telling officials what to build and where. Generic GIS software does not provide a spring-level vulnerability ranking, transparent explanation, or measure-wise recommendation in a form that a non-specialist block or district officer can use and audit.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-white mb-2 uppercase tracking-wider text-amber-300">
              Objectives of the Invention
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-cyan-400 block text-xs">1. Deterministic Scoring Engine</strong>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Converts 6 spring-level indicators (slope, rainfall, vegetation, forest-loss, soil-infiltration, lineament-density) into normalised feature vectors and a 0–100 vulnerability score (High, Medium, Low) with user-adjustable weights.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-emerald-400 block text-xs">2. Top-3 Factor Explainability</strong>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Identifies the 3 indicators that contribute most to each spring’s score with its own physical values, allowing officials and local experts to audit and verify results.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-amber-400 block text-xs">3. Multi-Measure Rule Engine (FIG. 3)</strong>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Maps slope, stream distance, soil infiltration, and forest loss to appropriate interventions: percolation pits, check dams, contour trenches, gully plugs, and afforestation.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-purple-400 block text-xs">4. Local-Only Browser Processing</strong>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Lightweight web dashboard with CSV upload running in-browser with zero external server upload, ensuring community groundwater data privacy and instant adoption.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 6 Inventors Showcase */}
      {activeTab === 'inventors' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="pb-4 border-b border-slate-800 mb-6">
              <h3 className="text-lg font-bold text-white">Student Inventors (Lovely Professional University)</h3>
              <p className="text-xs text-slate-400 mt-1">
                Department of Computer Science & Engineering / School of Computing, LPU Punjab-144411
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PATENT_METADATA.inventors.map((inv, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-all space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center text-slate-950 font-bold text-sm shadow-md">
                      {inv.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{inv.name}</h4>
                      <div className="text-[10px] font-mono text-emerald-400">UID: {inv.regNo}</div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 font-medium pt-1">
                    {inv.role}
                  </div>

                  <div className="pt-2 border-t border-slate-900 text-[11px] text-slate-400 space-y-0.5">
                    <div>Email: <span className="text-slate-300">{inv.email}</span></div>
                    <div>Mobile: <span className="text-slate-300">{inv.mobile}</span></div>
                    <div>Affiliation: <span className="text-slate-300">{inv.institution}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Patent Drawings (FIG. 1, FIG. 2, FIG. 3) */}
      {activeTab === 'drawings' && (
        <div className="space-y-8">
          {/* FIG. 1 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">Drawing 1 / 3</span>
                <h3 className="text-base font-bold text-white">FIG. 1: Block Diagram of the System Architecture</h3>
              </div>
            </div>

            {/* Visual Vector Architecture Diagram */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-slate-900 border border-slate-700 rounded-xl">
                  <div className="text-[10px] font-mono text-slate-500">10</div>
                  <strong className="text-xs text-cyan-300 block">Open Geospatial Layers</strong>
                  <span className="text-[10px] text-slate-400">(Elevation, Rainfall, NDVI, Soil, Geology)</span>
                </div>
                <div className="p-3 bg-slate-900 border border-slate-700 rounded-xl">
                  <div className="text-[10px] font-mono text-slate-500">12</div>
                  <strong className="text-xs text-cyan-300 block">Built-in Demonstration Dataset</strong>
                  <span className="text-[10px] text-slate-400">(Baseline Field-Verified Springs)</span>
                </div>
              </div>

              <div className="text-center text-slate-500 text-xs">&darr;</div>

              <div className="p-3 bg-slate-900 border border-slate-700 rounded-xl text-center max-w-md mx-auto">
                <div className="text-[10px] font-mono text-slate-500">20</div>
                <strong className="text-xs text-white block">Per-Spring Feature Table</strong>
                <span className="text-[10px] text-slate-400">(CSV Upload: One Row Per Spring)</span>
              </div>

              <div className="text-center text-slate-500 text-xs">&darr;</div>

              <div className="p-3 bg-slate-900 border border-slate-700 rounded-xl text-center max-w-md mx-auto">
                <div className="text-[10px] font-mono text-slate-500">30</div>
                <strong className="text-xs text-emerald-300 block">Input and Validation Module</strong>
                <span className="text-[10px] text-slate-400">(Checks Required Columns & Numeric Types)</span>
              </div>

              <div className="text-center text-slate-500 text-xs">&darr;</div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-emerald-950/40 border border-emerald-800 rounded-xl sm:col-span-2">
                  <div className="text-[10px] font-mono text-emerald-400">40</div>
                  <strong className="text-xs text-white block">Deterministic Scoring Engine</strong>
                  <span className="text-[10px] text-slate-300">Scale 6 Indicators 0 to 1 (1 = Worst), Weighted Average 0–100, High/Med/Low Class</span>
                </div>

                <div className="p-3 bg-slate-900 border border-slate-700 rounded-xl">
                  <div className="text-[10px] font-mono text-amber-400">50</div>
                  <strong className="text-xs text-amber-300 block">Weight Controls</strong>
                  <span className="text-[10px] text-slate-400">(User-Adjustable Sliders)</span>
                </div>
              </div>

              <div className="text-center text-slate-500 text-xs">&darr;</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-slate-900 border border-slate-700 rounded-xl">
                  <div className="text-[10px] font-mono text-slate-500">60</div>
                  <strong className="text-xs text-cyan-300 block">Explanation Module</strong>
                  <span className="text-[10px] text-slate-400">(Top 3 Contributing Factors per Spring)</span>
                </div>

                <div className="p-3 bg-slate-900 border border-slate-700 rounded-xl">
                  <div className="text-[10px] font-mono text-slate-500">70</div>
                  <strong className="text-xs text-teal-300 block">Recommendation Rule Engine</strong>
                  <span className="text-[10px] text-slate-400">(Recharge Measures Decision Tree)</span>
                </div>
              </div>

              <div className="text-center text-slate-500 text-xs">&darr;</div>

              <div className="p-3.5 bg-gradient-to-r from-emerald-950 to-teal-950 border border-emerald-600 rounded-xl text-center">
                <div className="text-[10px] font-mono text-emerald-400">80</div>
                <strong className="text-sm text-white block">Interactive Web Dashboard</strong>
                <span className="text-xs text-slate-300">Risk Map &bull; Ranked Priority List &bull; Spring Detail &bull; Filter Controls &bull; Local CSV Upload</span>
              </div>
            </div>
          </div>

          {/* FIG. 3: EXACT RECHARGE MEASURE RECOMMENDATION ENGINE */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">Drawing 3 / 3</span>
                <h3 className="text-base font-bold text-white">FIG. 3: Rule-Based Recharge-Measure Recommendation Engine</h3>
              </div>
              <span className="text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-1 rounded-lg">
                Rules Evaluated Independently
              </span>
            </div>

            <div className="space-y-3">
              {[
                {
                  rule: "Rule 1",
                  condition: "Slope < 8° AND Soil Infiltration ≥ 0.5",
                  outcome: "Percolation pit or basin pond",
                  desc: "Permits unconfined aquifer storage in gentle valley bowls without slope erosion."
                },
                {
                  rule: "Rule 2",
                  condition: "Distance to stream < 300 m AND Slope between 5° and 25°",
                  outcome: "Check dam or gabion structure",
                  desc: "Impounds drainage line discharge to force lateral recharge into fractured stream banks."
                },
                {
                  rule: "Rule 3",
                  condition: "Slope between 15° and 35°",
                  outcome: "Staggered contour trenches",
                  desc: "Breaks overland runoff velocity along upper hill contours to trap soil moisture."
                },
                {
                  rule: "Rule 4",
                  condition: "Slope > 35°",
                  outcome: "Gully plugging with vegetative cover",
                  desc: "Arrests severe headward erosion in torrential ravines using boulder crates."
                },
                {
                  rule: "Rule 5",
                  condition: "Forest loss > 20%",
                  outcome: "Catchment protection and afforestation",
                  desc: "Restores degraded broadleaved oak/pine root sponge to prevent rapid spring dry-out."
                },
                {
                  rule: "Fallback",
                  condition: "None match",
                  outcome: "Field survey recommended",
                  desc: "Triggers on-site geological examination by Central Ground Water Board specialist."
                }
              ].map((r, i) => (
                <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950/60 px-1.5 py-0.2 rounded border border-amber-800">
                        {r.rule}
                      </span>
                      <strong className="text-xs text-white">{r.condition}</strong>
                    </div>
                    <p className="text-[11px] text-slate-400">{r.desc}</p>
                  </div>

                  <div className="shrink-0 flex items-center space-x-2">
                    <span className="text-xs text-slate-500 font-mono">&rarr;</span>
                    <span className="px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold">
                      {r.outcome}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Prior Art & Novelty Matrix */}
      {activeTab === 'priorArt' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-6 border-b border-slate-800">
            <h3 className="text-base font-bold text-white">State of the Art / Research Gap / Novelty (Patent Section C)</h3>
            <p className="text-xs text-slate-400 mt-1">
              Comparative distinction against published US, European, and Chinese patents and open-source systems
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-950 text-slate-400 uppercase font-bold text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-3 border-r border-slate-800">Patent / System ID</th>
                  <th className="p-3 border-r border-slate-800">Abstract Summary</th>
                  <th className="p-3 border-r border-slate-800 text-rose-400">Research Gap</th>
                  <th className="p-3 text-emerald-400">Our Patent Novelty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {PRIOR_ART_COMPARISON.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40">
                    <td className="p-3 font-mono font-bold text-white border-r border-slate-800 whitespace-nowrap">
                      {item.patentId}
                    </td>
                    <td className="p-3 text-slate-300 border-r border-slate-800 leading-normal">
                      {item.abstract}
                    </td>
                    <td className="p-3 text-slate-400 border-r border-slate-800 leading-normal">
                      {item.researchGap}
                    </td>
                    <td className="p-3 text-emerald-300 font-medium leading-normal">
                      {item.novelty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: LPU No Objection Certificate (NOC) */}
      {activeTab === 'noc' && (
        <div className="bg-white text-slate-900 p-8 sm:p-12 rounded-2xl shadow-2xl border border-slate-300 font-serif max-w-4xl mx-auto space-y-6">
          <div className="text-center border-b-2 border-slate-900 pb-4">
            <h2 className="text-xl font-bold uppercase tracking-wider text-slate-950">
              Lovely Professional University
            </h2>
            <div className="text-xs text-slate-600 font-sans mt-0.5">
              Jalandhar - Delhi G.T. Road, Phagwara, Punjab (India) - 144411
            </div>
            <div className="text-xs font-bold text-emerald-900 font-sans uppercase tracking-widest mt-2">
              Division of Research & Development &bull; Intellectual Property Rights (IPR) Cell
            </div>
          </div>

          <div className="text-center py-2">
            <h3 className="text-base font-bold uppercase tracking-widest underline decoration-2 underline-offset-4">
              NO OBJECTION CERTIFICATE
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed text-justify font-sans">
            This is to certify that <strong>Lovely Professional University</strong> or its associates shall have no objection if Lovely Professional University files an IPR (Patent) entitled:
          </p>

          <div className="p-3 bg-slate-50 border border-slate-300 rounded text-center font-bold text-xs sm:text-sm text-slate-950 font-sans">
            “AN AI-BASED EXPLAINABLE DECISION-SUPPORT SYSTEM FOR SPRING VULNERABILITY SCORING AND RECHARGE-MEASURE RECOMMENDATION IN TRIBAL AND HILL REGIONS”
          </div>

          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed text-justify font-sans">
            including the name(s) of <strong>Sarthak Chaubey, Akash Singh, Harsh Khestika, Ayush Tiwari, Shivendra Kumar, Vivek Kumar</strong> as inventors who are students studying in our University.
          </p>

          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed text-justify font-sans">
            Further, Lovely Professional University shall not provide any financial assistance in respect of said IPR nor shall raise any objection later with respect to filing or commercialization of the said IPR or otherwise claim any separate conflicting right to the patent/invention at any stage.
          </p>

          <div className="pt-12 flex justify-between items-end font-sans text-xs">
            <div>
              <span className="text-slate-500 block">Date of Filing:</span>
              <strong className="text-slate-900">November 2026</strong>
              <div className="text-slate-600">Phagwara, Punjab</div>
            </div>

            <div className="text-right">
              <div className="h-10 border-b border-slate-400 mb-1 w-48 ml-auto"></div>
              <strong className="text-slate-900 block">(Authorised Signatory)</strong>
              <span className="text-slate-600">IPR Cell &bull; Lovely Professional University</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

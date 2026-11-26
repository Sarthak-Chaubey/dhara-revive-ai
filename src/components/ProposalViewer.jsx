// ProposalViewer.jsx - Full Capstone Project Proposal Viewer
import React, { useState } from 'react';
import { 
  FileText, 
  BookOpen, 
  Award, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  Sparkles,
  Search,
  Bookmark
} from 'lucide-react';
import { PROPOSAL_DETAILS } from '../data/proposalContent';

export default function ProposalViewer() {
  const [activeSection, setActiveSection] = useState('overview'); // 'overview' | 'literature' | 'objectives' | 'methodology' | 'models' | 'gaps' | 'references'

  const sections = [
    { id: 'overview', title: '1. Problem & Context' },
    { id: 'objectives', title: '2. Objectives & RQs' },
    { id: 'literature', title: '3. Literature Review' },
    { id: 'methodology', title: '4. Six-Stage Methodology' },
    { id: 'models', title: '5. Models & Metrics' },
    { id: 'gaps', title: '6. Research Gaps' },
    { id: 'references', title: '7. References (16)' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-900/30 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Smart India Hackathon 2026 &bull; Final Year Capstone Proposal</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {PROPOSAL_DETAILS.title}
            </h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Problem Statement <strong className="text-emerald-400">SIH26240</strong> &bull; Ministry of Tribal Affairs &bull; Category: Software | Theme: Agriculture, FoodTech & Rural Development
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-xl text-left shrink-0">
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-amber-400" />
              <strong className="text-white text-sm">{PROPOSAL_DETAILS.author.name}</strong>
            </div>
            <div className="text-xs text-slate-400 mt-1">Reg No: <span className="font-mono text-emerald-300">{PROPOSAL_DETAILS.author.regNo}</span></div>
            <div className="text-xs text-slate-400">Section: <span className="font-mono text-cyan-300">{PROPOSAL_DETAILS.author.section}</span></div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-2 rounded-xl border border-slate-800">
        {sections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => setActiveSection(sec.id)}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeSection === sec.id
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {sec.title}
          </button>
        ))}
      </div>

      {/* Section Content Rendering */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl text-slate-200 text-xs sm:text-sm leading-relaxed space-y-6">
        {/* Tab 1: Overview */}
        {activeSection === 'overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Abstract</h3>
              <p className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-300 leading-relaxed">
                {PROPOSAL_DETAILS.abstract}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">1. Problem Statement</h3>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-300 whitespace-pre-line leading-relaxed">
                {PROPOSAL_DETAILS.problemStatement}
              </div>
            </div>

            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-slate-500 block text-xs">Research Domain:</span>
                <strong className="text-cyan-400">{PROPOSAL_DETAILS.author.researchArea}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-xs">Nature of Work:</span>
                <strong className="text-emerald-400">{PROPOSAL_DETAILS.author.natureOfWork}</strong>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Objectives & Research Questions */}
        {activeSection === 'objectives' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-3">2. Project Objectives (O1 &mdash; O6)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PROPOSAL_DETAILS.objectives.map((obj) => (
                  <div key={obj.code} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="flex items-center space-x-2 mb-1.5">
                      <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold flex items-center justify-center text-xs">
                        {obj.code}
                      </span>
                      <strong className="text-white text-xs sm:text-sm">{obj.title}</strong>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{obj.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <h3 className="text-lg font-bold text-white mb-3">3. Research Questions (RQ1 &mdash; RQ5)</h3>
              <div className="space-y-3">
                {PROPOSAL_DETAILS.researchQuestions.map((rq) => (
                  <div key={rq.qId} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-start space-x-3">
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-cyan-950 text-cyan-300 border border-cyan-800 shrink-0">
                      {rq.qId}
                    </span>
                    <p className="text-xs text-slate-300 leading-normal">{rq.q}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Literature Review */}
        {activeSection === 'literature' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">Summary of Literature Review (Section 6 of Proposal)</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-800">
                <thead className="bg-slate-950 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3 border-r border-slate-800">Theme</th>
                    <th className="p-3 border-r border-slate-800">Representative Work</th>
                    <th className="p-3 border-r border-slate-800 text-emerald-400">What It Contributes</th>
                    <th className="p-3 text-rose-400">Limitation for This Project</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {PROPOSAL_DETAILS.literatureSummary.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="p-3 font-bold text-white border-r border-slate-800">{item.theme}</td>
                      <td className="p-3 text-slate-300 border-r border-slate-800 font-mono text-[11px]">{item.representativeWork}</td>
                      <td className="p-3 text-slate-300 border-r border-slate-800">{item.whatItContributes}</td>
                      <td className="p-3 text-slate-400">{item.limitation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <strong className="text-white block">Key Hydrogeological Principles Established:</strong>
              <p className="text-slate-300 text-xs leading-relaxed">
                1. <strong>Springshed vs Watershed:</strong> Conventional surface drainage divides can mislead. Subsurface recharge aquifers often span across topological ridgelines, necessitating hydrogeological springshed delineation [8, 16].
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                2. <strong>Aquifer-Centric Intervention:</strong> Interventions must target the unconfined mountain aquifer rather than the spring orifice itself, because the spring is merely the discharge manifestation [9].
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Six-Stage Methodology */}
        {activeSection === 'methodology' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">4. Methodology: Six-Stage Analytical Pipeline</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <div className="text-xs font-mono font-bold text-cyan-400">STAGE 1</div>
                <div className="font-bold text-white text-xs sm:text-sm">Data Preparation</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Reproject & resample SRTM DEM, CHIRPS rainfall, Sentinel-2 NDVI, SoilGrids, and GSI lineaments to a uniform 30m grid.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <div className="text-xs font-mono font-bold text-cyan-400">STAGE 2</div>
                <div className="font-bold text-white text-xs sm:text-sm">Label Construction</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Field spring inventory points; pseudo-absence non-spring points sampled with minimum distance buffers; vulnerability classes from flow discharge.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <div className="text-xs font-mono font-bold text-cyan-400">STAGE 3</div>
                <div className="font-bold text-white text-xs sm:text-sm">Baseline Model</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Analytic Hierarchy Process (AHP) multi-criteria recharge suitability using expert-derived weights with Saaty consistency ratio verification (CR &lt; 0.1).
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <div className="text-xs font-mono font-bold text-emerald-400">STAGE 4</div>
                <div className="font-bold text-white text-xs sm:text-sm">Model Training & Spatial CV</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Train and tune Random Forest & Gradient Boosting (XGBoost) using 5-fold Spatial Block cross-validation to prevent geospatial data leakage.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <div className="text-xs font-mono font-bold text-emerald-400">STAGE 5</div>
                <div className="font-bold text-white text-xs sm:text-sm">Explainability & Recommender</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  SHAP-based factor attribution for auditing; deterministic rule-based mapping from terrain, soil, and drainage to recharge structures.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <div className="text-xs font-mono font-bold text-emerald-400">STAGE 6</div>
                <div className="font-bold text-white text-xs sm:text-sm">Interactive Web Dashboard</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Deliver decision-support web application showing ranked springs, GIS maps, SHAP risk drivers, and downloadable DPR reports.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Models & Metrics */}
        {activeSection === 'models' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">5. Machine Learning Models & Evaluation Metrics</h3>
            <p className="text-slate-300 text-xs">
              Summary of algorithms utilized in DharaRevive AI with domain-specific rationale:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <strong className="text-cyan-400 block text-xs uppercase font-bold">1. Gradient Boosting (XGBoost)</strong>
                <p className="text-xs text-slate-300 mt-1">
                  Primary high-accuracy classifier. Excels at learning tabular geospatial splits between elevation, precipitation, and lineament distance with minimal hyperparameter tuning.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <strong className="text-emerald-400 block text-xs uppercase font-bold">2. Random Forest Classifier</strong>
                <p className="text-xs text-slate-300 mt-1">
                  Ensemble tree baseline. Resilient to small label sets (32-42 springs) common in mountain spring inventories; handles correlated topographic indices.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <strong className="text-amber-400 block text-xs uppercase font-bold">3. AHP Multi-Criteria Model</strong>
                <p className="text-xs text-slate-300 mt-1">
                  Standard benchmark in literature [3]. Provides a hydrologically grounded prior to confirm whether complex ML actually adds predictive accuracy.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <strong className="text-purple-400 block text-xs uppercase font-bold">4. SHAP (SHapley Additive exPlanations)</strong>
                <p className="text-xs text-slate-300 mt-1">
                  Decomposes model predictions into additive feature contributions, allowing public works officials to audit each spring’s recommendation.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Research Gaps */}
        {activeSection === 'gaps' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">8. Research Gaps Addressed by This Project</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROPOSAL_DETAILS.researchGap.map((gap, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs mb-1">
                    <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                    <span>{gap.title}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{gap.text}</p>
                </div>
              ))}
            </div>

            <div className="bg-emerald-950/40 border border-emerald-500/40 p-4 rounded-xl text-emerald-200 text-xs">
              <strong className="text-white block mb-1">Core Contribution of Capstone Project:</strong>
              An explainable, end-to-end decision-support prototype that combines vulnerability scoring, recharge-zone ranking and rule-based structure recommendation for tribal areas, benchmarked against the standard AHP approach.
            </div>
          </div>
        )}

        {/* Tab 7: References */}
        {activeSection === 'references' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Project References (16 Citations from Proposal)</h3>
            <div className="space-y-2">
              {PROPOSAL_DETAILS.references.map((ref) => (
                <div key={ref.id} className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 flex items-start space-x-3">
                  <span className="font-mono font-bold text-emerald-400 shrink-0">[{ref.id}]</span>
                  <span className="leading-normal">{ref.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// DprReportView.jsx - Detailed Project Report (DPR) Generator
import React from 'react';
import { 
  Printer, 
  Download, 
  FileText, 
  Building2, 
  ShieldCheck, 
  Calendar, 
  Award,
  CheckCircle,
  MapPin
} from 'lucide-react';
import { SPRINGS_DATA, STUDY_REGION, KPI_METRICS } from '../data/springsData';

export default function DprReportView() {
  const criticalAndVulnerable = SPRINGS_DATA.filter(
    s => s.status === 'Critical' || s.status === 'Vulnerable'
  );

  const totalSanctionEstimate = criticalAndVulnerable.reduce(
    (acc, curr) => acc + curr.recommendedIntervention.estimatedCostInr, 0
  );

  const totalRechargeYield = criticalAndVulnerable.reduce(
    (acc, curr) => acc + curr.recommendedIntervention.annualRechargeM3, 0
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Action Bar (Hidden during print) */}
      <div className="no-print bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
            Official Ministry Export Ready
          </span>
          <h2 className="text-xl font-bold text-white mt-1">Detailed Project Report (DPR) Generator</h2>
          <p className="text-xs text-slate-400">
            Sanction format compliant with WDC-PMKSY 2.0 and Ministry of Tribal Affairs guidelines
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-emerald-700/30 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Printable DPR Document Container */}
      <div className="bg-white text-slate-900 p-8 sm:p-12 rounded-2xl shadow-2xl border border-slate-300 font-sans print:border-none print:shadow-none print:p-0">
        {/* Document Header */}
        <div className="border-b-2 border-emerald-800 pb-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-emerald-800">
                Government of India &bull; Ministry of Tribal Affairs
              </div>
              <h1 className="text-2xl font-black text-slate-900 mt-1 uppercase tracking-tight">
                Detailed Project Report (DPR)
              </h1>
              <div className="text-sm font-semibold text-slate-700 mt-0.5">
                Comprehensive Springshed Revival & Artificial Recharge Masterplan (2026-2028)
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-slate-500 block">Document No:</span>
              <strong className="text-sm font-mono text-emerald-900">DPR/SIH26240/HP/01</strong>
              <div className="text-xs text-slate-600 mt-1">Date: October 2026</div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-slate-500 block">Problem Statement:</span>
              <strong className="text-slate-900">SIH26240 (Smart India Hackathon 2026)</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Target District / Basin:</span>
              <strong className="text-slate-900">{STUDY_REGION.district}, {STUDY_REGION.state}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Project Investigator:</span>
              <strong className="text-slate-900">Sarthak Chaubey (Reg: 12312896)</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Nodal Agency:</span>
              <strong className="text-slate-900">Dept. of Land Resources (DoLR)</strong>
            </div>
          </div>
        </div>

        {/* Section 1: Executive Sanction Summary */}
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-900 border-b border-emerald-200 pb-1 mb-3">
            1. Executive Administrative Summary
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed text-justify">
            Under the guidelines of WDC-PMKSY 2.0 and the Ministry of Tribal Affairs, this decision-support masterplan presents actionable artificial recharge recommendations for <strong>{criticalAndVulnerable.length} high-priority springs</strong> in the <strong>{STUDY_REGION.name}</strong>. Machine learning vulnerability scoring (ROC-AUC 0.912) combined with hydrogeological terrain classification delineates targeted physical structures to arrest declining discharge and ensure potable water security for <strong>{KPI_METRICS.totalDependentTribalPop.toLocaleString()} tribal residents</strong>.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
            <div>
              <span className="text-[11px] text-slate-500 uppercase font-semibold">Total Estimated Outlay</span>
              <div className="text-xl font-bold text-emerald-800 mt-0.5">₹ {totalSanctionEstimate.toLocaleString()}</div>
              <span className="text-[10px] text-slate-500">100% grant under Central WDC</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 uppercase font-semibold">Annual Recharge Volume</span>
              <div className="text-xl font-bold text-teal-800 mt-0.5">{(totalRechargeYield / 100000).toFixed(2)} Lakh m³</div>
              <span className="text-[10px] text-slate-500">Net vadose percolation</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 uppercase font-semibold">Habitations Covered</span>
              <div className="text-xl font-bold text-slate-800 mt-0.5">{criticalAndVulnerable.length} Hamlets</div>
              <span className="text-[10px] text-slate-500">Pangwala, Gaddi & Gujjar tribes</span>
            </div>
          </div>
        </div>

        {/* Section 2: Prioritized Intervention Schedule Table */}
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-900 border-b border-emerald-200 pb-1 mb-3">
            2. Habitation-Level Recharge Interventions (Sorted by Priority)
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-300">
              <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px] border-b border-slate-300">
                <tr>
                  <th className="p-2 border-r border-slate-300">Rank</th>
                  <th className="p-2 border-r border-slate-300">Spring & Village</th>
                  <th className="p-2 border-r border-slate-300">Block / Tribe</th>
                  <th className="p-2 border-r border-slate-300">Current Flow</th>
                  <th className="p-2 border-r border-slate-300">Proposed Recharge Structure</th>
                  <th className="p-2 border-r border-slate-300 text-right">Sanction (₹)</th>
                  <th className="p-2 text-right">Yield (m³/yr)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {criticalAndVulnerable.map((spring, index) => (
                  <tr key={spring.id} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="p-2 font-bold border-r border-slate-200 text-center">#{spring.recommendedIntervention.priorityRank}</td>
                    <td className="p-2 border-r border-slate-200">
                      <strong className="text-slate-900 block">{spring.name}</strong>
                      <span className="text-[10px] text-slate-500">{spring.village}</span>
                    </td>
                    <td className="p-2 border-r border-slate-200">
                      <div>{spring.block}</div>
                      <span className="text-[10px] text-slate-500">{spring.dominantTribe}</span>
                    </td>
                    <td className="p-2 border-r border-slate-200 font-mono text-rose-700 font-bold">
                      {spring.currentDischargeLpm} L/min
                    </td>
                    <td className="p-2 border-r border-slate-200">
                      <div className="font-semibold text-slate-800">{spring.recommendedIntervention.type}</div>
                      <span className="text-[10px] text-slate-500 font-mono">Zone: {spring.recommendedIntervention.catchmentZone}</span>
                    </td>
                    <td className="p-2 border-r border-slate-200 font-mono text-right font-bold text-slate-900">
                      ₹ {spring.recommendedIntervention.estimatedCostInr.toLocaleString()}
                    </td>
                    <td className="p-2 font-mono text-right font-bold text-emerald-800">
                      {spring.recommendedIntervention.annualRechargeM3.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Engineering & Social Safeguards */}
        <div className="mb-8 text-xs text-slate-700 space-y-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-900 border-b border-emerald-200 pb-1 mb-2">
            3. Implementation Protocols & Community Governance
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Springshed Demarcation:</strong> Physical stone pillars and bio-fencing to be erected delineating the 10-hectare upper recharge zones before monsoon onset.</li>
            <li><strong>Labor Sourcing under MGNREGA:</strong> Excavation of continuous contour trenches and loose boulder check dams to be implemented primarily via local tribal self-help groups (SHGs).</li>
            <li><strong>Water Quality Surveillance:</strong> Quarterly testing for fecal coliform and arsenic under Jal Jeevan Mission protocols.</li>
          </ul>
        </div>

        {/* Official Signatures Block */}
        <div className="pt-8 border-t-2 border-slate-300 mt-12 grid grid-cols-3 gap-6 text-center text-xs">
          <div>
            <div className="h-12 border-b border-dashed border-slate-400 mb-2"></div>
            <strong className="block text-slate-900">Hydrogeologist / Field Geologist</strong>
            <span className="text-slate-500">Central Ground Water Board (CGWB)</span>
          </div>

          <div>
            <div className="h-12 border-b border-dashed border-slate-400 mb-2"></div>
            <strong className="block text-slate-900">Block Development Officer (BDO)</strong>
            <span className="text-slate-500">Tribal Development Block</span>
          </div>

          <div>
            <div className="h-12 border-b border-dashed border-slate-400 mb-2"></div>
            <strong className="block text-slate-900">District Project Officer</strong>
            <span className="text-slate-500">Ministry of Tribal Affairs / DoLR</span>
          </div>
        </div>
      </div>
    </div>
  );
}

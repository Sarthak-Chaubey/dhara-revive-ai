// App.jsx - Main Application Controller for DharaRevive AI
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import DashboardOverview from './components/DashboardOverview';
import InteractiveMap from './components/InteractiveMap';
import SpringDetailModal from './components/SpringDetailModal';
import PatentScoringEngine from './components/PatentScoringEngine';
import PatentViewer from './components/PatentViewer';
import ShapExplainabilityView from './components/ShapExplainabilityView';
import RecommenderView from './components/RecommenderView';
import ScenarioSimulationView from './components/ScenarioSimulationView';
import ModelEvaluationView from './components/ModelEvaluationView';
import InnovationsView from './components/InnovationsView';
import DprReportView from './components/DprReportView';
import ProposalViewer from './components/ProposalViewer';
import { SPRINGS_DATA } from './data/springsData';
import { Droplet, Award, ShieldCheck, FileCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('map'); // 'map' | 'patentScoring' | 'patentDoc' | 'vulnerability' | 'recommender' | 'innovations' | 'simulator' | 'benchmarks' | 'dpr' | 'proposal'
  const [selectedSpring, setSelectedSpring] = useState(null);
  const [selectedBlock, setSelectedBlock] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [simulationTargetSpring, setSimulationTargetSpring] = useState(null);

  // Filter springs based on block, status, and search query
  const filteredSprings = useMemo(() => {
    return SPRINGS_DATA.filter((spring) => {
      // Block filter
      if (selectedBlock !== 'All' && spring.block !== selectedBlock) {
        return false;
      }
      // Status filter
      if (filterStatus !== 'All' && spring.status !== filterStatus) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchName = spring.name.toLowerCase().includes(query);
        const matchVillage = spring.village.toLowerCase().includes(query);
        const matchTribe = spring.dominantTribe.toLowerCase().includes(query);
        const matchBlock = spring.block.toLowerCase().includes(query);
        return matchName || matchVillage || matchTribe || matchBlock;
      }
      return true;
    });
  }, [selectedBlock, filterStatus, searchQuery]);

  const handleOpenSimulator = (spring) => {
    setSimulationTargetSpring(spring);
    setActiveTab('simulator');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Ministerial, Patent & Navigation Bar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        criticalCount={SPRINGS_DATA.filter(s => s.status === 'Critical').length}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Tab 1: GIS Springshed Map & Priority Overview */}
        {activeTab === 'map' && (
          <div className="space-y-6">
            <DashboardOverview
              selectedBlock={selectedBlock}
              setSelectedBlock={setSelectedBlock}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            <InteractiveMap
              springs={filteredSprings}
              onSelectSpring={(spring) => setSelectedSpring(spring)}
              selectedSpring={selectedSpring}
            />
          </div>
        )}

        {/* Tab: Patent Scoring Engine with User-Adjustable Sliders & CSV Upload (FIG. 1, 2, 3) */}
        {activeTab === 'patentScoring' && (
          <PatentScoringEngine
            onSelectSpring={(spring) => setSelectedSpring(spring)}
          />
        )}

        {/* Tab: Official LPU Patent & Invention Disclosure Viewer (Annexure 3b) */}
        {activeTab === 'patentDoc' && (
          <PatentViewer />
        )}

        {/* Tab: Explainable AI (SHAP) Factor Attribution */}
        {activeTab === 'vulnerability' && (
          <ShapExplainabilityView
            onSelectSpring={(spring) => setSelectedSpring(spring)}
          />
        )}

        {/* Tab: Recharge Structure Engineering Recommender */}
        {activeTab === 'recommender' && (
          <RecommenderView />
        )}

        {/* Tab: Novel Innovations & Indigenous Bio-Engineering (TEK / Isotope / FRA 2006) */}
        {activeTab === 'innovations' && (
          <InnovationsView />
        )}

        {/* Tab: What-If Scenario Sandbox */}
        {activeTab === 'simulator' && (
          <ScenarioSimulationView 
            initialSpring={simulationTargetSpring}
          />
        )}

        {/* Tab: Model Benchmarking & Validation Lab */}
        {activeTab === 'benchmarks' && (
          <ModelEvaluationView />
        )}

        {/* Tab: Official DPR Action Plan */}
        {activeTab === 'dpr' && (
          <DprReportView />
        )}

        {/* Tab: Academic Capstone Proposal Document */}
        {activeTab === 'proposal' && (
          <ProposalViewer />
        )}
      </main>

      {/* Selected Spring Detailed Modal */}
      {selectedSpring && (
        <SpringDetailModal
          spring={selectedSpring}
          onClose={() => setSelectedSpring(null)}
          onOpenSimulator={handleOpenSimulator}
        />
      )}

      {/* Footer with All 6 Patent Co-Inventors from LPU */}
      <footer className="no-print bg-slate-900/90 border-t border-slate-800 mt-16 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
                <Droplet className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white">DharaRevive AI &bull; Decision Support System</div>
                <div className="text-[11px] text-slate-400">
                  Ministry of Tribal Affairs &bull; Smart India Hackathon 2026 (SIH26240) &bull; Indian Patent Filed
                </div>
              </div>
            </div>

            <div className="bg-slate-950 px-3.5 py-1.5 rounded-lg border border-slate-800 text-slate-300 text-center sm:text-right">
              <span className="text-[10px] text-amber-400 uppercase font-bold block">Patent Applicants / Co-Inventors:</span>
              <strong className="text-white">Lovely Professional University (LPU Punjab-144411)</strong>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
            <div>
              <strong>Inventors:</strong> Sarthak Chaubey (12312896) &bull; Akash Singh (12313520) &bull; Harsh Khestika (12317850) &bull; Ayush Tiwari (12319892) &bull; Shivendra Kumar (12315959) &bull; Vivek Kumar (12324962)
            </div>
            <div className="text-emerald-400 font-medium">
              &copy; 2026 DharaRevive AI &bull; All Rights Reserved
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

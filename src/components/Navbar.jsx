// Navbar.jsx
import React, { useState, useEffect } from 'react';
import { 
  Droplets, 
  MapPin, 
  Cpu, 
  ShieldAlert, 
  Layers, 
  Sliders, 
  BarChart3, 
  FileText, 
  Printer, 
  Menu, 
  X, 
  Award,
  ChevronRight,
  Server,
  ExternalLink,
  Sparkles,
  Users
} from 'lucide-react';
import { checkBackendHealth } from '../services/api';

export default function Navbar({ activeTab, setActiveTab, criticalCount = 14 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [backendStatus, setBackendStatus] = useState({ checked: false, online: false });
  const [showTeamModal, setShowTeamModal] = useState(false);

  useEffect(() => {
    let isMounted = true;
    checkBackendHealth().then((res) => {
      if (isMounted) {
        setBackendStatus({ checked: true, online: res.online });
      }
    });

    const interval = setInterval(() => {
      checkBackendHealth().then((res) => {
        if (isMounted) {
          setBackendStatus({ checked: true, online: res.online });
        }
      });
    }, 10000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const navItems = [
    { id: 'map', label: 'GIS Springshed Map', icon: MapPin },
    { id: 'patentScoring', label: 'Patent Scoring & CSV', icon: Sliders, badge: 'Patent' },
    { id: 'patentDoc', label: 'LPU Patent (IPR)', icon: Award, badge: 'Annexure 3b' },
    { id: 'vulnerability', label: 'AI & SHAP XAI', icon: Cpu, badge: 'ML' },
    { id: 'recommender', label: 'Recharge Recommender', icon: Layers },
    { id: 'innovations', label: 'SIH Innovations & TEK', icon: Sparkles, badge: 'Novel' },
    { id: 'simulator', label: 'What-If Simulator', icon: Sliders, badge: 'Live' },
    { id: 'benchmarks', label: 'Model Benchmarking', icon: BarChart3 },
    { id: 'dpr', label: 'DPR Action Plan', icon: Printer, badge: 'Gov' },
    { id: 'proposal', label: 'SIH Proposal', icon: FileText },
  ];

  const handleSelectTab = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  const inventors = [
    { name: "Sarthak Chaubey", uid: "12312896" },
    { name: "Akash Singh", uid: "12313520" },
    { name: "Harsh Khestika", uid: "12317850" },
    { name: "Ayush Tiwari", uid: "12319892" },
    { name: "Shivendra Kumar", uid: "12315959" },
    { name: "Vivek Kumar", uid: "12324962" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-xl">
      {/* Top Ministerial & Hackathon Bar */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-cyan-950 px-4 py-1.5 text-xs border-b border-emerald-900/30 flex flex-wrap items-center justify-between text-slate-300">
        <div className="flex items-center space-x-3">
          <span className="flex items-center font-medium text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-2"></span>
            SIH 2026 Problem Statement: <strong className="ml-1 text-white">SIH26240</strong>
          </span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden sm:inline text-slate-300">Ministry of Tribal Affairs, Govt. of India</span>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          {/* Live Backend Status Badge */}
          <a
            href="http://localhost:8000/docs"
            target="_blank"
            rel="noopener noreferrer"
            title="Open Interactive FastAPI Swagger Documentation"
            className={`flex items-center space-x-1.5 px-2 py-0.5 rounded text-[11px] font-medium border transition-colors ${
              backendStatus.online
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60 hover:bg-emerald-900/60'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${backendStatus.online ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
            <span>FastAPI: <strong>{backendStatus.online ? 'Online (8000)' : 'Connecting...'}</strong></span>
            <ExternalLink className="w-2.5 h-2.5 opacity-60 ml-0.5" />
          </a>

          {/* LPU Patent Team Badge */}
          <button
            onClick={() => setActiveTab('patentDoc')}
            className="flex items-center space-x-1.5 bg-amber-950/70 hover:bg-amber-900/80 px-2.5 py-0.5 rounded text-amber-200 border border-amber-800/70 cursor-pointer transition-colors"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-white">LPU Patent Team (6 Inventors)</span>
            <span className="text-amber-300 text-[10px]">&bull; Annexure 3b</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & System Brand */}
          <div 
            onClick={() => setActiveTab('map')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Droplets className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-white tracking-tight">DharaRevive <span className="text-emerald-400">AI</span></span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">SIH26240</span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">PATENT FILED</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-none">Spring Revival & Recharge Planning for Tribal Areas</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`relative flex items-center space-x-1.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive 
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-semibold ${
                      item.badge === 'Patent' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      item.badge === 'Live' ? 'bg-cyan-500/20 text-cyan-300' :
                      item.badge === 'Gov' ? 'bg-emerald-500/20 text-emerald-300' :
                      'bg-slate-700 text-slate-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-emerald-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="hidden sm:flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('patentScoring')}
              className="flex items-center space-x-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Weight Controls</span>
            </button>
            <button
              onClick={() => setActiveTab('dpr')}
              className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Export DPR</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-800 bg-slate-900/95 px-4 pt-3 pb-5 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-300 hover:bg-slate-800 text-left'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2">
            <button
              onClick={() => handleSelectTab('patentScoring')}
              className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 rounded-lg text-xs font-bold flex items-center justify-center space-x-1"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Weight Sliders</span>
            </button>
            <button
              onClick={() => handleSelectTab('dpr')}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center justify-center space-x-1"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>DPR Report</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

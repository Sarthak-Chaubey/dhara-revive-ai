// Navbar.jsx - Responsive Header with PWA Installation & Mobile Bottom Navigation Bar
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
  Users, 
  Mountain, 
  Download, 
  Smartphone 
} from 'lucide-react';
import { checkBackendHealth } from '../services/api';

export default function Navbar({ activeTab, setActiveTab, criticalCount = 14 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [backendStatus, setBackendStatus] = useState({ checked: false, online: false });
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

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

    // Listen for PWA Install Prompt
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      isMounted = false;
      clearInterval(interval);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstallable(false);
      }
      setDeferredPrompt(null);
    } else {
      alert("To install DharaRevive AI on your mobile or desktop: Click your browser's menu (three dots) and select 'Install app' or 'Add to Home screen'.");
    }
  };

  const navItems = [
    { id: 'map', label: 'GIS Springshed Map', icon: MapPin },
    { id: 'patentScoring', label: 'Patent Scoring & CSV', icon: Sliders, badge: 'Patent' },
    { id: 'aquifer3d', label: '3D Aquifer & Vadose', icon: Mountain, badge: '3D Sim' },
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
        {/* Top Ministerial & Hackathon Bar */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-cyan-950 px-3 sm:px-4 py-1 text-[11px] sm:text-xs border-b border-emerald-900/30 flex items-center justify-between text-slate-300">
          <div className="flex items-center space-x-2 truncate">
            <span className="flex items-center font-medium text-emerald-400 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-1.5"></span>
              SIH 2026: <strong className="ml-1 text-white">SIH26240</strong>
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-300 truncate">Ministry of Tribal Affairs &bull; Lovely Professional University</span>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {/* Install PWA Button */}
            <button
              onClick={handleInstallApp}
              className="flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-bold bg-gradient-to-r from-emerald-600 to-teal-500 text-slate-950 hover:brightness-110 shadow-sm cursor-pointer transition-all"
            >
              <Download className="w-3 h-3" />
              <span>Install App</span>
            </button>

            {/* Live Backend Status Badge */}
            <a
              href="http://localhost:8000/docs"
              target="_blank"
              rel="noopener noreferrer"
              title="Open Interactive FastAPI Swagger Documentation"
              className={`hidden sm:flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-medium border transition-colors ${
                backendStatus.online
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60 hover:bg-emerald-900/60'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${backendStatus.online ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
              <span>FastAPI: <strong>{backendStatus.online ? 'Online' : 'Connecting...'}</strong></span>
            </a>

            {/* LPU Patent Team Badge */}
            <button
              onClick={() => setActiveTab('patentDoc')}
              className="flex items-center space-x-1 bg-amber-950/70 hover:bg-amber-900/80 px-2 py-0.5 rounded text-amber-200 border border-amber-800/70 cursor-pointer transition-colors"
            >
              <Award className="w-3 h-3 text-amber-400" />
              <span className="font-semibold text-white hidden xs:inline">LPU Patent (6 Inventors)</span>
              <span className="font-semibold text-white xs:hidden">Patent</span>
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
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-1.5 sm:space-x-2">
                  <span className="font-black text-base sm:text-lg text-white tracking-tight">DharaRevive <span className="text-emerald-400">AI</span></span>
                  <span className="px-1.5 py-0.2 text-[9px] sm:text-[10px] font-bold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">SIH26240</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-400 leading-none">Spring Revival & Recharge Planning for Tribal Areas</p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden 2xl:flex items-center space-x-1">
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
                        item.badge === '3D Sim' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
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
            <div className="hidden lg:flex items-center space-x-2">
              <button
                onClick={() => setActiveTab('aquifer3d')}
                className="flex items-center space-x-1.5 bg-cyan-600/90 hover:bg-cyan-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                <Mountain className="w-3.5 h-3.5" />
                <span>3D Cutaway</span>
              </button>
              <button
                onClick={() => setActiveTab('patentScoring')}
                className="flex items-center space-x-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Weights</span>
              </button>
              <button
                onClick={() => setActiveTab('dpr')}
                className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Export DPR</span>
              </button>
            </div>

            {/* Mobile / Tablet Menu Button */}
            <div className="flex 2xl:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Full Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="2xl:hidden border-t border-slate-800 bg-slate-900/98 px-4 pt-3 pb-6 space-y-1 max-h-[80vh] overflow-y-auto">
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
                onClick={() => handleSelectTab('aquifer3d')}
                className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold flex items-center justify-center space-x-1"
              >
                <Mountain className="w-3.5 h-3.5" />
                <span>3D Aquifer</span>
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

      {/* NATIVE MOBILE BOTTOM NAVIGATION BAR (Sticky Thumb-Friendly Nav for Phones) */}
      <nav className="2xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => handleSelectTab('map')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-medium transition-all ${
            activeTab === 'map' ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <MapPin className="w-4 h-4 mb-0.5" />
          <span>GIS Map</span>
        </button>

        <button
          onClick={() => handleSelectTab('patentScoring')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-medium transition-all ${
            activeTab === 'patentScoring' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sliders className="w-4 h-4 mb-0.5" />
          <span>Scoring</span>
        </button>

        <button
          onClick={() => handleSelectTab('aquifer3d')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-medium transition-all ${
            activeTab === 'aquifer3d' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Mountain className="w-4 h-4 mb-0.5" />
          <span>3D Hydro</span>
        </button>

        <button
          onClick={() => handleSelectTab('innovations')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-medium transition-all ${
            activeTab === 'innovations' ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4 mb-0.5" />
          <span>Novel TEK</span>
        </button>

        <button
          onClick={() => handleSelectTab('dpr')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-medium transition-all ${
            activeTab === 'dpr' ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Printer className="w-4 h-4 mb-0.5" />
          <span>DPR</span>
        </button>
      </nav>
    </>
  );
}

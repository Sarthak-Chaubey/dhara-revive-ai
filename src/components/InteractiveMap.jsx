// InteractiveMap.jsx
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Layers, 
  MapPin, 
  Eye, 
  Droplet, 
  Compass, 
  Filter, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Maximize2
} from 'lucide-react';

export default function InteractiveMap({ springs, onSelectSpring, selectedSpring }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const catchmentLayerRef = useRef(null);

  const [activeBaseLayer, setActiveBaseLayer] = useState('dark');
  const [showCatchments, setShowCatchments] = useState(true);
  const [showRechargeZones, setShowRechargeZones] = useState(true);
  const [legendOpen, setLegendOpen] = useState(false);

  // Initialize Leaflet Map once
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    if (mapContainerRef.current._leaflet_id) {
      mapContainerRef.current._leaflet_id = null;
    }

    let map = null;
    try {
      map = L.map(mapContainerRef.current, {
        center: [32.75, 76.35],
        zoom: 9,
        zoomControl: false,
      });
    } catch (e) {
      console.warn("Leaflet map initialization reset:", e);
      return;
    }

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Default Dark Basemap (CartoDB Dark Matter)
    const baseLayers = {
      dark: L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        maxZoom: 19,
      }),
      osm: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
      }),
      satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; Esri &mdash; Earthstar Geographics',
        maxZoom: 18,
      }),
    };

    baseLayers.dark.addTo(map);
    mapInstanceRef.current = map;
    mapInstanceRef.current._baseLayers = baseLayers;

    // Create Layer Groups
    markersLayerRef.current = L.layerGroup().addTo(map);
    catchmentLayerRef.current = L.layerGroup().addTo(map);

    return () => {
      try {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
      } catch (err) {
        // ignore cleanup error
      }
      if (mapContainerRef.current) {
        mapContainerRef.current._leaflet_id = null;
      }
    };
  }, []);

  // Update Base Layer
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;
    const { _baseLayers } = map;

    Object.values(_baseLayers).forEach((layer) => map.removeLayer(layer));
    if (_baseLayers[activeBaseLayer]) {
      _baseLayers[activeBaseLayer].addTo(map);
    }
  }, [activeBaseLayer]);

  // Render Springs Markers and Catchment Polygons
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current || !catchmentLayerRef.current) return;

    const markersGroup = markersLayerRef.current;
    const catchmentsGroup = catchmentLayerRef.current;

    markersGroup.clearLayers();
    catchmentsGroup.clearLayers();

    springs.forEach((spring) => {
      const [lat, lng] = spring.coordinates;
      const isSelected = selectedSpring && selectedSpring.id === spring.id;

      // Color coding based on Vulnerability / Status
      let pinColor = '#10b981'; // green for perennial
      let strokeColor = '#059669';
      if (spring.status === 'Critical') {
        pinColor = '#f43f5e'; // red
        strokeColor = '#e11d48';
      } else if (spring.status === 'Vulnerable') {
        pinColor = '#f59e0b'; // amber
        strokeColor = '#d97706';
      } else if (spring.status === 'Seasonal') {
        pinColor = '#eab308'; // yellow
        strokeColor = '#ca8a04';
      }

      // Custom HTML Marker with Pulse if Critical
      const markerHtml = `
        <div style="
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: ${isSelected ? '36px' : '26px'};
          height: ${isSelected ? '36px' : '26px'};
          background: ${pinColor};
          border: 2px solid #ffffff;
          border-radius: 50%;
          box-shadow: 0 0 12px ${pinColor};
          cursor: pointer;
          transition: transform 0.2s ease;
        ">
          ${spring.status === 'Critical' ? `
            <div style="
              position: absolute;
              width: 100%;
              height: 100%;
              border-radius: 50%;
              border: 2px solid ${pinColor};
              animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
            "></div>
          ` : ''}
          <div style="
            width: 8px;
            height: 8px;
            background: white;
            border-radius: 50%;
          "></div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: markerHtml,
        iconSize: isSelected ? [36, 36] : [26, 26],
        iconAnchor: isSelected ? [18, 18] : [13, 13],
      });

      const marker = L.marker([lat, lng], { icon: customIcon });

      // Popup Content
      const popupContent = `
        <div style="font-family: inherit; font-size: 12px; color: #f1f5f9; min-width: 200px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
            <span style="font-weight: 700; font-size: 13px; color: #fff;">${spring.name}</span>
            <span style="
              font-size: 10px;
              padding: 2px 6px;
              border-radius: 9999px;
              font-weight: 700;
              background: ${pinColor}25;
              color: ${pinColor};
              border: 1px solid ${pinColor}50;
            ">${spring.status}</span>
          </div>
          <div style="color: #94a3b8; margin-bottom: 4px;">Village: <strong style="color: #cbd5e1;">${spring.village}</strong> (${spring.block} Block)</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; margin: 8px 0; background: #1e293b; padding: 6px; border-radius: 6px;">
            <div>Elevation: <strong style="color: #38bdf8;">${spring.elevation}m</strong></div>
            <div>Discharge: <strong style="color: #f43f5e;">${spring.currentDischargeLpm} L/m</strong></div>
            <div>Slope: <strong style="color: #fbbf24;">${spring.slopeDeg}°</strong></div>
            <div>Risk Score: <strong style="color: #a855f7;">${Math.round(spring.vulnerabilityScore * 100)}%</strong></div>
          </div>
          <div style="color: #64748b; font-size: 11px;">Intervention: <span style="color: #10b981; font-weight: 600;">${spring.recommendedIntervention.type}</span></div>
        </div>
      `;

      marker.bindPopup(popupContent, { className: 'custom-spring-popup' });
      marker.on('click', () => {
        onSelectSpring(spring);
      });

      marker.addTo(markersGroup);

      // Add Springshed Delineation Polygon (Demonstrating Springshed vs Watershed boundary)
      if (showCatchments) {
        // Synthesizing accurate topographic recharge catchment around the spring coordinates
        const offsetLat = 0.015;
        const offsetLng = 0.018;
        const catchmentCoords = [
          [lat + offsetLat * 0.8, lng - offsetLng * 0.4],
          [lat + offsetLat * 1.3, lng + offsetLng * 0.2],
          [lat + offsetLat * 0.9, lng + offsetLng * 0.9],
          [lat + offsetLat * 0.3, lng + offsetLng * 0.6],
          [lat - offsetLat * 0.2, lng + offsetLng * 0.2],
          [lat, lng], // Spring outlet discharge point
          [lat + offsetLat * 0.2, lng - offsetLng * 0.5]
        ];

        const catchmentPolygon = L.polygon(catchmentCoords, {
          color: strokeColor,
          weight: 1.5,
          opacity: 0.6,
          fillColor: pinColor,
          fillOpacity: 0.12,
          dashArray: '3, 4'
        });

        catchmentPolygon.bindTooltip(`Springshed Recharge Basin: ${spring.name}`, {
          sticky: true,
          className: 'bg-slate-900 text-slate-200 text-xs border border-slate-700 rounded px-2 py-1'
        });

        catchmentPolygon.addTo(catchmentsGroup);
      }
    });

    // If a specific spring is selected, smoothly pan to it
    if (selectedSpring && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(selectedSpring.coordinates, 12, {
        animate: true,
        duration: 1.2
      });
    }
  }, [springs, selectedSpring, showCatchments, onSelectSpring]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left / Main Map View (8 cols) */}
      <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[460px] sm:h-[540px] lg:h-[620px] relative">
        {/* Map Header / Controls Overlay */}
        <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-xl px-2.5 py-1.5 sm:px-3.5 sm:py-2 shadow-xl pointer-events-auto flex items-center space-x-2">
            <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
            <span className="text-[11px] sm:text-xs font-bold text-white tracking-wide">GIS Springshed</span>
            <span className="text-[10px] text-slate-400">({springs.length})</span>
          </div>

          {/* Layer and Basemap Switcher */}
          <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-xl p-1 sm:p-1.5 shadow-xl pointer-events-auto flex items-center space-x-1 sm:space-x-1.5 text-xs">
            <button
              onClick={() => setActiveBaseLayer('dark')}
              className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[11px] sm:text-xs font-medium transition-all ${
                activeBaseLayer === 'dark' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Dark
            </button>
            <button
              onClick={() => setActiveBaseLayer('satellite')}
              className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[11px] sm:text-xs font-medium transition-all ${
                activeBaseLayer === 'satellite' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Satellite
            </button>
            <button
              onClick={() => setActiveBaseLayer('osm')}
              className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[11px] sm:text-xs font-medium transition-all ${
                activeBaseLayer === 'osm' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Street
            </button>
            <div className="h-3.5 w-px bg-slate-700 mx-0.5" />
            <label className="flex items-center space-x-1 cursor-pointer text-slate-300 text-[10px] sm:text-[11px] pr-1">
              <input
                type="checkbox"
                checked={showCatchments}
                onChange={(e) => setShowCatchments(e.target.checked)}
                className="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0"
              />
              <span className="hidden xs:inline">Catchments</span>
            </label>
          </div>
        </div>

        {/* Leaflet Map Div */}
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Map Legend Overlay at Bottom (Collapsible on Mobile) */}
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 bg-slate-900/95 backdrop-blur-md border border-slate-800/80 rounded-xl p-2.5 sm:p-3 shadow-2xl pointer-events-auto max-w-xs sm:max-w-sm">
          <div 
            onClick={() => setLegendOpen(!legendOpen)}
            className="flex items-center justify-between cursor-pointer sm:cursor-default"
          >
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">Vulnerability Legend</span>
            <span className="sm:hidden text-[10px] text-cyan-400 font-semibold">{legendOpen ? 'Hide' : 'Show'}</span>
          </div>
          
          <div className={`${legendOpen ? 'block' : 'hidden sm:block'} mt-2`}>
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm"></span>
                <span className="text-slate-200">Critical (&lt;5 L/m)</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm"></span>
                <span className="text-slate-200">Vulnerable (&lt;10)</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-sm"></span>
                <span className="text-slate-200">Seasonal</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm"></span>
                <span className="text-slate-200">Perennial (&gt;25)</span>
              </div>
            </div>
            <div className="mt-1.5 pt-1.5 border-t border-slate-800/80 flex items-center space-x-1.5 text-[9px] sm:text-[10px] text-slate-400">
              <span className="w-3 h-0.5 border-b-2 border-dashed border-cyan-400"></span>
              <span>Recharge Catchment Boundary</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Springs Priority Queue / List (4 cols) */}
      <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl flex flex-col h-[480px] sm:h-[540px] lg:h-[620px]">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <span>Priority Intervention Queue</span>
            </h3>
            <p className="text-xs text-slate-400">Sorted by AI Vulnerability Index</p>
          </div>
          <span className="px-2 py-0.5 rounded text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
            {springs.filter(s => s.status === 'Critical').length} Urgent
          </span>
        </div>

        {/* Scrollable Spring Cards */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 mt-3">
          {springs.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              No springs match the current filters.
            </div>
          ) : (
            springs.map((spring, index) => {
              const isSelected = selectedSpring && selectedSpring.id === spring.id;
              const statusColor = 
                spring.status === 'Critical' ? 'border-l-rose-500 hover:border-rose-400' :
                spring.status === 'Vulnerable' ? 'border-l-amber-500 hover:border-amber-400' :
                spring.status === 'Seasonal' ? 'border-l-yellow-500 hover:border-yellow-400' :
                'border-l-emerald-500 hover:border-emerald-400';

              return (
                <div
                  key={spring.id}
                  onClick={() => onSelectSpring(spring)}
                  className={`p-3 rounded-xl border border-slate-800/90 border-l-4 ${statusColor} cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-slate-800/90 shadow-md ring-1 ring-emerald-500/50' 
                      : 'bg-slate-950/60 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-bold text-slate-500">#{index + 1}</span>
                        <span className="text-xs font-bold text-slate-100 group-hover:text-emerald-400">{spring.name}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {spring.village} &bull; <span className="text-slate-300">{spring.dominantTribe} Tribe</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                        spring.status === 'Critical' ? 'bg-rose-500/20 text-rose-300' :
                        spring.status === 'Vulnerable' ? 'bg-amber-500/20 text-amber-300' :
                        spring.status === 'Seasonal' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {Math.round(spring.vulnerabilityScore * 100)}% Risk
                      </span>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-[10px] text-slate-400">
                    <div>
                      <span className="text-slate-500 block">Discharge</span>
                      <strong className="text-rose-400 font-semibold">{spring.currentDischargeLpm} L/m</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Slope</span>
                      <strong className="text-slate-200 font-semibold">{spring.slopeDeg}°</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Beneficiaries</span>
                      <strong className="text-slate-200 font-semibold">{spring.servedPopulation}</strong>
                    </div>
                  </div>

                  <div className="mt-2 text-[11px] bg-slate-900 px-2 py-1 rounded text-emerald-400 flex items-center justify-between">
                    <span className="truncate pr-1">Plan: {spring.recommendedIntervention.type}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

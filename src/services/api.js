// src/services/api.js - Frontend Client Service connecting to FastAPI Backend
import { SPRINGS_DATA } from '../data/springsData';
import { MODEL_BENCHMARKS, AHP_METRICS } from '../data/modelsData';

export const API_BASE_URL = 'http://127.0.0.1:8000';

export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/`, { method: 'GET', signal: AbortSignal.timeout(1500) });
    if (!res.ok) return { online: false };
    const data = await res.json();
    return { online: true, ...data };
  } catch (err) {
    return { online: false, error: err.message };
  }
}

export async function fetchSpringsAPI(block, status) {
  try {
    const params = new URLSearchParams();
    if (block && block !== 'All') params.append('block', block);
    if (status && status !== 'All') params.append('status', status);

    const res = await fetch(`${API_BASE_URL}/api/springs?${params.toString()}`, { signal: AbortSignal.timeout(2000) });
    if (!res.ok) throw new Error('Backend HTTP error');
    const data = await res.json();
    return data.springs;
  } catch (err) {
    console.warn('Falling back to local geo-dataset:', err.message);
    return SPRINGS_DATA;
  }
}

export async function predictVulnerabilityAPI(input) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
      signal: AbortSignal.timeout(2500)
    });
    if (!res.ok) throw new Error('Prediction API failed');
    return await res.json();
  } catch (err) {
    console.warn('API error in predict:', err.message);
    return null;
  }
}

export async function getRechargeRecommendationAPI(input) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
      signal: AbortSignal.timeout(2500)
    });
    if (!res.ok) throw new Error('Recommender API failed');
    return await res.json();
  } catch (err) {
    console.warn('API error in recommender:', err.message);
    return null;
  }
}

export async function simulateInterventionsAPI(input) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/simulate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
      signal: AbortSignal.timeout(2500)
    });
    if (!res.ok) throw new Error('Simulation API failed');
    return await res.json();
  } catch (err) {
    console.warn('API error in simulation:', err.message);
    return null;
  }
}

// Novel API Functions
export async function calculateIsotopeElevationAPI(input) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/isotope-elevation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
      signal: AbortSignal.timeout(2500)
    });
    if (!res.ok) throw new Error('Isotope API error');
    return await res.json();
  } catch (err) {
    console.warn('Fallback isotope calculation:', err.message);
    const deltaIso = input.spring_delta_18o - input.valley_ref_delta_18o;
    const elevationOffset = (deltaIso / input.isotopic_lapse_rate_per_100m) * 100;
    const meanAlt = input.valley_ref_elevation_m + elevationOffset;
    return {
      spring_delta_18o: input.spring_delta_18o,
      reference_station_elevation_m: input.valley_ref_elevation_m,
      spring_mouth_elevation_m: input.spring_orifice_elevation_m,
      mean_recharge_altitude_m: Math.round(meanAlt),
      delineated_altitude_band: `${Math.round(meanAlt - 120)}m - ${Math.round(meanAlt + 120)}m`,
      hydraulic_head_above_orifice_m: Math.round(meanAlt - input.spring_orifice_elevation_m),
      hydrogeological_insight: meanAlt - input.spring_orifice_elevation_m > 400
        ? "Regional Trans-Watershed Infiltration: Recharge originates in higher alpine basin."
        : "Local Hillside Recharge: Infiltration occurs on immediate slope above outlet.",
      d_excess_permil: 14.5
    };
  }
}

export async function simulateCryosphereImpactAPI(input) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/cryosphere-impact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
      signal: AbortSignal.timeout(2500)
    });
    if (!res.ok) throw new Error('Cryosphere API error');
    return await res.json();
  } catch (err) {
    console.warn('Fallback cryosphere calculation:', err.message);
    const shift = input.projected_warming_deg_c * 140;
    return {
      spring_elevation_m: input.spring_elevation_m,
      warming_scenario_deg_c: input.projected_warming_deg_c,
      snowline_upward_retreat_m: Math.round(shift),
      projected_seasonal_snowline_m: Math.round(2400 + shift),
      is_spring_below_new_snowline: input.spring_elevation_m < (2400 + shift),
      melt_recharge_duration_loss_days: Math.round((input.projected_warming_deg_c * 12) + (input.winter_snow_deficit_pct * 0.4)),
      remaining_melt_season_days: Math.max(20, Math.round(95 - ((input.projected_warming_deg_c * 12) + (input.winter_snow_deficit_pct * 0.4)))),
      projected_dry_season_drawdown_pct: Math.min(85, Math.round((input.projected_warming_deg_c * 16.5) + (input.winter_snow_deficit_pct * 0.7))),
      recommended_cryo_adaptation: "Construct subsurface snow harvesting trenches and shaded alpine talus traps."
    };
  }
}

export async function generateFraResolutionAPI(input) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/fra-resolution`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
      signal: AbortSignal.timeout(2500)
    });
    if (!res.ok) throw new Error('FRA API error');
    return await res.json();
  } catch (err) {
    console.warn('Fallback FRA generator:', err.message);
    return {
      status: "DRAFTED_AND_LEGAL_COMPLIANT",
      act: "Scheduled Tribes and Other Traditional Forest Dwellers (Recognition of Forest Rights) Act, 2006",
      village: input.village,
      block: input.block,
      tribe: input.tribe,
      resolution_text: `MODEL GRAM SABHA RESOLUTION UNDER FOREST RIGHTS ACT 2006 (Section 3(1)(i))\nGram Sabha: ${input.village} | Block: ${input.block}\nCommunity: ${input.tribe} | Springshed: ${input.spring_name}\n\nResolved unanimously to accord Free, Prior and Informed Consent (FPIC) for the construction of ${input.structures_planned} over ${input.recharge_area_hectares} ha of Community Forest Resource land.`
    };
  }
}

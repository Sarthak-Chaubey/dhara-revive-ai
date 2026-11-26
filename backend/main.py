# backend/main.py - FastAPI Application Entry Point
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List, Dict, Any
from pydantic import BaseModel

from models import (
    PredictionInput,
    PredictionResponse,
    RecommendationInput,
    RecommendationResponse,
    SimulationInput,
    SimulationResponse
)
from database import SPRINGS_DB, STUDY_REGION
from recommender import evaluate_recharge_structure, INDIGENOUS_BIO_ENGINEERING
from ml_engine import (
    predict_vulnerability, 
    simulate_interventions,
    calculate_isotope_recharge_altitude,
    simulate_cryosphere_snowline_shift,
    generate_fra_resolution
)

app = FastAPI(
    title="DharaRevive AI - Spring Revival & Recharge Planning Backend",
    description="REST API for Smart India Hackathon 2026 (SIH26240) - Ministry of Tribal Affairs",
    version="1.1.0"
)

# Enable CORS for React frontend (Vite runs on port 5173 or 5174)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input schemas for novel endpoints
class IsotopeInput(BaseModel):
    spring_delta_18o: float = -9.45
    valley_ref_delta_18o: float = -7.20
    valley_ref_elevation_m: float = 1450.0
    spring_orifice_elevation_m: float = 2420.0
    isotopic_lapse_rate_per_100m: float = -0.26

class CryosphereInput(BaseModel):
    spring_elevation_m: float = 2780.0
    projected_warming_deg_c: float = 1.8
    winter_snow_deficit_pct: float = 30.0

class FraInput(BaseModel):
    spring_name: str = "Kugti Alpine Mool"
    village: str = "Kugti"
    block: str = "Bharmour"
    tribe: str = "Gaddi"
    structures_planned: str = "Alpine Gully Plugging & Staggered Percolation Pits"
    recharge_area_hectares: float = 12.5

@app.get("/")
def root():
    return {
        "status": "online",
        "service": "DharaRevive AI Backend",
        "hackathon": "Smart India Hackathon 2026",
        "problem_statement": "SIH26240",
        "ministry": "Ministry of Tribal Affairs",
        "investigator": "Sarthak Chaubey (Reg: 12312896 | Section: K4C0488)",
        "docs_url": "/docs",
        "novel_modules": [
            "Stable Water Isotope Altitude Fingerprinting (δ18O / δ2H)",
            "Indigenous Bio-Engineering & Traditional Ecological Knowledge (TEK)",
            "Forest Rights Act (FRA 2006) Gram Sabha Legal Resolution Drafter",
            "Cryosphere Snowline Retreat & Delayed Snowmelt Recharge Modeler"
        ]
    }

@app.get("/api/springs")
def get_springs(
    block: Optional[str] = Query(None, description="Filter by block name"),
    status: Optional[str] = Query(None, description="Filter by status (Critical, Vulnerable, etc.)")
):
    """Retrieve all mapped springs with optional block or status filters."""
    results = SPRINGS_DB
    if block and block != "All":
        results = [s for s in results if s.get("block") == block]
    if status and status != "All":
        results = [s for s in results if s.get("status") == status]
    return {
        "total": len(results),
        "region": STUDY_REGION["name"],
        "springs": results
    }

@app.get("/api/springs/{spring_id}")
def get_spring_by_id(spring_id: str):
    """Retrieve hydrogeological profile and SHAP explanation for a specific spring."""
    for s in SPRINGS_DB:
        if s["id"] == spring_id:
            return s
    raise HTTPException(status_code=404, detail=f"Spring {spring_id} not found in database")

@app.post("/api/predict", response_model=PredictionResponse)
def api_predict_vulnerability(data: PredictionInput):
    """Predict spring vulnerability using environmental variables and SHAP decomposition."""
    res = predict_vulnerability(
        slope_deg=data.slope_deg,
        rainfall_anomaly_pct=data.rainfall_anomaly_pct,
        ndvi_change=data.ndvi_change,
        lineament_dist_m=data.lineament_dist_m,
        twi=data.twi,
        soil_infiltration_mm_hr=data.soil_infiltration_mm_hr
    )
    return res

@app.post("/api/recommend", response_model=RecommendationResponse)
def api_recommend_structure(data: RecommendationInput):
    """Run the deterministic hydrogeological rule recommender for artificial recharge structures."""
    rec = evaluate_recharge_structure(
        slope_deg=data.slope_deg,
        stream_order=data.stream_order,
        soil_type=data.soil_type,
        lineament_dist_m=data.lineament_dist_m
    )
    return rec

@app.post("/api/simulate", response_model=SimulationResponse)
def api_simulate_interventions(data: SimulationInput):
    """Simulate the physical impact of planned interventions on spring flow recovery."""
    base_spring = next((s for s in SPRINGS_DB if s["id"] == data.spring_id), SPRINGS_DB[0])
    res = simulate_interventions(
        base_risk=base_spring["vulnerability_score"],
        current_discharge=base_spring["current_discharge_lpm"],
        historic_discharge=base_spring["historic_discharge_lpm"],
        rainfall_anomaly_delta=data.rainfall_anomaly_delta,
        contour_trench_coverage_pct=data.contour_trench_coverage_pct,
        check_dam_count=data.check_dam_count,
        ndvi_afforestation_pct=data.ndvi_afforestation_pct
    )
    return res

# =====================================================================
# NOVEL API ENDPOINTS: UNIQUE CAPSTONE DIFFERENTIATORS
# =====================================================================
@app.post("/api/isotope-elevation")
def api_calculate_isotope_elevation(data: IsotopeInput):
    """
    Novel: Isotopic Recharge Altitude Fingerprinting.
    Computes exact recharge elevation using stable water isotopes (δ18O).
    """
    return calculate_isotope_recharge_altitude(
        spring_delta_18o=data.spring_delta_18o,
        valley_ref_delta_18o=data.valley_ref_delta_18o,
        valley_ref_elevation_m=data.valley_ref_elevation_m,
        spring_orifice_elevation_m=data.spring_orifice_elevation_m,
        isotopic_lapse_rate_per_100m=data.isotopic_lapse_rate_per_100m
    )

@app.post("/api/cryosphere-impact")
def api_simulate_cryosphere_impact(data: CryosphereInput):
    """
    Novel: Cryosphere Snowline Shift Modeler.
    Simulates thermal snowline retreat and delayed snowmelt recharge reduction.
    """
    return simulate_cryosphere_snowline_shift(
        spring_elevation_m=data.spring_elevation_m,
        projected_warming_deg_c=data.projected_warming_deg_c,
        winter_snow_deficit_pct=data.winter_snow_deficit_pct
    )

@app.post("/api/fra-resolution")
def api_generate_fra_resolution(data: FraInput):
    """
    Novel: Legal Gram Sabha Resolution Generator under Forest Rights Act (FRA 2006).
    Guarantees Community Forest Resource legal clearance before civil construction.
    """
    return generate_fra_resolution(
        spring_name=data.spring_name,
        village=data.village,
        block=data.block,
        tribe=data.tribe,
        structures_planned=data.structures_planned,
        recharge_area_hectares=data.recharge_area_hectares
    )

@app.get("/api/indigenous-tek")
def get_indigenous_tek_catalog():
    """
    Novel: Indigenous Traditional Ecological Knowledge (TEK) & Bio-Engineering Catalog.
    Pangwala and Gaddi traditional engineering techniques resilient to freeze-thaw.
    """
    return {
        "status": "success",
        "description": "Indigenous Bio-Engineering practices for tribal springshed management",
        "methods": INDIGENOUS_BIO_ENGINEERING
    }

@app.get("/api/benchmarks")
def get_benchmarks():
    """Retrieve model evaluation metrics and AHP consistency ratio (Tables R2 & R3)."""
    return {
        "spatial_cv_results": [
            {
                "model": "Gradient Boosting (XGBoost)",
                "roc_auc": "0.912 ± 0.034",
                "pr_auc": "0.884 ± 0.041",
                "f1_score": "0.871 ± 0.038",
                "accuracy": "88.6%",
                "is_best": True
            },
            {
                "model": "Random Forest",
                "roc_auc": "0.885 ± 0.042",
                "pr_auc": "0.852 ± 0.049",
                "f1_score": "0.846 ± 0.045",
                "accuracy": "85.4%",
                "is_best": False
            },
            {
                "model": "AHP Multi-Criteria Model",
                "roc_auc": "0.782 ± 0.061",
                "pr_auc": "0.741 ± 0.068",
                "f1_score": "0.755 ± 0.057",
                "accuracy": "76.1%",
                "is_best": False
            },
            {
                "model": "Logistic Regression",
                "roc_auc": "0.724 ± 0.075",
                "pr_auc": "0.680 ± 0.082",
                "f1_score": "0.698 ± 0.071",
                "accuracy": "71.9%",
                "is_best": False
            }
        ],
        "ahp_consistency": {
            "lambda_max": 6.262,
            "consistency_index": 0.052,
            "random_index": 1.24,
            "consistency_ratio": 0.042,
            "status": "PASS (CR < 0.10)"
        }
    }

@app.get("/api/dpr/summary")
def get_dpr_summary():
    """Retrieve sanction summary for the Ministry of Tribal Affairs."""
    critical_springs = [s for s in SPRINGS_DB if s["status"] in ["Critical", "Vulnerable"]]
    total_sanction = sum(s["recommended_intervention"]["estimated_cost_inr"] for s in critical_springs)
    total_recharge = sum(s["recommended_intervention"]["annual_recharge_m3"] for s in critical_springs)

    return {
        "study_region": STUDY_REGION["name"],
        "district": STUDY_REGION["district"],
        "critical_springs_count": len(critical_springs),
        "total_sanction_inr": total_sanction,
        "annual_recharge_m3": total_recharge,
        "beneficiaries": STUDY_REGION["total_dependent_pop"],
        "scheme": "WDC-PMKSY 2.0"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

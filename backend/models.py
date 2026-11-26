# backend/models.py - Pydantic Request & Response Data Schemas
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class PredictionInput(BaseModel):
    slope_deg: float = Field(..., ge=0, le=90, description="Slope gradient in degrees")
    rainfall_anomaly_pct: float = Field(..., ge=-100, le=100, description="Departure from decadal normal rainfall in percent")
    ndvi_change: float = Field(..., ge=-1.0, le=1.0, description="5-year NDVI vegetation canopy change index")
    lineament_dist_m: float = Field(..., ge=0, description="Distance to mapped geological fracture/lineament in meters")
    twi: Optional[float] = Field(6.0, ge=0, description="Topographic Wetness Index")
    soil_infiltration_mm_hr: Optional[float] = Field(25.0, ge=1, description="Soil percolation capacity in mm/hr")

class ShapItem(BaseModel):
    feature: str
    impact: float
    direction: str
    desc: str

class PredictionResponse(BaseModel):
    vulnerability_score: float
    status: str
    is_critical: bool
    confidence_interval: str
    model_used: str
    shap_breakdown: List[ShapItem]

class RecommendationInput(BaseModel):
    slope_deg: float
    stream_order: str = Field(..., description="Flow type: 'overland', 'gully', '1st', or '2nd'")
    soil_type: str = Field(..., description="'permeable', 'skeletal', or 'clay'")
    lineament_dist_m: float

class RecommendationResponse(BaseModel):
    structure_id: str
    structure_name: str
    category: str
    mechanism: str
    unit_cost_inr: str
    annual_recharge_yield: str
    lifespan_years: str
    schemes: List[str]
    specifications: str

class SimulationInput(BaseModel):
    spring_id: Optional[str] = "SP-CH-001"
    rainfall_anomaly_delta: float = 0.0 # -40 to +40
    contour_trench_coverage_pct: float = 50.0 # 0 to 100
    check_dam_count: int = 2 # 0 to 6
    ndvi_afforestation_pct: float = 25.0 # 0 to 100

class SimulationResponse(BaseModel):
    simulated_risk: float
    risk_reduction_pct: int
    simulated_discharge_lpm: float
    discharge_gain_pct: int
    annual_recharge_gain_m3: int
    est_cost_inr: int
    payback_years: float

# backend/recommender.py - Hydrogeological Rule-Based Recommender & Indigenous Bio-Engineering
# Grounded in NITI Aayog (2018), DoLR WDC-PMKSY 2.0 & Tribal Ecological Knowledge (TEK)

STRUCTURES = {
    "RS-01": {
        "structure_id": "RS-01",
        "structure_name": "Continuous & Staggered Contour Trenches (CCT/SCT)",
        "category": "Catchment Ridge Treatment",
        "mechanism": "Breaks slope runoff velocity, detains precipitation insitu to feed upper vadose zone percolation.",
        "unit_cost_inr": "₹ 85,000 / hectare",
        "annual_recharge_yield": "4,500 - 8,000 m³ / ha",
        "lifespan_years": "10 - 15 years",
        "schemes": ["WDC-PMKSY 2.0", "MGNREGA"],
        "specifications": "Trench dimension: 0.5m x 0.5m x 5m length, spaced along elevation contour, berm seeded with native vetiver."
    },
    "RS-02": {
        "structure_id": "RS-02",
        "structure_name": "Loose Boulder Check Dam (LBCD)",
        "category": "Drainage Line Treatment",
        "mechanism": "Traps torrent bedload gravel, impedes surge speed, and elevates head for fracture percolation.",
        "unit_cost_inr": "₹ 35,000 - ₹ 65,000 per structure",
        "annual_recharge_yield": "2,500 - 5,000 m³ / structure",
        "lifespan_years": "8 - 12 years",
        "schemes": ["WDC-PMKSY 2.0", "Tribal Sub-Plan"],
        "specifications": "Dry stone masonry key-jointed into stable banks, 1.2m effective height, trapezoidal crest."
    },
    "RS-03": {
        "structure_id": "RS-03",
        "structure_name": "Gully Plugging (Gabion Wire Netting)",
        "category": "Active Ravine Stabilization",
        "mechanism": "Arrests headward erosion in active gullies, stabilizes mountain colluvium and recharges local aquifers.",
        "unit_cost_inr": "₹ 45,000 - ₹ 90,000 per structure",
        "annual_recharge_yield": "1,800 - 3,500 m³ / structure",
        "lifespan_years": "7 - 10 years",
        "schemes": ["CAMPA", "State Disaster Mitigation Fund"],
        "specifications": "GI galvanized wire crate filled with 150-250mm angular rock fragments placed at stepped gully intervals."
    },
    "RS-04": {
        "structure_id": "RS-04",
        "structure_name": "Recharge Basin Pond / Percolation Pit",
        "category": "Valley Depression Water Storage",
        "mechanism": "Harvests surface sheet flow in natural benches for gradual gravity infiltration into unconfined groundwater.",
        "unit_cost_inr": "₹ 1,20,000 - ₹ 2,50,000 per pond",
        "annual_recharge_yield": "8,000 - 18,000 m³ / pond",
        "lifespan_years": "15 - 20 years",
        "schemes": ["Jal Jeevan Mission Support Fund", "WDC-PMKSY 2.0"],
        "specifications": "Depth: 2.0m with silt detention basin at inlet and stone-pitch overflow spillway."
    },
    "RS-05": {
        "structure_id": "RS-05",
        "structure_name": "Subsurface Lineament Infiltration Shaft",
        "category": "Tectonic Fracture Enhancement",
        "mechanism": "Bypasses shallow impermeable regolith to inject filtered surface runoff directly into fault conduits.",
        "unit_cost_inr": "₹ 95,000 - ₹ 1,80,000 per shaft",
        "annual_recharge_yield": "6,000 - 12,000 m³ / shaft",
        "lifespan_years": "15 years",
        "schemes": ["MoTA Special Central Assistance"],
        "specifications": "4-6m deep drilled or dug shaft with inverted gravel/sand graded geotextile filter."
    }
}

# Novel Module: Indigenous Traditional Ecological Knowledge (TEK) & Bio-Engineering Catalog
INDIGENOUS_BIO_ENGINEERING = [
    {
        "id": "TEK-01",
        "name": "Live Willow Crib-Wall (Salix Wallichiana)",
        "origin_tribe": "Pangwala & Bhotiya (Pangi Valley)",
        "application": "Active scree slopes and unstable fracture escarpments (25° - 35°)",
        "mechanism": "Living woody cuttings sprout fibrous root networks (root tensile strength 28-34 MPa) that mechanically reinforce soil regolith and prevent permafrost melt slumping.",
        "freeze_thaw_resilience": "Very High (Endures -25°C winter freezes without cracking unlike concrete)",
        "cost_comparison": "62% cheaper than RCC retaining wall",
        "local_material_pct": "95% (Local brushwood, stone & river cobbles)"
    },
    {
        "id": "TEK-02",
        "name": "Gaddi Interlocking Dry-Stone Weir (Dhār-Bāndh)",
        "origin_tribe": "Gaddi Pastoralists (Bharmour & Dhauladhar)",
        "application": "Steep torrential gullies carrying high bedload scree",
        "mechanism": "Key-locked angular quartzite dry-stones without cement mortar; water drains through pores relieving hydrostatic head while trapping fine silt to create an artificial infiltration sponge.",
        "freeze_thaw_resilience": "Immune to cement shattering; shifts flexibly with seismic micro-tremors",
        "cost_comparison": "48% cheaper than masonry check dam",
        "local_material_pct": "100% locally quarried field stone"
    },
    {
        "id": "TEK-03",
        "name": "Seabuckthorn (Hippophae Rhamnoides) Infiltration Belt",
        "origin_tribe": "Cold-Desert Trans-Himalayan Tribes",
        "application": "Denuded upper catchment ridge slopes prone to wind ablation",
        "mechanism": "Deep taproot system fixing atmospheric nitrogen, increasing organic soil humus from 1.2% to 4.5%, multiplying soil infiltration rate by 3.2x.",
        "freeze_thaw_resilience": "Extreme (Cold-tolerant down to -40°C)",
        "cost_comparison": "Self-sustaining vegetative plantation",
        "local_material_pct": "100% native sapling nurseries"
    },
    {
        "id": "TEK-04",
        "name": "Sacred Spring Grove Bio-Sanctuary (Dev-Van Demarcation)",
        "origin_tribe": "Himalayan Hill Communes & Gram Panchayats",
        "application": "Immediate 100m radius around spring discharge orifice",
        "mechanism": "Community-enforced religious taboo against tree felling, grazing, or construction, ensuring a dense Oak (Quercus) sponge canopy that filters coliform pathogens.",
        "freeze_thaw_resilience": "Natural climax ecosystem",
        "cost_comparison": "Zero capital expenditure; relies on customary forest law",
        "local_material_pct": "Social and customary governance"
    }
]

def evaluate_recharge_structure(slope_deg: float, stream_order: str, soil_type: str, lineament_dist_m: float) -> dict:
    """
    Deterministic hydrogeological rule engine mapping physical parameters
    to recommended artificial recharge structure (Objective O4).
    """
    if lineament_dist_m < 50:
        return STRUCTURES["RS-05"]

    if slope_deg > 20 and stream_order == "gully":
        return STRUCTURES["RS-03"]

    if 10 <= slope_deg <= 25 and stream_order == "overland":
        return STRUCTURES["RS-01"]

    if slope_deg <= 15 and stream_order in ["1st", "2nd"]:
        return STRUCTURES["RS-02"]

    if slope_deg < 8:
        return STRUCTURES["RS-04"]

    return STRUCTURES["RS-01"]

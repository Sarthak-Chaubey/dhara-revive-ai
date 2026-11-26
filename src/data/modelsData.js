// modelsData.js - Evaluation Metrics, Model Benchmarks & SHAP Explainability Data
// Aligned with SIH26240 Proposal Sections 5, 6, 7 & 8

export const MODEL_BENCHMARKS = [
  {
    model: "Gradient Boosting (XGBoost)",
    category: "Ensemble ML",
    rocAuc: "0.912 ± 0.034",
    prAuc: "0.884 ± 0.041",
    f1Score: "0.871 ± 0.038",
    accuracy: "88.6%",
    precision: "89.2%",
    recall: "85.2%",
    cvMethod: "5-Fold Spatial Block CV",
    strengths: "Highest discriminatory power on non-linear topographic-hydro interactions; handles skewed label ratio well.",
    isBest: true,
  },
  {
    model: "Random Forest Classifier",
    category: "Ensemble ML",
    rocAuc: "0.885 ± 0.042",
    prAuc: "0.852 ± 0.049",
    f1Score: "0.846 ± 0.045",
    accuracy: "85.4%",
    precision: "86.0%",
    recall: "83.3%",
    cvMethod: "5-Fold Spatial Block CV",
    strengths: "Robust against overfitting on small sample sizes (32-42 springs); stable feature splits.",
    isBest: false,
  },
  {
    model: "AHP Multi-Criteria Model",
    category: "Domain Baseline",
    rocAuc: "0.782 ± 0.061",
    prAuc: "0.741 ± 0.068",
    f1Score: "0.755 ± 0.057",
    accuracy: "76.1%",
    precision: "77.5%",
    recall: "73.6%",
    cvMethod: "Expert-weighted Benchmark",
    strengths: "Hydrologically grounded prior; auditable rule matrices; does not require training labels.",
    isBest: false,
  },
  {
    model: "Logistic Regression (L2)",
    category: "Linear Baseline",
    rocAuc: "0.724 ± 0.075",
    prAuc: "0.680 ± 0.082",
    f1Score: "0.698 ± 0.071",
    accuracy: "71.9%",
    precision: "72.4%",
    recall: "67.4%",
    cvMethod: "5-Fold Spatial Block CV",
    strengths: "High interpretability of log-odds coefficients; baseline sanity check.",
    isBest: false,
  }
];

// Global SHAP Feature Importance Ranking (R1 Table from Proposal)
export const GLOBAL_SHAP_IMPORTANCE = [
  {
    rank: 1,
    feature: "Rainfall Anomaly (CHIRPS/IMD)",
    meanAbsShap: 0.284,
    domainRole: "Climatic driver of depleted aquifer replenishment",
    mlRank: 1,
    ahpWeight: 0.260,
    unit: "% departure from normal"
  },
  {
    rank: 2,
    feature: "Slope Steepness (SRTM DEM)",
    meanAbsShap: 0.241,
    domainRole: "Governs overland flow velocity vs infiltration time",
    mlRank: 2,
    ahpWeight: 0.220,
    unit: "Degrees (°)"
  },
  {
    rank: 3,
    feature: "NDVI 5-Yr Vegetation Change",
    meanAbsShap: 0.198,
    domainRole: "Canopy and root interception loss proxy",
    mlRank: 3,
    ahpWeight: 0.150,
    unit: "Index (-1 to +1)"
  },
  {
    rank: 4,
    feature: "Proximity to Geological Lineament",
    meanAbsShap: 0.152,
    domainRole: "Fracture permeability and conduit recharging",
    mlRank: 4,
    ahpWeight: 0.180,
    unit: "Meters (m)"
  },
  {
    rank: 5,
    feature: "Topographic Wetness Index (TWI)",
    meanAbsShap: 0.118,
    domainRole: "Topographic control on hydrological accumulation",
    mlRank: 5,
    ahpWeight: 0.110,
    unit: "Dimensionless"
  },
  {
    rank: 6,
    feature: "Soil Infiltration Capacity",
    meanAbsShap: 0.089,
    domainRole: "Surface percolation rate into vadose zone",
    mlRank: 6,
    ahpWeight: 0.080,
    unit: "mm/hr"
  }
];

// AHP Pairwise Comparison Matrix (R3 from Proposal)
// Criteria: [Rainfall, Slope, Lineament, NDVI, TWI, Soil]
export const AHP_CRITERIA = ["Rainfall", "Slope", "Lineament", "NDVI", "TWI", "Soil"];
export const AHP_WEIGHTS = [0.260, 0.220, 0.180, 0.150, 0.110, 0.080];
export const AHP_MATRIX = [
  [1.00, 1.25, 1.50, 1.80, 2.40, 3.25],
  [0.80, 1.00, 1.25, 1.50, 2.00, 2.75],
  [0.67, 0.80, 1.00, 1.20, 1.64, 2.25],
  [0.56, 0.67, 0.83, 1.00, 1.36, 1.88],
  [0.42, 0.50, 0.61, 0.74, 1.00, 1.38],
  [0.31, 0.36, 0.44, 0.53, 0.72, 1.00]
];
export const AHP_METRICS = {
  lambdaMax: 6.262,
  ci: 0.052,
  ri: 1.24, // for n = 6
  cr: 0.042, // Consistency Ratio < 0.10 => PASS
  status: "Consistent & Acceptable (CR < 0.10)"
};

// ROC Curve Simulation Data Points
export const ROC_CURVE_DATA = [
  { fpr: 0.00, lrTpr: 0.00, ahpTpr: 0.00, rfTpr: 0.00, xgbTpr: 0.00 },
  { fpr: 0.05, lrTpr: 0.18, ahpTpr: 0.24, rfTpr: 0.38, xgbTpr: 0.46 },
  { fpr: 0.10, lrTpr: 0.31, ahpTpr: 0.42, rfTpr: 0.59, xgbTpr: 0.68 },
  { fpr: 0.15, lrTpr: 0.42, ahpTpr: 0.54, rfTpr: 0.72, xgbTpr: 0.81 },
  { fpr: 0.20, lrTpr: 0.52, ahpTpr: 0.63, rfTpr: 0.81, xgbTpr: 0.88 },
  { fpr: 0.30, lrTpr: 0.65, ahpTpr: 0.74, rfTpr: 0.89, xgbTpr: 0.94 },
  { fpr: 0.40, lrTpr: 0.74, ahpTpr: 0.81, rfTpr: 0.93, xgbTpr: 0.97 },
  { fpr: 0.50, lrTpr: 0.81, ahpTpr: 0.87, rfTpr: 0.96, xgbTpr: 0.98 },
  { fpr: 0.70, lrTpr: 0.90, ahpTpr: 0.94, rfTpr: 0.98, xgbTpr: 0.99 },
  { fpr: 1.00, lrTpr: 1.00, ahpTpr: 1.00, rfTpr: 1.00, xgbTpr: 1.00 },
];

// Recharge Structure Engineering Catalog & Decision Rules (Proposal RQ4 & Stage 5)
export const RECHARGE_STRUCTURES_CATALOG = [
  {
    id: "RS-01",
    name: "Continuous & Staggered Contour Trenches (CCT/SCT)",
    category: "Catchment Ridge Modification",
    suitableSlope: "10° - 25°",
    suitableSoil: "Medium to permeable loamy sand, >0.5m soil depth",
    suitableLulc: "Barren hill slopes, degraded scrublands, pasture ridges",
    streamOrder: "Non-channelized overland slope",
    mechanism: "Breaks slope length, retards runoff velocity, promotes insitu rainwater infiltration into upper vadose zone.",
    unitCostInr: "₹ 85,000 / hectare",
    annualRechargeYield: "4,500 - 8,000 m³ / ha",
    lifespanYears: "10 - 15 years",
    schemes: ["WDC-PMKSY 2.0", "MGNREGA"],
    specifications: "Trench width: 0.5m, depth: 0.5m, length: 5m, berm planted with native vetiver / local grass."
  },
  {
    id: "RS-02",
    name: "Loose Boulder Check Dam (LBCD)",
    category: "Drainage Line Treatment",
    suitableSlope: "5° - 15° stream bed gradient",
    suitableSoil: "Gravelly rocky stream beds with stable side banks",
    suitableLulc: "Ephemeral and 1st to 2nd order mountain streamlets",
    streamOrder: "1st & 2nd order streams",
    mechanism: "Traps bedload silt, moderates peak velocity, forces water percolation through fracture joints upstream of spring box.",
    unitCostInr: "₹ 35,000 - ₹ 65,000 per structure",
    annualRechargeYield: "2,500 - 5,000 m³ / structure",
    lifespanYears: "8 - 12 years",
    schemes: ["WDC-PMKSY 2.0", "Tribal Sub-Plan"],
    specifications: "Height: 1.0m - 1.5m, base width: 2.0m, trapezoidal profile with dry-stone masonry keyed into banks."
  },
  {
    id: "RS-03",
    name: "Gully Plugging (Gabion & Brushwood)",
    category: "Gully Stabilization",
    suitableSlope: "> 15° active eroding gullies",
    suitableSoil: "Severely eroded colluvial cuts and talus slopes",
    suitableLulc: "Ravines, landslide scars, steep denuded valleys",
    streamOrder: "Gully head cuts",
    mechanism: "Arrests headward erosion, stabilizes unstable scree, detains torrential surges to recharge colluvial aquifer.",
    unitCostInr: "₹ 45,000 - ₹ 90,000 per structure",
    annualRechargeYield: "1,800 - 3,500 m³ / structure",
    lifespanYears: "7 - 10 years",
    schemes: ["CAMPA", "State Disaster Mitigation Fund"],
    specifications: "Galvanized GI wire mesh casing filled with locally collected angular boulders (150-250mm size)."
  },
  {
    id: "RS-04",
    name: "Recharge Basin Pond / Percolation Pit",
    category: "Depression Water Storage",
    suitableSlope: "< 8° valley benches and saddles",
    suitableSoil: "Permeable sandy loam with underlying fractured bedrock",
    suitableLulc: "Village commons, pasture depressions, barren flat benches",
    streamOrder: "Valley depressions / saddle points",
    mechanism: "Stores monsoon surplus in surface depression for gravity-fed percolation into unconfined aquifer.",
    unitCostInr: "₹ 1,20,000 - ₹ 2,50,000 per pond",
    annualRechargeYield: "8,000 - 18,000 m³ / pond",
    lifespanYears: "15 - 20 years",
    schemes: ["Jal Jeevan Mission (Support Fund)", "WDC-PMKSY 2.0"],
    specifications: "Storage depth: 2m, inlet desiltation chamber, overflow spillway, native broadleaved bio-fencing."
  },
  {
    id: "RS-05",
    name: "Subsurface Lineament Infiltration Shaft",
    category: "Hydrogeological Fracture Enhancement",
    suitableSlope: "5° - 20° along fault / joint trace",
    suitableSoil: "Thin skeletal regolith overlying dense jointed rock",
    suitableLulc: "Within 50m of mapped geological lineament / fracture",
    streamOrder: "Lineament intersection zone",
    mechanism: "Bypasses impermeable topsoil layers to inject filtered runoff directly into deep secondary porosity fractures.",
    unitCostInr: "₹ 95,000 - ₹ 1,80,000 per shaft",
    annualRechargeYield: "6,000 - 12,000 m³ / shaft",
    lifespanYears: "15 years",
    schemes: ["Ministry of Tribal Affairs Special Central Assistance"],
    specifications: "Infiltration shaft depth: 4-6m, filled with graded boulder/gravel/sand inverted filter with geotextile wrap."
  }
];

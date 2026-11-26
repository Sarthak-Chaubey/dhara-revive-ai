// patentData.js - LPU Invention Disclosure Annexure 3b Specifications
// Title: AN AI-BASED EXPLAINABLE DECISION-SUPPORT SYSTEM FOR SPRING VULNERABILITY SCORING AND RECHARGE-MEASURE RECOMMENDATION IN TRIBAL AND HILL REGIONS

export const PATENT_METADATA = {
  title: "AN AI-BASED EXPLAINABLE DECISION-SUPPORT SYSTEM FOR SPRING VULNERABILITY SCORING AND RECHARGE-MEASURE RECOMMENDATION IN TRIBAL AND HILL REGIONS",
  filingType: "Complete Specification Filing (Domestic Indian Patent Application)",
  applicant: "Lovely Professional University, Punjab-144411, India",
  applicationDate: "November 2026",
  status: "Invention Disclosure Filed (Annexure 3b)",
  inventors: [
    {
      name: "Sarthak Chaubey",
      regNo: "12312896",
      role: "Lead Inventor & System Architect",
      email: "Sarthakchaubey07@gmail.com",
      mobile: "+91 7759979102",
      institution: "Lovely Professional University"
    },
    {
      name: "Akash Singh",
      regNo: "12313520",
      role: "Co-Inventor & Hydro-GIS Developer",
      email: "akashrathour1512@gmail.com",
      mobile: "+91 8603811886",
      institution: "Lovely Professional University"
    },
    {
      name: "Harsh Khestika",
      regNo: "12317850",
      role: "Co-Inventor & Algorithm Engineer",
      email: "hkhestika@gmail.com",
      mobile: "+91 8005560721",
      institution: "Lovely Professional University"
    },
    {
      name: "Ayush Tiwari",
      regNo: "12319892",
      role: "Co-Inventor & Data Pipeline Engineer",
      email: "Ayushtiwaribr45@gmail.com",
      mobile: "+91 6207491049",
      institution: "Lovely Professional University"
    },
    {
      name: "Shivendra Kumar",
      regNo: "12315959",
      role: "Co-Inventor & UI/UX Developer",
      email: "shivendrak305@gmail.com",
      mobile: "+91 7070877750",
      institution: "Lovely Professional University"
    },
    {
      name: "Vivek Kumar",
      regNo: "12324962",
      role: "Co-Inventor & Model Evaluation Lead",
      email: "Vivekkumar.ch06@gmail.com",
      mobile: "+91 8630829064",
      institution: "Lovely Professional University"
    }
  ],
  keywords: [
    "Spring Revival Planning",
    "Springshed Management",
    "Spring Vulnerability Scoring",
    "Recharge Measure Recommendation",
    "Explainable Decision-Support System",
    "Weighted Multi-Criteria Scoring",
    "Tribal and Hill Water Security",
    "Groundwater Recharge",
    "GIS and Machine Learning"
  ]
};

// Default expert weights as defined in Patent Section D.1 (Step 4):
// Sum = 1.00 (Slope: 0.20, Rainfall: 0.15, NDVI: 0.20, Forest Loss: 0.20, Soil: 0.15, Lineament: 0.10)
export const DEFAULT_PATENT_WEIGHTS = {
  slope: 0.20,
  rainfall: 0.15,
  ndvi: 0.20,
  forestLoss: 0.20,
  soilInfiltration: 0.15,
  lineamentDensity: 0.10,
};

// Prior Art / Research Gap Comparison Table from Patent Section C
export const PRIOR_ART_COMPARISON = [
  {
    patentId: "US20080162047A1",
    abstract: "Discloses a cross-correlation technique to delineate groundwater recharge potential zones in hard rock terrain and to classify them as high, moderate, low or poor recharge zones.",
    researchGap: "Classifies recharge potential of an area from a statistical measure; does not rank individual springs by vulnerability, explain contributing factors or recommend recharge measures.",
    novelty: "Scores each spring on six normalised indicators with adjustable weights, explains the main contributors and links the result to recommended recharge measures."
  },
  {
    patentId: "NL2032713B1",
    abstract: "Describes a regional water resources optimization decision analysis system with monitoring, water-input evaluation and meteorological platforms.",
    researchGap: "Addresses regional water allocation and storage; has no spring-level vulnerability scoring and no recommendation of recharge structures for hill or tribal springsheds.",
    novelty: "Works at individual spring level for hill and tribal springsheds and outputs a ranked list with measure-wise recommendations."
  },
  {
    patentId: "CN104594326B",
    abstract: "Discloses a pressurizing recharge well and method for protecting springs, which is a physical engineering structure for recharging groundwater.",
    researchGap: "A construction device and method; offers no data-driven way to decide which springs to prioritise or where recharge works should be built.",
    novelty: "Software that prioritises springs and recommends where and which recharge measures to build, complementing physical recharge structures."
  },
  {
    patentId: "US9569803B1",
    abstract: "Describes a system and method for conserving water and optimizing land and water use at farm and irrigation-canal level.",
    researchGap: "Targets farm utilisation and irrigation planning; does not address springs, springsheds or tribal and hill habitations.",
    novelty: "Applies recommendation of recharge measures to spring revival, using terrain, vegetation and soil indicators in hill areas."
  },
  {
    patentId: "SpringAI-GIS (GitHub)",
    abstract: "AI-powered GIS decision-support platform for probable spring recharge zones, with machine learning suitability and risk assessment.",
    researchGap: "Does not state a focus on tribal habitations, user-adjustable expert weights or no-installation browser use by non-specialists.",
    novelty: "Differs by tribal-habitation focus, user-adjustable weights and in-browser operation on local data with zero server transmission."
  }
];

// FIG. 3 Exact Rule Engine: Independent evaluation of recharge measures
export function evaluatePatentFig3Rules(spring) {
  const recommendations = [];
  const slope = spring.slopeDeg ?? spring.slope ?? 0;
  const streamDist = spring.streamDistM ?? spring.stream_distance ?? 150;
  const soilInfiltrationNorm = spring.soilInfiltrationNorm ?? (spring.soilInfiltrationMmHr ? spring.soilInfiltrationMmHr / 50 : 0.6);
  const forestLoss = spring.forestLossPct ?? spring.forest_loss ?? 15;

  // Rule 1: Slope below 8 degrees and soil infiltration 0.5 or more?
  if (slope < 8 && soilInfiltrationNorm >= 0.5) {
    recommendations.push({
      measure: "Percolation pit or basin pond",
      ruleId: "Rule 1",
      trigger: `Slope (${slope}°) < 8° AND Soil Infiltration (${soilInfiltrationNorm.toFixed(2)}) ≥ 0.5`,
      category: "Valley Surface Storage",
      desc: "Gentle slope allows water detention without scouring, allowing high-infiltration soil to feed unconfined aquifer."
    });
  }

  // Rule 2: Distance to stream below 300 m and slope 5 to 25 degrees?
  if (streamDist < 300 && slope >= 5 && slope <= 25) {
    recommendations.push({
      measure: "Check dam or gabion structure",
      ruleId: "Rule 2",
      trigger: `Stream Distance (${streamDist}m) < 300m AND Slope (${slope}°) in 5°–25°`,
      category: "Drainage Channel Treatment",
      desc: "Proximity to drainage line enables checking torrent velocity and elevating hydraulic head for bank recharge."
    });
  }

  // Rule 3: Slope 15 to 35 degrees?
  if (slope >= 15 && slope <= 35) {
    recommendations.push({
      measure: "Staggered contour trenches",
      ruleId: "Rule 3",
      trigger: `Slope (${slope}°) in 15°–35° range`,
      category: "Overland Slope Interception",
      desc: "Breaks overland flow path on moderate-to-steep slopes, retarding surface runoff and promoting vadose infiltration."
    });
  }

  // Rule 4: Slope above 35 degrees?
  if (slope > 35) {
    recommendations.push({
      measure: "Gully plugging with vegetative cover",
      ruleId: "Rule 4",
      trigger: `Slope (${slope}°) > 35° (Extreme Gradient)`,
      category: "Erosion & Scree Stabilization",
      desc: "Extreme alpine incline requires mechanical boulder detention and live root bio-engineering to prevent mass wasting."
    });
  }

  // Rule 5: Forest loss above 20 per cent?
  if (forestLoss > 20) {
    recommendations.push({
      measure: "Catchment protection and afforestation",
      ruleId: "Rule 5",
      trigger: `Forest Loss (${forestLoss.toFixed(1)}%) > 20% threshold`,
      category: "Vegetative Cover Restoration",
      desc: "Heavy canopy degradation requires broadleaved tree planting and grazing regulation to restore natural soil sponge."
    });
  }

  // Fallback: When no rule matches
  if (recommendations.length === 0) {
    recommendations.push({
      measure: "Field survey recommended",
      ruleId: "Fallback",
      trigger: "Specific terrain criteria not met by standard automated rules",
      category: "Hydrogeological Site Inspection",
      desc: "Site-specific hydrogeological and tracer evaluation needed by field geologist."
    });
  }

  return recommendations;
}

// Patent Section D.1 (Step 3 & 4): Normalise 6 indicators to 0-1 (1 = worst case)
// and compute weighted average score (0 to 100) with High/Medium/Low classes
export function computePatentSpringScore(spring, weights = DEFAULT_PATENT_WEIGHTS, bounds = null) {
  // Use provided dataset bounds or sensible regional defaults
  const b = bounds || {
    minSlope: 2, maxSlope: 45,
    minRain: 600, maxRain: 1800,
    minNdvi: 0.1, maxNdvi: 0.85,
    minForestLoss: 0, maxForestLoss: 50,
    minSoil: 5, maxSoil: 50,
    minLineament: 0.05, maxLineament: 1.5
  };

  const slope = spring.slopeDeg ?? spring.slope ?? 15;
  const rain = spring.annualRainfallMm ?? spring.rainfall ?? 1100;
  const ndvi = spring.ndvi ?? (0.5 + (spring.ndviChange5Yr || 0));
  const forestLoss = spring.forestLossPct ?? spring.forest_loss ?? 15;
  const soil = spring.soilInfiltrationMmHr ?? spring.soil_infiltration ?? 25;
  const lineament = spring.lineamentDensity ?? spring.lineament_density ?? 0.6;

  // Scale 0 to 1 where 1 is worst case:
  // Higher slope = worse (1)
  const sSlope = Math.max(0, Math.min(1, (slope - b.minSlope) / (b.maxSlope - b.minSlope)));
  // Lower rainfall = worse (1)
  const sRain = Math.max(0, Math.min(1, (b.maxRain - rain) / (b.maxRain - b.minRain)));
  // Lower NDVI = worse (1)
  const sNdvi = Math.max(0, Math.min(1, (b.maxNdvi - ndvi) / (b.maxNdvi - b.minNdvi)));
  // Higher forest loss = worse (1)
  const sForestLoss = Math.max(0, Math.min(1, (forestLoss - b.minForestLoss) / (b.maxForestLoss - b.minForestLoss)));
  // Lower soil infiltration = worse (1)
  const sSoil = Math.max(0, Math.min(1, (b.maxSoil - soil) / (b.maxSoil - b.minSoil)));
  // Lower lineament density = worse (1)
  const sLineament = Math.max(0, Math.min(1, (b.maxLineament - lineament) / (b.maxLineament - b.minLineament)));

  // Normalize weights so they sum to 1.0
  const weightSum = (
    weights.slope +
    weights.rainfall +
    weights.ndvi +
    weights.forestLoss +
    weights.soilInfiltration +
    weights.lineamentDensity
  ) || 1.0;

  const wSlope = weights.slope / weightSum;
  const wRain = weights.rainfall / weightSum;
  const wNdvi = weights.ndvi / weightSum;
  const wForestLoss = weights.forestLoss / weightSum;
  const wSoil = weights.soilInfiltration / weightSum;
  const wLineament = weights.lineamentDensity / weightSum;

  // Weighted contributions
  const contributions = [
    { name: "Slope Steepness", val: `${slope.toFixed(1)}°`, rawVal: slope, weightedContr: wSlope * sSlope, weightPct: wSlope * 100, unit: "degrees" },
    { name: "Rainfall Deficit", val: `${Math.round(rain)} mm`, rawVal: rain, weightedContr: wRain * sRain, weightPct: wRain * 100, unit: "mm/yr" },
    { name: "Vegetation Loss (NDVI)", val: ndvi.toFixed(2), rawVal: ndvi, weightedContr: wNdvi * sNdvi, weightPct: wNdvi * 100, unit: "NDVI" },
    { name: "Forest Canopy Loss", val: `${forestLoss.toFixed(1)}%`, rawVal: forestLoss, weightedContr: wForestLoss * sForestLoss, weightPct: wForestLoss * 100, unit: "% loss" },
    { name: "Low Soil Infiltration", val: `${soil.toFixed(1)} mm/hr`, rawVal: soil, weightedContr: wSoil * sSoil, weightPct: wSoil * 100, unit: "mm/hr" },
    { name: "Low Lineament Density", val: `${lineament.toFixed(2)} km/km²`, rawVal: lineament, weightedContr: wLineament * sLineament, weightPct: wLineament * 100, unit: "km/km²" },
  ];

  // Overall 0-100 Score
  const rawSum = contributions.reduce((acc, c) => acc + c.weightedContr, 0);
  const score = Math.round(rawSum * 100);

  // Risk Class based on Patent Thresholds (High > 66, Medium 33-66, Low < 33)
  let riskClass = "Low";
  if (score > 66) riskClass = "High";
  else if (score >= 33) riskClass = "Medium";

  // Step 5: Identify Top 3 contributing indicators
  const sortedContributors = [...contributions].sort((a, b) => b.weightedContr - a.weightedContr);
  const topThreeFactors = sortedContributors.slice(0, 3);

  // Step 6: Evaluate FIG. 3 Rules
  const recommendedMeasures = evaluatePatentFig3Rules(spring);

  return {
    score,
    riskClass,
    scaledIndicators: {
      slope: sSlope,
      rainfall: sRain,
      ndvi: sNdvi,
      forestLoss: sForestLoss,
      soilInfiltration: sSoil,
      lineamentDensity: sLineament,
    },
    contributions,
    topThreeFactors,
    recommendedMeasures
  };
}

// Sample CSV Template Generator
export function getSampleCsvTemplate() {
  return `id,name,latitude,longitude,elevation,slope,rainfall,ndvi,forest_loss,soil_infiltration,lineament_density,stream_distance,village,block
SP-DEMO-01,Nagani Dev Chashma,33.0882,76.5413,2590,28.4,980,0.28,32.5,18.5,0.45,140,Killar,Pangi
SP-DEMO-02,Sach Alpine Streamlet,33.0312,76.4912,2420,24.1,1050,0.32,27.0,22.0,0.65,220,Sach,Pangi
SP-DEMO-03,Kugti Upper Mool,32.4215,76.7118,2780,36.2,920,0.21,38.0,14.2,0.30,410,Kugti,Bharmour
SP-DEMO-04,Hudan Valley Fountain,33.1524,76.5832,3100,21.0,890,0.35,22.5,26.0,0.85,180,Hudan,Pangi
SP-DEMO-05,Garola Terrace Spring,32.4921,76.6214,1980,18.5,1180,0.41,19.0,31.0,0.95,95,Garola,Bharmour
SP-DEMO-06,Salooni Khad Baori,32.7214,76.0418,1720,7.2,1350,0.56,11.0,38.0,1.20,150,Salooni,Salooni
SP-DEMO-07,Chowari Sacred Spring,32.4285,76.0125,1540,6.5,1480,0.65,5.0,45.0,1.40,80,Chowari,Chowari`;
}

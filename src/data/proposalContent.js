// proposalContent.js - Academic Proposal Details (SIH26240)
// Authored by Sarthak Chaubey (Reg No: 12312896 | Section: K4C0488)

export const PROPOSAL_DETAILS = {
  title: "AI-Based Spring Revival and Recharge Planning for Tribal Areas",
  documentType: "Final Year Capstone Project Proposal",
  hackathon: "Smart India Hackathon 2026",
  problemStatementCode: "SIH26240",
  ministry: "Ministry of Tribal Affairs",
  category: "Software",
  theme: "Agriculture, FoodTech and Rural Development",
  author: {
    name: "Sarthak Chaubey",
    regNo: "12312896",
    section: "K4C0488",
    researchArea: "Artificial Intelligence / Machine Learning with GIS and Hydrogeology",
    natureOfWork: "Application / Software Development",
  },
  abstract: `Natural springs supply drinking and domestic water to a large share of hill and tribal communities in India, and many of them are drying up or have become seasonal. Existing practice relies on field hydrogeology, isotope studies and multi-criteria GIS analysis, while recent research has started to apply machine learning to spring occurrence mapping and discharge forecasting. These strands are rarely joined into one decision-support workflow. This project proposes an AI-based system that (a) scores the vulnerability of springs, (b) delineates and ranks likely recharge zones, and (c) recommends suitable recharge structures (such as check dams, contour trenches and gully plugging) for tribal habitations, with explainable outputs and a map dashboard.`,
  
  problemStatement: `Tribal and hill habitations depend heavily on natural springs, yet a large proportion of these springs are declining in discharge or drying up because of climate variability, deforestation and land-use change. Planners at district and block level must decide which springs to prioritise and which recharge interventions to build, but they currently lack a scalable, data-driven tool. Existing approaches are either expert-intensive (AHP, isotope and field surveys) or limited to predicting spring occurrence or discharge without turning predictions into actionable plans.

Problem to solve: design and develop an AI-based decision-support system that, for a given tribal region, estimates the vulnerability of its springs, identifies and ranks likely recharge zones, and recommends appropriate recharge structures, in a form that officials of the Ministry of Tribal Affairs and watershed agencies can use and audit.`,

  objectives: [
    { code: "O1", title: "Geospatial Feature Database", desc: "Assemble a geospatial feature database (terrain, rainfall, land use, vegetation, soil, geology) for a selected tribal or hilly study region, together with the best available spring inventory." },
    { code: "O2", title: "ML Models & AHP Baseline Comparison", desc: "Build and compare machine learning models that estimate spring vulnerability and springshed or recharge-zone suitability, benchmarked against an AHP-based baseline." },
    { code: "O3", title: "Explainable AI (SHAP)", desc: "Provide explainable outputs that show which factors drive each spring's risk score." },
    { code: "O4", title: "Rule-Based Recommender Engine", desc: "Develop a rule-based recommender that maps recharge-zone terrain and land-use conditions to suitable recharge structures (check dams, contour trenches, gully plugging, basin ponds)." },
    { code: "O5", title: "Interactive GIS Web Dashboard", desc: "Deliver a web dashboard that ranks springs for intervention and visualises zones on an interactive map." },
    { code: "O6", title: "Spatially Aware Validation", desc: "Evaluate the system with defined metrics, using spatially aware validation, and document its limitations and data needs." },
  ],

  researchQuestions: [
    { qId: "RQ1", q: "Which terrain, climate, vegetation, soil and geology variables best predict spring vulnerability and recharge-zone suitability in the study region?" },
    { qId: "RQ2", q: "Do machine learning models (random forest, gradient boosting) outperform an AHP multi-criteria baseline, and by how much, under spatially blocked validation?" },
    { qId: "RQ3", q: "Can explainability methods give consistent, hydrologically sensible reasons for each spring's risk score, as judged against published domain knowledge?" },
    { qId: "RQ4", q: "Can a transparent rule-based recommender produce recharge-structure suggestions that agree with expert or documented practice?" },
    { qId: "RQ5", q: "How sensitive are results to scarce or noisy spring-inventory labels, and what minimum data does the approach need to be usable?" },
  ],

  literatureSummary: [
    {
      theme: "Problem scale and policy",
      representativeWork: "NITI Aayog working group; DoLR; IWMI resource book [6, 7, 8, 16]",
      whatItContributes: "Defines the crisis, the springshed concept and national programme",
      limitation: "Policy and guidelines, no predictive tooling"
    },
    {
      theme: "Recharge-zone delineation",
      representativeWork: "AHP with isotopes [3]; geospatial-geophysical studies [13]",
      whatItContributes: "Credible site selection and structure suitability",
      limitation: "Expert weights, field intensive, hard to scale"
    },
    {
      theme: "Spring occurrence mapping (ML)",
      representativeWork: "Ensemble springshed potential mapping, Kishtwar [1]",
      whatItContributes: "Shows terrain, rainfall and soil predict springs",
      limitation: "Small sample (42 springs), one region, maps potential only"
    },
    {
      theme: "Discharge prediction (ML/DL)",
      representativeWork: "[2], [4], [5], [10], [15]",
      whatItContributes: "Forecasts flow or high-flow state from climate and water quality",
      limitation: "Predicts flow, does not recommend interventions"
    }
  ],

  researchGap: [
    { title: "Fragmented workflow", text: "Occurrence mapping, discharge prediction, and recharge-site selection are published as separate studies. No reviewed work joins vulnerability scoring, recharge-zone ranking, and structure recommendation in one decision-support pipeline." },
    { title: "Prediction without prescription", text: "Existing machine learning studies predict where springs occur or how much they flow, but do not output which intervention to build and where." },
    { title: "Scale and data limits", text: "AHP and isotope methods are field intensive, and ML studies rely on small labelled samples from single regions." },
    { title: "Tribal-area focus", text: "The literature is largely framed for Himalayan states in general. The Ministry of Tribal Affairs context, with habitation-level planning, is rarely addressed explicitly." },
    { title: "Explainability and audit", text: "Public-sector use needs transparent reasons for each recommendation, which reviewed ML studies do not centre." },
    { title: "SIH26240 Opportunity", text: "Builds the first explainable, end-to-end decision-support prototype tailored specifically to tribal habitation springsheds." }
  ],

  references: [
    { id: 1, text: "Integrating machine learning models to map springshed potential zones using key environmental variables in high-altitude Himalayan terrain. Environmental Monitoring and Assessment (Springer). doi:10.1007/s10661-026-15465-0" },
    { id: 2, text: "Mukherjee, S., Sen, S., and Kumar, K. (2023). Multifactor prediction of the central Himalayan spring high-flows using machine learning classifiers. Environmental Earth Sciences, 82(3), 85. doi:10.1007/s12665-023-10775-9" },
    { id: 3, text: "Identification of potential spring recharge areas in the Himalayan catchment using the AHP model and stable water isotopes. Journal of Earth System Science (Springer). doi:10.1007/s12040-025-02541-1" },
    { id: 4, text: "Data-driven assessment of climate change and deforestation impacts on spring discharge in Darjeeling, Eastern Himalayas. Springer. doi:10.1007/s40899-026-01387-9" },
    { id: 5, text: "Hydrological Functioning and Water Availability in a Himalayan Karst Basin under Climate Change. Sustainability, 15(11), 8666. doi:10.3390/su15118666" },
    { id: 6, text: "Rathod, R., Kumar, M., Mukherji, A., Sikka, A., Satapathy, K. K., Mishra, A., Goel, S., and Khan, M. (2021). Resource book on springshed management in the Indian Himalayan Region: guidelines for policy makers and development practitioners. IWMI, NITI Aayog and SDC, New Delhi." },
    { id: 7, text: "NITI Aayog (2018). Report of Working Group I: Inventory and Revival of Springs in the Himalayas for Water Security. Government of India." },
    { id: 8, text: "Department of Land Resources, Government of India. Springshed management (WDC-PMKSY 2.0). dolr.gov.in/springshed" },
    { id: 9, text: "Scaling up Spring Revival in the Himalaya: Graduating from Spring-Centric to Aquifer-Centric Nature-Based Solutions. ResearchGate publication 342743839." },
    { id: 10, text: "Granata, F., Saroli, M., de Marinis, G., and Gargano, R. (2018). Machine learning models for spring discharge forecasting. Geofluids, 2018, 8328167." },
    { id: 11, text: "Tambe, S., Kharel, G., Arrawatia, M. L., Kulkarni, H., Mahamuni, K., and Ganeriwala, A. K. (2012). Reviving dying springs: climate change adaptation experiments from the Sikkim Himalaya. Mountain Research and Development, 32, 62-72." },
    { id: 12, text: "Negi, G. C. S., and Pant, D. (2025). Springs of Uttarakhand Mountains: A State of Knowledge Review with Focus on Rejuvenation of Drying Springs. International Journal of Ecology and Environmental Sciences, 51(6), 599-620." },
    { id: 13, text: "Bagchi, D., Kannaujiya, S., Champati Ray, P. K., Taloor, A. K., and Sarkar, T. (2021). A study on spring rejuvenation and springshed characterization in Mussoorie, Garhwal Himalaya using an integrated geospatial-geophysical approach. Remote Sensing Applications: Society and Environment, 23, 100588." },
    { id: 14, text: "Kumar, V., and Paramanik, S. (2020). Application of high-frequency spring discharge data: A case study of Mathamali spring rejuvenation in the Garhwal Himalaya. Water Supply, 20, 3380-3392. doi:10.2166/ws.2020.223" },
    { id: 15, text: "Rawat, S. S., Mathur, S., Sharma, H. C., and Singh, P. K. (2019). Modelling of spring flow using artificial neural network. Journal of Indian Water Resources Society, 39(3), 10-17." },
    { id: 16, text: "Down To Earth. Crisis in the Himalayas: Nearly 50% perennial springs in the region have dried up (reporting on the NITI Aayog working group). downtoearth.org.in" }
  ]
};

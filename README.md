# 💧 DharaRevive AI &bull; Spring Revival & Recharge Planning Decision-Support System

[![Patent Status](https://img.shields.io/badge/Patent-Complete%20Filing%20(Annexure%203b)-amber.svg)](file:///c:/Users/sarth/OneDrive/Desktop/capstone)
[![Hackathon](https://img.shields.io/badge/SIH%202026-SIH26240%20(MoTA)-emerald.svg)](https://tribal.gov.in)
[![Institution](https://img.shields.io/badge/Applicant-Lovely%20Professional%20University-blue.svg)](https://lpu.in)

> **Official Patent Title**: *AN AI-BASED EXPLAINABLE DECISION-SUPPORT SYSTEM FOR SPRING VULNERABILITY SCORING AND RECHARGE-MEASURE RECOMMENDATION IN TRIBAL AND HILL REGIONS*  
> **Source Problem**: Smart India Hackathon 2026 (Problem Statement: **SIH26240** &bull; Ministry of Tribal Affairs)  
> **Filing Type**: Complete Specification Filing (Domestic Indian Patent Application)  
> **Applicant/Assignee**: Lovely Professional University, Punjab-144411, India  

---

## 👥 Inventors & Research Team (LPU)

| S.No. | Inventor Name | UID / Reg. No. | Role / Domain | Contact |
| :---: | :--- | :---: | :--- | :--- |
| **1** | **Sarthak Chaubey** | `12312896` | **Lead Inventor** & System Architect | sarthakchaubey07@gmail.com |
| **2** | **Akash Singh** | `12313520` | **Co-Inventor** & Hydro-GIS Developer | akashrathour1512@gmail.com |
| **3** | **Harsh Khestika** | `12317850` | **Co-Inventor** & Algorithm Engineer | hkhestika@gmail.com |
| **4** | **Ayush Tiwari** | `12319892` | **Co-Inventor** & Data Pipeline Engineer | ayushtiwaribr45@gmail.com |
| **5** | **Shivendra Kumar** | `12315959` | **Co-Inventor** & UI/UX Developer | shivendrak305@gmail.com |
| **6** | **Vivek Kumar** | `12324962` | **Co-Inventor** & Model Evaluation Lead | vivekkumar.ch06@gmail.com |

---

## 🚀 Key Patent Innovations & System Architecture

### 1. ⚖️ Deterministic Scoring Engine (FIG. 1 & FIG. 2)
Normalises six geospatial indicators ($0$ to $1$, where $1$ is worst case) with user-adjustable expert weights:
* **Slope Steepness** ($w = 0.20$): Steeper gradients accelerate overland flow runoff.
* **Rainfall Deficit** ($w = 0.15$): Precipitation departures from long-term normal.
* **Vegetation Cover (NDVI)** ($w = 0.20$): Canopy interception and soil moisture proxy.
* **Forest Loss %** ($w = 0.20$): Rate of upper catchment deforestation.
* **Soil Infiltration Capacity** ($w = 0.15$): Vertical hydraulic conductivity into the vadose zone.
* **Lineament Density** ($w = 0.10$): Secondary porosity tectonic fracture connectivity.

$$\text{Score} = \left(\sum_{i=1}^6 w_i \times I_i^{\text{scaled}}\right) \times 100$$

* **High Risk**: Score $> 66$
* **Medium Risk**: Score $33 - 66$
* **Low Risk**: Score $< 33$

### 2. 🔍 Top-3 Factor Explainability (FIG. 1, Item 60)
Every spring score is decomposed into the **three largest weighted contributors** along with real measured values, ensuring complete transparency for district collectors and tribal development officers.

### 3. 🏗️ Multi-Measure Recharge Rule Engine (FIG. 3)
Evaluates five independent deterministic hydrogeological rules simultaneously:
* **Rule 1**: $\text{Slope} < 8^\circ$ & $\text{Soil} \ge 0.5 \implies$ **Percolation pit or basin pond**
* **Rule 2**: $\text{Stream Dist} < 300\text{m}$ & $\text{Slope } 5^\circ-25^\circ \implies$ **Check dam or gabion structure**
* **Rule 3**: $\text{Slope } 15^\circ-35^\circ \implies$ **Staggered contour trenches**
* **Rule 4**: $\text{Slope} > 35^\circ \implies$ **Gully plugging with vegetative cover**
* **Rule 5**: $\text{Forest Loss} > 20\% \implies$ **Catchment protection and afforestation**
* *Fallback*: If no rule triggers $\implies$ **Field survey recommended**

### 4. 🔒 Client-Side Local-Only Privacy (FIG. 1, Item 20 & 30)
Enables local CSV upload and parsing directly in the user's browser. Sensitive community water resource data is **never transmitted to external servers**.

---

## 💻 Tech Stack

* **Frontend**: React 19, Vite 8, Tailwind CSS v4, Leaflet GIS, Lucide Icons
* **Backend**: Python 3.12, FastAPI, Uvicorn, Pydantic, Scikit-Learn
* **Geospatial & ML**: SRTM DEM, CHIRPS, Sentinel-2 NDVI, SHAP TreeExplainer, Spatial Block Cross-Validation

---

## 🛠️ Quick Setup for Collaborators

### 1. Clone the Repository
```bash
git clone <YOUR-GITHUB-REPO-URL>
cd capstone
```

### 2. Run Frontend
```bash
npm install
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

### 3. Run Backend (FastAPI)
```bash
pip install -r backend/requirements.txt
cd backend
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
Interactive Swagger API docs available at: **[http://localhost:8000/docs](http://localhost:8000/docs)**

---

## 🔄 1-Click Auto Sync & Push (For Team Members)

Whenever you make changes, simply run:

```bash
# Windows Command Prompt
push.bat "Your commit message here"

# Or PowerShell
.\push.ps1 "Your commit message here"
```

The script automatically pulls your teammates' latest updates first to prevent conflicts, commits your files, and pushes to GitHub!

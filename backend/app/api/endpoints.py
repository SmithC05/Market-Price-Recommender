from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict

# Import New Modules
from app.core.market_intelligence import MarketIntelligence # Module A
from app.core.msp_intelligence import MSPIntelligence # Module B
from app.core.decision_engine import DecisionEngine # Module C
from app.core.weather_context import WeatherContext # Module D
from app.core.crop_context import CropContext # Module E
from app.core.risk_scoring import RiskScoring # Module F
from app.core.data_loader import load_msp_data
import os

router = APIRouter()

# --- Initialize Modules ---
mod_a = MarketIntelligence()
mod_b = MSPIntelligence()
mod_c = DecisionEngine()
mod_d = WeatherContext()
mod_e = CropContext()
mod_f = RiskScoring()

msp_df = load_msp_data()

# Initialize ML
if os.path.exists("data"):
    mod_a.train()
else:
    print("WARNING: 'data/' directory not found.")

# --- Schemas ---
class PredictionRequest(BaseModel):
    mandi: str
    crop: str
    days: int = 15

class RecommendationRequest(BaseModel):
    mandi: str
    crop: str
    # weather: str  <-- Removed, now inferred from Mandi location

# --- Endpoints ---

@router.post("/predict")
def predict_prices(req: PredictionRequest):
    try:
        # Module A: Intelligence
        predictions, trend = mod_a.predict_price_and_trend(req.mandi, req.crop, req.days)
        
        # Convert to serializable format (already dicts)
        return {
            "mandi": req.mandi, 
            "trend": trend,
            "predictions": predictions
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/recommend")
def get_recommendation(req: RecommendationRequest):
    try:
        # 1. Module A: Predict Price (Next 7 Day Max)
        preds, trend = mod_a.predict_price_and_trend(req.mandi, req.crop, 7)
        curr_price = float(preds[0]['predicted_price'])
        future_max = float(max(p['predicted_price'] for p in preds))
        
        # 2. Get MSP (Logic Helper)
        msp_match = msp_df[(msp_df['crop'] == req.crop) & (msp_df['year'] == 2025)]
        msp_val = float(msp_match['msp_price'].values[0]) if not msp_match.empty else 0.0
        
        # 3. Module B: MSP Intelligence
        msp_status, gap_percent = mod_b.compare_price(curr_price, msp_val)
        
        # 4. Module D: Weather Context (Now gets LIVE data for the Mandi)
        weather_analysis = mod_d.get_risk_analysis(req.mandi)
        risk_level = weather_analysis['risk_level']
        
        # 5. Module E: Crop Context
        crop_note = mod_e.get_sensitivity(req.crop)
        
        # 6. Module F: Risk & Confidence
        confidence_score, risk_label = mod_f.calculate_score(risk_level, 10.0)
        
        # 7. Module C: Decision Engine
        action, reason = mod_c.make_decision(
            curr_price, future_max, msp_status, gap_percent, risk_level
        )
        
        return {
            "action": action,
            "reason": reason,
            "metrics": {
                "current_price": curr_price,
                "msp": msp_val,
                "trend": trend,
                "gap_percent": f"{gap_percent}%",
                "weather_risk": risk_level,
                "weather_detail": f"{weather_analysis['condition']}, {weather_analysis['temp']}°C", # New field
                "confidence_score": confidence_score,
                "context_note": crop_note
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/msp")
def get_msp(crop: str = "Paddy"):
    match = msp_df[(msp_df['crop'] == crop) & (msp_df['year'] == 2025)]
    if match.empty:
        return {"crop": crop, "year": 2025, "price": 0.0, "note": "Not found"}

# --- Lifecycle Endpoints ---

from app.core.agmarknet_service import AgmarknetService

# Initialize Agmarknet Service
agmarknet = AgmarknetService()

@router.get("/plan")
def plan_sowing(mandi: str):
    """
    Stage 1: Before Sowing.
    Returns market trends ordered by profitability for the mandi (using real/synthetic data).
    """
    # Normalize mandi name
    legacy_map = {
        "Chennai": "Koyambedu",
        "Coimbatore": "Coimbatore",
        "Madurai": "Madurai"
    }
    normalized_mandi = legacy_map.get(mandi, mandi)
    
    # Get profitability ranking from Agmarknet (or synthetic fallback)
    top_crop_names = agmarknet.get_crop_profitability_ranking(normalized_mandi)
    
    # Get full crop data for top crops
    top_crops = []
    for crop_name in top_crop_names[:6]:  # Top 6
        crop_data = next((c for c in CROP_DATABASE if c["name"] == crop_name), None)
        if crop_data:
            top_crops.append(crop_data)
    
    # Generate trend data (static for demo)
    trend_map = {
        "Tomato": {"demand": "High", "trend": "Rising 📈", "reason": "Urban demand surge in Chennai metro."},
        "Turmeric": {"demand": "High", "trend": "Rising 📈", "reason": "Export demand increasing."},
        "Cotton": {"demand": "High", "trend": "Rising 📈", "reason": "Textile sector demand."},
        "Paddy": {"demand": "Stable", "trend": "Flat ➡️", "reason": "Steady local consumption."},
        "Coconut": {"demand": "Moderate", "trend": "Stable ➡️", "reason": "Consistent year-round demand."},
        "Banana": {"demand": "High", "trend": "Stable ➡️", "reason": "Festival and export demand."},
        "Chilli": {"demand": "High", "trend": "Rising 📈", "reason": "Spice export premium."},
    }
    
    trends = []
    for crop_data in top_crops:
        crop_name = crop_data["name"]
        info = trend_map.get(crop_name, {"demand": "Moderate", "trend": "Stable ➡️", "reason": "Local market demand."})
        trends.append({
            "crop": crop_name,
            "icon": crop_data["icon"],
            "demand": info["demand"],
            "trend": info["trend"],
            "reason": info["reason"]
        })
    
    return {"mandi": mandi, "recommendations": trends, "recommended_crop_names": [t["crop"] for t in trends]}

@router.get("/grow")
def monitor_growth(mandi: str, crop: str):
    """
    Stage 2: During Season.
    Returns live weather risk for the growing crop.
    """
    # Use existing modules
    weather_analysis = mod_d.get_risk_analysis(mandi)
    crop_note = mod_e.get_sensitivity(crop)
    

# --- Geolocation Endpoints ---

from app.core.geo_utils import calculate_distance

# Expanded Chennai-area Mandis + TN Major Markets
MANDI_LOCATIONS = {
    # Chennai Metro Area
    "Koyambedu": {"lat": 13.0674, "lon": 80.1946, "district": "Chennai"},
    "Tambaram": {"lat": 12.9229, "lon": 80.1275, "district": "Chennai"},
    "Kancheepuram": {"lat": 12.8342, "lon": 79.7036, "district": "Kanchipuram"},
    "Tiruvallur": {"lat": 13.1435, "lon": 79.9098, "district": "Tiruvallur"},
    # Major TN Markets
    "Coimbatore": {"lat": 11.0168, "lon": 76.9558, "district": "Coimbatore"},
    "Madurai": {"lat": 9.9252, "lon": 78.1198, "district": "Madurai"},
    "Trichy": {"lat": 10.7905, "lon": 78.7047, "district": "Trichy"},
    "Dindigul": {"lat": 10.3673, "lon": 77.9803, "district": "Dindigul"},
}

# Comprehensive TN Crop Database
CROP_DATABASE = [
    {"name": "Paddy", "kharif": True, "rabi": True, "icon": "🍚"},
    {"name": "Turmeric", "kharif": True, "rabi": False, "icon": "🟡"},
    {"name": "Coconut", "kharif": False, "rabi": False, "icon": "🥥"},
    {"name": "Banana", "kharif": False, "rabi": False, "icon": "🍌"},
    {"name": "Sugarcane", "kharif": True, "rabi": True, "icon": "🎋"},
    {"name": "Cotton", "kharif": True, "rabi": False, "icon": "🌸"},
    {"name": "Groundnut", "kharif": True, "rabi": True, "icon": "🥜"},
    {"name": "Onion", "kharif": True, "rabi": True, "icon": "🧅"},
    {"name": "Tomato", "kharif": True, "rabi": True, "icon": "🍅"},
    {"name": "Maize", "kharif": True, "rabi": True, "icon": "🌽"},
    {"name": "Chilli", "kharif": True, "rabi": False, "icon": "🌶️"},
    {"name": "Tapioca", "kharif": False, "rabi": False, "icon": "🥔"},
]

@router.get("/mandis/nearby")
def find_nearby_mandis(lat: float, lon: float):
    """
    Returns sorted list of Mandis based on distance from user.
    """
    results = []
    for name, coords in MANDI_LOCATIONS.items():
        dist = calculate_distance(lat, lon, coords["lat"], coords["lon"])
        results.append({"name": name, "distance_km": dist})
    
    # Sort by distance
    results.sort(key=lambda x: x["distance_km"])
    return results

@router.get("/crops/recommended")
def get_recommended_crops(mandi: str):
    """
    Returns crops sorted by historical profitability for the given mandi.
    For now, uses static ranking per district.
    """
    # Handle legacy mandi names (map to new granular names)
    legacy_map = {
        "Chennai": "Koyambedu",
        "Coimbatore": "Coimbatore",
        "Madurai": "Madurai",
        "Trichy": "Trichy",
        "Dindigul": "Dindigul"
    }
    normalized_mandi = legacy_map.get(mandi, mandi)
    
    mandi_info = MANDI_LOCATIONS.get(normalized_mandi)
    if not mandi_info:
        # Fallback: return all crops in default order
        return [{"name": c["name"], "icon": c["icon"]} for c in CROP_DATABASE]
    
    district = mandi_info.get("district", "Chennai")
    
    # Static profitability rankings (in a real app, query DB)
    rankings = {
        "Chennai": ["Tomato", "Onion", "Banana", "Coconut", "Paddy", "Turmeric", "Groundnut", "Maize", "Chilli", "Cotton", "Sugarcane", "Tapioca"],
        "Coimbatore": ["Cotton", "Turmeric", "Coconut", "Banana", "Groundnut", "Paddy", "Onion", "Tomato", "Maize", "Chilli", "Sugarcane", "Tapioca"],
        "Madurai": ["Chilli", "Cotton", "Groundnut", "Paddy", "Turmeric", "Onion", "Tomato", "Maize", "Banana", "Coconut", "Sugarcane", "Tapioca"],
    }
    
    order = rankings.get(district, rankings["Chennai"])
    # Sort CROP_DATABASE based on order
    sorted_crops = sorted(CROP_DATABASE, key=lambda c: order.index(c["name"]) if c["name"] in order else 999)
    return [{"name": c["name"], "icon": c["icon"]} for c in sorted_crops]


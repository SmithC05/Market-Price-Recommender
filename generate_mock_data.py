import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random
import os

# Configuration
CROPS = ["Paddy", "Turmeric", "Coconut", "Banana"]
MANDIS = ["Chennai", "Coimbatore", "Madurai", "Trichy", "Dindigul"]
START_DATE = datetime(2023, 1, 1)
END_DATE = datetime(2025, 12, 31)
DAYS = (END_DATE - START_DATE).days + 1

# Base prices for crops (Approx INR)
CROP_PRICES = {
    "Paddy": 2200,      # per Quintal
    "Turmeric": 7000,   # per Quintal
    "Coconut": 2500,    # per 1000 nuts (scaled to quintal equiv for simplicity or keeping as unit) - Let's assume per Quintal for uniformity in ML
    "Banana": 1500      # per Quintal
}

def generate_market_data():
    """Generates synthetic daily market prices with seasonality and trends."""
    data = []
    
    for crop in CROPS:
        base_crop_price = CROP_PRICES[crop]
        
        for mandi in MANDIS:
            # Mandi variance
            mandi_factor = random.uniform(0.95, 1.05)
            base_price = base_crop_price * mandi_factor
            
            for i in range(DAYS):
                date = START_DATE + timedelta(days=i)
                
                # Seasonality (Simple Logic)
                month_factor = 1.0
                if crop == "Paddy" and date.month in [1, 2]: # Harvest
                    month_factor = 0.90
                elif crop == "Turmeric" and date.month in [2, 3]: # Harvest
                    month_factor = 0.85
                
                # Random daily fluctuation
                noise = np.random.normal(0, base_price * 0.02)
                
                # Long term trend (inflation)
                trend = i * (base_price * 0.0001)
                
                price = (base_price * month_factor) + trend + noise
                
                data.append({
                    "date": date.strftime("%Y-%m-%d"),
                    "mandi": mandi,
                    "crop": crop,
                    "price": round(price, 2),
                    "arrival_volume_tonnes": round(random.uniform(10, 100), 1)
                })
            
    df = pd.DataFrame(data)
    # Save to backend/data directly as well if exists
    if os.path.exists("backend/data"):
        df.to_csv("backend/data/market_prices.csv", index=False)
    else:
        df.to_csv("data/market_prices.csv", index=False)
    print("Generated market_prices.csv")

def generate_msp_data():
    """Generates yearly MSP data."""
    data = []
    crops_base = {
        "Paddy": [2183, 2300, 2400],
        "Turmeric": [6000, 6500, 7000], # Not strictly MSP, but market support proxy
        "Coconut": [2800, 3000, 3200],
        "Banana": [1200, 1300, 1400]
    }
    
    for crop, prices in crops_base.items():
        for i, year in enumerate([2023, 2024, 2025]):
            data.append({"year": year, "crop": crop, "msp_price": prices[i]})
            
    df = pd.DataFrame(data)
    if os.path.exists("backend/data"):
        df.to_csv("backend/data/msp_data.csv", index=False)
    else:
        df.to_csv("data/msp_data.csv", index=False)
    print("Generated msp_data.csv")

def generate_weather_risk_rules():
    """Generates rule-based mapping for weather risks."""
    # Same rules apply generally
    data = [
        {"condition": "Sunny", "risk_level": "Low", "advice": "Good for drying and selling."},
        {"condition": "Cloudy", "risk_level": "Medium", "advice": "Monitor moisture levels."},
        {"condition": "Rainy", "risk_level": "High", "advice": "Delay harvest/selling. High moisture risk."},
        {"condition": "Storm", "risk_level": "Critical", "advice": "Protect stock immediately. Do not transport."},
    ]
    df = pd.DataFrame(data)
    if os.path.exists("backend/data"):
        df.to_csv("backend/data/weather_risk.csv", index=False)
    else:
        df.to_csv("data/weather_risk.csv", index=False)
    print("Generated weather_risk.csv")

if __name__ == "__main__":
    generate_market_data()
    generate_msp_data()
    generate_weather_risk_rules()

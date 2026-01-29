import pandas as pd
import os

def load_market_data(filepath="data/market_prices.csv"):
    """Loads market price data."""
    # Check if we are in backend root or project root
    if not os.path.exists("data") and os.path.exists("../data"):
         # We are in src/ or similar
         filepath = "../data/market_prices.csv"
    elif os.path.exists("backend/data"):
        filepath = "backend/data/market_prices.csv"
        
    if not os.path.exists(filepath):
        # Fallback for when running from backend/app/core
        filepath = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "data", "market_prices.csv")
        
    df = pd.read_csv(filepath)
    df['date'] = pd.to_datetime(df['date'])
    return df

def load_msp_data(filepath="data/msp_data.csv"):
    """Loads MSP data."""
    if not os.path.exists(filepath):
         filepath = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "data", "msp_data.csv")
    return pd.read_csv(filepath)

def load_weather_risk_data(filepath="data/weather_risk.csv"):
    """Loads weather risk rules."""
    if not os.path.exists(filepath):
         filepath = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "data", "weather_risk.csv")
    return pd.read_csv(filepath)

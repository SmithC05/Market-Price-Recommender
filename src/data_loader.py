import pandas as pd
import os

def load_market_data(filepath="data/market_prices.csv"):
    """Loads market price data."""
    if not os.path.exists(filepath):
        raise FileNotFoundError(f"{filepath} not found.")
    df = pd.read_csv(filepath)
    df['date'] = pd.to_datetime(df['date'])
    return df

def load_msp_data(filepath="data/msp_data.csv"):
    """Loads MSP data."""
    if not os.path.exists(filepath):
        raise FileNotFoundError(f"{filepath} not found.")
    return pd.read_csv(filepath)

def load_weather_risk_data(filepath="data/weather_risk.csv"):
    """Loads weather risk rules."""
    if not os.path.exists(filepath):
        raise FileNotFoundError(f"{filepath} not found.")
    return pd.read_csv(filepath)

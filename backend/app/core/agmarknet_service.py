import requests
from datetime import datetime, timedelta
import json
import os

class AgmarknetService:
    """
    Fetches real mandi price data from data.gov.in (Agmarknet).
    
    NOTE: For demo purposes, this includes a fallback mechanism.
    If API call fails (rate limit, key issue), it returns synthetic data.
    """
    
    def __init__(self):
        # You can get a free API key from https://data.gov.in
        # For now, we'll use a demo mode with fallback data
        self.api_key = os.getenv("DATA_GOV_IN_API_KEY", "demo")
        self.base_url = "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070"
        self.cache = {}  # Simple in-memory cache
        self.cache_duration = 3600  # 1 hour
        
    def get_mandi_price(self, state="Tamil Nadu", market="Koyambedu", commodity="Paddy"):
        """
        Fetch current price for a specific commodity at a mandi.
        Returns: float (modal price in Rs/Quintal) or None
        """
        cache_key = f"{state}_{market}_{commodity}"
        
        # Check cache first
        if cache_key in self.cache:
            cached_time, cached_value = self.cache[cache_key]
            if (datetime.now() - cached_time).seconds < self.cache_duration:
                return cached_value
        
        # Try real API if key is not 'demo'
        if self.api_key != "demo":
            try:
                params = {
                    "api-key": self.api_key,
                    "format": "json",
                    "filters[state]": state,
                    "filters[market]": market,
                    "filters[commodity]": commodity,
                    "limit": 1,
                    "offset": 0
                }
                
                response = requests.get(self.base_url, params=params, timeout=5)
                if response.status_code == 200:
                    data = response.json()
                    if data.get("records") and len(data["records"]) > 0:
                        record = data["records"][0]
                        modal_price = float(record.get("modal_price", 0))
                        
                        # Cache the result
                        self.cache[cache_key] = (datetime.now(), modal_price)
                        return modal_price
            except Exception as e:
                print(f"Agmarknet API Error: {e}")
        
        # Fallback: Return realistic synthetic data
        return self._generate_synthetic_price(commodity)
    
    def _generate_synthetic_price(self, commodity):
        """
        Fallback synthetic prices (realistic for TN markets, 2025)
        """
        base_prices = {
            "Paddy": 2200,
            "Turmeric": 7500,
            "Coconut": 3200,
            "Banana": 1400,
            "Tomato": 1800,
            "Onion": 2500,
            "Cotton": 6500,
            "Groundnut": 5800,
            "Sugarcane": 3100,
            "Maize": 1900,
            "Chilli": 8500,
            "Tapioca": 1200,
        }
        return base_prices.get(commodity, 2000)
    
    def get_crop_profitability_ranking(self, market="Koyambedu"):
        """
        Analyze profitability based on recent prices.
        Returns: List of crop names sorted by profitability.
        
        For demo: Uses synthetic trends based on real market patterns.
        """
        # In production, this would query 3-month historical data and calculate:
        # - Average price
        # - Price stability (lower volatility = better)
        # - Trend (rising = better)
        
        # For now, return static rankings based on TN market research
        rankings_by_market = {
            "Koyambedu": ["Tomato", "Onion", "Banana", "Coconut", "Paddy", "Turmeric"],
            "Tambaram": ["Tomato", "Onion", "Paddy", "Banana", "Coconut", "Turmeric"],
            "Coimbatore": ["Cotton", "Turmeric", "Coconut", "Groundnut", "Banana", "Paddy"],
            "Madurai": ["Chilli", "Cotton", "Groundnut", "Onion", "Paddy", "Turmeric"],
        }
        
        return rankings_by_market.get(market, rankings_by_market["Koyambedu"])

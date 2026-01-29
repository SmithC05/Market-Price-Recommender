import requests
from datetime import datetime

class OpenMeteoService:
    def __init__(self):
        self.base_url = "https://api.open-meteo.com/v1/forecast"
        
        # Hardcoded coordinates for TN Mandis (acting as a simple geocoder)
        self.mandi_coords = {
            "Chennai": {"lat": 13.0827, "lon": 80.2707},
            "Coimbatore": {"lat": 11.0168, "lon": 76.9558},
            "Madurai": {"lat": 9.9252, "lon": 78.1198},
            "Trichy": {"lat": 10.7905, "lon": 78.7047},
            "Dindigul": {"lat": 10.3673, "lon": 77.9803},
            "Azadpur": {"lat": 28.7041, "lon": 77.1025}, # Keep legacy support
        }

    def get_current_weather(self, mandi_name):
        """
        Fetches current weather for a given mandi.
        Returns: Dict with condition code and details.
        """
        coords = self.mandi_coords.get(mandi_name)
        if not coords:
            print(f"Warning: Coords for {mandi_name} not found. Defaulting to Chennai.")
            coords = self.mandi_coords["Chennai"]

        try:
            params = {
                "latitude": coords["lat"],
                "longitude": coords["lon"],
                "current": ["temperature_2m", "relative_humidity_2m", "precipitation", "rain", "weather_code"],
                "timezone": "auto"
            }
            
            response = requests.get(self.base_url, params=params, timeout=5)
            response.raise_for_status()
            data = response.json()
            
            current = data.get("current", {})
            
            return {
                "temp": current.get("temperature_2m"),
                "humidity": current.get("relative_humidity_2m"),
                "rain": current.get("rain", 0),
                "code": current.get("weather_code", 0),
                "is_day": current.get("is_day", 1)
            }
            
        except Exception as e:
            print(f"OpenMeteo API Error: {e}")
            # Fallback mock data
            return {"temp": 30, "humidity": 60, "rain": 0, "code": 0}

    def interpret_weather_code(self, code):
        """
        Maps WMO Weather Codes to readable conditions.
        https://open-meteo.com/en/docs
        """
        if code == 0: return "Clear Sky"
        if code in [1, 2, 3]: return "Partly Cloudy"
        if code in [45, 48]: return "Foggy"
        if code in [51, 53, 55, 61, 63, 65]: return "Rainy"
        if code in [80, 81, 82]: return "Heavy Rain"
        if code in [95, 96, 99]: return "Storm"
        return "Unknown"

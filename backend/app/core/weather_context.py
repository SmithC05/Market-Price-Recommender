from app.core.open_meteo_service import OpenMeteoService

class WeatherContext:
    def __init__(self):
        self.api = OpenMeteoService()
        
    def get_risk_analysis(self, mandi_name):
        """
        Module D: Assess short-term weather instability using LIVE data.
        Returns: risk_level (Low/Medium/High/Critical), advice, detailed_weather_info
        """
        # Fetch live data
        weather_data = self.api.get_current_weather(mandi_name)
        condition_idx = weather_data['code']
        rain_mm = weather_data['rain']
        condition_str = self.api.interpret_weather_code(condition_idx)
        
        # Risk Logic based on WMO Codes & Rain volume
        risk_level = "Low"
        advice = "Conditions are favorable for harvest and transport."
        
        # 1. Critical: Storms (Codes 95-99) or Extreme Rain (>10mm/h)
        if condition_idx >= 95 or rain_mm > 10.0:
            risk_level = "Critical"
            advice = f"CRITICAL: {condition_str} detected. Transport is dangerous. Do not harvest."
            
        # 2. High: Heavy Rain (Codes 65, 80-82) or Significant Rain (>2mm)
        elif condition_idx in [65, 80, 81, 82] or rain_mm > 2.0:
            risk_level = "High"
            advice = f"High Risk: {condition_str}. Moisture will damage perishable crops. Cover immediately."
            
        # 3. Medium: Light Rain/Drizzle (Codes 51-63)
        elif condition_idx in [51, 53, 55, 61, 63] or rain_mm > 0.1:
            risk_level = "Medium"
            advice = f"Medium Risk: {condition_str}. Keep crops dry during transport."
            
        # 4. Low: Clear/Cloudy
        else:
            risk_level = "Low"
            advice = "Conditions are clear. Good for market operations."

        return {
            "risk_level": risk_level,
            "advice": advice,
            "condition": condition_str,
            "temp": weather_data['temp'],
            "humidity": weather_data['humidity']
        }

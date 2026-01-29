from src.data_loader import load_weather_risk_data

class WeatherRiskModule:
    def __init__(self):
        self.rules = load_weather_risk_data()
        
    def get_risk_assessment(self, weather_condition):
        """Returns risk level and advice based on condition."""
        rule = self.rules[self.rules['condition'].str.lower() == weather_condition.lower()]
        
        if rule.empty:
            return {
                "risk_level": "Unknown", 
                "advice": "No specific advice for this condition."
            }
            
        return {
            "risk_level": rule.iloc[0]['risk_level'],
            "advice": rule.iloc[0]['advice']
        }

class CropContextModule:
    """Static knowledge base for crops."""
    def get_crop_info(self, crop_name):
        if crop_name.lower() == "wheat":
            return {
                "perishability": "Low",
                "storage_life": "6-12 Months",
                "optimal_humidity": "Low"
            }
        return {"perishability": "Medium", "storage_life": "Unknown"}

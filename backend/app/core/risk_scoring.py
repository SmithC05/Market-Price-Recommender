class RiskScoring:
    def calculate_score(self, weather_risk, market_volatility_proxy=10.0):
        """
        Module F: Trust Layer.
        Inputs: Weather Risk (String), Volatility (Float % - default 10%)
        Outputs: Confidence Score (0-100), Risk Label
        """
        base_confidence = 90.0 # Start high
        
        # 1. Deduct for Weather
        if weather_risk == "Critical":
            base_confidence -= 40
        elif weather_risk == "High":
            base_confidence -= 25
        elif weather_risk == "Medium":
            base_confidence -= 10
            
        # 2. Deduct for Market Volatility (Simple rule)
        # In a real system, this comes from Module A's error rate
        if market_volatility_proxy > 20: 
            base_confidence -= 15
            
        # Clamp
        confidence = max(0, min(100, base_confidence))
        
        # Risk Label
        if confidence > 80:
            label = "Safe"
        elif confidence > 50:
            label = "Moderate Risk"
        else:
            label = "High Risk"
            
        return int(confidence), label

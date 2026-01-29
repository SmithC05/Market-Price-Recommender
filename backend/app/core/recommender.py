class RecommenderEngine:
    def generate_recommendation(self, current_price, predicted_price, msp, risk_level):
        """
        Generates a recommendation based on Price, MSP, and Risk.
        Returns: Tuple (Action, Reason)
        """
        signal = "WAIT"
        reason = []
        
        # 1. Panic Sell Check
        if risk_level == "Critical":
            return "SELL IMMEDIATELY", "Critical weather risk detected. Protect value."
            
        if risk_level == "High":
            reason.append("Weather risk is High.")
            
        # 2. MSP Check
        if current_price > msp:
            reason.append(f"Market price ({current_price}) is above MSP ({msp}).")
        else:
            reason.append(f"Market price ({current_price}) is below MSP ({msp}).")
            
        # 3. Future Trend Check
        price_diff = predicted_price - current_price
        if price_diff > 50: # Anticipating significant rise
            signal = "WAIT"
            reason.append(f"Price expected to rise by ₹{price_diff:.2f} in next 7 days.")
        elif price_diff < -20: # Anticipating drop
            signal = "SELL"
            reason.append(f"Price expected to drop by ₹{abs(price_diff):.2f}.")
        else:
            # Stable market
            if current_price > msp:
                signal = "SELL"
                reason.append("Price is good (above MSP) and stable.")
            else:
                signal = "WAIT"
                reason.append("Price is low but stable. Wait for better opportunities.")
                
        # Override if risk is high and we are 'waiting'
        if risk_level == "High" and signal == "WAIT":
            signal = "SELL" 
            reason.append("However, weather risk forces early sale.")
            
        return signal, " ".join(reason)

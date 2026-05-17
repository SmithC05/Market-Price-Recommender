class DecisionEngine:
    def make_decision(self, current_price, predicted_price, msp_status, gap_percent, risk_level):
        """
        Module C: Consumes ML + MSP + Risk signals.
        Returns: Action (SELL/WAIT), Reason
        """
        signal = "WAIT"
        reason = []
        
        # 1. Panic Sell (Overrules everything)
        if risk_level == "Critical":
            return "SELL IMMEDIATELY", "Critical weather risk detected. Protect value."
            
        # 2. MSP Logic (from Module B)
        if msp_status == "Market Advantage":
            reason.append(f"Price is {gap_percent}% above MSP.")
        else:
            reason.append(f"Price is {abs(gap_percent)}% below MSP.")
            
        # 3. Market Trend Logic
        price_diff = predicted_price - current_price
        
        # If Price is Good (> MSP) and Weather Risk is Low -> SELL
        if msp_status == "Market Advantage" and risk_level == "Low":
            signal = "SELL"
            reason.append("Good price and checking out with profit is safe.")
            
        # If Price is Bad (< MSP) but Trend is UP -> WAIT
        elif msp_status == "Below MSP" and price_diff > 0:
            signal = "WAIT"
            reason.append("Price is low, but market is recovering.")
            
        # If Price is Bad and Trend is DOWN -> WAIT (or SELL if storage impossible, but logic says WAIT for now)
        elif msp_status == "Below MSP" and price_diff < 0:
            signal = "WAIT" # Or 'Hold'
            reason.append("Market is down. Store if possible.")
            
        # Default fallback
        if not reason:
            reason.append("Market conditions are neutral.")
            
        return signal, " ".join(reason)

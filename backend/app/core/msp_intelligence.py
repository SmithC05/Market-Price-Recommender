class MSPIntelligence:
    def compare_price(self, predicted_price, msp_price):
        """
        Module B: Compares Market Price vs MSP.
        Returns: Advantage Label, Gap Percentage
        """
        if msp_price == 0:
            return "Unknown", 0.0
            
        gap = predicted_price - msp_price
        gap_percent = (gap / msp_price) * 100
        
        if gap > 0:
            status = "Market Advantage"
        else:
            status = "Below MSP"
            
        return status, round(gap_percent, 2)

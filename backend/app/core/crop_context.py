class CropContext:
    def get_sensitivity(self, crop):
        """
        Module E: Rule-based explainability layer.
        Returns: Sensitivity context.
        """
        rules = {
            "Paddy": "High moisture sensitivity. Harvest requires dry spell.",
            "Wheat": "Low perishability. Can store for long duration.",
            "Turmeric": "Long storage life. Look for peak seasonal pricing.",
            "Coconut": "Stable shelf life. Verify transport costs.",
            "Banana": "Highly perishable. Sell immediately if ripe."
        }
        return rules.get(crop, "Standard perishability.")

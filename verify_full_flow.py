import sys
import os
sys.path.append(os.path.abspath("src"))

from ml_engine import PricePredictor
from support import WeatherRiskModule
from data_loader import load_msp_data
from recommender import RecommenderEngine

def verify_system():
    print("=== STARTING SYSTEM VERIFICATION ===")
    
    # 1. Init
    print("[1] Initializing Modules...")
    predictor = PricePredictor()
    weather_mod = WeatherRiskModule()
    recommender = RecommenderEngine()
    msp_df = load_msp_data()
    print("SUCCESS: Modules initialized.")
    
    # 2. Train
    print("[2] Training Model...")
    predictor.train()
    print("SUCCESS: Model trained.")
    
    # 3. Simulate Inputs
    mandi = "Azadpur"
    weather = "Rainy"
    msp = 2400
    print(f"\n[Scenario] Mandi: {mandi}, Weather: {weather}, MSP: {msp}")
    
    # 4. Predict
    print("[3] Generating Price Forecast...")
    preds = predictor.predict_next_days(mandi, 7)
    curr_price = preds[0]['predicted_price']
    future_max = max(p['predicted_price'] for p in preds)
    print(f"Current Estimate: {curr_price}, Max Future: {future_max}")
    
    # 5. Risk
    print("[4] Assessing Risk...")
    risk = weather_mod.get_risk_assessment(weather)
    print(f"Risk: {risk['risk_level']} - {risk['advice']}")
    
    # 6. Recommendation
    print("[5] Generating Decision...")
    action, reason = recommender.generate_recommendation(curr_price, future_max, msp, risk['risk_level'])
    print(f"\n>>> FINAL OUTCOME: {action}")
    print(f">>> REASON: {reason}")
    
    print("\n=== VERIFICATION COMPLETE ===")

if __name__ == "__main__":
    verify_system()

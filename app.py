import streamlit as st
import pandas as pd
import sys
import os
from datetime import datetime

# Add src to path
sys.path.append(os.path.abspath("src"))

from ml_engine import PricePredictor
from support import WeatherRiskModule, CropContextModule
from data_loader import load_msp_data
from recommender import RecommenderEngine

# --- Configuration & Setup ---
st.set_page_config(page_title="Agri-Price Intelligence", layout="wide")

@st.cache_resource
def load_system():
    # Initialize and train model
    predictor = PricePredictor()
    predictor.train()
    
    weather = WeatherRiskModule()
    crop_info = CropContextModule()
    recommender = RecommenderEngine()
    
    msp_df = load_msp_data()
    return predictor, weather, crop_info, recommender, msp_df

predictor, weather_mod, crop_mod, recommender, msp_df = load_system()

# --- UI ---
st.title("🌾 Market Price Intelligence & MSP Recommender")
st.write("AI-Driven Decision Support for Farmers")

# Sidebar
st.sidebar.header("Data Inputs")
selected_mandi = st.sidebar.selectbox("Select Mandi", ["Azadpur", "Ghazipur", "Okhla"])
current_weather = st.sidebar.selectbox("Current Weather Condition", ["Sunny", "Cloudy", "Rainy", "Storm"])
selected_crop = "Wheat" # Prototype limited to Wheat

# Context Info
msp_val = msp_df[(msp_df['crop'] == selected_crop) & (msp_df['year'] == 2025)]['msp_price'].values[0]

# Main Area
col1, col2 = st.columns(2)

with col1:
    st.subheader("📊 Market Analysis")
    st.info(f"Crop: **{selected_crop}** | Mandi: **{selected_mandi}**")
    
    # 1. Get Predictions
    predictions = predictor.predict_next_days(selected_mandi, days=15)
    pred_df = pd.DataFrame(predictions)
    
    # Chart
    st.line_chart(pred_df.set_index('date')['predicted_price'])
    
    # Current Stats
    curr_price = pred_df.iloc[0]['predicted_price'] # Using day 1 prediction as proxy for 'current' if live data missing
    st.metric("Estimated Market Price (Today)", f"₹{curr_price}")
    st.metric("Government MSP (2025)", f"₹{msp_val}")

with col2:
    st.subheader("🤖 AI Recommendation")
    
    # 2. Risk Assessment
    risk = weather_mod.get_risk_assessment(current_weather)
    st.write(f"**Weather Risk:** {risk['risk_level']}")
    st.caption(f"Note: {risk['advice']}")
    
    # 3. Decision Logic
    future_max = pred_df['predicted_price'].max()
    action, reason = recommender.generate_recommendation(curr_price, future_max, msp_val, risk['risk_level'])
    
    # Display Recommendation
    if action == "SELL" or action == "SELL IMMEDIATELY":
        st.error(f"### 🛑 Recommendation: {action}")
    else:
        st.success(f"### ✅ Recommendation: {action}")
        
    st.write(f"**Reasoning:** {reason}")
    
    # Comparison
    diff = curr_price - msp_val
    if diff > 0:
        st.write(f"📈 Market is **₹{diff:.2f} above** MSP.")
    else:
        st.write(f"📉 Market is **₹{abs(diff):.2f} below** MSP.")

st.markdown("---")
st.caption("Prototype System - v0.1")

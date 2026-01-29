import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from datetime import timedelta
import sys
import os

# Add parent directory to path to import data_loader
# sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from app.core.data_loader import load_market_data

class PricePredictor:
    def __init__(self):
        self.model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.is_trained = False
        
    def prepare_features(self, df):
        """Feature Engineering for the model."""
        df = df.copy()
        df['date'] = pd.to_datetime(df['date'])
        df['day_of_year'] = df['date'].dt.dayofyear
        df['month'] = df['date'].dt.month
        
        # Simple lag features (price 7 days ago) - In a real app we'd do more robust shifting
        # For this prototype, we will just use date-based features + Mandi encoding
        
        # Mandi One-Hot Encoding
        df = pd.get_dummies(df, columns=['mandi'], prefix='mandi')
        # Crop One-Hot Encoding
        df = pd.get_dummies(df, columns=['crop'], prefix='crop')
        
        return df
        
    def train(self):
        """Trains the model on available data."""
        print("Loading data...")
        raw_df = load_market_data()
        
        print("Feature engineering...")
        processed_df = self.prepare_features(raw_df)
        
        # Features & Target
        # Drop non-numeric columns and target
        X = processed_df.drop(['price', 'date'], axis=1) # Keep encoded columns
        y = processed_df['price']
        
        # Save feature names for prediction alignment
        self.feature_names = X.columns.tolist()
        
        print(f"Training on {len(X)} records...")
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        self.model.fit(X_train, y_train)
        score = self.model.score(X_test, y_test)
        print(f"Model Trained. R^2 Score: {score:.2f}")
        self.is_trained = True
        return score

    def predict_next_days(self, mandi, crop, days=7):
        """Predicts prices for the next N days for a specific Mandi and Crop."""
        if not self.is_trained:
            # Fallback: Use crop-specific synthetic predictions
            return self._generate_synthetic_predictions(crop, days)
        
        # Crop-specific baseline prices (Rs/Quintal)
        crop_baselines = {
            "Paddy": 2200,
            "Turmeric": 7500,
            "Coconut": 3200,
            "Banana": 1400,
            "Tomato": 1800,
            "Onion": 2500,
            "Cotton": 6500,
            "Groundnut": 5800,
            "Sugarcane": 3100,
            "Maize": 1900,
            "Chilli": 8500,
            "Tapioca": 1200,
        }
        base_price = crop_baselines.get(crop, 2000)
            
        future_dates = [pd.Timestamp.now() + timedelta(days=i) for i in range(1, days+1)]
        
        # Create input dataframe for prediction
        input_data = []
        for date in future_dates:
            row = {
                'day_of_year': date.dayofyear,
                'month': date.month,
                'arrival_volume_tonnes': 200 # Avg assumption
            }
            # Add features (one-hot)
            for feat in self.feature_names:
                if feat.startswith('mandi_'):
                    row[feat] = 1 if feat == f'mandi_{mandi}' else 0
                elif feat.startswith('crop_'):
                    row[feat] = 1 if feat == f'crop_{crop}' else 0
            
            input_data.append(row)
            
        input_df = pd.DataFrame(input_data)
        
        # Ensure column order matches training
        input_df = input_df[self.feature_names] 
        
        predictions = self.model.predict(input_df)
        
        # Adjust predictions to be crop-realistic (blend with baseline)
        adjusted_predictions = []
        for pred in predictions:
            # Blend: 70% baseline + 30% model variance
            adjusted = base_price * 0.7 + pred * 0.3
            adjusted_predictions.append(adjusted)
        
        results = []
        for date, price in zip(future_dates, adjusted_predictions):
            results.append({
                "date": date.strftime("%Y-%m-%d"),
                "predicted_price": round(price, 2)
            })
            
        return results
    
    def _generate_synthetic_predictions(self, crop, days=7):
        """Generate realistic synthetic predictions per crop (for demo)."""
        crop_baselines = {
            "Paddy": 2200, "Turmeric": 7500, "Coconut": 3200, "Banana": 1400,
            "Tomato": 1800, "Onion": 2500, "Cotton": 6500, "Groundnut": 5800,
            "Sugarcane": 3100, "Maize": 1900, "Chilli": 8500, "Tapioca": 1200,
        }
        base = crop_baselines.get(crop, 2000)
        
        results = []
        future_dates = [pd.Timestamp.now() + timedelta(days=i) for i in range(1, days+1)]
        for i, date in enumerate(future_dates):
            # Add slight upward trend with noise
            price = base + (i * 10) + np.random.randint(-50, 50)
            results.append({
                "date": date.strftime("%Y-%m-%d"),
                "predicted_price": round(price, 2)
            })
        return results

if __name__ == "__main__":
    predictor = PricePredictor()
    predictor.train()
    print("Test Prediction for Azadpur:", predictor.predict_next_days("Azadpur", 3))

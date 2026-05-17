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

class MarketIntelligence:
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

    def predict_price_and_trend(self, mandi, crop, days=7):
        """
        Module A: Predicts future price and detects trend.
        Returns: List[Dict] (predictions), Trend (String)
        """
        if not self.is_trained:
            raise Exception("Model is not trained yet!")
            
        future_dates = [pd.Timestamp.now() + timedelta(days=i) for i in range(1, days+1)]
        
        # ... (Processing same as before) ...
        # Create input dataframe for prediction
        input_data = []
        for date in future_dates:
            row = {
                'day_of_year': date.dayofyear,
                'month': date.month,
                'arrival_volume_tonnes': 200 
            }
            # Add features (one-hot)
            for feat in self.feature_names:
                if feat.startswith('mandi_'):
                    row[feat] = 1 if feat == f'mandi_{mandi}' else 0
                elif feat.startswith('crop_'):
                    row[feat] = 1 if feat == f'crop_{crop}' else 0
            
            input_data.append(row)
            
        input_df = pd.DataFrame(input_data)
        input_df = input_df[self.feature_names] 
        
        predictions = self.model.predict(input_df)
        
        # Trend Logic
        start_price = predictions[0]
        end_price = predictions[-1]
        diff_pct = ((end_price - start_price) / start_price) * 100
        
        if diff_pct > 2:
            trend = "Upward 📈"
        elif diff_pct < -2:
            trend = "Downward 📉"
        else:
            trend = "Stable ➡️"
        
        results = []
        for date, price in zip(future_dates, predictions):
            results.append({
                "date": date.strftime("%Y-%m-%d"),
                "predicted_price": round(price, 2)
            })
            
        return results, trend

if __name__ == "__main__":
    predictor = PricePredictor()
    predictor.train()
    print("Test Prediction for Azadpur:", predictor.predict_next_days("Azadpur", 3))

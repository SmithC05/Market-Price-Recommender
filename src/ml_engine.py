import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from datetime import timedelta
import sys
import os

# Add parent directory to path to import data_loader
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from src.data_loader import load_market_data

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
        
        return df
        
    def train(self):
        """Trains the model on available data."""
        print("Loading data...")
        raw_df = load_market_data()
        
        print("Feature engineering...")
        processed_df = self.prepare_features(raw_df)
        
        # Features & Target
        # Drop non-numeric columns and target
        X = processed_df.drop(['price', 'date', 'crop'], axis=1)
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

    def predict_next_days(self, mandi, days=7):
        """Predicts prices for the next N days for a specific Mandi."""
        if not self.is_trained:
            raise Exception("Model is not trained yet!")
            
        future_dates = [pd.Timestamp.now() + timedelta(days=i) for i in range(1, days+1)]
        
        # Create input dataframe for prediction
        input_data = []
        for date in future_dates:
            row = {
                'day_of_year': date.dayofyear,
                'month': date.month,
                'arrival_volume_tonnes': 200 # Avg assumption
            }
            # Add mandi columns (one-hot)
            for feat in self.feature_names:
                if feat.startswith('mandi_'):
                    if feat == f'mandi_{mandi}':
                        row[feat] = 1
                    else:
                        row[feat] = 0
            
            input_data.append(row)
            
        input_df = pd.DataFrame(input_data)
        
        # Ensure column order matches training
        input_df = input_df[self.feature_names] 
        
        predictions = self.model.predict(input_df)
        
        results = []
        for date, price in zip(future_dates, predictions):
            results.append({
                "date": date.strftime("%Y-%m-%d"),
                "predicted_price": round(price, 2)
            })
            
        return results

if __name__ == "__main__":
    predictor = PricePredictor()
    predictor.train()
    print("Test Prediction for Azadpur:", predictor.predict_next_days("Azadpur", 3))

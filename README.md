# Market Price Intelligence & MSP Recommender (CCP Project)

## 📌 Overview
An AI-powered Decision Support System (DSS) for farmers. It uses Machine Learning to predict market prices, compares them with Government MSP, and generates actionable "Sell vs. Wait" advice based on profit potential and weather risk.

**Version**: 1.1 (Tamil Nadu Edition)
**Status**: 70-100% Functional Prototype

---

## 🚀 Quick Start Guide

### Prerequisites
- Python 3.9+
- Node.js 16+
- Git

### 1. Backend Setup (FastAPI)
The backend handles ML training, prediction, and decision logic.

```bash
cd backend
# Install dependencies (if not already installed)
pip install fastapi uvicorn pandas scikit-learn numpy

# Run the server (Reload enabled)
uvicorn app.main:app --reload --port 8000
```
> Server will start at `http://localhost:8000`. 
> Swagger Docs available at `http://localhost:8000/docs`.

### 2. Frontend Setup (React)
The frontend provides the dashboard UI.

```bash
cd frontend
# Install dependencies
npm install

# Start Dev Server
npm run dev
```
> App will run at `http://localhost:5173`.

---

## 📂 Project Structure

```
CCP/
├── backend/            # Python API Service
│   ├── app/
│   │   ├── core/       # The 6 Modules (A-F)
│   │   │   ├── market_intelligence.py  # ML Model
│   │   │   ├── decision_engine.py      # Rules Logic
│   │   │   └── ...
│   │   ├── api/        # Endpoints
│   │   └── main.py     # Entry point
│   └── data/           # CSV Datasets (Hybrid Mode)
├── frontend/           # React + Tailwind
│   ├── src/
│   │   ├── components/ # UI Cards & Charts
│   │   └── App.jsx     # Main Dashboard
└── brain/              # Design Documentation
```

## 🛠 Features Implemented
- **Multi-Crop Support**: Paddy, Turmeric, Coconut, Banana.
- **ML Price Forecasting**: Random Forest Regressor trained on historical data.
- **Decision Engine**: "Sell/Wait" logic based on MSP, Trend, and Risk.
- **Regional Focus**: Tamil Nadu Mandis (Chennai, Coimbatore, etc.).
- **Interactive UI**: Real-time charts and advice cards.

---

## 🧪 Testing
Run the verification script to test the full API flow without the UI:
```bash
python verify_api.py
```

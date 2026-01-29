import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MapPin, Wheat, Crosshair } from 'lucide-react';
import axios from 'axios';
import MainLayout from './components/layout/MainLayout';
import PlanStage from './components/PlanStage';
import GrowStage from './components/GrowStage';
import SellStage from './components/SellStage';

// --- Global Config Bar Component (Lives inside pages or layout) ---
function ConfigBar({ mandi, setMandi, crop, setCrop }) {
  const [locating, setLocating] = useState(false);
  const [recommendedCrops, setRecommendedCrops] = useState([]);
  const [nearbyMandis, setNearbyMandis] = useState([]);

  // Fetch recommended crops when mandi changes
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/crops/recommended?mandi=${mandi}`);
        setRecommendedCrops(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchCrops();
  }, [mandi]);

  // On mount, try to get nearby mandis based on geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await axios.get(`http://localhost:8000/api/v1/mandis/nearby?lat=${latitude}&lon=${longitude}`);
          setNearbyMandis(res.data);
        } catch (e) {
          console.error(e);
        }
      }, () => { });
    }
  }, []);

  const handleLocateMe = () => {
    setLocating(true);
    if (!navigator.geolocation) {
      alert("Geolocation is not supported");
      setLocating(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        const res = await axios.get(`http://localhost:8000/api/v1/mandis/nearby?lat=${latitude}&lon=${longitude}`);
        if (res.data && res.data.length > 0) {
          const nearest = res.data[0];
          setMandi(nearest.name);
          alert(`📍 Coordinates Locked: ${nearest.name}`);
        }
      } catch (error) {
        console.error("Locate Error:", error);
      } finally {
        setLocating(false);
      }
    }, () => setLocating(false));
  };

  return (
    <div className="card bg-base-100 shadow-sm border border-base-200 mb-8">
      <div className="card-body p-4 sm:p-6 flex-row flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Wheat className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm uppercase text-base-content/60">Farm Context</h3>
            <div className="font-semibold text-base-content">{mandi} • {crop}</div>
          </div>
        </div>

        <div className="flex flex-1 gap-4 justify-end min-w-[300px]">
          <div className="form-control w-full max-w-[200px]">
            <label className="label py-1"><span className="label-text-alt font-bold">Mandi Location</span></label>
            <div className="join">
              <select className="select select-bordered select-sm w-full join-item" value={mandi} onChange={(e) => setMandi(e.target.value)}>
                {nearbyMandis.length > 0 ? (
                  nearbyMandis.map(m => (
                    <option key={m.name} value={m.name}>{m.name} ({m.distance_km}km)</option>
                  ))
                ) : (
                  <>
                    <option value="Koyambedu">Koyambedu (Chennai)</option>
                    <option value="Tambaram">Tambaram (Chennai)</option>
                    <option value="Kancheepuram">Kancheepuram</option>
                    <option value="Tiruvallur">Tiruvallur</option>
                    <option value="Coimbatore">Coimbatore</option>
                    <option value="Madurai">Madurai</option>
                    <option value="Trichy">Trichy</option>
                    <option value="Dindigul">Dindigul</option>
                  </>
                )}
              </select>
              <button className="btn btn-sm join-item btn-square" onClick={handleLocateMe} title="Auto-Detect">
                <Crosshair className={`w-4 h-4 ${locating ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          <div className="form-control w-full max-w-[200px]">
            <label className="label py-1"><span className="label-text-alt font-bold">Crop (Recommended for {mandi})</span></label>
            <select className="select select-bordered select-sm w-full" value={crop} onChange={(e) => setCrop(e.target.value)}>
              {recommendedCrops.length > 0 ? (
                recommendedCrops.map(c => (
                  <option key={c.name} value={c.name}>{c.icon} {c.name}</option>
                ))
              ) : (
                <>
                  <option value="Paddy">🍚 Paddy</option>
                  <option value="Turmeric">🟡 Turmeric</option>
                  <option value="Coconut">🥥 Coconut</option>
                  <option value="Banana">🍌 Banana</option>
                </>
              )}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Main App Entry ---
function App() {
  const [mandi, setMandi] = useState("Chennai");
  const [crop, setCrop] = useState("Paddy");

  return (
    <BrowserRouter>
      <MainLayout>
        {/* We inject the ConfigBar at top of content area */}
        <ConfigBar mandi={mandi} setMandi={setMandi} crop={crop} setCrop={setCrop} />

        <Routes>
          <Route path="/" element={<Navigate to="/sell" replace />} />
          <Route path="/plan" element={<PlanStage mandi={mandi} />} />
          <Route path="/grow" element={<GrowStage mandi={mandi} crop={crop} />} />
          <Route path="/sell" element={<SellStage mandi={mandi} crop={crop} />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App

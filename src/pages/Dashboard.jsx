import React, { useState } from 'react';
import FarmingLifecycle from '../components/FarmingLifecycle';
import PricePredictionPanel from '../features/core/PricePredictionPanel';
import MSPComparison from '../features/core/MSPComparison';
import DecisionCard from '../features/core/DecisionCard';
import WeatherWidget from '../features/supporting/WeatherWidget';
import RiskMeter from '../features/supporting/RiskMeter';
import { Filter, MapPin, Sprout } from 'lucide-react';

const Dashboard = () => {
    const [selectedCrop, setSelectedCrop] = useState('Wheat');
    const [selectedMandi, setSelectedMandi] = useState('Azadpur Mandi, Delhi');

    // Mock Data
    const predictionData = [
        { day: 'Mon', price: 2100 },
        { day: 'Tue', price: 2150 },
        { day: 'Wed', price: 2120 },
        { day: 'Thu', price: 2180 },
        { day: 'Fri', price: 2250 }, // Today
        { day: 'Sat', price: 2310 },
        { day: 'Sun', price: 2380 },
    ];

    return (
        <div className="container" style={{ paddingBottom: '80px', paddingTop: '20px' }}>

            {/* 1. Lifecycle Context - Always Top */}
            <FarmingLifecycle currentStage="season" />

            {/* 2. Controls & Filters */}
            <div className="flex gap-4 mb-4" style={{ marginBottom: 'var(--spacing-lg)', flexWrap: 'wrap' }}>
                <div className="card flex items-center gap-2" style={{ padding: '8px 16px', flex: 1, minWidth: '200px' }}>
                    <Filter size={18} color="var(--color-primary)" />
                    <select
                        style={{ border: 'none', width: '100%', fontSize: '1rem', fontWeight: 600, outline: 'none' }}
                        value={selectedCrop}
                        onChange={(e) => setSelectedCrop(e.target.value)}
                    >
                        <option>Wheat (Rabi)</option>
                        <option>Rice (Kharif)</option>
                        <option>Maize</option>
                    </select>
                </div>
                <div className="card flex items-center gap-2" style={{ padding: '8px 16px', flex: 1, minWidth: '200px' }}>
                    <MapPin size={18} color="var(--color-secondary)" />
                    <select
                        style={{ border: 'none', width: '100%', fontSize: '1rem', fontWeight: 600, outline: 'none' }}
                        value={selectedMandi}
                        onChange={(e) => setSelectedMandi(e.target.value)}
                    >
                        <option>Azadpur Mandi, Delhi</option>
                        <option>Ghazipur Mandi</option>
                    </select>
                </div>
            </div>

            {/* 3. Main Grid Layout: Core (Left/Top) vs Supporting (Right/Bottom) */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: 'var(--spacing-lg)',
                alignItems: 'start'
            }}>

                {/* LEFT COLUMN: CORE MODULES (Highlight Intelligence) */}
                <div style={{ gridColumn: 'span 2' }}>
                    <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                        <DecisionCard
                            recommendation="SELL NOW"
                            confidence={92}
                            mandi="Ghazipur Mandi"
                            price="2,380"
                            reason="Prices are peaking due to high demand and lower arrivals expected next week."
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-md)' }}>
                        <PricePredictionPanel data={predictionData} />
                        <MSPComparison mspPrice={2125} marketPrice={2380} />
                    </div>
                </div>

                {/* RIGHT COLUMN: SUPPORTING MODULES (Context) */}
                <div style={{ gridColumn: 'span 1' }}>
                    <div className="flex flex-col gap-4">
                        <WeatherWidget />
                        <RiskMeter riskLevel="Medium" score={58} />

                        {/* Crop Context Simple Card */}
                        <div className="card" style={{ backgroundColor: '#FFF8E1', border: '1px solid #FFECB3' }}>
                            <h4 style={{ margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Sprout size={18} color="var(--color-secondary)" /> Crop Insight
                            </h4>
                            <p style={{ fontSize: '0.9rem', margin: 0 }}>
                                Wheat prices usually dip in Jan due to early harvest arrivals. Keep an eye on moisture levels.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;

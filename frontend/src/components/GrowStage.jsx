import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CloudRain, AlertTriangle, CheckCircle, Wind, Thermometer } from 'lucide-react';

const GrowStage = ({ mandi, crop }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGrow = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/grow?mandi=${mandi}&crop=${crop}`);
                setData(res.data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchGrow();
    }, [mandi, crop]);

    if (loading) return <div className="flex justify-center p-12"><span className="loading loading-spinner loading-lg text-secondary"></span></div>;
    if (!data) return null;

    const isRisk = data.weather.risk !== 'Low';

    return (
        <div className="space-y-6">
            {/* Main Weather Card */}
            <div className={`card shadow-xl border-l-8 ${isRisk ? 'border-error bg-error/10' : 'border-success bg-white'}`}>
                <div className="card-body">
                    <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-full ${isRisk ? 'bg-error text-white' : 'bg-success text-white'}`}>
                            {isRisk ? <AlertTriangle className="w-8 h-8" /> : <CheckCircle className="w-8 h-8" />}
                        </div>
                        <div>
                            <h2 className="card-title text-2xl">{data.weather.risk} Risk Detected</h2>
                            <p className="font-medium text-lg mt-1 opacity-90">{data.weather.advice}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Live Stats */}
                <div className="stats shadow w-full bg-white">
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <CloudRain className="w-8 h-8" />
                        </div>
                        <div className="stat-title">Condition</div>
                        <div className="stat-value text-2xl">{data.weather.condition}</div>
                    </div>
                </div>

                <div className="stats shadow w-full bg-white">
                    <div className="stat">
                        <div className="stat-figure text-primary">
                            <Wind className="w-8 h-8" />
                        </div>
                        <div className="stat-title">Details</div>
                        <div className="stat-value text-lg">{data.weather.details}</div>
                    </div>
                </div>

                {/* Crop Context */}
                <div className="card bg-base-100 shadow-md border border-base-200 col-span-1 md:col-span-1">
                    <div className="card-body p-6">
                        <h3 className="card-title text-sm uppercase text-base-content/60">🧪 Crop Sensitivity</h3>
                        <p className="italic font-serif text-lg text-base-content/80">"{data.crop_context}"</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GrowStage;

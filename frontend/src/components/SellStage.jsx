import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader2, RefreshCcw } from 'lucide-react';
import PriceChart from './PriceChart';
import RecommendationCard from './RecommendationCard';
import { API_BASE } from '../config';

const SellStage = ({ mandi, crop }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [recommendation, setRecommendation] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [predRes, recRes] = await Promise.all([
                axios.post(`${API_BASE}/predict`, { mandi, crop, days: 15 }),
                axios.post(`${API_BASE}/recommend`, { mandi, crop })
            ]);
            setData(predRes.data.predictions);
            setRecommendation(recRes.data);
        } catch (err) {
            console.error("API Error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [mandi, crop]);

    return (
        <div className="space-y-6">
            <div className="navbar bg-base-100 rounded-box shadow-sm border border-base-200">
                <div className="flex-1">
                    <div className="px-2">
                        <h3 className="text-lg font-bold">💰 Post-Harvest Intelligence</h3>
                        <span className="text-xs text-base-content/60">AI-powered price forecast and selling advice.</span>
                    </div>
                </div>
                <div className="flex-none">
                    <button
                        className="btn btn-primary btn-sm gap-2"
                        onClick={fetchData}
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCcw className="w-4 h-4" />}
                        Refresh Analysis
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8 card bg-white shadow-xl p-2 h-fit">
                    <div className="card-body p-0">
                        <PriceChart data={data} mandi={mandi} />
                    </div>
                </div>
                <div className="lg:col-span-1">
                    {recommendation && <RecommendationCard recommendation={recommendation} />}
                </div>
            </div>
        </div>
    );
};

export default SellStage;

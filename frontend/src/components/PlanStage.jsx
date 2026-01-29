import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TrendingUp, TrendingDown, Minus, ArrowRight } from 'lucide-react';

const PlanStage = ({ mandi }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlan = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/plan?mandi=${mandi}`);
                setData(res.data.recommendations);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchPlan();
    }, [mandi]);

    if (loading) return <div className="flex justify-center p-12"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

    return (
        <div className="space-y-6">
            <div className="alert alert-info shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <div>
                    <h3 className="font-bold">Pre-Sowing Advisor</h3>
                    <div className="text-xs">Based on 3-year historical trends in {mandi}.</div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data && data.map((item) => (
                    <div key={item.crop} className="card bg-base-100 shadow-md hover:shadow-xl transition-all border border-base-200">
                        <div className="card-body">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="card-title text-2xl">{item.crop}</h2>
                                    <p className="text-base-content/70 mt-1">{item.reason}</p>
                                </div>
                                <div className={`badge ${item.demand === 'High' ? 'badge-accent' : 'badge-ghost'} badge-lg p-3 font-bold`}>
                                    {item.demand} Demand
                                </div>
                            </div>

                            <div className="divider my-2"></div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm font-semibold text-base-content/80">
                                    Trend: {item.trend}
                                </div>
                                <button className="btn btn-sm btn-ghost gap-2">
                                    Details <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlanStage;

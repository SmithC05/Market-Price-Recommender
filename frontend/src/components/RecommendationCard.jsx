import React from 'react';
import { AlertTriangle, CheckCircle, CloudRain, ShieldCheck, TrendingUp } from 'lucide-react';
import clsx from 'clsx';

const RecommendationCard = ({ recommendation }) => {
    if (!recommendation) return null;

    const { action, reason, metrics } = recommendation;
    const isSell = action.includes("SELL");

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className={clsx(
                "p-6 border-b",
                isSell ? "bg-red-50 border-red-100" : "bg-emerald-50 border-emerald-100"
            )}>
                <div className="flex items-start justify-between">
                    <div>
                        <span className={clsx(
                            "text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full",
                            isSell ? "bg-red-200 text-red-800" : "bg-emerald-200 text-emerald-800"
                        )}>
                            AI Recommendation
                        </span>
                        <h2 className={clsx(
                            "text-3xl font-bold mt-3",
                            isSell ? "text-red-700" : "text-emerald-700"
                        )}>
                            {action}
                        </h2>
                    </div>
                    {isSell ? (
                        <AlertTriangle className="w-12 h-12 text-red-300" />
                    ) : (
                        <CheckCircle className="w-12 h-12 text-emerald-300" />
                    )}
                </div>
                <p className={clsx("mt-4 text-sm font-medium", isSell ? "text-red-800" : "text-emerald-800")}>
                    {reason}
                </p>
            </div>

            {/* Metrics Grid */}
            <div className="p-6 grid grid-cols-2 gap-4">
                {/* Row 1: Price Context */}
                <div className="space-y-1">
                    <p className="text-xs text-slate-500 font-medium uppercase">Current Price</p>
                    <p className="text-lg font-bold text-slate-700">₹{metrics.current_price.toFixed(2)}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-xs text-slate-500 font-medium uppercase">Govt MSP</p>
                    <p className="text-lg font-bold text-slate-700">₹{metrics.msp}</p>
                </div>

                {/* Row 2: Module A & B Output */}
                <div className="col-span-2 pt-2 border-t border-slate-50">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600 flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" /> Trend: {metrics.trend}
                        </span>
                        <span className={clsx("text-sm font-bold", metrics.gap_percent.includes("-") ? "text-red-600" : "text-emerald-600")}>
                            {metrics.gap_percent} vs MSP
                        </span>
                    </div>
                </div>

                {/* Row 3: Trust & Risk (Module D & F) */}
                <div className="col-span-2 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                        <CloudRain className="w-5 h-5 text-blue-400 mt-1" />
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase">Weather Risk</p>
                            <p className="text-sm font-medium text-slate-700">{metrics.weather_risk}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 text-indigo-400 mt-1" />
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase">AI Confidence</p>
                            <div className="flex items-center gap-2">
                                <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500" style={{ width: `${metrics.confidence_score}%` }}></div>
                                </div>
                                <span className="text-sm font-bold text-indigo-700">{metrics.confidence_score}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Row 4: Explainability (Module E) */}
                <div className="col-span-2 pt-4">
                    <p className="text-xs text-slate-400 italic">
                        💡 <strong>Note:</strong> {metrics.context_note}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RecommendationCard;

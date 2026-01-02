import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, AlertCircle } from 'lucide-react';

const PricePredictionPanel = ({ data }) => {
    return (
        <div className="card" style={{ height: '400px', width: '100%', position: 'relative', overflow: 'hidden' }}>
            <div style={{ paddingBottom: 'var(--spacing-md)' }} className="flex items-center justify-between">
                <div>
                    <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        Mandi Price Prediction
                        <span style={{
                            fontSize: '0.7rem',
                            backgroundColor: '#E3F2FD',
                            color: '#1565C0',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            border: '1px solid #BBDEFB'
                        }}>ML MODEL V2.0</span>
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Next 7 Days Forecast</p>
                </div>
                <div className="text-right">
                    <div className="flex items-center gap-2" style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>
                        <TrendingUp size={20} /> Uptrend
                    </div>
                    <small style={{ color: 'var(--color-text-muted)' }}>High Confidence (85%)</small>
                </div>
            </div>

            <div style={{ width: '100%', height: 'calc(100% - 60px)' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        {/* Confidence Band (Simulated with a separate area or stacked, but for simple demo using one broad area) */}
                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke="var(--color-primary)"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorPrice)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                fontSize: '0.8rem',
                color: 'var(--color-text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
            }}>
                <AlertCircle size={14} /> AI predictions may vary due to weather
            </div>
        </div>
    );
};

export default PricePredictionPanel;

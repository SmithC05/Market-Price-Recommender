import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PriceChart = ({ data, mandi }) => {
    if (!data || data.length === 0) return null;

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-[400px]" style={{ height: "400px" }}>
            <h3 className="text-lg font-semibold mb-4 text-slate-800">
                Price Forecast: {mandi}
            </h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis
                        dataKey="date"
                        tickFormatter={(date) => new Date(date).getDate()}
                        stroke="#64748b"
                        tick={{ fontSize: 12 }}
                    />
                    <YAxis
                        domain={['auto', 'auto']}
                        stroke="#64748b"
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => `₹${value}`}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                        formatter={(value) => [`₹${value}`, 'Price']}
                    />
                    <Line
                        type="monotone"
                        dataKey="predicted_price"
                        stroke="#2563eb"
                        strokeWidth={3}
                        dot={{ r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PriceChart;

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PriceChart = ({ data }) => {
    return (
        <div className="card" style={{ height: '350px', width: '100%' }}>
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Price Forecast (7 Days)</h3>
            <div style={{ width: '100%', height: 'calc(100% - 40px)' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" vertical={false} />
                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{
                                borderRadius: '8px',
                                border: 'none',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="price"
                            stroke="var(--color-primary)"
                            strokeWidth={3}
                            dot={{ stroke: 'var(--color-primary)', strokeWidth: 2, r: 4, fill: 'white' }}
                            activeDot={{ r: 6, fill: 'var(--color-primary)' }}
                        />
                        {/* Dashed line for MSP reference if needed, can be added later */}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PriceChart;

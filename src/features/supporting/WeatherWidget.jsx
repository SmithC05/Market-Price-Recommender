import React from 'react';
import { CloudRain, ThermometerSun, Wind } from 'lucide-react';

const WeatherWidget = () => {
    return (
        <div className="card">
            <h4 style={{ margin: '0 0 var(--spacing-md) 0' }}>Weather Context</h4>

            <div className="flex items-center gap-4" style={{ marginBottom: 'var(--spacing-md)' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>28°C</div>
                <div>
                    <div style={{ fontWeight: 600 }}>Partly Cloudy</div>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Humidity: 65%</div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-sm)' }}>
                <div style={{
                    backgroundColor: '#FFEBEE',
                    padding: '8px',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.85rem',
                    color: '#D32F2F'
                }}>
                    <CloudRain size={16} />
                    <span>High Rain Risk</span>
                </div>
                <div style={{
                    backgroundColor: '#E8F5E9',
                    padding: '8px',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.85rem',
                    color: '#2E7D32'
                }}>
                    <ThermometerSun size={16} />
                    <span>Normal Temp</span>
                </div>
            </div>
        </div>
    );
};

export default WeatherWidget;

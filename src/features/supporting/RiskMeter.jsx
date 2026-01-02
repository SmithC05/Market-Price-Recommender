import React from 'react';

const RiskMeter = ({ riskLevel = 'Medium', score = 65 }) => {
    const getColor = () => {
        if (riskLevel === 'Low') return 'var(--color-success)';
        if (riskLevel === 'Medium') return 'var(--color-accent)';
        return 'var(--color-danger)';
    };

    return (
        <div className="card">
            <h4 style={{ margin: '0 0 var(--spacing-md) 0' }}>Market Risk Meter</h4>

            <div style={{ position: 'relative', height: '20px', backgroundColor: '#e0e0e0', borderRadius: '10px', marginBottom: 'var(--spacing-sm)' }}>
                <div style={{
                    width: `${score}%`,
                    height: '100%',
                    backgroundColor: getColor(),
                    borderRadius: '10px',
                    transition: 'width 0.5s ease'
                }}></div>
            </div>

            <div className="flex justify-between items-center" style={{ justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold', color: getColor() }}>{riskLevel} Risk</span>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}> volatility score: {score}/100</span>
            </div>

            <p style={{ marginTop: 'var(--spacing-md)', fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
                Moderate fluctuation expected due to upcoming monsoon deviation.
            </p>
        </div>
    );
};

export default RiskMeter;

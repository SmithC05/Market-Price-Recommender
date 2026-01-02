import React from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

const PriceCard = ({ title, price, unit = 'Qtl', trend = 'neutral', difference }) => {
    const getTrendIcon = () => {
        if (trend === 'up') return <ArrowUp size={20} color="var(--color-success)" />;
        if (trend === 'down') return <ArrowDown size={20} color="var(--color-danger)" />;
        return <Minus size={20} color="var(--color-text-muted)" />;
    };

    const getTrendColor = () => {
        if (trend === 'up') return 'var(--color-success)';
        if (trend === 'down') return 'var(--color-danger)';
        return 'var(--color-text-muted)';
    };

    return (
        <div className="card" style={{ flex: 1, minWidth: '280px' }}>
            <div className="flex" style={{ justifyContent: 'space-between', marginBottom: 'var(--spacing-sm)' }}>
                <span style={{ color: 'var(--color-text-muted)', fontWeight: 500 }}>{title}</span>
                {getTrendIcon()}
            </div>
            <div className="flex items-center gap-2">
                <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                    ₹{price}
                </span>
                <span style={{ color: 'var(--color-text-muted)', alignSelf: 'flex-end', paddingBottom: '6px' }}>
                    / {unit}
                </span>
            </div>
            {difference && (
                <div style={{
                    marginTop: 'var(--spacing-sm)',
                    fontSize: '0.9rem',
                    color: getTrendColor(),
                    fontWeight: 600
                }}>
                    {trend === 'up' ? '+' : ''}{difference} from MSP
                </div>
            )}
        </div>
    );
};

export default PriceCard;

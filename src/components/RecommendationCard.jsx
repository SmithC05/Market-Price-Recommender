import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const RecommendationCard = ({ mandiName, expectedPrice, date, distance }) => {
    return (
        <div className="card" style={{
            border: '2px solid var(--color-primary)',
            backgroundColor: '#F1F8E9',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                padding: '4px 12px',
                borderBottomLeftRadius: 'var(--radius-md)',
                fontSize: '0.8rem',
                fontWeight: 'bold'
            }}>
                AI Pick
            </div>

            <div className="flex gap-2" style={{ marginBottom: 'var(--spacing-md)' }}>
                <div style={{ color: 'var(--color-primary)' }}>
                    <Sparkles size={24} />
                </div>
                <h3 style={{ margin: 0 }}>Best Selling Opportunity</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                <div>
                    <label style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Target Mandi</label>
                    <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>{mandiName}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--color-secondary)' }}>{distance} away</div>
                </div>
                <div>
                    <label style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Expected Price</label>
                    <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-primary-dark)' }}>
                        ₹{expectedPrice}
                    </div>
                </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid rgba(0,0,0,0.1)', margin: 'var(--spacing-md) 0' }} />

            <div className="flex items-center" style={{ justifyContent: 'space-between' }}>
                <div>
                    <span style={{ fontSize: '0.9rem' }}>Sell by: </span>
                    <strong>{date}</strong>
                </div>
                <button className="btn" style={{
                    padding: '8px 16px',
                    backgroundColor: 'white',
                    color: 'var(--color-primary)',
                    border: '1px solid var(--color-primary)'
                }}>
                    Book Slot <ArrowRight size={16} style={{ marginLeft: '4px' }} />
                </button>
            </div>
        </div>
    );
};

export default RecommendationCard;

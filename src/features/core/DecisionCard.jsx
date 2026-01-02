import React from 'react';
import { ArrowRight, AlertTriangle, CheckCircle } from 'lucide-react';

const DecisionCard = ({ recommendation = 'SELL', confidence = 85, mandi, price, reason }) => {
    const isSell = recommendation === 'SELL';

    return (
        <div className="card" style={{
            backgroundImage: isSell
                ? 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)'
                : 'linear-gradient(135deg, #F57F17 0%, #FBC02D 100%)',
            color: 'white',
            border: 'none',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background decoration */}
            <div style={{ position: 'absolute', right: '-20px', top: '-20px', opacity: 0.1 }}>
                {isSell ? <CheckCircle size={150} /> : <AlertTriangle size={150} />}
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
                <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-md)' }}>
                    <div>
                        <span style={{
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            letterSpacing: '0.5px'
                        }}>
                            AI RECOMMENDATION
                        </span>
                        <h2 style={{ margin: '12px 0', fontSize: '2.5rem', fontWeight: 800 }}>
                            {isSell ? 'SELL NOW' : 'WAIT'}
                        </h2>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '3rem', fontWeight: 'bold', lineHeight: 1 }}>{confidence}%</div>
                        <small style={{ opacity: 0.8 }}>Confidence</small>
                    </div>
                </div>

                <p style={{ fontSize: '1.1rem', marginBottom: 'var(--spacing-lg)', opacity: 0.9, maxWidth: '80%' }}>
                    {reason}
                </p>

                <div className="card" style={{
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    color: 'var(--color-text-main)',
                    padding: 'var(--spacing-md)',
                    marginBottom: '0'
                }}>
                    <div className="flex items-center justify-between">
                        <div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Recommended Market</div>
                            <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{mandi}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Expected Rate</div>
                            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--color-primary-dark)' }}>₹{price}/Qtl</div>
                        </div>
                        <button className="btn btn-primary" style={{ padding: '8px 16px' }}>
                            Sell <ArrowRight size={16} style={{ marginLeft: '4px' }} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DecisionCard;

import React from 'react';
import { TrendingUp, MapPin } from 'lucide-react';

const Hero = ({ onGetStarted }) => {
    return (
        <div style={{
            backgroundColor: 'var(--color-primary-dark)',
            color: 'white',
            padding: 'var(--spacing-xl) 0',
            textAlign: 'center',
            borderBottomLeftRadius: '2rem',
            borderBottomRightRadius: '2rem',
            marginBottom: 'var(--spacing-xl)'
        }}>
            <div className="container">
                <h2 style={{ color: '#E8F5E9', fontSize: '2rem', marginBottom: 'var(--spacing-md)' }}>
                    Right Price, Right Time
                </h2>
                <p style={{
                    fontSize: '1.2rem',
                    opacity: 0.9,
                    maxWidth: '600px',
                    margin: '0 auto var(--spacing-lg) auto'
                }}>
                    Maximize your crop profits with AI-driven price predictions and real-time Mandi rates using KisaanMandi.
                </p>

                <div className="flex gap-2" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                        className="btn"
                        onClick={onGetStarted}
                        style={{
                            backgroundColor: 'var(--color-accent)',
                            color: 'var(--color-text-main)',
                            padding: '12px 24px',
                            fontSize: '1.1rem'
                        }}
                    >
                        <TrendingUp size={20} style={{ marginRight: '8px' }} />
                        Check Rates
                    </button>
                    <button
                        className="btn"
                        style={{
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            backdropFilter: 'blur(4px)',
                            padding: '12px 24px',
                            fontSize: '1.1rem'
                        }}
                    >
                        <MapPin size={20} style={{ marginRight: '8px' }} />
                        Find Mandi
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;

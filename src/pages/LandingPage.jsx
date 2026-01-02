import React from 'react';
import Hero from '../components/Hero';
import { Smartphone, TrendingUp, ShieldCheck } from 'lucide-react';

const LandingPage = ({ onEnterApp }) => {
    const features = [
        {
            icon: <TrendingUp size={32} color="var(--color-primary)" />,
            title: 'Real-Time Prices',
            desc: 'Get live updates from 500+ mandis across India.'
        },
        {
            icon: <Smartphone size={32} color="var(--color-secondary)" />,
            title: 'AI Recommendations',
            desc: 'Know exactly when and where to sell for maximum profit.'
        },
        {
            icon: <ShieldCheck size={32} color="var(--color-accent)" />,
            title: 'MSP Alerts',
            desc: 'Instant warnings if market prices drop below MSP.'
        }
    ];

    return (
        <div>
            <Hero onGetStarted={onEnterApp} />

            <section className="container" style={{ marginBottom: 'var(--spacing-xl)' }}>
                <h3 className="text-center" style={{ marginBottom: 'var(--spacing-lg)', fontSize: '1.5rem' }}>
                    Why Farmers Trust Us
                </h3>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 'var(--spacing-md)'
                }}>
                    {features.map((f, i) => (
                        <div key={i} className="card" style={{ textAlign: 'center', padding: 'var(--spacing-lg)' }}>
                            <div style={{ marginBottom: 'var(--spacing-md)' }}>{f.icon}</div>
                            <h4 style={{ fontSize: '1.2rem' }}>{f.title}</h4>
                            <p style={{ color: 'var(--color-text-muted)' }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section style={{ backgroundColor: '#E8F5E9', padding: 'var(--spacing-xl) 0' }}>
                <div className="container text-center">
                    <h3>Start Maximizing Your Profits Today</h3>
                    <button
                        className="btn btn-primary"
                        onClick={onEnterApp}
                        style={{ marginTop: 'var(--spacing-md)', fontSize: '1.1rem' }}
                    >
                        Open Dashboard
                    </button>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;

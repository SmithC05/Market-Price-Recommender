import React from 'react';
import { Menu, Globe } from 'lucide-react';

const Header = () => {
    return (
        <header style={{
            backgroundColor: 'var(--color-surface)',
            borderBottom: '1px solid #e0e0e0',
            padding: 'var(--spacing-md) 0',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div className="container flex items-center" style={{ justifyContent: 'space-between' }}>
                <div className="flex items-center gap-2">
                    <div style={{
                        backgroundColor: 'var(--color-primary)',
                        width: '40px',
                        height: '40px',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <div>
                        <h1 style={{ fontSize: '1.2rem', margin: 0, lineHeight: 1 }}>KisanMandi</h1>
                        <small style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>AI Price Recommender</small>
                    </div>
                </div>

                <nav className="desktop-nav" style={{ display: 'none' }}>
                    {/* Will be hidden on mobile, shown on desktop later */}
                    <a href="#" style={{ marginRight: '20px' }}>Home</a>
                    <a href="#" style={{ marginRight: '20px' }}>Dashboard</a>
                    <a href="#">Mandi Rates</a>
                </nav>

                <div className="flex items-center gap-2">
                    <button className="btn" style={{ padding: '8px', color: 'var(--color-primary-dark)' }}>
                        <Globe size={24} />
                    </button>
                    <button className="btn" style={{ padding: '8px', color: 'var(--color-primary-dark)' }}>
                        <Menu size={24} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;

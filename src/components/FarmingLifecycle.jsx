import React from 'react';
import { Sprout, Sun, Tractor, CheckCircle2 } from 'lucide-react';

const FarmingLifecycle = ({ currentStage = 'season' }) => {
    const stages = [
        { id: 'sowing', label: 'Before Sowing', icon: <Sprout size={20} /> },
        { id: 'season', label: 'During Season', icon: <Sun size={20} /> },
        { id: 'harvest', label: 'After Harvest', icon: <Tractor size={20} /> }
    ];

    return (
        <div className="card" style={{ marginBottom: 'var(--spacing-lg)', padding: 'var(--spacing-md)' }}>
            <h4 style={{ margin: '0 0 var(--spacing-md) 0', color: 'var(--color-primary-dark)' }}>Farming Lifecycle Context</h4>
            <div className="flex" style={{ position: 'relative', justifyContent: 'space-between', alignItems: 'center' }}>

                {/* Progress Line */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '0',
                    right: '0',
                    height: '4px',
                    backgroundColor: '#e0e0e0',
                    zIndex: 0,
                    transform: 'translateY(-50%)'
                }}></div>

                {stages.map((stage, index) => {
                    const isActive = stage.id === currentStage;
                    const isPast = stages.findIndex(s => s.id === currentStage) > index;

                    let bgColor = '#fff';
                    let borderColor = '#e0e0e0';
                    let iconColor = 'var(--color-text-muted)';

                    if (isActive) {
                        bgColor = 'var(--color-primary)';
                        borderColor = 'var(--color-primary)';
                        iconColor = '#fff';
                    } else if (isPast) {
                        bgColor = 'var(--color-success)';
                        borderColor = 'var(--color-success)';
                        iconColor = '#fff';
                    }

                    return (
                        <div key={stage.id} className="flex flex-col items-center" style={{ zIndex: 1, position: 'relative' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                backgroundColor: bgColor,
                                border: `2px solid ${borderColor}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: iconColor,
                                marginBottom: '8px',
                                transition: 'all 0.3s ease'
                            }}>
                                {isPast ? <CheckCircle2 size={24} /> : stage.icon}
                            </div>
                            <span style={{
                                fontSize: '0.9rem',
                                fontWeight: isActive ? 700 : 500,
                                color: isActive ? 'var(--color-primary-dark)' : 'var(--color-text-muted)'
                            }}>
                                {stage.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FarmingLifecycle;

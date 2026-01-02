import React from 'react';

const MSPComparison = ({ mspPrice, marketPrice }) => {
    const difference = marketPrice - mspPrice;
    const isProfit = difference > 0;
    const diffPercent = ((difference / mspPrice) * 100).toFixed(1);

    return (
        <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h4 style={{ margin: '0 0 var(--spacing-md) 0' }}>MSP vs Market Price</h4>

            <div className="flex items-center gap-4" style={{ marginBottom: 'var(--spacing-lg)' }}>
                {/* MSP Bar */}
                <div style={{ flex: 1 }}>
                    <div style={{
                        height: '150px',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '8px',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            width: '100%',
                            height: '70%',
                            backgroundColor: '#9E9E9E',
                            borderTopLeftRadius: '8px',
                            borderTopRightRadius: '8px',
                            opacity: 0.8
                        }}></div>
                        <span style={{ position: 'absolute', bottom: '10px', fontWeight: 'bold', color: 'white' }}>MSP</span>
                    </div>
                    <div className="text-center mt-4">
                        <div style={{ fontWeight: 'bold' }}>₹{mspPrice}</div>
                        <small style={{ color: 'var(--color-text-muted)' }}>Govt. Floor</small>
                    </div>
                </div>

                {/* Market Bar */}
                <div style={{ flex: 1 }}>
                    <div style={{
                        height: '150px',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '8px',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        border: isProfit ? '2px solid var(--color-success)' : '2px solid var(--color-danger)'
                    }}>
                        <div style={{
                            width: '100%',
                            height: '85%',
                            backgroundColor: isProfit ? 'var(--color-success)' : 'var(--color-danger)',
                            borderTopLeftRadius: '6px',
                            borderTopRightRadius: '6px'
                        }}></div>
                        <span style={{ position: 'absolute', bottom: '10px', fontWeight: 'bold', color: 'white' }}>Current</span>
                    </div>
                    <div className="text-center mt-4">
                        <div style={{ fontWeight: 'bold', color: isProfit ? 'var(--color-success)' : 'var(--color-danger)' }}>₹{marketPrice}</div>
                        <small style={{ color: 'var(--color-text-muted)' }}>Mandi Rate</small>
                    </div>
                </div>
            </div>

            <div style={{
                padding: 'var(--spacing-sm)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isProfit ? '#E8F5E9' : '#FFEBEE',
                color: isProfit ? 'var(--color-success)' : 'var(--color-danger)',
                textAlign: 'center',
                fontWeight: 'bold'
            }}>
                {isProfit ? `+ ₹${difference} Profit per Qtl` : `- ₹${Math.abs(difference)} Loss per Qtl`}
            </div>
        </div>
    );
};

export default MSPComparison;

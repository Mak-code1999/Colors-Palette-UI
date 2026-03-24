import React from 'react';
import { useColorContext } from '../context/ColorContext';

const Favorites = () => {
    const { colors, lockedCount } = useColorContext();
    const favoriteColors = colors.filter(c => c.locked);

    return (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '30px' }}>Your Favorite Colors 🎨</h1>
            
            {lockedCount === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '100px', color: '#888' }}>
                    <p style={{ fontSize: '1.2rem' }}>No colors locked yet! 🔒</p>
                    <p>Go back to the generator and lock some colors to see them here.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                    {favoriteColors.map((c, i) => (
                        <div key={i} className="fav-card" style={{ 
                            background: 'white', 
                            padding: '15px', 
                            borderRadius: '12px', 
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <div style={{ 
                                backgroundColor: c.color, 
                                width: '100%', 
                                height: '120px', 
                                borderRadius: '8px' 
                            }}></div>
                            <div style={{ textAlign: 'center' }}>
                                <strong>{c.name}</strong>
                                <p style={{ margin: '5px 0', fontSize: '0.9rem', color: '#666' }}>{c.color}</p>
                                <span style={{ fontSize: '0.7rem', color: '#999' }}>{c.hsl}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;

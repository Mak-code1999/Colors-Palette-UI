import React from 'react';
import ColorCards from '../Components/ColorCards';
import { useColorContext } from '../context/ColorContext';

const Generator = () => {
    const { colors, loading, toggleLock } = useColorContext();

    return (
        <div style={{ display: 'flex', flex: 1, height: 'calc(100vh - 70px)' }}>
            {loading && (
                <div style={{ position: 'fixed', top: 0, left: 0, height: '100%', width: '100%', background: 'rgba(0, 0, 0, 0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem' }}>
                    Generating...
                </div>
            )}
            
            {colors.map((color, index) => (
                <ColorCards
                    key={index}
                    color={color}
                    toggleLock={() => toggleLock(index)}
                />
            ))}
        </div>
    );
};

export default Generator;

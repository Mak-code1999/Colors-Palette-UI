import React, { createContext, useState, useContext, useEffect } from 'react';
import { initialColors } from '../data/initialColors';
import { fetchColorData } from '../services/colorService';

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
    const [colors, setColors] = useState(initialColors);
    const [loading, setLoading] = useState(false);

    const getRandomColor = () => {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    };


    const generateNewColors = async () => {

        setLoading(true);
        const nextColors = await Promise.all(
            colors.map(async (c) => {
                if (c.locked) return c;
                const newHex = getRandomColor();
                const data = await fetchColorData(newHex);
                return { ...c, color: data.hex, name: data.name, hsl: data.hsl };
            })
        );
        setColors(nextColors);
        setLoading(false);
    };

    const toggleLock = (index) => {
        setColors((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], locked: !updated[index].locked };
            return updated;
        });
    };

    const saveCurrentPalette = () => {
        localStorage.setItem("mySavedColors", JSON.stringify(colors));
        alert("Palette Saved Over the Internet! (Well, locally for now!) 🧠🎨");
    };

    useEffect(() => {
        const saved = localStorage.getItem("mySavedColors");
        if (saved) {
            setColors(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === ' ' && !loading) {
                e.preventDefault();
                generateNewColors();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [colors, loading]);

    const value = {
        colors,
        loading,
        generateNewColors,
        toggleLock,
        saveCurrentPalette,
        lockedCount: colors.filter(c => c.locked).length
    };

    return (
        <ColorContext.Provider value={value}>
            {children}
        </ColorContext.Provider>
    );
};

export const useColorContext = () => {
    const context = useContext(ColorContext);
    if (!context) {
        throw new Error('useColorContext must be used within a ColorProvider');
    }
    return context;
};

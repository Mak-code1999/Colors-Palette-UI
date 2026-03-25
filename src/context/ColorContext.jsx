import React, { createContext, useState, useContext, useEffect } from 'react';
import { initialColors } from '../data/initialColors';
import { fetchColorData } from '../services/colorService';

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
    const [colors, setColors] = useState(initialColors);
    const [palettes, setPalettes] = useState([]);
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

    const savePaletteWithName = (name) => {
        const newPalette = {
            id: Date.now(),
            name: name,
            colors: [...colors]
        };

        const updatedPalettes = [...palettes, newPalette];
        setPalettes(updatedPalettes);
        localStorage.setItem("mySavedPalettes", JSON.stringify(updatedPalettes));
    };

    const deletePalette = (id) => {
        const updatedPalettes = palettes.filter(p => p.id !== id);
        setPalettes(updatedPalettes);
        localStorage.setItem("mySavedPalettes", JSON.stringify(updatedPalettes));
    };

    const editPalette = (id, newName) => {
        const updatedPalettes = palettes.map(p => 
            p.id === id ? { ...p, name: newName } : p
        );
        setPalettes(updatedPalettes);
        localStorage.setItem("mySavedPalettes", JSON.stringify(updatedPalettes));
    };

    const loadColors = (newColors) => {
        setColors(newColors);
    };

    useEffect(() => {
        const savedPalettes = localStorage.getItem("mySavedPalettes");
        if (savedPalettes) {
            setPalettes(JSON.parse(savedPalettes));
        }

        // Keep the old single palette logic if needed, or migration
        const savedColors = localStorage.getItem("mySavedColors");
        if (savedColors && !colors.some(c => c.locked)) {
             setColors(JSON.parse(savedColors));
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
        palettes,
        generateNewColors,
        toggleLock,
        savePaletteWithName,
        deletePalette,
        editPalette,
        loadColors,
        lockedCount: colors.filter(c => c.locked).length,
        savedPalettesCount: palettes.length
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

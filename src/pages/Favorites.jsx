import React from 'react';
import { useColorContext } from '../context/ColorContext';
import { Trash2, Pencil, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Favorites = () => {
    const { palettes, deletePalette, editPalette, loadColors } = useColorContext();
    const navigate = useNavigate();

    const handleEdit = (id, currentName) => {
        const newName = prompt("Edit palette name:", currentName);
        if (newName && newName !== currentName) {
            editPalette(id, newName);
        }
    };

    const handleLoad = (colors) => {
        loadColors(colors);
        navigate('/');
    };

    return (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', flex: 1, overflowY: 'auto' }}>
            <h1 style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                Saved Palettes 🎨
                <span style={{ fontSize: '1rem', background: '#eee', padding: '5px 12px', borderRadius: '20px', fontWeight: 'normal' }}>
                    {palettes.length} total
                </span>
            </h1>
            
            {palettes.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '100px', color: '#888' }}>
                    <p style={{ fontSize: '1.2rem' }}>No palettes saved yet! 🔒</p>
                    <p>Go back to the generator and click "Save" to start your collection.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
                    {palettes.map((palette) => (
                        <div key={palette.id} className="palette-card" style={{ 
                            background: 'white', 
                            padding: '20px', 
                            borderRadius: '16px', 
                            boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '15px',
                            transition: 'transform 0.2s',
                            cursor: 'default'
                        }}>
                            {/* Color Strip */}
                            <div 
                                onClick={() => handleLoad(palette.colors)}
                                style={{ 
                                    display: 'flex', 
                                    height: '80px', 
                                    borderRadius: '12px', 
                                    overflow: 'hidden', 
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)' 
                                }}
                            >
                                {palette.colors.map((c, i) => (
                                    <div key={i} style={{ backgroundColor: c.color, flex: 1 }} title={`${c.name} (${c.color})`}></div>
                                ))}
                            </div>

                            {/* Header / Info */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{palette.name}</h3>
                                    <span style={{ fontSize: '0.8rem', color: '#999' }}>
                                        {new Date(palette.id).toLocaleDateString()}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button 
                                        onClick={() => handleLoad(palette.colors)}
                                        title="Load into Generator"
                                        style={{ background: '#000', border: 'none', padding: '10px 14px', borderRadius: '10px', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}
                                    >
                                        <ExternalLink size={16} />
                                        <span style={{ fontSize: '0.8rem' }}>Edit Palette</span>
                                    </button>
                                    <button 
                                        onClick={() => handleEdit(palette.id, palette.name)}
                                        title="Rename"
                                        style={{ background: '#f0f0f0', border: 'none', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}
                                    >
                                        <Pencil size={16} color="#666" />
                                    </button>
                                    <button 
                                        onClick={() => deletePalette(palette.id)}
                                        title="Delete"
                                        style={{ background: '#ffebeb', border: 'none', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}
                                    >
                                        <Trash2 size={16} color="#ff4d4d" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;

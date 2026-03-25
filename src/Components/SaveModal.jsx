import React, { useState } from 'react';
import { X } from 'lucide-react';

const SaveModal = ({ isOpen, onClose, onSave, currentColors }) => {
    const [name, setName] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            onSave(name.trim());
            setName('');
            onClose();
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)'
        }}>
            <div style={{
                background: 'white',
                padding: '30px',
                borderRadius: '24px',
                width: '400px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                position: 'relative',
                animation: 'modalSlideIn 0.3s ease-out'
            }}>
                <button 
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#999'
                    }}
                >
                    <X size={20} />
                </button>

                <h2 style={{ marginBottom: '10px', fontSize: '1.5rem', fontWeight: '700' }}>Save Palette</h2>
                <p style={{ color: '#666', marginBottom: '25px', fontSize: '0.9rem' }}>Give your beautiful creation a name!</p>

                {/* Preview Strip */}
                <div style={{ 
                    display: 'flex', 
                    height: '50px', 
                    borderRadius: '12px', 
                    overflow: 'hidden', 
                    marginBottom: '25px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }}>
                    {currentColors.map((c, i) => (
                        <div key={i} style={{ backgroundColor: c.color, flex: 1 }}></div>
                    ))}
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '25px' }}>
                        <label 
                            htmlFor="paletteName" 
                            style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 'bold', color: '#444' }}
                        >
                            Palette Name
                        </label>
                        <input
                            id="paletteName"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Sunset Dreams"
                            autoFocus
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                borderRadius: '12px',
                                border: '2px solid #eee',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'border-color 0.2s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#000'}
                            onBlur={(e) => e.target.style.borderColor = '#eee'}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                flex: 1,
                                padding: '12px',
                                borderRadius: '12px',
                                border: 'none',
                                background: '#f5f5f5',
                                color: '#666',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!name.trim()}
                            style={{
                                flex: 2,
                                padding: '12px',
                                borderRadius: '12px',
                                border: 'none',
                                background: name.trim() ? '#000' : '#ccc',
                                color: 'white',
                                fontWeight: '600',
                                cursor: name.trim() ? 'pointer' : 'not-allowed',
                                transition: 'background 0.2s'
                            }}
                        >
                            Save Palette
                        </button>
                    </div>
                </form>
            </div>
            
            <style>
                {`
                    @keyframes modalSlideIn {
                        from { transform: translateY(20px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                `}
            </style>
        </div>
    );
};

export default SaveModal;

import React, { useState, useEffect } from 'react'
import ColorCards from './Components/ColorCards'
import Navbar from './Components/Navbar'

const App = () => {
  const [colors, setColors] = useState([
    { color: '#EDAFB8', name: 'Cameo Pink', locked: false },
    { color: '#F7E1D7', name: 'Alabaster', locked: false },
    { color: '#DEDBD2', name: 'Warm Gray', locked: false },
    { color: '#B0C4B1', name: 'Sage Green', locked: false },
    { color: '#4A5759', name: 'Dark Slate Gray', locked: false }
  ])
  const [showList, setShowList] = useState(false);

  const getRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
  }

  const generateNewColors = async () => {
    const nextColors = await Promise.all(colors.map(async (c) => {
      if (c.locked) return c;

      const newHex = getRandomColor();
      const response = await fetch(`https://www.thecolorapi.com/id?hex=${newHex.substring(1)}`);
      const data = await response.json();
      return { ...c, color: newHex, name: data.name.value };
    }));
    setColors(nextColors);
  }
  const toggleLock = (index) => {
    setColors(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], locked: !updated[index].locked };
      return updated;
    });
  }

  const lockedCount = colors.filter(c => c.locked).length;

  const saveCurrentPalette = () => {
    localStorage.setItem("mySavedColors", JSON.stringify(colors));
    alert("Palette Saved over the internet")
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ') {
        e.preventDefault();
        generateNewColors();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [colors]);

  useEffect(() => {
    const saved = localStorage.getItem("mySavedColors");
    if (saved) {
      setColors(JSON.parse(saved));
    }
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden', textAlign: 'center' }}>
      <Navbar savedCount={lockedCount} onSave={saveCurrentPalette} onListClick={() =>
        setShowList(!showList)} />
      {showList && (
        <div className="side-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3>Your Favorites</h3>
            <button onClick={() => setShowList(false)}>✕</button>
          </div>
          {colors.filter(c => c.locked).map((c, i) => (
            <div key={i} className="list-item">
              <div style={{ backgroundColor: c.color, width: '20px', height: '20px', borderRadius: '4px' }}></div>
              <strong>{c.name}</strong> ({c.color})
            </div>
          ))}
          {lockedCount === 0 && <p style={{ color: '#888' }}>No colors locked yet! 🔒</p>}
        </div>
      )}
      <div style={{ display: 'flex', flex: 1 }}>
        {colors.map((color, index) => (
          <ColorCards
            key={index}
            color={color}
            toggleLock={() => toggleLock(index)}
          />
        ))}
      </div>
    </div>
  )
}
export default App

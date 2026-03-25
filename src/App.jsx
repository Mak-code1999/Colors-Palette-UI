import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Generator from './pages/Generator'
import Favorites from './pages/Favorites'
import SaveModal from './Components/SaveModal'
import { useColorContext } from './context/ColorContext'

const App = () => {
    const { colors, savedPalettesCount, savePaletteWithName } = useColorContext();
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden' }}>
            <Navbar 
                savedCount={savedPalettesCount} 
                onSave={() => setIsSaveModalOpen(true)} 
            />

            <Routes>
                <Route path="/" element={<Generator />} />
                <Route path="/saved" element={<Favorites />} />
            </Routes>

            {/* Save Palette Modal */}
            <SaveModal 
                isOpen={isSaveModalOpen}
                onClose={() => setIsSaveModalOpen(false)}
                onSave={savePaletteWithName}
                currentColors={colors}
            />
        </div>
    )
}

export default App

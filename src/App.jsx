import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Generator from './pages/Generator'
import Favorites from './pages/Favorites'
import { useColorContext } from './context/ColorContext'

const App = () => {
    const { lockedCount, saveCurrentPalette } = useColorContext();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden' }}>
            <Navbar 
                savedCount={lockedCount} 
                onSave={saveCurrentPalette} 
            />

            <Routes>
                <Route path="/" element={<Generator />} />
                <Route path="/saved" element={<Favorites />} />
            </Routes>
        </div>
    )
}

export default App

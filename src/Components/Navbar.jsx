import React from 'react'
import { Save, LayoutList } from 'lucide-react'

// Navbar.jsx
const Navbar = ({ savedCount, onSave, onListClick }) => { // <--- ADD onListClick here
    return (
        <nav className="navbar">
            <div className="logo">Color UI</div>
            <div className="nav-buttons">
                <button className="nav-btn" onClick={onSave}>
                    <Save size={18} />
                    <span>Save</span>
                    {savedCount > 0 && <span className="badge">{savedCount}</span>}
                </button>

                {/* ADD THE ONCLICK HERE! */}
                <button className="nav-btn" onClick={onListClick}>
                    <LayoutList size={18} />
                    <span>List</span>
                </button>
            </div>
        </nav >
    )
}

export default Navbar

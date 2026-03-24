import { Save, ClipboardList } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

const Navbar = ({ savedCount, onSave }) => { 
    const location = useLocation();
    const navigate = useNavigate();
    const isGenerator = location.pathname === '/';

    return (
        <nav className="navbar">
            <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                Color UI
            </div>
            
            <div className="nav-buttons">
                {/* Only show Save button on the generator page */}
                {isGenerator && (
                    <button className="nav-btn" onClick={onSave}>
                        <Save size={18} />
                        <span>Save</span>
                        {savedCount > 0 && <span className="badge">{savedCount}</span>}
                    </button>
                )}

                <button className="nav-btn" onClick={() => navigate('/saved')}>
                    <ClipboardList size={18} />
                    <span>List</span>
                </button>
            </div>
        </nav >
    )
}








export default Navbar

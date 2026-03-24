import React, { useState } from 'react'
import { LockKeyhole, LockKeyholeOpen, Copy } from 'lucide-react'

const ColorCards = ({ color, toggleLock }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ backgroundColor: color.color }}
            className="color-bar"
        >
            <h2 className='h2'>{color.color || color.hex}</h2>
            <p className='font-medium' style={{ margin: '5px 0' }}>{color.name}</p>
            {color.rgb && <p style={{ fontSize: '0.8rem', opacity: 0.7 }}></p>}


            {isHovered && (
                <div className="ishovered">
                    <button onClick={() => navigator.clipboard.writeText(color.color)}>
                        <Copy size={20} />
                        <span>Copy</span>
                    </button>

                    <button onClick={toggleLock}>
                        {color.locked ? <LockKeyhole size={20} /> : <LockKeyholeOpen size={20} />}
                        <span>{color.locked ? 'Unlock' : 'Lock'}</span>
                    </button>
                </div>
            )}
        </div>
    )
}

export default ColorCards

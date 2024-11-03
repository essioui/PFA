import React from 'react';
import '../App.css';

export default function Modal({ onClose, children }) {
    
    return (
        <div className='modals'>
            <div className='modal' >
                <button onClick={onClose} className='xBtn'>X</button>
                {children}
            </div>
        </div>
    );
}

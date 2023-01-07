import React from 'react';

interface props {
    children?: React.ReactNode
    isOpen: boolean,
    onClose: () => void,
}

export default function Popup({children, isOpen, onClose}: props) {
    function closeByOverlay(e: React.MouseEvent<HTMLDivElement>) {
        const {target, currentTarget} = e;
        if (target !== currentTarget) return;
        onClose();
    }

    return (
        <div className={`popup ${isOpen && 'popup_opened'}`} onClick={closeByOverlay}>
            {children}
        </div>
    );
};

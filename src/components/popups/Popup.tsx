import React from 'react';
import {useAppSelector} from "../../hooks/redux";
import {groups} from "../../utils/Interfaces";

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

import React from 'react';
import {useAppSelector} from "../../hooks/redux";
import {groups} from "../../utils/Interfaces";

interface props {
    children?: React.ReactNode
    isOpen: boolean,
    title: string,
    buttonText?: string,
    onClose: () => void,
    adminRequire?: boolean
}

export default function Popup({children, title, buttonText, adminRequire, isOpen, onClose}: props) {
    const {loggedIn, user: {group}} = useAppSelector(state => state.user)

    function closeByOverlay(e: React.MouseEvent<HTMLDivElement>) {
        const {target, currentTarget} = e;
        if (target !== currentTarget) return;
        onClose();
    }

    return (
        <div className={`popup ${isOpen && 'popup_opened'}`} onClick={closeByOverlay}>
            <form className='popup__form'>
                <h2 className='popup__header'>{title}</h2>
                {children}
                <button className='popup__submit-button'
                        disabled={!loggedIn || (adminRequire && group !== groups.ADMIN) || true}
                        type="submit">{buttonText || 'Сохранить'}</button>
            </form>
        </div>
    );
};

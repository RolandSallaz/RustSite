import React, {FC, ReactNode} from 'react';

interface props {
    isOpen: boolean,
    onClose: () => void,
    children: ReactNode
}

const Popup: FC<props> = ({isOpen, onClose, children}) => {
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
export default Popup
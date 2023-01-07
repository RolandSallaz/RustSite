import React from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {popupSlice} from "../../services/slices/popupSlice";

function ServerListMenu() {
    const dispatch = useAppDispatch()
    const {popups: {isServerListOpened}, server: {servers}} = useAppSelector(state => state)

    function toggleServerListOpen() {
        dispatch(popupSlice.actions.setServerListOpened(!isServerListOpened))
    }

    function handleServerConnect(ip: String) {
        window.open(`steam://connect/${ip}:20815`)
    }

    function handleBackgroundClick(e: React.MouseEvent<HTMLDivElement>) {
        const {target, currentTarget} = e;
        if (target == currentTarget && isServerListOpened) {
            toggleServerListOpen();
        }
    }

    return (
        <div className='ServerListMenu'
             style={{width: isServerListOpened ? '100vw' : 0}}
             onClick={handleBackgroundClick}>
            <div className='ServerListMenu__content'>
                <ul className={`server-list ${isServerListOpened && 'server-list_is-open'}`}>
                    {
                        servers.map(item => (
                            <li key={item._id}
                                className={`server-list__item ${!item.enabled && 'server-list__item_offline'}`}
                                onClick={() => handleServerConnect(item.ip)}>
                                <h3 className='server'>{item.info.Hostname}</h3>
                                <div className='server__container'>
                                    <p>{`Онлайн ${item.info.Players}`}</p>
                                    <p>{`Карта ${item.info.Map}`}</p>
                                </div>
                            </li>
                        ))
                    }
                </ul>
                <h2 className='ServerListMenu__heading' onClick={toggleServerListOpen}>Servers</h2>
            </div>
        </div>
    );
}

export default ServerListMenu;
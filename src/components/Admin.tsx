import AddServerPopup from "./popups/AddServerPopup";
import {popupSlice} from "../services/slices/popupSlice";
import {useAppDispatch, useAppSelector} from "../hooks/redux";

export default function Admin() {
    const dispatch = useAppDispatch()
    const {servers} = useAppSelector((state) => state.server)

    function handleAddServerPopupOpen() {
        dispatch(popupSlice.actions.setAddServerPopupOpened(true))
    }

    function handleDeleteServerPopupOpen() {

    }

    return (
        <>
            <main className="main">
                <h2>Admin panel</h2>
                <div className="settings">
                    <div className='settings__container'>
                        <p className='settings__server-status'>{`Подключенных серверов: ${servers.length}`}</p>
                        <ul className='settings-list'>
                            <li className='settings-list__item'>
                                <button className='settings__add-button' onClick={handleAddServerPopupOpen}>Добавить
                                    сервер
                                </button>
                                <button className='settings__add-button' onClick={handleDeleteServerPopupOpen}>Удалить
                                    сервер
                                </button>
                            </li>
                            <li className='settings-list__item'>
                                <button className='settings__add-button'>Редактировать товары</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
            <AddServerPopup/>
        </>
    )
}

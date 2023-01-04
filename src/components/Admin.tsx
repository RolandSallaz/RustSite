import AddServerPopup from "./popups/AddServerPopup";
import {popupSlice} from "../services/slices/popupSlice";
import {useAppDispatch} from "../hooks/redux";

export default function Admin() {
    const dispatch = useAppDispatch()

    function handleAddServerPopupOpen() {
        dispatch(popupSlice.actions.setAddServerPopupOpened(true))
    }

    return (
        <>
            <main className="main">
                <h2>Admin panel</h2>
                <div className="settings">
                    <div className='settings__container'>
                        <p>Подключенных серверов: 0</p>
                        <button className='settings__add-button' onClick={handleAddServerPopupOpen}>Добавить сервер</button>
                        <button className='settings__add-button'>Редактировать товары</button>
                    </div>
                </div>
            </main>
            <AddServerPopup/>
        </>
    )
}

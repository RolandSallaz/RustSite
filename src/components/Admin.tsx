import AddServerPopup from "./popups/AddServerPopup";
import {popupSlice} from "../services/slices/popupSlice";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import EditServerPopup from "./popups/EditServerPopup";
import {RxArrowRight} from "react-icons/rx";
import RconManager from "./RconManager";
import EditProductPopup from "./popups/EditProductPopup";

export default function Admin() {
    const dispatch = useAppDispatch()
    const {servers} = useAppSelector((state) => state.server)

    function handleAddServerPopupOpen() {
        dispatch(popupSlice.actions.setAddServerPopupOpened(true))
    }

    function handleEditServerPopupOpen() {
        dispatch(popupSlice.actions.setEditServerPopupOpened(true))
    }

    function handleEditProductPopupOpen(){
        dispatch(popupSlice.actions.setEditProductPopupOpened(true))
    }

    return (
        <>
            <main className="main">

                <div className="settings">
                    <h2>Admin panel</h2>
                    <div className='settings__container'>
                        <p className='settings__server-status'>{`Подключенных серверов: ${servers.length}`}</p>
                        <ul className='settings-list'>
                            <li className='settings-list__item' >
                                <button className='settings__add-button' onClick={handleAddServerPopupOpen}>Добавить
                                    сервер
                                </button>
                                <button className='settings__add-button' onClick={handleEditServerPopupOpen}>
                                    Изменить сервер
                                </button>
                            </li>
                            <li className='settings-list__item'>
                                <button className='settings__add-button' onClick={handleEditProductPopupOpen}>Редактировать товары</button>
                            </li>
                        </ul>
                        <RconManager/>
                    </div>
                </div>
            </main>
            <AddServerPopup/>
            <EditServerPopup/>
            <EditProductPopup/>
        </>
    )
}

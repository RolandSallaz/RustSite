import Popup from "./Popup";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {popupSlice} from "../../services/slices/popupSlice";
import Server from "../Server";
import {BiEdit, BiTrash} from "react-icons/bi";
import {IServer} from "../../utils/Interfaces";
import {deleteServer} from "../../services/actions/api";

function EditServerPopup() {
    const dispatch = useAppDispatch();
    const {popups: {isEditServerPopupOpened}, server: {servers}} = useAppSelector(app => app)

    function handleClosePopup() {
        dispatch(popupSlice.actions.setEditServerPopupOpened(false));
    }

    function handleDeleteServer(server: IServer) {
        dispatch(deleteServer(server._id));
    }

    return (
        <Popup isOpen={isEditServerPopupOpened} onClose={handleClosePopup}>
            <div className='popup__form'>
                <ul className='edit-server-list'>
                    {servers?.map((item) => (
                        <li className='edit-server-list__item' key={item._id}>
                            <Server serverData={item}/>
                            <button className='edit-server-list__button edit-server-list__button_edit'>
                                <BiEdit/>
                            </button>
                            <button className='edit-server-list__button edit-server-list__button_delete'
                                    onClick={() => handleDeleteServer(item)}>
                                <BiTrash/>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </Popup>
    );
}

export default EditServerPopup;
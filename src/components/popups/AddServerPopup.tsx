import React, {useState} from 'react';
import Popup from "./Popup";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {popupSlice} from "../../services/slices/popupSlice";

interface IInputData {
    ip: string,
    port: string
}

const AddServerPopup = () => {
    const [inputData, setInputData] = useState<IInputData>({ip: '', port: '28016'});
    const {isAddServerPopupOpened} = useAppSelector(state => state.popups)
    const dispatch = useAppDispatch();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {target: {name, value}} = e;
        setInputData({...inputData, [name]: value})
    }

    function handleClosePopup() {
        dispatch(popupSlice.actions.setAddServerPopupOpened(false))
    }

    return (

        <Popup title='Добавить сервер' adminRequire isOpen={isAddServerPopupOpened} onClose={handleClosePopup}>
            <input className='popup__input'
                   placeholder='ip'
                   name='ip'
                   value={inputData.ip}
                   onChange={handleChange}/>
            <input className='popup__input'
                   placeholder='port'
                   name='port'
                   value={inputData.port}
                   onChange={handleChange}/>
        </Popup>
    );
};

export default AddServerPopup;
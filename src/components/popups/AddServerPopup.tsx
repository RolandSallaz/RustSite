import React, {useState} from 'react';
import Popup from "./Popup";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {popupSlice} from "../../services/slices/popupSlice";
import {IServerData} from "../../interfaces";
import {SubmitHandler, useForm} from "react-hook-form";
import {ipRegex} from "../../utils/constants";
import Loader from "../Loader";
import {sendServer} from "../../services/actions/api";
import {groups} from "../../utils/enums";

const AddServerPopup = () => {
    const {register, handleSubmit, reset, formState: {errors, isValid, isDirty}} = useForm<IServerData>();
    const {isAddServerPopupOpened, loading} = useAppSelector(state => state.popups)
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.user)
    const hasError = user.group !== groups.ADMIN || isDirty || !isValid

    function handleClosePopup() {
        reset();
        dispatch(popupSlice.actions.setAddServerPopupOpened(false))
    }

    const onSubmit: SubmitHandler<IServerData> = data => {
        //dispatch(popupSlice.actions.fetching());
        dispatch(sendServer(data))
    };
    return (
        <Popup isOpen={isAddServerPopupOpened} onClose={handleClosePopup}>
            <form className='popup__form' onSubmit={handleSubmit(onSubmit)}>
                <h2 className='popup__heading'>Добавить сервер</h2>
                <ul className='input-list'>
                    <li className='input-list__item'>
                        <span>Ip</span>
                        <input className='popup__input'
                               placeholder='127.0.0.1'
                               {...register('ip', {
                                   required: 'Обязательное поле',
                                   pattern: {value: ipRegex, message: 'Указать некорректный ip адрес'}
                               })}
                        />
                        <span>{errors.ip?.message}</span>
                    </li>
                    <li className='input-list__item'>
                        <span>Port</span>
                        <input className='popup__input'
                               placeholder='28016'
                               defaultValue='28016'
                               pattern="\d*"
                               type={"number"}
                               {...register('port', {
                                   validate: (value) => typeof value == 'number',
                                   valueAsNumber: true,
                                   required: 'Обязательное поле',
                                   maxLength: {value: 5, message: 'Максимальная длина порта - 5 символов'},
                                   max: {value: '65535', message: 'Порт не может быть выше 65535'}
                               })}
                        />
                        <span>{errors.port?.message}</span>
                    </li>
                    <li className='input-list__item'>
                        <span>Rcon password</span>
                        <input className='popup__input'
                               placeholder='rcon password'
                               {...register('password', {required: true})}
                        />
                        <span>{errors.password && ('X')}</span>
                    </li>
                </ul>
                <button className='popup__button popup__button_submit'
                        disabled={hasError}
                        type="submit">Сохранить
                </button>
                {loading && (<Loader/>)}
            </form>
        </Popup>
    );
};

export default AddServerPopup;
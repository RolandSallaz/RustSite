import React, {useState} from 'react';
import Popup from "./Popup";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {popupSlice} from "../../services/slices/popupSlice";
import {groups} from "../../utils/Interfaces";
import {SubmitHandler, useForm} from "react-hook-form";
import {ipRegex} from "../../utils/constants";
import Loader from "../Loader";

interface IInputData {
    ip: string,
    port: number,
    password: string,
}

const AddServerPopup = () => {
    const {register, handleSubmit, watch, reset, formState: {errors}} = useForm<IInputData>();
    const {isAddServerPopupOpened, loading} = useAppSelector(state => state.popups)
    const dispatch = useAppDispatch();
    const {loggedIn, user: {group}} = useAppSelector(state => state.user)

    function handleClosePopup() {
        reset();
        dispatch(popupSlice.actions.setAddServerPopupOpened(false))
    }

    const onSubmit: SubmitHandler<IInputData> = data => {
        console.log(data)
        dispatch(popupSlice.actions.fetching());
    };
    const hasError = Boolean(errors.ip || errors.port || errors.password)
    return (
        <Popup isOpen={isAddServerPopupOpened} onClose={handleClosePopup}>
            <form className='popup__form' onSubmit={handleSubmit(onSubmit)}>
                <h2 className='popup__header'>Добавить сервер</h2>
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
                <button className='popup__submit-button'
                        disabled={!loggedIn || (group !== groups.ADMIN) || hasError}
                        type="submit">Сохранить
                </button>
                {loading && (<Loader/>)}
            </form>

        </Popup>
    );
};

export default AddServerPopup;
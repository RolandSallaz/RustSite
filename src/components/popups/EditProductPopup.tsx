import React, {FormEvent, useEffect, useRef, useState} from 'react';
import Popup from "./Popup";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {popupSlice} from "../../services/slices/popupSlice";
import {FaRegPlusSquare, FaArrowLeft} from "react-icons/fa";
import {set, SubmitHandler, useForm} from "react-hook-form";
import {IProductData, IServerData} from "../../interfaces";
import {sendProduct, sendServer} from "../../services/actions/api";
import {groups} from "../../utils/enums";

function EditProductPopup() {
    const [isAddProductFormOpen, setIsAddProductFormOpen] = useState<Boolean>(false)
    const {register, handleSubmit, formState: {isValid, errors}} = useForm<IProductData>({mode: "onBlur"})
    const {isEditProductPopupOpened} = useAppSelector(state => state.popups)
    const formRef = useRef<HTMLFormElement>(null)
    const {user} = useAppSelector(state => state.user)
    const hasError = user.group !== groups.ADMIN || !isValid
    const dispatch = useAppDispatch();

    function handleClosePopup() {
        dispatch(popupSlice.actions.setEditProductPopupOpened(false))
    }

    function handleToggleProductForm() {
        setIsAddProductFormOpen(!isAddProductFormOpen);
    }

    const onSubmit: SubmitHandler<IProductData> = data => {
        dispatch(sendProduct(formRef.current as HTMLFormElement))
    };
    return (
        <Popup isOpen={isEditProductPopupOpened} onClose={handleClosePopup}>
            <div className='popup__container'>
                <div className='popup__params'>
                    <button
                        className='popup__button popup__button_add'
                        onClick={handleToggleProductForm}>
                        {isAddProductFormOpen ? <FaArrowLeft/> : <FaRegPlusSquare/>}
                    </button>
                    <p>Количество товаров: 023123</p>
                    {!isAddProductFormOpen && (<input className='popup__input' placeholder='Поиск по товарам'/>)}
                </div>

                {isAddProductFormOpen ?
                    (<form className='popup__form' onSubmit={handleSubmit(onSubmit)} ref={formRef}>
                        <input {...register("title", {required: true})}
                               className={`popup__input ${errors.title && 'popup__input_error'}`}
                               placeholder='Название'/>
                        <input {...register("price", {required: true, valueAsNumber: true})} type={"number"}
                               className={`popup__input ${errors.price && 'popup__input_error'}`} placeholder='Цена'/>
                        <input {...register("rconCommand", {required: true})}
                               className={`popup__input ${errors.rconCommand && 'popup__input_error'}`}
                               placeholder='Rcon команда'/>
                        <input {...register("image", {required: true})} type="file" accept="image/*"/>
                        <button type='submit' className='popup__button popup__button_submit'
                                disabled={hasError}>Создать
                        </button>
                    </form>) :
                    (<ul className='popup-list'>
                    </ul>)
                }

            </div>
        </Popup>
    );
}

export default EditProductPopup;
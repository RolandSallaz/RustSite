import React, {useState} from 'react';
import Popup from "./Popup";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {popupSlice} from "../../services/slices/popupSlice";
import {FaRegPlusSquare, FaArrowLeft} from "react-icons/fa";


function EditProductPopup() {
    const [isAddProductFormOpen, setIsAddProductFormOpen] = useState<Boolean>(false)
    const {isEditProductPopupOpened} = useAppSelector(state => state.popups)
    const dispatch = useAppDispatch();

    function handleClosePopup() {
        dispatch(popupSlice.actions.setEditProductPopupOpened(false))
    }

    function handleToggleProductForm() {
        setIsAddProductFormOpen(!isAddProductFormOpen);
    }

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
                    (<form className='popup__form'>
                        <input className='popup__input' placeholder='Название'/>
                        <input className='popup__input' placeholder='Цена'/>
                        <input className='popup__input' placeholder='Rcon команда'/>
                        <input type="file" accept="image/*"/>
                        <button type='submit' className='popup__button popup__button_submit'>Создать</button>
                    </form>) :
                    (<ul className='popup-list'>
                    </ul>)
                }

            </div>
        </Popup>
    );
}

export default EditProductPopup;
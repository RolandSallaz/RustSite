import React, {useEffect, useState} from "react";
import Popup from "./Popup";
import {IProductData, IServerData} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {popupSlice} from "../../services/slices/popupSlice";
import {set, useForm} from "react-hook-form";
import {type} from "os";

interface popupInputs {
    count: number
}

export default function BuyPopup() {
    const [currentPrice, setCurrentPrice] = useState<Number>(0)
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: {errors, isValid, isDirty},
        getValues
    } = useForm<popupInputs>({
        defaultValues: {count: 1},
        mode: 'onChange'
    });
    const dispatch = useAppDispatch();
    const {buyProductPopup} = useAppSelector(state => state.popups)

    function handleClosePopup() {
        dispatch(popupSlice.actions.setBuyProductPopupData(null))
    }

    useEffect(() => {
        const subscription = watch((data) => {
            const price: Number = Number((Number(data.count) * Number(buyProductPopup?.price.$numberDecimal)).toFixed(2))
            setCurrentPrice(price)
        })
        return () => {
            subscription.unsubscribe();
        }
    }, [watch()])
    return (
        <Popup isOpen={Boolean(buyProductPopup)} onClose={handleClosePopup}>
            <div className='popup__container popup__container_type_buy-product'>
                <form className='popup__form'>
                    <h2 className='popup__heading'>{buyProductPopup?.title}</h2>
                    <p>{`Цена: ${currentPrice} рублей`}</p>
                    <div className='popup__'>
                        <input type='number' {...register('count', {min: 1})}/>
                        <img style={{width:'100px',height:'100px'}} src={`${process.env.REACT_APP_API_URL}/${buyProductPopup?.imageLink}`}/>
                    </div>
                    <button>'Купить'</button>
                </form>
            </div>
        </Popup>)
};

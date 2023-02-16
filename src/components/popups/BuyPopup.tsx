import React, {useEffect, useState} from "react";
import Popup from "./Popup";
import {IProductData, IServerData} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {popupSlice} from "../../services/slices/popupSlice";
import {set, useForm, Controller} from "react-hook-form";
import {type} from "os";
import NumberInput from "../NumberInput";

interface popupInputs {
    count: number
}

export default function BuyPopup() {
    const [currentPrice, setCurrentPrice] = useState<Number>(0)
    const {
        register,
        handleSubmit,
        reset,
        control,
        watch,
        formState: {errors, isValid, isDirty},
        getValues
    } = useForm<popupInputs>({
        defaultValues: {count: 1},
        mode: 'onChange'
    });
    const dispatch = useAppDispatch();
    const {buyProductPopup} = useAppSelector(state => state.popups)
    const {user} = useAppSelector(state=> state.user)

    const overPrice = user.balance < currentPrice;
    function handleClosePopup() {
        dispatch(popupSlice.actions.setBuyProductPopupData(null))
    }

    useEffect(() => {
        const subscription = watch((data) => {
            const price:number = Number((Number(data.count) * Number(buyProductPopup?.price.$numberDecimal)).toFixed(2))
            setCurrentPrice(price)
        })
        return () => {
            subscription.unsubscribe();
        }
    }, [watch()])

    useEffect(()=>{
        const price: number = Number(getValues('count') * (buyProductPopup?.price.$numberDecimal || 1))
        setCurrentPrice(Number(price.toFixed(2)))
    },[buyProductPopup])

    return (
        <Popup isOpen={Boolean(buyProductPopup)} onClose={handleClosePopup}>
            <div className='popup__container'>
                <form className='popup__form popup__form_type_buy-product'>
                    <h2 className='popup__heading'>{buyProductPopup?.title}</h2>
                    <p className='popup__price'>{`Цена: ${currentPrice} рублей`}</p>
                    <NumberInput className='popup__input' name='count' control={control}/>
                    <img className='popup__image' style={{width: '100px', height: '100px'}}
                         src={`${process.env.REACT_APP_API_URL}/${buyProductPopup?.imageLink}`}/>
                    <button className='popup__button popup__button_submit' type='submit' disabled={overPrice}>Купить</button>
                </form>
            </div>
        </Popup>)
};

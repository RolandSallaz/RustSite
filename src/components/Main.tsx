import React from 'react';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import Product from "./Product";
import BuyPopup from "./popups/BuyPopup";
import {popupSlice} from "../services/slices/popupSlice";
import {IProductData} from "../interfaces";

const Main = () => {
    const {products} = useAppSelector(state => state.product)
    const dispatch = useAppDispatch()

    function handleProductClick(product: IProductData) {
        dispatch(popupSlice.actions.setBuyProductPopupData(product))
    }

    return (
        <main className="main">
            <section className='products'>
                <div className='products__filter'>
                    <button>Фильтр1</button>
                    <button>Фильтр2</button>
                    <input/>
                </div>
                <ul className='product-list'>
                    {products.map(item => (<Product data={item} onProductClick={handleProductClick} key={item._id}/>))}
                </ul>
            </section>
        </main>
    );
};

export default Main;
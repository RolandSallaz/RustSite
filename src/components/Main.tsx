import React from 'react';
import {useAppSelector} from '../hooks/redux';
import Product from "./Product";
import BuyPopup from "./popups/BuyPopup";

const Main = () => {
    const {products} = useAppSelector(state => state.product)

    return (
        <main className="main">
            <div className='products'>
                <div className='products__filter'>
                    <button>Фильтр1</button>
                    <button>Фильтр2</button>
                    <input/>
                </div>
                <li className='product-list'>
                    {products.map(item => (
                        <ul className='product' key={item._id}>
                            <li className='product-list'>
                                <Product data={item}/>
                            </li>
                        </ul>))}
                </li>
            </div>
            <BuyPopup/>
        </main>
    );
};

export default Main;
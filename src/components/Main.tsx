import React from 'react';
import {useAppSelector} from '../hooks/redux';
import Product from "./Product";

const Main = () => {
    const {products} = useAppSelector(state => state.product)
    return (
        <main className="main">
            <div className='products'>
                <div className='products-filter'>
                    <button>Фильтр1</button>
                    <button>Фильтр2</button>
                    <input/>
                </div>
                <li className='product-list'>
                    {products.map(item => (
                        <ul className='product'>
                            <Product data={item} key={item._id}/>
                        </ul>))}
                </li>
            </div>
        </main>
    );
};

export default Main;
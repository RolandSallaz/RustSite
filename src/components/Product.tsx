import {IProductData} from "../interfaces";
import {AiOutlineShoppingCart} from "react-icons/ai";

interface props {
    data: IProductData
}

export default function Product({data}: props) {
    return (
        <>
            <h2 className='product__title'>{data.title}</h2>
            <img className='product__image' src={`${process.env.REACT_APP_API_URL}/${data.imageLink}`}
                 alt={`Товар ${data.title}`}/>
            <div className='product__container'>
                <button className='product__buy-button'>
                    <AiOutlineShoppingCart/>
                    <p>Купить</p>
                    {`${data.price}p.`}
                </button>
            </div>
        </>
    )
}
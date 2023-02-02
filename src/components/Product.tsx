import {IProductData} from "../interfaces";
import {AiOutlineShoppingCart} from "react-icons/ai";

interface props {
    data: IProductData
}

export default function Product({data}: props) {
    return (
        <div className={'product'} style={{backgroundImage:`url(${process.env.REACT_APP_API_URL}/${data.imageLink})`}}>
            <h2 className='product__title'>{data.title}</h2>
            <p className='product__price'>{`${data.price} p`}</p>
        </div>
    )
}
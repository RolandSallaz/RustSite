import {IProductData} from "../interfaces";

interface props {
    data: IProductData
    onProductClick: (data: IProductData) => void
}

export default function Product({data, onProductClick}: props) {

    function handleProductClick() {
        onProductClick(data)
    }

    return (
        <li className='product' onClick={handleProductClick}>
            <div className={'product'}
                 style={{backgroundImage: `url(${process.env.REACT_APP_API_URL}/${data.imageLink})`}}>
                <h2 className='product__title'>{data.title}</h2>
                <p className='product__price'>{`${data.price.$numberDecimal} p`}</p>
            </div>
        </li>
    )
}
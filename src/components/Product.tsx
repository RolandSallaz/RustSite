import {IProductData} from "../interfaces";
import {useAppDispatch} from "../hooks/redux";
import {appSlice} from "../services/slices/appSlice";
import {popupSlice} from "../services/slices/popupSlice";

interface props {
    data: IProductData
}

export default function Product({data}: props) {
    const dispatch = useAppDispatch();
    function handleProductClick() {
        dispatch(popupSlice.actions.setBuyProductPopupData(data))
    }

    return (
        <div className={'product'} style={{backgroundImage: `url(${process.env.REACT_APP_API_URL}/${data.imageLink})`}}
             onClick={handleProductClick}>
            <h2 className='product__title'>{data.title}</h2>
            <p className='product__price'>{`${data.price.$numberDecimal} p`}</p>
        </div>
    )
}
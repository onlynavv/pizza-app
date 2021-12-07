import React from 'react'
import './CheckoutProduct.css'
import { useGlobalContext } from './context'

const CheckoutProduct = ({id,img, name, price, size, desc}) => {

    const despTruncate = (string,n) => {
        return string?.length > n ? string.substr(0,n-1) + '...' : string
    }

    const {removePizza} = useGlobalContext()

    return (
        <div className='checkout-product'>
            <img src={img} alt={name} className='checkoutProduct-image'></img>
            <div className='checkoutProduct-info'>
                <p className='checkoutProduct-title'>{name}</p>
                <p className='checkoutProduct-price'>
                    <small>Rs.</small><strong>{price}</strong>
                </p>
                <p className="variant-cart">{size}</p>
                <p>{despTruncate(desc,50)}</p>
            </div>
            <button className='checkoutProduct-btn' onClick={()=> removePizza(id)}>Remove</button>
        </div>
    )
}

export default CheckoutProduct

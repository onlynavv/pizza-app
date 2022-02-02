import React from 'react'
import './CheckoutProduct.css'

const OrdersItem = ({_id,img, name, price, desc, qty, ingredients}) => {

    const despTruncate = (string,n) => {
        return string?.length > n ? string.substr(0,n-1) + '...' : string
    }

    console.log(ingredients, "10")

    return (
        <div className='checkout-product'>
            <img src={img} alt={name} className='checkoutProduct-image'></img>
            <div className='checkoutProduct-info'>
                <p className='checkoutProduct-title'>{name}</p>
                <p className='checkoutProduct-price'>
                    <small>Rs.</small><strong>{price}</strong>
                </p>
                <div className="quantity-container">
                    <label>Qty: </label>
                    <p>{qty}</p>
                </div>
                {desc && <p>{despTruncate(desc,50)}</p>}
                {ingredients?.length > 0 && (
                    <div>
                        {ingredients.map((item, index)=>{
                            return <p key={index}>{item}</p>
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default OrdersItem

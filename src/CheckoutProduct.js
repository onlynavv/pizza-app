import React,{useState} from 'react'
import './CheckoutProduct.css'
import { useGlobalContext } from './context'

const CheckoutProduct = ({_id,img, name, price, desc, qty, ingredients}) => {

    const despTruncate = (string,n) => {
        return string?.length > n ? string.substr(0,n-1) + '...' : string
    }

    const {removePizza, adjustQty} = useGlobalContext()

    const [qtyAdj,setQtyAdj] = useState(qty)

    const handleQty = (e) => {
        setQtyAdj(e.target.value)
        adjustQty(_id,e.target.value)
    }

    console.log(ingredients)

    return (
        <div className='checkout-product'>
            <img src={img} alt={name} className='checkoutProduct-image'></img>
            <div className='checkoutProduct-info'>
                <p className='checkoutProduct-title'>{name}</p>
                <p className='checkoutProduct-price'>
                    <small>Rs.</small><strong>{price}</strong>
                </p>
                <div className="quantity-container">
                    <label>Qty</label>
                    <input type='number' value={qtyAdj} onChange={handleQty} min='1'></input>
                </div>
                {desc && <p>{despTruncate(desc,50)}</p>}
                {ingredients && (
                    <div>
                        {ingredients.map((item, index)=>{
                            return <p key={index}>{item}</p>
                        })}
                    </div>
                )}
            </div>
            <button className='checkoutProduct-btn' onClick={()=> removePizza(_id)}>Remove</button>
        </div>
    )
}

export default CheckoutProduct

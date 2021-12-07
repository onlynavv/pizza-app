import React from 'react'
import './SubTotal.css'
import { useGlobalContext } from './context'

const SubTotal = () => {

    const {cart,totalAmount} = useGlobalContext()

    return (
        <div className='subtotal'>
            <p>
                Subtotal ({cart.length} items): <strong>Rs. {totalAmount}</strong>
            </p>
            
            <button>Proceed to checkout</button>
        </div>
    )
}

export default SubTotal

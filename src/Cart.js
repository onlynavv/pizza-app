import React from 'react'
import CheckoutProduct from './CheckoutProduct'
import SubTotal from './SubTotal'
import "./Cart.css"
import { useGlobalContext } from './context'

const Cart = () => {

    const {cart} = useGlobalContext()

    return (
        <section className="container checkout-wrapper">
            <div className='checkout'>
                <div className="checkout-left">
                    <div>
                        <h3 style={{padding:'10px'}}>Hello, Guest</h3>
                        <h2 className="checkout-title">
                            Your Pizza Basket
                        </h2>
                        {cart.map((item)=>{
                            const {id} = item
                            return(
                                <CheckoutProduct key={id} {...item} />
                            )
                        })}
                    </div>
                </div>
                <div className="checkout-right">
                    <SubTotal />
                </div>
            </div>
        </section>
    )
}

export default Cart

import React,{useEffect} from 'react'
import CheckoutProduct from './CheckoutProduct'
import SubTotal from './SubTotal'
import "./Cart.css"
import { useGlobalContext } from './context'

const Cart = () => {

    const {cart, userauthenticate, user, isUserLoggedIn} = useGlobalContext()

    useEffect(() => {
        if(!userauthenticate){
            isUserLoggedIn()
        }
    }, [])

    return (
        <section className="container checkout-wrapper">
            <div className='checkout'>
                <div className="checkout-left">
                    <div>
                        <h3 style={{padding:'10px'}}>Hello, {userauthenticate ? user.username : "Guest"}</h3>
                        <h2 className="checkout-title">
                            Your Pizza Basket
                        </h2>
                        {cart.map((item,index)=>{
                            const {id} = item
                            return(
                                <CheckoutProduct key={id || index} {...item} />
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

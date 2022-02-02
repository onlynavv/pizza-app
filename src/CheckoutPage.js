import React,{useEffect} from 'react'
import CheckoutProduct from './CheckoutProduct'
import "./CheckoutPage.css"
import { useGlobalContext } from './context'
import CheckoutSubtotal from './CheckoutSubtotal'

const CheckoutPage = () => {

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
                        {userauthenticate ? <h3 style={{padding:'10px'}}>Email Id: {user.email}</h3> : ""}
                        <h2 className="checkout-title">
                            Your Checkout Page
                        </h2>
                        {cart.map((item)=>{
                            const {_id} = item
                            return(
                                <CheckoutProduct key={_id} {...item} />
                            )
                        })}
                    </div>
                </div>
                <div className="checkout-right">
                    <CheckoutSubtotal />
                </div>
            </div>
        </section>
    )
}

export default CheckoutPage

import React,{useEffect} from 'react'
// import CheckoutProduct from './CheckoutProduct'
import "./Cart.css"
import { useGlobalContext } from './context'
import OrdersList from './OrdersList'

const Orders = () => {

    const {cart, userauthenticate, user, isUserLoggedIn, getUserOrders, orders, ordersLoading} = useGlobalContext()

    useEffect(() => {
        if(!userauthenticate){
            isUserLoggedIn()
        }
    }, [])

    useEffect(()=>{
        getUserOrders()
    },[])

    console.log(orders)
    console.log(ordersLoading)

    return (
        <section className="container checkout-wrapper">
            <div className='checkout'>
                <div className="checkout-left">
                    <div>
                        <h3 style={{padding:'10px'}}>Hello, {userauthenticate ? user.username : "Guest"}</h3>
                        <h2 className="checkout-title">
                            Your Pizza Orders
                        </h2>
                        {ordersLoading ? "loading" : (
                            orders.map((item)=>{
                                const {_id} = item
                                return <OrdersList key={_id} {...item} />
                            })
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Orders

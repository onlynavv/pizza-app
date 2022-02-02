import React,{useState, useEffect} from 'react'
import './SubTotal.css'
import { useGlobalContext } from './context'

const CheckoutSubtotal = () => {

    const {cart, userauthenticate, user, isUserLoggedIn, placeOrder} = useGlobalContext()

    useEffect(() => {
        if(!userauthenticate){
            isUserLoggedIn()
        }
    }, [])

    const [total,setTotal] = useState(0)
    const [totalItems,setTotalItems] = useState(0)

    useEffect(()=>{

        let items = 0
        let price = 0

        cart.forEach(item => {
            items += parseInt(item.qty)
            price += parseInt(item.qty) * item.price
        });

        setTotal(price)
        setTotalItems(items)
    },[cart,total,totalItems])

    return (
        <div className='subtotal'>
            <p>
                Subtotal ({totalItems} items): <strong>Rs. {total}</strong>
            </p>
            {userauthenticate ? <p>Order confirmation will be sent to <b>{user.email}</b></p> : ""}
            <button onClick={()=>{placeOrder(cart, user._id, total, user.email)}}>Place Order</button>
        </div>
    )
}

export default CheckoutSubtotal

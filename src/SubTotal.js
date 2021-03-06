import React,{useState, useEffect} from 'react'
import './SubTotal.css'
import { useGlobalContext } from './context'
import { useHistory } from 'react-router-dom'

const SubTotal = () => {

    const {cart} = useGlobalContext()

    const history = useHistory()

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
            
            <button onClick={()=>{history.push("/checkout")}}>Proceed to checkout</button>
        </div>
    )
}

export default SubTotal

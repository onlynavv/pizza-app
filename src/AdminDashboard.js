import React,{useState, useEffect} from 'react'
import { useGlobalContext } from './context'
import OrdersCard from './OrdersCard'
import './Pizzas.css'

const AdminDashboard = () => {

    const [pizzaOrders, setPizzaOrders] = useState()

    const {setAdmin, isAdminLoggedIn, authenticate} = useGlobalContext()

    useEffect(() => {
        if(!authenticate){
            isAdminLoggedIn()
        }
    }, [])

    useEffect(()=>{
        fetch("https://pizza-api-task.herokuapp.com/pizzas/order/adminGetOrders")
        .then((data)=> data.json())
        .then((products)=> setPizzaOrders(products))
    },[])

    console.log(pizzaOrders)

    return (
        pizzaOrders ?  (
        <>
            <section className="pizzas-section">
                <div className="container">
                    {pizzaOrders.map((item)=>{
                        console.log(item)
                        const {_id} = item
                        return <OrdersCard key={_id} {...item} />
                    })}
                </div>
            </section>
        </>
        ) : <h1>loading...</h1>
    )
}

export default AdminDashboard

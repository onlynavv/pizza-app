import React,{useState, useEffect} from 'react'
import PizzaCard from './PizzaCard'
import './Pizzas.css'

const Pizzas = () => {

    const [pizzasProd, setPizzasProd] = useState()

    useEffect(()=>{
        fetch("https://pizza-api-task.herokuapp.com/pizzas")
        .then((data)=> data.json())
        .then((products)=> setPizzasProd(products))
    },[])

    console.log(pizzasProd)

    return (
        pizzasProd ?  (
        <>
            <section className="pizzas-section">
                <div className="container">
                    {pizzasProd.map((item)=>{
                        const {_id} = item
                        return <PizzaCard key={_id} {...item} />
                    })}
                </div>
            </section>
        </>
        ) : <h1>loading...</h1>
    )
}

export default Pizzas

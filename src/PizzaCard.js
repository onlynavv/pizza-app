import React from 'react'
import { useGlobalContext } from './context'
import "./PizzaCard.css"

const PizzaCard = ({_id, img, name, price, size, desc}) => {
    const despTruncate = (string, n) => {
        return string?.length > n ? string.substr(0,n-1) + '...' : string
    }

    const {addToCart} = useGlobalContext()

    return (
        <div className="pizzas-container">
            <img src={img} alt={name}></img>
            <div className="pizzas-body">
                <div className="pizzas-info">
                    <h4>{name}</h4>
                    <h5 className="variant">{size}</h5>
                </div>
                <div className="pizzas-desc">
                    <p>{despTruncate(desc,50) }</p>
                    <p className="pizzas-price">₹{price}</p>
                </div>
                <button className="add-btn" onClick={()=> addToCart(_id,img, name, price, size, desc)}>Add</button>
            </div>
        </div>
    )
}

export default PizzaCard

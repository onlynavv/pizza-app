import React from 'react'
import "./IngredientsList.css"

const IngredientsList = ({ingredientType, ingredientName, price, stock}) => {
    return (
        <div className="ingredients-container">
            <div className="ingredients-body">
                <div className="ingredients-info">
                    <h4>{ingredientType.toUpperCase()}</h4>
                </div>
                <div className="ingredients-desc">
                    <p><b>Price: </b><span>₹ {price}</span></p>
                    <p><b>Name:</b> {ingredientName.toUpperCase()}</p>
                    <p><b>stocks remaining:</b> <span  className='ingredients-price'>{stock}</span></p>
                </div>
            </div>
        </div>
    )
}

export default IngredientsList

import React,{useState, useEffect} from 'react'
import { useGlobalContext } from './context'
import IngredientsStatus from './IngredientsStatus'
import "./IngredientsList.css"
import EditIngredients from './EditIngredients'

const AdminInventory = () => {

    const {setAdmin, isAdminLoggedIn, authenticate} = useGlobalContext()

    useEffect(() => {
        if(!authenticate){
            isAdminLoggedIn()
        }
    }, [])

    return (
        <section className="pizzas-section">
                <div className="container">
                    <div className='inventory-container' style={{display:"flex",flexDirection:"column"}}>
                        <EditIngredients />
                        <h3 className='inventory-header'>Ingredients Status</h3>
                        <IngredientsStatus />
                    </div>
                </div>
        </section>
    )
}

export default AdminInventory

import React,{useEffect} from 'react'
import { useGlobalContext } from './context'
import IngredientsList from './IngredientsList'

const IngredientsStatus = () => {

    const {adminGetIngredients, ingredients, ingredientsLoading, isAdminLoggedIn, authenticate} = useGlobalContext()

    useEffect(() => {
        adminGetIngredients()
    }, [])

    useEffect(() => {
        if(!authenticate){
            isAdminLoggedIn()
        }
    }, [])

    console.log(ingredients)
    console.log(ingredientsLoading)

    return (
        ingredients ? (
            <div className='ingredient-status'>
                {ingredients.map((item)=>{
                    return <IngredientsList key={item._id} {...item} />
                })}
            </div>
        ) : <h1>Loading....</h1>
    )
}

export default IngredientsStatus

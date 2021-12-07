import React , {useContext,useReducer} from 'react'
import { reducer } from './reducer'

const AppContext = React.createContext()

const AppProvider = ({children}) => {

    const initialState = {
        cart:[],
    }

    const addToCart = (id,img, name, price, size, desc) => {
        console.log(id)
        dispatch({type:"ADD_TO_CART", payload:{
            id,img,name,price,size,desc
        }})
    }

    const removePizza = (id) => {
        dispatch({type:'REMOVE_FROM_CART', payload:id})
    }

    const [state,dispatch] = useReducer(reducer,initialState)

    let totalAmount = state.cart.reduce((amount,item)=>{
            return(
                amount = +item.price + amount
            )
        },0)

    console.log(state.cart)

    return(
        <AppContext.Provider value={{...state,addToCart,totalAmount,removePizza}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppProvider}
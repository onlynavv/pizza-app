import React , {useContext,useReducer} from 'react'
import { adminReducer } from './adminReducer'
import {adminInitialState} from "./adminInitialState"
import { userReducer } from './userReducer'
import {userInitialState} from "./userInitialState"
import { cartReducer } from './cartReducer'
import {cartInitialState} from "./cartInitialState"
import { OrderInitialState } from './OrderInitialState'
import { OrderReducer } from './OrderReducer'
import { IngredientsInitialState } from './IngredientsInitialState'
import { IngredientsReducer } from './IngredientsReducer'

const AppContext = React.createContext()

const AppProvider = ({children}) => {

    // const initialState = {
    //     cart:[],
    //     token:null,
    //     admin:{
    //         adminname:"",
    //         firstname:"",
    //         lastname:"",
    //         email:"",
    //         role:""
    //     },
    //     authenticate:false
    // }

    // admin actions
    const setAdmin = (token, adminFromDB) => {
        dispatch({type:"SET_ADMIN", payload:{token, adminFromDB}})
    }

    const isAdminLoggedIn = () => {
        const token = JSON.parse(localStorage.getItem("token"))
        if(token){
            const admin = JSON.parse(localStorage.getItem("admin"))
            dispatch({type:"SET_ADMIN", payload:{token, admin}})
        }
    }

    const adminSignout = () => {
        localStorage.clear()
        dispatch({type:"LOGOUT_ADMIN"})
    }

    // user actions
    const setUser = (token, userFromDB) => {
        userDispatch({type:"SET_USER", payload:{token, userFromDB}})
    }

    const isUserLoggedIn = () => {
        const token = JSON.parse(localStorage.getItem("usertoken"))
        if(token){
            const userFromDB = JSON.parse(localStorage.getItem("user"))
            userDispatch({type:"SET_USER", payload:{token, userFromDB}})
        }
    }

    const userSignout = () => {
        localStorage.clear()
        userDispatch({type:"LOGOUT_USER"})
    }

    // add to cart
    // const addToCart = (id,img, name, price, size, desc) => {
    //     console.log(id)
    //     dispatch({type:"ADD_TO_CART", payload:{
    //         id,img,name,price,size,desc
    //     }})
    // }

    const addToCart = async(product) => {
        const cartItems = {...product, quantity: 1}
        console.log(cartItems)
        if(userState.userauthenticate){
            cartDispatch({type:"ADD_TO_CART", payload:product})
            const resp = await fetch('https://pizza-api-task.herokuapp.com/pizzas/cart/addToCart', {
            method:'POST',
            headers: { "Content-Type": "application/json", "x-auth-token":userState.token},
            body: JSON.stringify({cartItems})
                })
            
            const data = await resp.json()

            console.log(data)

            if(resp.ok){
                console.log(data)
            }else{
                localStorage.setItem("cart", JSON.stringify(product));
            }
            console.log("addToCart:", {cartItems: product});
        }
    }

    const removePizza = async(_id) => {
        console.log(_id)
        const cartItems = {_id:_id}
        if(userState.userauthenticate){
            cartDispatch({type:'REMOVE_FROM_CART', payload:_id})
            const resp = await fetch('https://pizza-api-task.herokuapp.com/pizzas/cart/deleteFromCart', {
            method:'PUT',
            headers: { "Content-Type": "application/json", "x-auth-token":userState.token},
            body: JSON.stringify({cartItems})
                })
            
            const data = await resp.json()

            console.log(data)

            if(resp.ok){
                console.log(data)
            }else{
                console.log("item not found")
            }
            console.log("dleteFromCart:", {cartItems});
        }
    }

    const adjustQty = async(itemId,value) => {
        console.log(itemId, value)
    cartDispatch({
        type:'ADJUST_QTY',
        payload:{
            id:itemId,
            qty:value
        }})

        const cartItems = {_id:itemId, quantity:1}
        const resp = await fetch('https://pizza-api-task.herokuapp.com/pizzas/cart/addToCart', {
            method:'POST',
            headers: { "Content-Type": "application/json", "x-auth-token":userState.token},
            body: JSON.stringify({cartItems})
                })
            
            const data = await resp.json()

            console.log(data)

            if(resp.ok){
                console.log(data)
            }else{
                localStorage.setItem("cart", JSON.stringify({cartItems}));
            }
            console.log("addToCart:", {cartItems});
    }

    const placeOrder = async(items, userId, total, userEmail) => {
        console.log("place order")
        const order = {items, userId, total, userEmail}
        console.log(JSON.stringify(order))

        const resp = await fetch('https://pizza-api-task.herokuapp.com/pizzas/order/placeOrder', {
            method:'POST',
            headers: { "Content-Type": "application/json", "x-auth-token":userState.token},
            body: JSON.stringify({order})
                })
            
            const data = await resp.json()

            console.log(data)

            if(resp.ok){
                console.log(data)
            }else{
                localStorage.setItem("cart", JSON.stringify({order}));
            }
            console.log("Order Items:", {order});
    }

    const getUserOrders = async() => {
        if(userState.userauthenticate){
            const resp = await fetch("https://pizza-api-task.herokuapp.com/pizzas/order/getOrders", {
                method:'GET',
                headers: { "Content-Type": "application/json", "x-auth-token":userState.token}
            })
            const data = await resp.json()
            
            console.log(data)

            if(resp.ok){
                orderDisptach({type:"SET_USERS_ORDER", payload:{data, "loading":false}})
            }

        }else{
            console.log("user not logged in")
        }
    }

    // update orders
    const changeStatus = (values) => {
        console.log(values)
        fetch('https://pizza-api-task.herokuapp.com/pizzas/order/updateOrders', {
        method:'POST',
        headers: { "Content-Type": "application/json", "x-auth-token":adminState.token},
        body: JSON.stringify(values)
    }).then(()=> console.log("status changed"))
    }

    // admin get ingredients
    const adminGetIngredients = async() => {
        if(adminState.authenticate){
            const resp = await fetch("https://pizza-api-task.herokuapp.com/pizzas/ingredients/adminGetIngredients", {
                method:'GET',
                headers: { "Content-Type": "application/json", "x-auth-token":adminState.token}
            })
            const data = await resp.json()
            
            console.log(data)

            if(resp.ok){
                ingredientsDispatch({type:"SET_INGREDIENTS", payload:{data, "loading":false}})
            }

        }else{
            console.log("admin not logged in")
        }
    }

    const updateIngredients = async(ingredientTypeValue,ingredientNameValue,ingredientPrice,ingredientStock,setIngredientType, setIngredientNameValue, setIngredientPrice, setIngredientStock) => {

        console.log(JSON.stringify({"ingredientType":ingredientTypeValue, "ingredientName":ingredientNameValue, "price":ingredientPrice, "stock":ingredientStock}))

        const resp = await fetch('https://pizza-api-task.herokuapp.com/pizzas/ingredients/updateItems', {
            method:'PUT',
            headers: { "Content-Type": "application/json", "x-auth-token":adminState.token},
            body: JSON.stringify({"ingredientType":ingredientTypeValue, "ingredientName":ingredientNameValue, "price":ingredientPrice, "stock":ingredientStock})
                })
            
            const data = await resp.json()

            console.log(data)

            if(resp.ok){
                console.log(data)
                adminGetIngredients()
                setIngredientType("")
                setIngredientNameValue("")
                setIngredientPrice("")
                setIngredientStock("")
            }else{
                console.log("failed to update")
            }
    }

    // admin useReducer
    const [adminState,dispatch] = useReducer(adminReducer,adminInitialState)

    // user useReducer
    const [userState, userDispatch] = useReducer(userReducer, userInitialState)

    // cart useReducer
    const [cartState, cartDispatch] = useReducer(cartReducer, cartInitialState)

    // order useReducer
    const [orderState, orderDisptach] = useReducer(OrderReducer, OrderInitialState)

    // get ingredients useReducer
    const [ingredientsState, ingredientsDispatch] = useReducer(IngredientsReducer, IngredientsInitialState)

    // let totalAmount = state.cart.reduce((amount,item)=>{
    //         return(
    //             amount = +item.price + amount
    //         )
    //     },0)

    // console.log(state.cart)
    console.log(adminState.admin)
    console.log(adminState.token)
    console.log(userState.user)
    console.log(userState.token)
    console.log(cartState.cart)
    console.log(orderState.orders)
    console.log(adminState.authenticate)

    return(
        <AppContext.Provider value={{...adminState, ...userState, ...cartState,...orderState, ...ingredientsState, addToCart,removePizza, setAdmin, isAdminLoggedIn, adminSignout, setUser, isUserLoggedIn, userSignout, adjustQty, placeOrder, getUserOrders, changeStatus, adminGetIngredients,updateIngredients}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppProvider}
export const adminReducer = (state,action) => {
    console.log(action)
    switch(action.type){

        case "SET_ADMIN":
            return{...state, admin:action.payload.adminFromDB, token:action.payload.token, authenticate:true}

        case "LOGOUT_ADMIN":
            return{
                ...state, admin:"", token:"", authenticate:false
            }

        // case 'ADD_TO_CART':
        //     return {...state,
        //         cart:[...state.cart, action.payload]
        //     }

        // case 'REMOVE_FROM_CART':
        //     const index = state.cart.findIndex((item)=>{
        //         return item.id === action.payload
        //     })

        //     let newCartValue = [...state.cart]

        //     if(index >= 0){
        //         newCartValue.splice(index,1)
        //     }
        //     else{
        //         console.warn('The item is not found')
        //     }
        //     return {
        //         ...state,
        //         cart:newCartValue
        //     }


        default:
            return state
    }
}
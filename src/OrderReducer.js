export const OrderReducer = (state,action) => {
    console.log(action)
    switch(action.type){

        case 'SET_USERS_ORDER':
            return {
                ...state,
                orders: action.payload.data,
                ordersLoading: action.payload.loading
            }

        default:
            return state
    }
}
export const IngredientsReducer = (state,action) => {
    console.log(action)
    switch(action.type){

        case 'SET_INGREDIENTS':
            return {
                ...state,
                ingredients: action.payload.data,
                ingredientsLoading: action.payload.loading
            }

        default:
            return state
    }
}
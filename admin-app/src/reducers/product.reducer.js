import { productConstants } from "../actions/constants";
const initalstate={
    products:[]
}
export default (state=initalstate,action)=>{
    switch (action.type) {
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            state={
                ...state,
                products:action.payload.Products
            }
            break;
    
        default:
            break;
    }
    return state
}
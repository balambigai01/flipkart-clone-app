
import categoryreducer from './category.reducer'
import productreducer from './Product.reducer'
import authReducer from './auth.reducer';
import cartReducer from './cart.reducer'
import { combineReducers } from "redux";
import userReducer from './user.reducer';
const rootReducer=combineReducers({
    
    category:categoryreducer,
    product:productreducer,
    cart:cartReducer,
    auth:authReducer,
    user:userReducer

    
})
export default rootReducer
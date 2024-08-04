import authreducers from "./authreducers";
import userreducers from './userreducers';
import orderreducer from './order.reducer';
import productreducer from './product.reducer';
import categoryreducer from './category.reducer'
import pagereducer from './page.reducer'
import { combineReducers } from "redux";
const rootReducer=combineReducers({
    auth:authreducers,
    user:userreducers,
    category:categoryreducer,
    product:productreducer,
    order:orderreducer,
    page:pagereducer
})
export default rootReducer
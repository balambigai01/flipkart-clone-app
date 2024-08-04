
import './App.css';
import HomePage from './Cointainers/HomePage';
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import ProductListPage from './Cointainers/ProductListPage';
import { useDispatch,useSelector } from 'react-redux';
import { isUserLoggedIn, updateCart } from './actions';
import { useEffect } from 'react';
import ProductDetailsPage from './Cointainers/ProductDetailsPage';
import CartPage from './Cointainers/CartPage';
import CheckoutPage from './Cointainers/CheckoutPage';
import OrderPage from './Cointainers/OrderPage';
import OrderDetailsPage from './Cointainers/OrderDetailsPage';


function App() {
  const dispatch=useDispatch()
  const auth=useSelector(state=>state.auth)
  useEffect(()=>{
    if(!auth.authenticate){
      dispatch(isUserLoggedIn())
    }
  },[auth.authenticate])
  useEffect(()=>{
    console.log('App.js - updateCart')
    dispatch(updateCart())
  },[auth.authenticate])
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/account/orders" element={<OrderPage/>} />
          <Route path='/checkout' element={<CheckoutPage/>}/>
          <Route path='/order_details/:orderId' element={<OrderDetailsPage/>}/>
          <Route path="/:productslug/:productId/p" element={<ProductDetailsPage />} />
          <Route path="/:slug" element={<ProductListPage />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

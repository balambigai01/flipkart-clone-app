import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import { useEffect } from 'react';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import Home from './containers/Home';
import PrivateRoute from './components/HOC/PrivateRoute';
import { Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialData, isUserLoggedIn } from './actions';
import Products from './containers/Products';
import Order from './containers/Orders/Orders';
import category from './containers/Category';
import Category from './containers/Category';
import { getAllCategory } from '../src/actions'
import NewPage from './containers/NewPage';
import Orders from './containers/Orders/Orders';


function App() {
  const dispatch=useDispatch()
  const auth=useSelector(state=>state.auth)
  useEffect(()=>{
    console.log('auth.authenticate:', auth.authenticate);
   
    
    if(!auth.authenticate){
        dispatch(isUserLoggedIn())
    }
     if(auth.authenticate){
      dispatch(getInitialData())
     }
   
},[auth.authenticate]) //auth.authenticate
  return (
    <Switch>   
      <PrivateRoute path='/' exact component={Home}/>
      <PrivateRoute path='/page' component={NewPage}/>
      <PrivateRoute path='/products' component={Products}/>
      <PrivateRoute path='/orders'  component={Orders}/>
      <Route path='/category'  component={Category}></Route>
      <Route path='/signin' component={Signin}></Route>
      <Route path='/signup' component={Signup}></Route>   
    </Switch> 
  );
}


export default App;

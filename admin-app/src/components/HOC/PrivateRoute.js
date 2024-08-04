import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom";

const PrivateRoute=({component:Component, ...rest})=>{
    return<Route {...rest} component={(props) => { 
        const token=window.localStorage.getItem('token')
        if(token){
            return <Component {...props}/>
        }else{
            return <Redirect to ={"/signin"}/>
        }
    } }/>
}
export default PrivateRoute
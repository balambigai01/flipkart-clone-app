import axios from "axios";
import { api } from "../urlconfig";

import store from '../store/index'
import { authConstants } from "../actions/constants";
const token=window.localStorage.getItem('token')
const axiosInstance=axios.create({
    baseURL:api,
    headers:{
      'Authorization':token?`Bearer ${token}`:'',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   

    }
   
})
axiosInstance.interceptors.request.use((req)=>{
  const {auth} = store.getState()
  if(auth.token){
    req.headers.Authorization=`Bearer ${auth.token}`
  }
  return req
})
axiosInstance.interceptors.response.use((res)=>{
  return res
},(error)=>{
  console.log(error.response);
  const {status}=error.response ? error.response.status:500
  if(status&&status===500){
    localStorage.clear()
    store.dispatch({type:authConstants.LOGOUT_SUCCESS})
  }
  return Promise.reject(error)
})
export default axiosInstance

   
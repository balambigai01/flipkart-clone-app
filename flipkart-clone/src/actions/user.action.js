import axiosInstance from "../helper/axios";
import { cartConstants, userConstants } from "./constants";

export const getAddress = () => {
  return async (dispatch) => {
    dispatch({ type: userConstants.GET_USER_ADDRESS_REQUEST });
    try {
      const res = await axiosInstance.post('/user/getaddress');
      console.log('API Response:1', res);
      console.log('API Response Data:', res.data);
      if (res.status === 200) {
        const userAddress = res.data; 
        
        console.log('API Response:2', userAddress);
        if (userAddress) {
          const  {address}  = userAddress.UserAddress;
          console.log('API Response:3', address); 
          dispatch({
            type: userConstants.GET_USER_ADDRESS_SUCCESS,
            payload: { address }
            
          });
         
        } else {
          dispatch({
            type: userConstants.GET_USER_ADDRESS_FAILURE,
            payload: { error: "User address data is missing" },
          });
        }
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.GET_USER_ADDRESS_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.error("Error fetching user address:", error);
      dispatch({
        type: userConstants.GET_USER_ADDRESS_FAILURE,
        payload: { error: error.message },
      });
    }
  };
};

export const addOrder = (payload) => {
  return async (dispatch) => {
    
   
    try {
      console.log('payyy',payload);
      const res = await axiosInstance.post('/addorder', payload);
      dispatch({ type: userConstants.ADD_USER_ORDER_REQUEST });
      
      console.log('res',res)
      if (res.status === 201) {
        console.log(res);
        const { order } = res.data;
        dispatch({
          type: cartConstants.RESET_CART,
        });
        dispatch({
          type: userConstants.ADD_USER_ORDER_SUCCESS,
          payload: { order },
        });
        // Uncomment if needed
        // const {
        //   address: { address },
        // } = res.data;
        // dispatch({
        //   type: userConstants.ADD_USER_ADDRESS_SUCCESS,
        //   payload: { address },
        // });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.ADD_USER_ORDER_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.error( error);
      let errorMsg = error.message;
      if (error.response && error.response.data) {
        errorMsg = error.response.data.error || errorMsg;
      }
      dispatch({
        type: userConstants.ADD_USER_ORDER_FAILURE,
        payload: { error: errorMsg },
      });
    }
  };
};
export const addAddress=(payload)=>{
  return async dispatch=>{
      try{
          const res=await axiosInstance.post('/user/address/create',{payload})
          dispatch({type:userConstants.ADD_USER_ADDRESS_REQUEST})
          if(res.status===201){
              console.log(res);
              const {address:{address},}=res.data
              dispatch({type:userConstants.ADD_USER_ADDRESS_SUCCESS,
                payload:{address},
              })
          } else{
              const {error}=res.data
              dispatch({type:userConstants.ADD_USER_ADDRESS_SUCCESS,
                  payload:{error}
              })
          }  
      }catch(error){
          console.log(error);
      }
  }
}
export const getOrders = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.GET_USER_ORDER_REQUEST });
      const res = await axiosInstance.get('/getOrders');

      if (res.status === 200) {
        console.log("Orders fetched successfully:", res.data);
        if (res.data.orders && res.data.orders.length === 0) {
          console.log("No orders found for the user.");
        }
        dispatch({
          type: userConstants.GET_USER_ORDER_SUCCESS,
          payload: { orders: res.data.orders }, // Access the orders array from res.data
        });
      } else {
        const { error } = res.data;
        console.error("Error fetching orders:", error);
        dispatch({
          type: userConstants.GET_USER_ORDER_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.error("Exception while fetching orders:", error);
      dispatch({
        type: userConstants.GET_USER_ORDER_FAILURE,
        payload: { error: error.message },
      });
    }
  };
};
 // Ensure you import the correct constants

export const getOrder = (payload) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.GET_USER_ORDER_DETAILS_REQUEST });

    try {
      const res = await axiosInstance.post('/getOrder', payload);

      if (res.status === 200) {
        console.log('Response:', res);
        const { order } = res.data;
        dispatch({
          type: userConstants.GET_USER_ORDER_DETAILS_SUCCESS,
          payload: { order },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.GET_USER_ORDER_DETAILS_FAILURE,
          payload: { error: error || 'An error occurred' },
        });
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response error:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        dispatch({
          type: userConstants.GET_USER_ORDER_DETAILS_FAILURE,
          payload: { error: error.response.data.message || 'An error occurred' },
        });
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request error:', error.request);
        dispatch({
          type: userConstants.GET_USER_ORDER_DETAILS_FAILURE,
          payload: { error: 'No response received from server' },
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
        dispatch({
          type: userConstants.GET_USER_ORDER_DETAILS_FAILURE,
          payload: { error: error.message || 'An error occurred' },
        });
      }
    }
    
  };
};



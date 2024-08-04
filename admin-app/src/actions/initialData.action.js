
import Orders from "../containers/Orders/Orders"
import axiosInstance from "../helper/axios"
import { categoryConstants, initialDataConstants, orderConstants, productConstants } from "./constants"

export const getInitialData = ()=>{
    return async (dispatch)=>{
        
        const res=await axiosInstance.post('/initialdata')
        if(res.status===200){
            const{categories,Products,orders}=res.data
            console.log('res',res.data)
            dispatch({type:categoryConstants.GET_ALL_CATEGORY_SUCCESS,
                payload:{categories}
            })
            dispatch({type:productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload:{Products}
            })
            dispatch({type:orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
                payload:{orders}
            })
        }
        console.log('res1',res)
    }
}

import { authConstants } from "../actions/constants";
const initialState={
    token:null,
    user:{
      firstName:'',
      lastName:'',
      email:'',
      picture:''
    },
    authenticate:false,
    authenticating:false,
    loading:false,
    error:null,
    message:''
}

export default (state={initialState},action)=>{
   
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
              state={
                ...state,
               authenticating:true,
               authenticate:false,
              
              }
              break;
        case authConstants.LOGIN_SUCCESS:
          state={
            ...state,
            user:action.payload.user,
            token:action.payload.token,
            authenticate:true,
            authenticating:false
          }
            break; 
        case authConstants.LOGOUT_REQUEST:
              state={
                ...state,
                loading:true,
                authenticate:false
              }
              break; 
        case authConstants.LOGOUT_SUCCESS:
          state={...initialState}
            
          
                break;
        case authConstants.LOGOUT_FAILURE:
          state={
            ...state,
            loading:false,
            error:action.payload.error
          }
                  break;

        default: return state 
           
        
    
    }
    return state
}
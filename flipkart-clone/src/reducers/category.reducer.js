import { categoryConstants } from "../actions/constants";

const initState={
    categories:[],
    loading:false,
    error:null
}
const buildNewCategories=(parentId,categories,category)=>{
    let mycategories=[];
    if(parentId==undefined){
        return [
            ...categories,{
                _id:category._id,
                name:category.name,
                slug:category.slug,
                children:[]
            }
        ]
    }



    for(let cat of categories){
        if(cat._id==parentId){
            mycategories.push({...cat,
                children:cat.children ? buildNewCategories(parentId,[...cat.children,{
                    _id:category._id,
                    name:category.name,
                    slug:category.slug,
                    parentId:category.parentId,
                    children:category.children
                    
                }],category):[]
            })
    
        }else{mycategories.push({...cat,
            children:cat.children ? buildNewCategories(parentId,cat.children,category):[]
        })
    
        }
        
    }
      return mycategories
}
export default (state=initState,action)=>{
    switch (action.type) {
       
        case categoryConstants.GET_ALL_CATEGORY_SUCCESS:
            state={
                ...state,
                categories:action.payload.categories
               } 
            
                break;
        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
            state={
                ...state,
                loading:true
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
            const category=action.payload.category;
        const updatedCategories = buildNewCategories(category.parentId,state.categories,category);
        console.log(updatedCategories)
            state={
              ...state,
              categories:updatedCategories,
              loading:false,
              

            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
            state={
                ...initState,

            }
            break;
        default: state={state} 
                break;
        
    }
    return state;
}
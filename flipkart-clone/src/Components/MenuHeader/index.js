import React, { useEffect } from 'react'
import './style.css'
import  {useSelector, useDispatch } from 'react-redux'
import { getAllCategory } from '../../actions'
const MenuHeader = () => {
    const category=useSelector(state=>state.category)
    const dispatch=useDispatch()
    useEffect(()=>{
       dispatch(getAllCategory())
    },[])

    const renderCategories = (categories) => {
      if (!Array.isArray(categories)) {
        return [];
      }
      
      let myCategories = [];
    
      for (let category of categories) {
        if (category && Array.isArray(category.children)) {
          myCategories.push(
            <li key={category.name}>
              {category.parentId ? 
                <a href={`/${category.slug}?cid=${category._id}&type=${category.type}`}>
                  {category.name}
                </a>
               : 
                <span>{category.name}</span>
              }
              {category.children.length > 0 ? 
                <ul>{renderCategories(category.children)}</ul>
               : null}
            </li>
          );
        }
      }
      return myCategories;
    };
  return (
    <div className='menuheader'>
      <ul>
      {category.categories && category.categories.length > 0 ? renderCategories(category.categories) : null}
      </ul>
      
    </div>
  )
}

export default MenuHeader

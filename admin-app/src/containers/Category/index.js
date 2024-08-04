import React, { useState ,useEffect} from 'react'
import Layout from '../../components/Layout'
import { Container, Row, Col, Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, getAllCategory, updateCategories, deleteCategories as deleteCategoriesAction } from '../../actions'

import NewModal from '../../components/UI/Input/Modal'
import CheckboxTree from 'react-checkbox-tree'
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoIosCheckbox, IoIosArrowDown, IoIosArrowForward, IoIosAdd, IoIosCloudUpload, IoIosTrash } from 'react-icons/io'
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import UpdateCategoriesModal from './Components/UpdateCategoriesModal'
import AddCategoryModal from './Components/AddCategoryModal'
import './style.css'

const Category = (props) => {
  const category = useSelector(state => state.category).state.state
  console.log('Category component state:', category);
console.log('category',category)
const categories = category ? (Array.isArray(category.categories) ? category.categories : []) : [];

//const categories = Array.isArray(category.categories) ? category.categories : [];


  const [show, setShow] = useState(false);
  const [categoryName, setCategoryname] = useState('')
  const [parentcategoryId, setParentcategoryId] = useState('')
  const [categoryImage, setCategoryimage] = useState('')
  const [checked, setChecked] = useState([])
  const [checkedArray, setCheckedArray] = useState([])
  const [expandedArray, setExpandedArray] = useState([])
  const [expanded, setExpanded] = useState([])
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false)
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false)
  const dispatch = useDispatch()
 //useEffect(() => {
  //console.log('category state', category);
   // if(!category.loading){
  //    setShow(false)
  //  }
  //}, [category.loading])

  const handleClose = () => {
    const form = new FormData();
   if(categoryName===""){
        alert("Categoryname is Required")
        setShow(false)
        return;
      }

    form.append('name', categoryName);
    form.append('parentId', parentcategoryId);
    form.append('categoryImage', categoryImage)
    dispatch(addCategory(form))
    setCategoryname('')
    setParentcategoryId('')



    setShow(false)
  };
  const handleShow = () => setShow(true);
  const renderCategories = (categories) => {
    if (!Array.isArray(categories)) {
      return [];
    }
  
    let myCategories = [];
    for (let category of categories) {
      if (category && Array.isArray(category.children)) {
        myCategories.push({
          label: category.name,
          value: category._id,
          children: category.children.length > 0 ? renderCategories(category.children) : []
        });
      }
    }
    return myCategories;
  };
  
  
  const createCategoryList = (categories, options = []) => {
    if (!Array.isArray(categories)) return options;

    for (let category of categories) {
      if (category && category._id && category.name) {
        options.push({ value: category._id, name: category.name, parentId: category.parentId , type:category.type});

        if (Array.isArray(category.children) && category.children.length > 0) {
          createCategoryList(category.children, options);
        }
      }
    }
    return options;
  };
  const handleCategoryImage = (e) => {
    setCategoryimage(e.target.files[0])
  }
  const updateCategory = () => {
    updateCheckedAndExpandedCategories()
    setUpdateCategoryModal(true)
    console.log('checked',checked,expanded)

  }
  const updateCheckedAndExpandedCategories = () => {
    const checkedArray = []
    const expandedArray = []
    const categories = createCategoryList(category.categories)
    checked.length > 0 && checked.forEach((categoryId, index) => {
      const category = categories.find((category, _index) => categoryId == category.value)
      category && checkedArray.push(category)

    })
    expanded.length > 0 && checked.forEach((categoryId, index) => {
      const category = categories.find((category, _index) => categoryId == category.value)
      category && expandedArray.push(category)

    })
    setCheckedArray(checkedArray)
    setExpandedArray(expandedArray)

  }
  const handleCategoryInput = (key, value, index, type) => {
    if (type == 'checked') {
      const updatedCheckedArray = checkedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item)
      setCheckedArray(updatedCheckedArray)
    }
    else if (type == 'expanded') {
      const updatedExpandedArray = expandedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item)
      setExpandedArray(updatedExpandedArray)
    }
  }
  const updateCategoriesForm = () => {
    
    const form = new FormData();
    expandedArray.forEach(item => {
      form.append('_id', item.value);
      form.append('name', item.name);
      form.append('parentId', item.parentId ? item.parentId : "");
      form.append('type', item.type);
    });
    checkedArray.forEach(item => {
      form.append('_id', item.value);
      form.append('name', item.name);
      form.append('parentId', item.parentId ? item.parentId : "");
      form.append('type', item.type);
    });
    dispatch(updateCategories(form))
    setUpdateCategoryModal(false)
    
  }


  const deleteCategory = () => {
    updateCheckedAndExpandedCategories()
    setDeleteCategoryModal(true)
  }
  const deleteCategories = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({ _id: item.value }))
    const expandedIdsArray = expandedArray.map((item, index) => ({ _id: item.value }))
    const idsArray = expandedIdsArray.concat(checkedIdsArray)
    if (checkedIdsArray.length > 0) {
      dispatch(deleteCategoriesAction(checkedIdsArray))
        .then(result => {
          if (result) {
            dispatch(getAllCategory())
            setDeleteCategoryModal(false)
          }
        })
    }
    setDeleteCategoryModal(false)
  }
  const renderDeleteCategoryModel = () => {
    return (
      <NewModal modalTitle="confirm" show={deleteCategoryModal} handleClose={() => setDeleteCategoryModal(false)}
        buttons={[
          {
            label: 'no',
            color: 'primary',
            onClick: () => {
              alert('no')
            }
          },
          {
            label: 'yes',
            color: 'danger',
            onClick: deleteCategories // check
          }
        ]}>
        <h5>Checked</h5>
        {checkedArray.map((item, index) => <span key={index}>{item.name}</span>)}
        <h5>Expanded</h5>
        {expandedArray.map((item, index) => <span key={index}>{item.name}</span>)}

      </NewModal>
    )
  }
  const CategoryList = createCategoryList(category.categories)
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Category</h3>
              <div className='actionBtnContainer'>
                <span>Actions:</span>
                <button onClick={handleShow}><IoIosAdd /><span>Add</span></button>
                <button onClick={updateCategory}><IoIosCloudUpload /><span>Edit</span></button>
                <button onClick={deleteCategory}><IoIosTrash /><span>Delete</span></button>
              </div>

            </div>

          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {/*} <ul>
             {renderCategories(category.categories)}
            </ul>*/}
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={checked => setChecked(checked)}
              onExpand={expanded => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckbox />,
                uncheck: < MdOutlineCheckBoxOutlineBlank />,
                halfCheck: <IoIosCheckbox />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />
               
              }}
              
            />
          
          </Col>
        </Row>

      </Container>
      
      <AddCategoryModal
        show={show}
        handleClose={()=>setShow(false)}
        onSubmit={handleClose}
        categoryName={categoryName}
        setCategoryname={setCategoryname}
        parentcategoryId={parentcategoryId}
        setParentcategoryId={setParentcategoryId}
        modalTitle={'Add New Category'}
        handleCategoryInput={handleCategoryInput}
        CategoryList={CategoryList}
        handleCategoryImage={handleCategoryImage}
      />
      <UpdateCategoriesModal
        show={updateCategoryModal}
        handleClose={()=>setUpdateCategoryModal(false)}
        onSubmit={updateCategoriesForm}
        size='lg'
        modalTitle={'update categories'}
        expandedArray={expandedArray}
        checkedArray={checkedArray}
        handleCategoryInput={handleCategoryInput}
        CategoryList={CategoryList} />

      {/*{renderupdateCategoriesModal()}*/}
      {renderDeleteCategoryModel()}
    </Layout>
  )
}

export default Category

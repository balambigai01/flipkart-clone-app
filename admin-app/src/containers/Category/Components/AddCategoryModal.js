import React from "react"
import Input from "../../../components/UI/Input"
import NewModal from "../../../components/UI/Input/Modal"
import { Row,Col } from "react-bootstrap"

const AddCategoryModal=(props)=>{
    const {
        show,
        handleClose,
        modalTitle,
        categoryName,
        setCategoryname,
        parentcategoryId,
        setParentcategoryId,
        CategoryList,
        handleCategoryImage,
        onSubmit

    }=props
    return( 
    
    <NewModal show={show} handleClose={handleClose} onSubmit={onSubmit}  modalTitle={modalTitle}>
    <Row>
        <Col>
        <Input value={categoryName} type='text' placeholder={'Category Name'}
         onChange={(e) => setCategoryname(e.target.value)} className='form-control-sm' />
        </Col>
        <Col>
        <select className='form-control form-control-sm' value={parentcategoryId} onChange={(e)=>setParentcategoryId(e.target.value)}>
           <option>Select Category</option>
           {
            CategoryList.map(option =>
               <option key={option.value} value={option.value}>{option.name}</option>
             )
 
           }
         </select>
        </Col>
    </Row>
    <Row>
        <Col>
        <input type='file' name='categoryImage' onChange={handleCategoryImage} />
        </Col>
    </Row>

    
 
         
     </NewModal>)
    }
    export default AddCategoryModal
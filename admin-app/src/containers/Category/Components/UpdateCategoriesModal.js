import React from "react"
import Input from "../../../components/UI/Input"
import NewModal from "../../../components/UI/Input/Modal"
import { Row,Col } from "react-bootstrap"
const UpdateCategoriesModal=(props)=>{

    const{show,
        handleClose,
        modalTitle,
        size,
        checkedArray,
        handleCategoryInput,
        expandedArray,
        CategoryList,
        onSubmit
    }=props
    console.log({expandedArray,checkedArray});
    return( <NewModal show={show} handleClose={handleClose} onSubmit={onSubmit} size={size} modalTitle={modalTitle}>
    <Row>
      <Col>
        <h6>Expanded</h6>
      </Col>
    </Row>
    {
      expandedArray.length>0 && expandedArray.map((item,index)=>
      <Row key={index}>
      <Col>
      <Input value={item.name} type='text' placeholder={'Category Name'}
        onChange={(e) => handleCategoryInput('name',e.target.value,index,'expanded')} />
      </Col>
      <Col>
      <select className='form-control' value={item.parentId} onChange={(e)=> handleCategoryInput('parentId',e.target.value,index,'expanded')}>
          <option>Select Category</option>
          {
            CategoryList.map(option =>
              <option key={option.value} value={option.value}>{option.name}</option>
            )

          }
        </select>
      </Col>
      <Col>
          <select className='form-control' value={item.type} onChange={(e)=> handleCategoryInput('type',e.target.value,index,'expanded')}>
            <option value="">Select Type</option>
            <option value="store">Store</option>
            <option value="product">Product</option>
            <option value="page">Page</option>
            
          </select>
      </Col>
    </Row>)
    }
    <h6>Checked category</h6>
    {
      checkedArray.length>0 && checkedArray.map((item,index)=>
      <Row key={index}>
      <Col>
      <Input value={item.name} type='text' placeholder={'Category Name'}
        onChange={(e) => handleCategoryInput('name',e.target.value,index,'checked')} />
      </Col>
      <Col>
      <select className='form-control' value={item.parentId} onChange={(e)=> handleCategoryInput('parentId',e.target.value,index,'checked')}>
          <option>Select Category</option>
          {
            CategoryList.map(option =>
              <option key={option.value} value={option.value}>{option.name}</option>
            )

          }
        </select>
      </Col>
      <Col>
          <select className='form-control' value={item.type} onChange={(e)=> handleCategoryInput('type',e.target.value,index,'checked')}>
            <option value="">Select Type</option>
            <option value="store">Store</option>
            <option value="product">Product</option>
            <option value="page">Page</option>
            
          </select>
      </Col>
    </Row>)
    }
        {/*<input type='file' name='categoryImage' onChange={handleCategoryImage} />*/}
    </NewModal>)
   }
   export default UpdateCategoriesModal
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import NewModal from '../../components/UI/Input/Modal'
import { Col, Row ,Container} from 'react-bootstrap'
import Input from '../../components/UI/Input'
import LinearCategories from '../../helper/LinearCategories' 
import { useDispatch, useSelector } from 'react-redux'
import{ createPage} from '../../actions'

const NewPage = () => {
    const [createModal,setCreateModal]=useState(false)
    const [title,setTitle] =useState('')
    const [categories,setcategories]=useState([])
    const [categoryId,setCategoryId]=useState('')
    const [desc,setDesc]=useState('')
    const [type,setType]=useState('')
    const [banners,setBanners]=useState([])
    const [products,setproducts]=useState([])
    const category = useSelector(state => state.category || { categories: [] }).state.state
    const dispatch=useDispatch()
    const page=useSelector(state=>state.page)
    useEffect(()=>{
        setcategories(LinearCategories(category.categories))
      },[category])

      useEffect(()=>{
             console.log(page)
         if(!page.loading){
            setCreateModal(false);
            setTitle('')
            setCategoryId('')
            setDesc('')
            setproducts([])
            setBanners([])
         }
     },[page])
      const handleBannerImage=(e)=>{
        setBanners([...banners,e.target.files[0]])
      }
      const handleProducts=(e)=>{
         setproducts([...products,e.target.files[0]])
      }
      const onCategorychange=(e)=>{
        const category= categories.find(category=>category.value==e.target.value)
         setCategoryId(e.target.value)
         setType(category.type)
      }
      const submitPageForm=(e)=>{
         //e.target.preventDefault()
         if(title===''){
            alert('title is required');
            setCreateModal(false)
            return
      }
         const form=new FormData()
         form.append('title',title)
         form.append('description',desc)
         form.append('category',categoryId)
         form.append('type',type)
         banners.forEach((banner,index)=>{
            form.append('banners',banner)
         })
         products.forEach((products,index)=>{
            form.append('products',products)
         })
         dispatch(createPage(form))
      }
     const renderCreatePageModal=()=>{
        return(
            <NewModal show={createModal} modalTitle={"create New Page"} handleClose={()=>setCreateModal(false)} onSubmit={submitPageForm}>
                <Container>
                <Row>
                <Col>
                 
           
                  {/*  <select className='form-control' value={categoryId} onChange={onCategorychange}>
      <option value="">Select Category</option>
      {categories.map(cat => (
        <option key={cat._id} value={cat._id}>{cat.name}</option>
      ))}
    </select>*/}<Input type="select" value={categoryId} onChange={onCategorychange} options={categories} placeholder={'select category'}/>
                </Col>
             </Row>
             <Row>
                <Col>
                <Input value={title}  placeholder={'page Title'}className='form control form-control-sm' onChange={(e)=> setTitle(e.target.value)} />
                </Col>
             </Row>
             <Row>
                <Col>
                <Input value={desc}  placeholder={'page Desc'}className='form control form-control-sm' onChange={(e)=> setDesc(e.target.value)} />
                </Col>
             </Row>
             <Row>
               {
                  banners.length>0?
                  banners.map((banner,index)=>
                  <Row key={index}>
                     <Col>{banner.name}
                     </Col>
                     </Row>):null
               }
                <Col>
                <Input  type='file' name='banners' onChange={handleBannerImage} />
                </Col>
             </Row>
             <Row>
             {
                  products.length>0?
                  products.map((product,index)=>
                  <Row key={index}>
                     <Col>{product.name}
                     </Col>
                     </Row>):null
               }
                <Col>
                <Input  type='file' name='products' onChange={handleProducts} />
                </Col>
             </Row>
                </Container>
               
            </NewModal>
        )
     }
    
  return (
    <Layout sidebar>
      
      {page.loading?
      <p>creating Page .....Please wait</p>
      :
      <> 
      {renderCreatePageModal()}
        <button onClick={()=>setCreateModal(true)}>create page</button></>}

  
       
    </Layout>
  )
}

export default NewPage

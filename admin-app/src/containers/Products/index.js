import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, deleteProductById } from '../../actions';
import NewModal from '../../components/UI/Input/Modal';
import './style.css';
import { generatePublicUrl } from '../../urlconfig';

const Products = (props) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [productPictures, setProductPictures] = useState([]);
  const [productDetailsModal, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [show, setShow] = useState(false);
  const product = useSelector((state) => state.product)
  console.log('product',product)
  const category = useSelector(state => state.category || { categories: [] }).state.state
  const categories = category ? category.categories : [];
  console.log(categories)
  const dispatch = useDispatch();
  const handleClose = () => {
    const form = new FormData();
    form.append('name', name);
    form.append('quantity', quantity);
    form.append('price', price);
    form.append('description', description);
    form.append('category', categoryId);
    for (let pic of productPictures) {
      form.append('productPictures', pic);
    }
    dispatch(addProduct(form));
    setShow(false);
    setName('');
    setQuantity('');
    setPrice('');
    setDescription('');
    setCategoryId('');
    setProductPictures([]);
  };

  const handleShow = () => setShow(true);
  const createCategoryList = (categories, options = [], parentId = "") => {
    if (!Array.isArray(categories)) return options;
    for (let category of categories) {
      if (category && category._id && category.name) {
        options.push({
          value: category._id,
          name: parentId ? `-- ${category.name}` : category.name,
          parentId: category.parentId || null,
        });
        if (Array.isArray(category.children) && category.children.length > 0) {
          createCategoryList(category.children, options, category._id);
        }
      }
    }
    return options;
  };
  
  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  const renderProducts = () => {
    return (
      <Table style={{ fontSize: 12 }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            
          </tr>
        </thead>
        <tbody>
          {Array.isArray(product.products) && product.products.length > 0 ? (
            product.products.map((product) => (
              <tr key={product._id} >
                <td>1</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.category.name}</td>
                <td><button onClick={() => showProductDetailModal(product)}>info</button>
                <button onClick={()=>{const payload={productId:product._id}
              dispatch(deleteProductById(payload))}}>Del</button></td>
              </tr>
            ))
          ) : null}
        </tbody>
      </Table>
    );
  };
  const renderAddProductModal = () => {
    return (
      <NewModal show={show} handleClose={handleClose} modalTitle={'Add new Product'}>
        <Input label="Name" value={name} type="text" placeholder={'Name'} onChange={(e) => setName(e.target.value)} />
        <Input label="Quantity" value={quantity} type="text" placeholder={'Quantity'} onChange={(e) => setQuantity(e.target.value)} />
        <Input label="Price" value={price} type="text" placeholder={'Price'} onChange={(e) => setPrice(e.target.value)} />
        <Input label="Description" value={description} type="text" placeholder={'Description'} onChange={(e) => setDescription(e.target.value)} />
        <select className="form-control" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
        <option value="">Select Category</option>
        {createCategoryList(categories).map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
          ))}
        </select>
        {productPictures.length > 0 ? productPictures.map((pic, index) => <div key={index}>{pic.name}</div>) : null}
        <input type="file" name="ProductPictures" onChange={handleProductPictures} />
      </NewModal>
    );
  };
  

  const handleCloseProductDetailsModal = () => {
    setProductDetailModal(false);
  };

  const showProductDetailModal = (product) => {
    setProductDetails(product);
    setProductDetailModal(true);
  };

  const renderProductDetailsModal = () => {
    if (!productDetails) {
      return null;
    }
    return (
      <NewModal show={productDetailsModal} handleClose={handleCloseProductDetailsModal} modalTitle={'Product Details'} size="lg">
        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Price</label>
            <p className="value">{productDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Quantity</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <label className="key">Category</label>
            <p className="value">{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className="key">Description</label>
            <p className="value">{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="key">Product Pictures</label>
            <div style={{ display: 'flex' }}>
              {productDetails.productPictures.map((picture, index) => (
                <div key={index} className="productImgContainer">
                  <img src={generatePublicUrl(picture.img)} alt={picture.img} />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </NewModal>
    );
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Products</h3>
              <Button onClick={handleShow}>Add</Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderProducts()}</Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderProductDetailsModal()}
    </Layout>
  );
};

export default Products;

import React from 'react';
import Layout from '../../Components/Layout';
import ProductStore from './ProductStore';
import './style.css';
import getParams from '../../utils/getParams';
import MenuHeader from '../../Components/MenuHeader';
import Header from '../../Components/Header';
import ProductPage from './productPage';
import { useParams, useLocation } from 'react-router-dom';
import ClothingAndAccessories from './ClothingAndAccessories';


const ProductListPage = () => {
  const params = useParams();
  const location = useLocation();
  
  const renderProduct = (props) => {
    const queryParams = getParams(location.search);

    let content = null;
    switch (queryParams.type) {
      case 'store':
        content = <ProductStore {...props} />;
        break;
      case 'page':
        content = <ProductPage {...props} />;
        break;
      default:
        content = <ClothingAndAccessories {...props} />;
    }
    return content;
  };
  return (
 <Layout>
  {
    renderProduct()
  }
 </Layout>
      
   
  );
};
const ProductCard = () => {
  return (
    <div className='productCard'>
      <div className='productImgContainer'>
        <img src='' alt='Samsung 4GB Phone' />
      </div>
      <div className='productDetails'>
        <div>Samsung 4GB Phone</div>
        <div>
          <span>4.3</span>
          <span>3353</span>
        </div>
        <div>₹5000</div>
      </div>
    </div>
  );
};

export default ProductListPage;

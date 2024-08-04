import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { generatePublicUrl } from '../../../urlconfig';
import { getProductBySlug } from '../../../actions';
import { Link } from 'react-router-dom';
import Card from '../../../Components/UI/Card';
import { MaterialButton } from '../../../Components/MaterialUI';
import Rating from '../../../Components/UI/Card/Rating';
import Price from '../../../Components/UI/Card/Price';


const ProductStore = (props) => {
  const product = useSelector(state => state.product);
  const dispatch = useDispatch();
  const { slug } = useParams();
  const location = useLocation(); // useLocation to get the current URL
  const priceRange=product.priceRange
 {/*  const [priceRange, setPriceRange] = useState({
    under5k: 5000,
    under10k: 10000,
    under15k: 15000,
    under20k: 20000,
    under30k: 30000
  });*/}

  useEffect(() => {
    if (slug) {
      dispatch(getProductBySlug(slug));
    }
  }, [dispatch, slug]);

  const queryParams = new URLSearchParams(location.search); // Parse query params from location.search

  return (
    <>
      {
        Object.keys(product.productsByPrice).map((key, index) => {
          return (
            <Card 
            headerLeft={`${slug} under ${priceRange[key]}`}
            headerRight={  <MaterialButton
              title={"VIEW ALL"}
              style={{
                width: "96px",
              }}
              bgColor="#2874f0"
              fontSize="12px"
            />}
           style={{margin:'20px'}} >
              
              <div style={{ display: 'flex' }}>
                {
                  product.productsByPrice[key].map(product => (
                    <Link to={`/${product.slug}/${product._id}/p`} style={{display:'block', textDecoration: "none",
                      color: "#000",}} className='productContainer' key={product._id}>
                      <img src={generatePublicUrl(product.productPictures[0].img)} alt='' />
                      <div className='productinfo'>
                        <div style={{ margin: '5px 0' }}>
                          {product.name}
                        </div>
                        <div>
                        <Rating value="4.3" />&nbsp;&nbsp;
                        <span
                        style={{
                          color: "#777",
                          fontWeight: "500",
                          fontSize: "12px",
                        }}
                      >
                        (3353)
                      </span>
                        </div>
                        <Price value={product.price}/>
                      </div>
                    </Link>
                  ))
                }
              </div>
            </Card>
          );
        })
      }
    </>
  );
}

export default ProductStore;

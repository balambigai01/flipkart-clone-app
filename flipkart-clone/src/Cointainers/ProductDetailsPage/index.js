import React, { useEffect } from 'react'
import Layout from '../../Components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetailsById } from '../../actions'
import { useNavigate, useParams } from 'react-router-dom'
import './style.css'
import { generatePublicUrl } from '../../urlconfig'
import { IoIosArrowForward, IoIosStar, IoMdCart } from 'react-icons/io'
import { AiFillThunderbolt } from 'react-icons/ai'
import { BiRupee } from 'react-icons/bi'
import { MaterialButton } from '../../Components/MaterialUI'
import { addToCart } from '../../actions/cart.action'

    


const ProductDetailsPage = () => {
  const dispatch = useDispatch()
  
  const navigate = useNavigate()
  const product=useSelector(state=>state.product)
  const cartItem=()=>{
   
      const { _id, name, price } = product.productDetails;
    const img = product.productDetails.productPictures[0].img;
    dispatch(addToCart({ _id, name, price, img }));
    navigate('/cart');
}

    const { productId } = useParams()
     console.log('res1',productId)
    useEffect(() => {
        const payload = {
            params: {
                productId
            }
        }
        dispatch(getProductDetailsById(payload))
    }, [dispatch, productId])  // Include dispatch and productId as dependencies
    if(Object.keys(product.productDetails).length ===0){
        return null;
    }

    return (
        <Layout>
        {/* <div>{product.productDetails.name}</div> */}
        <div className="productDescriptionContainer">
          <div className="flexRow">
            <div className="verticalImageStack">
              {product.productDetails.productPictures.map((thumb, index) => (
                <div className="thumbnail">
                  <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />
                </div>
              ))}
            </div>
            <div className="productDescContainer">
              <div className="productDescImgContainer">
                <img
                  src={generatePublicUrl(product.productDetails.productPictures[0].img)}
                  alt={`${product.productDetails.productPictures[0].img}`}
                />
              </div>
  
              {/* action buttons */}
              <div className="flexRow" >
                <MaterialButton
                  title="ADD TO CART"
                  bgColor="#ff9f00"
                  textColor="#ffffff"
                  style={{
                    margin: "20px",
                  }}
                  icon={<IoMdCart />}
                  
                  onClick={cartItem}
                 
                />
                <MaterialButton
                  title="BUY NOW"
                  bgColor="#fb641b"
                  textColor="#ffffff"
                  style={{
                    margin: "20px",
                  }}
                  icon={<AiFillThunderbolt />}
                />
              </div>
            </div>
          </div>
          <div>
            {/* home > category > subCategory > productName */}
            <div className="breed">
              <ul>
                <li>
                  <a href="#">Home</a>
                  <IoIosArrowForward />
                </li>
                <li>
                  <a href="#">Mobiles</a>
                  <IoIosArrowForward />
                </li>
                <li>
                  <a href="#">Samsung</a>
                  <IoIosArrowForward />
                </li>
                <li>
                  <a href="#">{product.productDetails.name}</a>
                </li>
              </ul>
            </div>
            {/* product description */}
            <div className="productDetails">
              <p className="productTitle">{product.productDetails.name}</p>
              <div>
                <span className="ratingCount">
                  4.3 <IoIosStar />
                </span>
                <span className="ratingNumbersReviews">
                  72,234 Ratings & 8,140 Reviews
                </span>
              </div>
              <div className="extraOffer">
                Extra <BiRupee />
                4500 off{" "}
              </div>
              <div className="flexRow priceContainer">
                <span className="price">
                  <BiRupee />
                  {product.productDetails.price}
                </span>
                <span className="discount" style={{ margin: "0 10px" }}>
                  22% off
                </span>
                {/* <span>i</span> */}
              </div>
              <div>
                <p
                  style={{
                    color: "#212121",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Available Offers
                </p>
                <p style={{ display: "flex" }}>
                  <span
                    style={{
                      width: "100px",
                      fontSize: "12px",
                      color: "#878787",
                      fontWeight: "600",
                      marginRight: "20px",
                    }}
                  >
                    Description
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#212121",
                    }}
                  >
                    {product.productDetails.description}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
}

export default ProductDetailsPage

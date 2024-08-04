import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductBySlug } from "../../../actions";
import { BiRupee } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./style.css";
import Card from "../../../Components/UI/Card";
import { generatePublicUrl } from "../../../urlconfig";

/**
 * @function ClothingAndAccessories
 **/
const ClothingAndAccessories = () => {
  const { slug } = useParams();
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductBySlug(slug));
  }, [dispatch, slug]);

  return (
    <div style={{ padding: "10px" }}>
      <Card
        style={{
          boxSizing: "border-box",
          padding: "10px",
          display: "flex",
        }}
      >
        {product.products.map((product) => (
          <div className="caContainer" key={product._id}>
            <Link
              className="caImgContainer"
              to={`/${product.slug}/${product._id}/p`}
            >
                 
              <img src={generatePublicUrl(product.productPictures[0].img)} alt={product.name} />
            </Link>
            <div>
              <div className="caProductName">{product.name}</div>
              <div className="caProductPrice">
                <BiRupee />
                {product.price}
              </div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default ClothingAndAccessories;

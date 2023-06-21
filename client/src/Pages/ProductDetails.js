import { useParams } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/ProductDetails.css";
const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();
  const getProduct = async () => {
    try {
      const response = await axios.get(`/product/get-product/${params.slug}`);

      setProduct(response?.product);
      getSimilarProduct(response?.product._id, response?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const response = await axios.get(
        `/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(response?.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params.slug]);
  return (
    <Layout title={"Details product"}>
      <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`${process.env.REACT_APP_API}/product/product-photo/${product._id}`}
            className="card-img-top"
            style={{ height: "300px", width: "300px" }}
            alt={product?.name}
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <h6>Name:{product?.name}</h6>
          <h6>Description:{product?.description}</h6>
          <h6>Price:{product?.price}</h6>
          <h6>Category:{product?.category?.name}</h6>
          <h6>Shipping:{product?.shipping}</h6>
          <button className="btn btn-secondary ms-2">ADD TO CART</button>
        </div>
      </div>
      <div className="row container similar-products">
        <h4>Similar products</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" key={p._id}>
              <img
                src={`${process.env.REACT_APP_API}/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">{p.price}</h5>
                </div>
                <p className="card-text ">
                  {p.description.substring(0, 60)}...
                </p>
                <div className="card-name-price">
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  {/* <button
                  className="btn btn-dark ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, p])
                    );
                    toast.success("Item Added to cart");
                  }}
                >
                  ADD TO CART
                </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;

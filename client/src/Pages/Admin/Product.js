import { useEffect, useState } from "react";
import AdminMenu from "../../Components/Layout/AdminMenu";
import Layout from "../../Components/Layout/Layout";
import axios from "../../config/axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    try {
      const response = await axios.get(`/product/get-product`);
      console.log(response);
      if (response?.success) {
        setProducts(response.products);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All products list</h1>
            <div className="d-flex flex-wrap">
              {" "}
              {products?.map((product) => {
                return (
                  <>
                    <Link
                      to={`/dashboard/admin/product/${product.slug}`}
                      className="product-link"
                    >
                      <div
                        className="card m-2"
                        style={{ width: "18rem", minWidth: "18rem" }}
                      >
                        <img
                          className="card-img-top"
                          src={`${process.env.REACT_APP_API}/product/product-photo/${product._id}`}
                          alt={product?.name}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{product.name}</h5>
                          <p className="card-text">{product.description}</p>
                        </div>
                      </div>
                    </Link>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;

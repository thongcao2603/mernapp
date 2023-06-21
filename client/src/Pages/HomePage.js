import { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "../config/axios";
import { Link } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import Price, { Prices } from "../Components/Price";
const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  const getAllCategory = async () => {
    try {
      const response = await axios.get(`/category/get-category`);
      setCategories(response.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const getAllProduct = async () => {
    try {
      const response = await axios.get(`/product/get-product`);
      setProducts(response.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProduct();
  }, [checked.length, radio.length]);
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //get filter product
  const filterProduct = async () => {
    try {
      const response = await axios.post(`/product/product-filters`, {
        checked,
        radio,
      });
      setProducts(response.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All Products - Best offers"}>
      <div className="row mt-3">
        <div className="col-md-3">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column m-2">
            {" "}
            {categories.map((cat) => {
              return (
                <Checkbox
                  key={cat._id}
                  onChange={(e) => handleFilter(e.target.checked, cat._id)}
                >
                  {cat.name}
                </Checkbox>
              );
            })}
          </div>
          <h4 className="text-center">Filter by Price</h4>
          <div className="d-flex flex-column m-2">
            <Radio.Group>
              {Prices?.map((price) => {
                return (
                  <div key={price._id}>
                    <Radio
                      value={price.array}
                      onChange={(e) => setRadio(e.target.value)}
                    >
                      {price.name}
                    </Radio>
                    ;
                  </div>
                );
              })}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTER
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
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
                        <h5 className="card-title">{product?.name}</h5>
                        <p className="card-text">
                          {product?.description.substring(0, 30)}...
                        </p>
                        <p className="card-text">${product?.price}</p>
                        <button className="btn btn-primary ">
                          More details
                        </button>
                        <button className="btn btn-secondary ms-2">
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </Link>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

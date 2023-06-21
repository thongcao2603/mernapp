import { useEffect, useState } from "react";
import axios from "../../config/axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import { Select } from "antd";
const { Option } = Select;
const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  const getSingleProduct = async () => {
    try {
      const response = await axios.get(`/product/get-product/${params.slug}`);
      console.log(response);
      setName(response.product.name);
      setId(response.product._id);
      setDescription(response.product.description);
      setPrice(response.product.price);
      setCategory(response.product.category._id);
      setQuantity(response.product.quantity);
      setShipping(response.product.shipping);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
  }, []);

  //get all category
  const getAllCategory = async () => {
    try {
      const response = await axios.get("/category/get-category");
      if (response?.success) {
        setCategories(response?.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting catgory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const response = axios.put(`product/update-product/${id}`, productData);
      if (response?.success) {
        toast.error(response?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  const handleDelete = async () => {};

  return (
    <Layout title={"Dashboard- Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                showSearch
                value={category}
              >
                {categories?.map((cat) => {
                  return (
                    <Option key={cat?._id} value={cat?._id}>
                      {cat?.name}
                    </Option>
                  );
                })}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`${process.env.REACT_APP_API}/product/product-photo/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={price}
                  placeholder="Enter price of product"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Enter quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select shipping"
                  showSearch
                  size="large"
                  className="form-select mb-3"
                  onChange={(e) => setShipping(e)}
                  value={shipping ? "yes" : "no"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  Update Product
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;

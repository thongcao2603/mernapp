import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import axios from "../../config/axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import CategoryForm from "../../Components/Form/CategoryForm";
import { Button, Input, Modal } from "antd";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  //handle submit add category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/category/create-category`, { name });
      if (response?.success) {
        toast.success(`${response?.category?.name} is created`);
        getAllCategory();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  //handle update cat
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (response?.success) {
        toast.success(`${updatedName} updated successfully`);
        setSelected(null);
        setUpdatedName("");
        setIsModalOpen(false);
        getAllCategory();
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  //getAll cat
  const getAllCategory = async () => {
    try {
      const response = await axios.get(`/category/get-category`);
      if (response.success) {
        setCategories(response?.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage category</h1>
            <div className="p-3">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((cat, index) => {
                    return (
                      <>
                        <tr key={index}>
                          <td>{cat.name}</td>
                          <td>
                            <button
                              className="btn btn-primary ms-2"
                              onClick={(e) => {
                                setIsModalOpen(true);
                                setUpdatedName(cat.name);
                                setSelected(cat);
                              }}
                            >
                              Edit
                            </button>
                            <button className="btn btn-danger ms-2">
                              Delete
                            </button>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Modal
              title="Edit category"
              onCancel={() => setIsModalOpen(false)}
              footer={null}
              open={isModalOpen}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;

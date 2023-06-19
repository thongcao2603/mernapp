import { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import toast, { Toaster } from "react-hot-toast";
import axios from "../../config/axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`auth/login`, { email, password });
      if (response && response?.success) {
        toast.success(response.message);
        navigate("/");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <Layout title="Login- Ecommerce App">
        <div className="form-container" style={{ minHeight: "90vh" }}>
          <h1 className="title">Login Page</h1>
          <form onSubmit={handleSubmit}>
            <div className=" mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className=" mb-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Login;

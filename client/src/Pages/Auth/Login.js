import { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import toast, { Toaster } from "react-hot-toast";
import axios from "../../config/axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`auth/login`, { email, password });
      if (response && response?.success) {
        toast.success(response.message);

        setAuth({
          ...auth,
          user: response.user,
          token: response.token,
        });
        localStorage.setItem("auth", JSON.stringify(response));
        navigate(location.state || "/");
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
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  navigate("/forgot-password");
                }}
              >
                {" "}
                Forgot password
              </button>
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Login;

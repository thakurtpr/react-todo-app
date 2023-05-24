import { Link, Navigate } from "react-router-dom";
import "../styles/login.css";
import { useContext, useState } from "react";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
      setIsAuthenticated(false);
    }
  };
  if (isAuthenticated) return <Navigate to={"/"} />;
  return (
    <div className="login-box">
      <div className="login-header">
        <header>Login</header>
      </div>
      <form onSubmit={submitHandler}>
        <div className="input-box">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="input-field"
            placeholder="Email"
            required
          />
        </div>
        <div className="input-box">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="input-field"
            placeholder="Password"
            required
          />
        </div>
        <button disabled={loading} className="btn" type="submit">
          Login
        </button>
      </form>
      <div className="sign-up-link">
        <p>
          Don't have account? <Link to={"/register"}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

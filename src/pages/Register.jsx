import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../styles/login.css";
import axios from "axios";
import { Context, server } from "../main";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/users/new`,
        { name, email, password },
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
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;
  return (
    <div className="login-box">
      <div className="login-header">
        <header>Register</header>
      </div>
      <form onSubmit={submitHandler}>
        <div className="input-box">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="input-field"
            placeholder="Name"
            required
          />
        </div>
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
        <button className="btn" type="submit">
          Sign Up
        </button>
      </form>
      <div className="sign-up-link">
        <p>
          Already Registerd?
          <Link to={"/login"}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

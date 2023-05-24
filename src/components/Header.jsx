import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const logoutHandler = async () => {
    setLoading(true);
    try {
      await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });
      toast.success("Logged Out Successfully");
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  return (
    <nav className="header">
      <div className="todoapplogo">
        <h2>To Do App</h2>
      </div>

      <article className="navigation">
        {isAuthenticated ? (
          <>
            <Link className="nav" to={"/"}>
              Home
            </Link>
            <Link className="nav" to={"/profile"}>
              Profile
            </Link>
          </>
        ) : (
          <></>
        )}

        {isAuthenticated ? (
          <Link
            className="nav"
            disabled={loading}
            onClick={logoutHandler}
            to={"/logout"}
          >
            Logout
          </Link>
        ) : (
          <>
            <Link className="nav" to={"/login"}>
              Login
            </Link>
            <Link className="nav" to={"/register"}>
              Sign Up
            </Link>
          </>
        )}
      </article>
    </nav>
  );
};

export default Header;

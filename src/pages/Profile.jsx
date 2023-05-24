import { useContext, useEffect } from "react";
import { Context, server } from "../main";
// import { Navigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  // const { isAuthenticated, loading, user } = useContext(Context);
  // if (!isAuthenticated) return <Navigate to={"/login"} />;

  const { user, setUser, setIsAuthenticated, setLoading } = useContext(Context);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch((error) => {
        setUser({});
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);

  return (
    <div className="profile">
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};

export default Profile;

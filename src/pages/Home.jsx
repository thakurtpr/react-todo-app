import axios from "axios";
import { Context, server } from "../main";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import TodoItem from "../components/TodoItem";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { isAuthenticated } = useContext(Context);

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `${server}/task/${id}`,
        // {},data nahi de sakte only config he
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/task/new`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTitle("");
      setDescription("");
      toast.success(data.message);
      setLoading(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/task/my`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, [refresh]);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="home_container">
      <form onSubmit={submitHandler}>
        <div className="input_box_home">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="input_field_home"
            placeholder="Title"
            required
          />
        </div>
        <div className="input_box_home">
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            className="input_field_home"
            placeholder="Description"
            required
          />
        </div>
        <button disabled={loading} className="btn_home" type="submit">
          Add Task
        </button>
      </form>
      <section className="todosContainer">
        {tasks.map((i) => (
          <TodoItem
            key={i._id}
            title={i.title}
            description={i.description}
            isCompleted={i.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            id={i._id}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;

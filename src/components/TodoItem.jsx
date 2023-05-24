const TodoItem = ({
  title,
  description,
  isCompleted,
  updateHandler,
  deleteHandler,
  id,
}) => {
  return (
    <div className="todo">
      <div className="todo_task">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <div className="todo_two">
        <input
          onChange={() => updateHandler(id)}
          type="checkbox"
          checked={isCompleted}
        />
        <button onClick={() => deleteHandler(id)} className="btn_delete">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;

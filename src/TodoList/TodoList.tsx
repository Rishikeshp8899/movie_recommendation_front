import  { useEffect, useState } from "react";
import AddTask from "../addTask/AddTask";
import "./Todolist.css"; // reuse your theme
import ApiCall from "../service/ApiCall";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Header from "../Header/Header"; // Assuming you have a Header component for the page header

interface Todo {
  _id: string;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  // Toggle complete status
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await ApiCall({ apiname: "GET_TODOS" });
      setTodos(res.data || []); // Adjust depending on your API's response shape
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
    setLoading(false);
  };

    // Delete todo
  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await ApiCall({ apiname: "DELETE_TODO", userData: { id } });
      setTodos(todos.filter((todo) => todo._id !== id));
      fetchTodos();
      setLoading(false);
    } catch (err) {
      console.error("Delete failed:", err);
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string) => {
    setLoading(true);
    try {
      setLoading(false);
      navigate(`/update-todo/${id}`);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);



  return  loading ? (
  <LoadingSpinner />
) : (
  <> 
    <Header  />
  <div className="container-fluid vh-100 bg-black text-white p-3">

    <div className="row h-100">
      {/* Left quarter - Add Task */}
      <div className="col-12 col-md-5 mb-6">
        <AddTask onTaskAdded={(text) => {
          setTodos([...todos, { _id: Date.now().toString(), text, completed: false }]);
          fetchTodos();
        }} />
      </div>

      {/* Todo List */}
    
      <div className="col-12 col-md-7">
        <h2 className="peacock-text mb-4">Todo List</h2>
        <ul className="list-group">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="list-group-item d-flex justify-content-between align-items-center bg-dark text-white border-secondary"
            >
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  cursor: "pointer",
                }}
              >
                {todo.text}
              </span>
              <div>
                <button
                  className="btn btn-sm peacock-btn me-2"
                >
                  {todo.completed ? "Undo" : "Complete"}
                </button>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleUpdate(todo._id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(todo._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
          {todos.length === 0 && (
            <li className="list-group-item bg-dark text-white border-secondary">
              No tasks found
            </li>
          )}
        </ul>
      </div>
    </div>
  </div>
  </>
);

}

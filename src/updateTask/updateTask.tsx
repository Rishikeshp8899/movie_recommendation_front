import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./updateTask.css"; // reuse the login theme styles
import ApiCall from "../service/ApiCall";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";



export default function UpdateTask() {
  const navigate = useNavigate();
  const { id } = useParams();
  // Fetch the task text from the backend when component loads
  useEffect(() => {
    setLoading(true);
    const fetchTask = async () => {
      const res = await ApiCall({ apiname: "GET_TODO_BY_ID", userData: { id } });
      setTask(res.data.text);
      setLoading(false);
    };
    fetchTask();
  }, [id]);


const [loading, setLoading] = useState(false);
const [task, setTask] = useState("");

const handleUpdate = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  try {
    await ApiCall({ apiname: "UPDATE_TODO", userData: { id, text: task } });
    setLoading(false);
    navigate("/todo-list");
  } catch (err) {
    console.error("Update failed:", err);
    setLoading(false);
    navigate(`/update-todo/${id}`);
  }
};

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div className="d-flex justify-content-center align-items-center vh-100 vw-80">
      <div className="login-card col-12 col-sm-6 col-md-4">
        <h2 className="text-center peacock-text mb-4">Update Task</h2>

        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label htmlFor="task" className="form-label peacock-text">
              Task
            </label>
            <input
              type="text"
              id="task"
              className="form-control bg-dark text-white"
              placeholder="Enter updated task"
              value={task}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setTask(e.target.value)}}
              required
            />
          </div>

          <button
            type="submit"
            className="btn peacock-btn w-100 mt-3 border-info bg-gradient text-info"
          >
            {loading ? "Updating..." : "Update Task"}
          </button>
        </form>
      </div>
    </div>
  );
}


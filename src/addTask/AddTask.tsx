import React, { useState } from "react";
import ApiCall from "../service/ApiCall";
interface AddTaskProps {
  onTaskAdded: (userdata: any) => void;
  spinner: (data: any) => void;
  loading?: boolean;   // <-- add this
}

export default function AddTask({ onTaskAdded, spinner, loading = false }: AddTaskProps) {
  const [task, setTask] = useState("");

  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    spinner(true);
    try {
      const response = await ApiCall({
        apiname: "GET_RECOMMENDATIONS",
        userData: { query: task },
      });
      console.log("API Response:", response.data);
      onTaskAdded(response.data);
    } catch (error: any) {
      console.error("Add task failed:", error);
      onTaskAdded(null);
    } finally {
      spinner(false);
    }
    setTask("");
  };

  return (
    <div className="d-flex justify-content-center vh-30 vw-40">
      <div className="login-card col-12 col-sm-6 col-md-4">
        <h2 className="text-center peacock-text mb-4">What would you love to see?</h2>
        <form onSubmit={handleAddTask}>
          <div className="mb-3">
            <label htmlFor="task" className="form-label peacock-text">Task</label>
            <input
              type="text"
              id="task"
              className="form-control bg-dark text-white"
              placeholder="Enter your task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn peacock-btn w-100 mt-3 border-info bg-gradient text-info"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>
    </div>
  );
}

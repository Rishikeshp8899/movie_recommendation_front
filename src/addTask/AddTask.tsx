
import React, { useState } from "react";
import "./AddTask.css"; // Reuse login theme
import ApiCall from "../service/ApiCall";

interface AddTaskProps {
  onTaskAdded: (text:string) => void;
}

export default function AddTask({ onTaskAdded }: AddTaskProps) {
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await ApiCall({
        apiname: "CREATE_TODO",
        userData: { text: task },
      });
      setLoading(false);

    } catch (error: any) {
      console.error("Add task failed:", error);
      setLoading(false);
    }
    onTaskAdded(task);
  };

  return (
    <div className="d-flex justify-content-center  vh-40 vw-40">
      <div className="login-card col-12 col-sm-6 col-md-4">
        <h2 className="text-center peacock-text mb-4">Add Task</h2>

        {/* Task Form */}
        <form onSubmit={handleAddTask}>
          <div className="mb-3">
            <label htmlFor="task" className="form-label peacock-text">
              Task
            </label>
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
            {loading ? "Adding..." : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
}

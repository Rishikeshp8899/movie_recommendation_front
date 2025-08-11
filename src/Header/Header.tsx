// Header.tsx
import { useNavigate } from "react-router-dom";


import "./header.css"; // Same styles as login page

export default function Header() {
   const navigate = useNavigate();
  
  const handleLogout = () => {
  localStorage.removeItem('token'); // remove JWT
  navigate("/login");
};

  return (
    <header className="header bg-dark text-white d-flex justify-content-between align-items-center px-4 py-3">
      <h2 className="m-0 peacock-text">My Todo App</h2>
      <button
        onClick={handleLogout}
        className="btn peacock-btn border-info text-info px-3 py-1"
      >
        Logout
      </button>
    </header>
  );
}

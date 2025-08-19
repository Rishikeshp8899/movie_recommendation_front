// Header.tsx
import { useNavigate } from "react-router-dom";
import "./header.css"; // Same styles as login page

interface HeaderProps {
  homepage?: string;
  booking?: string;
}

export default function Header({ homepage, booking }: HeaderProps) {
   const navigate = useNavigate();
  
  const handleLogout = () => {
  localStorage.removeItem('token'); // remove JWT
  navigate("/login");
};

  return (
    <header className="header bg-dark text-white d-flex justify-content-between align-items-center px-4 py-3">
      <h2 className="m-0 peacock-text">Movie Recommendation App</h2>

      <div>
        {
          homepage && (
             <button
        onClick={() => navigate("/bookings")}
        className="btn peacock-btn border-info text-info px-3 py-1 me-2">
          All Bookings
        </button>
          )
        }
       
       {
         booking && (
           <button
             onClick={() => navigate("/home")}
             className="btn peacock-btn border-info text-info px-3 py-1 me-2"
           >
            Home
           </button>
         )
       }
          <button
        onClick={handleLogout}
        className="btn peacock-btn border-info text-info px-3 py-1"
      >
        Logout
      </button>
      </div>
    
      
    </header>
  );
}

import {
    Navigate
} from "react-router-dom";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = localStorage.getItem("token"); // or from Redux/context
  console.log("ProtectedRoute render:", isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" />;
}

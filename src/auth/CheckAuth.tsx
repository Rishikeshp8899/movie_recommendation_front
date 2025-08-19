import {
    Navigate
} from "react-router-dom";

export default function CheckAuth({ children }: { children: React.ReactNode }) {
  const isLoggedIn = localStorage.getItem("token"); // or from Redux/context
  console.log("CheckAuth render:", isLoggedIn);
  return  isLoggedIn ? <Navigate to="/home" /> : children;
}

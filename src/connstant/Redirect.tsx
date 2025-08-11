import { Navigate } from "react-router-dom";

function RedirectPage(url:string) {
  const isLoggedIn = false; // your auth condition

  if (!isLoggedIn) {
    return <Navigate to={`${url}`} replace />;
  }

  return <h1>Welcome to Dashboard</h1>;
}

export default RedirectPage;
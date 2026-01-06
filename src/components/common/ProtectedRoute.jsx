import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const userId = localStorage.getItem("userId");

  // 로그인 안 된 상태
  if (!userId) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
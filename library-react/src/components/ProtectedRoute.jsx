import { Navigate } from "react-router-dom";

// Only shows the page if the user is logged in
// (and has one of the allowed roles, when roles are given).
function ProtectedRoute({ currentUser, roles, children }) {
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;

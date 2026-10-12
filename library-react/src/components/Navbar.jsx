import { NavLink } from "react-router-dom";

function Navbar({ currentUser, onLogout }) {
  const canManageBooks =
    currentUser && (currentUser.role === "Admin" || currentUser.role === "Librarian");
  const isAdmin = currentUser && currentUser.role === "Admin";

  return (
    <header className="navbar">
      <h1>Community Library</h1>

      {currentUser && (
        <nav>
          <NavLink to="/" end>Dashboard</NavLink>
          {canManageBooks && <NavLink to="/books">Books</NavLink>}
          {canManageBooks && <NavLink to="/transactions">Transactions</NavLink>}
          {isAdmin && <NavLink to="/users">Users</NavLink>}
        </nav>
      )}

      {currentUser && (
        <div className="user-box">
          <span>{currentUser.name} ({currentUser.role})</span>
          <button onClick={onLogout}>Logout</button>
        </div>
      )}
    </header>
  );
}

export default Navbar;

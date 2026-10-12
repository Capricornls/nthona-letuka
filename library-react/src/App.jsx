import { Routes, Route, Navigate } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Transactions from "./pages/Transactions";
import Users from "./pages/Users";
import Login from "./pages/Login";

// The first time the app runs there is one admin account
const defaultUsers = [
  { id: "u1", name: "Admin User", membershipId: "M001", role: "Admin", password: "admin123" }
];

// Makes a unique id for a new book, user or transaction
function makeId() {
  return Date.now().toString() + Math.random().toString(16).slice(2, 6);
}

function App() {
  // All the data lives here and is saved in local storage
  const [books, setBooks] = useLocalStorage("books", []);
  const [users, setUsers] = useLocalStorage("users", defaultUsers);
  const [transactions, setTransactions] = useLocalStorage("transactions", []);
  const [currentUserId, setCurrentUserId] = useLocalStorage("currentUserId", null);

  const currentUser = users.find((user) => user.id === currentUserId) || null;

  // ----- login / logout -----
  function login(membershipId, password) {
    const found = users.find(
      (user) =>
        user.membershipId.toLowerCase() === membershipId.trim().toLowerCase() &&
        user.password === password
    );
    if (!found) {
      return false;
    }
    setCurrentUserId(found.id);
    return true;
  }

  function logout() {
    setCurrentUserId(null);
  }

  // ----- books -----
  function addBook(bookData) {
    setBooks([...books, { ...bookData, id: makeId() }]);
  }

  function updateBook(id, changes) {
    setBooks(books.map((book) => (book.id === id ? { ...book, ...changes } : book)));
  }

  function deleteBook(id) {
    setBooks(books.filter((book) => book.id !== id));
  }

  // ----- transactions (change a book's quantity and add to the history) -----
  function recordTransaction(bookId, type, quantity) {
    const book = books.find((b) => b.id === bookId);
    const newQuantity = type === "add" ? book.quantity + quantity : book.quantity - quantity;

    updateBook(bookId, { quantity: newQuantity });

    const newTransaction = {
      id: makeId(),
      date: new Date().toLocaleString(),
      bookTitle: book.title,
      type: type,
      quantity: quantity,
      by: currentUser.name
    };
    setTransactions([newTransaction, ...transactions]);
  }

  // ----- users -----
  function addUser(userData) {
    setUsers([...users, { ...userData, id: makeId() }]);
  }

  function updateUser(id, changes) {
    setUsers(users.map((user) => (user.id === id ? { ...user, ...changes } : user)));
  }

  function deleteUser(id) {
    setUsers(users.filter((user) => user.id !== id));
  }

  return (
    <div>
      <Navbar currentUser={currentUser} onLogout={logout} />

      <main className="container">
        <Routes>
          <Route path="/login" element={<Login currentUser={currentUser} onLogin={login} />} />

          <Route
            path="/"
            element={
              <ProtectedRoute currentUser={currentUser}>
                <Dashboard books={books} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/books"
            element={
              <ProtectedRoute currentUser={currentUser} roles={["Admin", "Librarian"]}>
                <Books books={books} onAdd={addBook} onUpdate={updateBook} onDelete={deleteBook} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/transactions"
            element={
              <ProtectedRoute currentUser={currentUser} roles={["Admin", "Librarian"]}>
                <Transactions books={books} transactions={transactions} onRecord={recordTransaction} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/users"
            element={
              <ProtectedRoute currentUser={currentUser} roles={["Admin"]}>
                <Users
                  users={users}
                  currentUser={currentUser}
                  onAdd={addUser}
                  onUpdate={updateUser}
                  onDelete={deleteUser}
                />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

import BookCard from "../components/BookCard";
import { LOW_STOCK_LIMIT } from "../constants";

function Dashboard({ books }) {
  const totalCopies = books.reduce((sum, book) => sum + book.quantity, 0);
  const lowStockCount = books.filter((book) => book.quantity < LOW_STOCK_LIMIT).length;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Books with fewer than {LOW_STOCK_LIMIT} copies are highlighted.</p>

      <div className="summary">
        <div className="summary-box">
          <strong>{books.length}</strong>
          <span>Titles</span>
        </div>
        <div className="summary-box">
          <strong>{totalCopies}</strong>
          <span>Total copies</span>
        </div>
        <div className="summary-box">
          <strong>{lowStockCount}</strong>
          <span>Low stock</span>
        </div>
      </div>

      {books.length === 0 ? (
        <p className="empty">No books yet. A librarian can add books on the Books page.</p>
      ) : (
        <div className="card-grid">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;

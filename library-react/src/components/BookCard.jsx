import { LOW_STOCK_LIMIT } from "../constants";

// One book shown as a card on the dashboard
function BookCard({ book }) {
  const isLow = book.quantity < LOW_STOCK_LIMIT;

  return (
    <div className={isLow ? "card low-stock" : "card"}>
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <p>{book.genre} | ISBN {book.isbn}</p>
      <p className="copies">{book.quantity} in stock</p>
      {isLow && <span className="badge">Low stock</span>}
    </div>
  );
}

export default BookCard;

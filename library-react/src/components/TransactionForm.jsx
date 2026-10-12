import { useState } from "react";

// Form for adding stock (new books arrived) or deducting stock (book borrowed)
function TransactionForm({ books, onRecord }) {
  const [bookId, setBookId] = useState("");
  const [type, setType] = useState("add");
  const [quantity, setQuantity] = useState("1");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    const book = books.find((b) => b.id === bookId);
    const amount = Number(quantity);

    if (!book) {
      setError("Please choose a book.");
      return;
    }
    if (!Number.isInteger(amount) || amount < 1) {
      setError("Quantity must be a whole number of at least 1.");
      return;
    }
    if (type === "borrow" && amount > book.quantity) {
      setError("Not enough copies. Only " + book.quantity + " in stock.");
      return;
    }

    setError("");
    onRecord(book.id, type, amount);
    setQuantity("1");
    setMessage("Transaction saved.");
  }

  return (
    <form className="form-box" onSubmit={handleSubmit} noValidate>
      <h3>Record a Transaction</h3>

      <label>
        Book
        <select value={bookId} onChange={(e) => setBookId(e.target.value)}>
          <option value="">-- Choose a book --</option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title} ({book.quantity} in stock)
            </option>
          ))}
        </select>
      </label>

      <div className="radio-group">
        <label className="radio-label">
          <input
            type="radio"
            name="type"
            checked={type === "add"}
            onChange={() => setType("add")}
          />
          Add stock (new books arrived)
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="type"
            checked={type === "borrow"}
            onChange={() => setType("borrow")}
          />
          Deduct stock (book borrowed)
        </label>
      </div>

      <label>
        Quantity
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </label>

      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}

      <button type="submit">Save Transaction</button>
    </form>
  );
}

export default TransactionForm;

import { LOW_STOCK_LIMIT } from "../constants";

// The list of books with Update and Delete buttons
function BookTable({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return <p className="empty">No books yet. Add one using the form above.</p>;
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>ISBN</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className={book.quantity < LOW_STOCK_LIMIT ? "low-stock" : ""}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.isbn}</td>
              <td>{book.quantity}</td>
              <td>
                <button onClick={() => onEdit(book)}>Update</button>
                <button className="danger" onClick={() => onDelete(book)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookTable;

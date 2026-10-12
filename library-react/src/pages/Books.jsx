import { useState } from "react";
import BookForm from "../components/BookForm";
import BookTable from "../components/BookTable";

function Books({ books, onAdd, onUpdate, onDelete }) {
  // the book being edited (null means we are adding a new one)
  const [editingBook, setEditingBook] = useState(null);

  function handleSave(bookData) {
    if (editingBook) {
      onUpdate(editingBook.id, bookData);
      setEditingBook(null);
    } else {
      onAdd(bookData);
    }
  }

  function handleDelete(book) {
    if (!window.confirm('Delete "' + book.title + '"?')) {
      return;
    }
    onDelete(book.id);
    if (editingBook && editingBook.id === book.id) {
      setEditingBook(null);
    }
  }

  return (
    <div>
      <h2>Manage Books</h2>

      <BookForm
        bookToEdit={editingBook}
        books={books}
        onSave={handleSave}
        onCancel={() => setEditingBook(null)}
      />

      <h3>Book List</h3>
      <BookTable books={books} onEdit={setEditingBook} onDelete={handleDelete} />
    </div>
  );
}

export default Books;

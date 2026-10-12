import { useState, useEffect } from "react";
import FormField from "./FormField";

const emptyForm = { title: "", author: "", genre: "", isbn: "", quantity: "" };

// Used for BOTH adding a new book and updating an existing one.
// If bookToEdit is given, the form fills itself with that book.
function BookForm({ bookToEdit, books, onSave, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  // Runs whenever bookToEdit changes (when Update is clicked, or after saving)
  useEffect(() => {
    if (bookToEdit) {
      setForm({
        title: bookToEdit.title,
        author: bookToEdit.author,
        genre: bookToEdit.genre,
        isbn: bookToEdit.isbn,
        quantity: String(bookToEdit.quantity)
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [bookToEdit]);

  // One function handles every input, using the input's name
  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function validate() {
    const newErrors = {};

    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.author.trim()) newErrors.author = "Author is required";
    if (!form.genre.trim()) newErrors.genre = "Genre is required";

    const isbn = form.isbn.trim();
    if (!isbn) {
      newErrors.isbn = "ISBN is required";
    } else {
      // another book (not the one we are editing) must not have this ISBN
      const isbnTaken = books.some(
        (book) => book.isbn === isbn && (!bookToEdit || book.id !== bookToEdit.id)
      );
      if (isbnTaken) newErrors.isbn = "A book with this ISBN already exists";
    }

    const quantity = Number(form.quantity);
    if (form.quantity === "") {
      newErrors.quantity = "Quantity is required";
    } else if (!Number.isInteger(quantity) || quantity < 0) {
      newErrors.quantity = "Quantity must be a whole number, 0 or more";
    }

    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return; // stop, there are errors to fix
    }

    onSave({
      title: form.title.trim(),
      author: form.author.trim(),
      genre: form.genre.trim(),
      isbn: form.isbn.trim(),
      quantity: Number(form.quantity)
    });
    setForm(emptyForm);
  }

  return (
    <form className="form-box" onSubmit={handleSubmit} noValidate>
      <h3>{bookToEdit ? "Update Book" : "Add New Book"}</h3>

      <FormField label="Title" name="title" value={form.title} onChange={handleChange} error={errors.title} />
      <FormField label="Author" name="author" value={form.author} onChange={handleChange} error={errors.author} />
      <FormField label="Genre" name="genre" value={form.genre} onChange={handleChange} error={errors.genre} />
      <FormField label="ISBN" name="isbn" value={form.isbn} onChange={handleChange} error={errors.isbn} />
      <FormField
        label={bookToEdit ? "Quantity" : "Initial quantity"}
        name="quantity"
        type="number"
        value={form.quantity}
        onChange={handleChange}
        error={errors.quantity}
      />

      <button type="submit">{bookToEdit ? "Save Changes" : "Add Book"}</button>
      {bookToEdit && (
        <button type="button" className="secondary" onClick={onCancel}>Cancel</button>
      )}
    </form>
  );
}

export default BookForm;

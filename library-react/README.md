# Community Library System

A library management system built with **React** (Vite). Librarians can manage books,
track stock, record transactions and manage user accounts. All data is saved in the
browser's **local storage**.

## Run it

```
npm install
npm run dev
```

Then open the address shown in the terminal (usually http://localhost:5173).

**Default login:** membership ID `M001`, password `admin123`

## What it demonstrates

- **Hooks:** `useState`, `useEffect`, and a custom hook `useLocalStorage`
- **Lifecycle (via hooks):** `useEffect` saves data to local storage and fills the forms when editing
- **Components:** small reusable components (`FormField`, `BookForm`, `BookTable`, `BookCard`, ...)
- **Forms:** controlled inputs, validation with error messages, submit handling
- **React Router:** `HashRouter`, `Routes`, `NavLink`, `Navigate` and a `ProtectedRoute` component

## Pages and roles

| Page | Who can open it |
| --- | --- |
| Login | everyone |
| Dashboard (book cards, low stock highlighted) | any logged-in user |
| Books (add / update / delete) | Admin, Librarian |
| Transactions (add stock / deduct stock + history) | Admin, Librarian |
| Users (add / update / delete) | Admin |

A book with fewer than 2 copies is highlighted as low stock.

## Folder structure

```
src/
  main.jsx              starts the app and the router
  App.jsx               holds all the data and the routes
  constants.js          low stock limit and roles
  hooks/useLocalStorage.js
  components/           reusable pieces (forms, tables, navbar...)
  pages/                one file per page
  index.css             all the styling
```

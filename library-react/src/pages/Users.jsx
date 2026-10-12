import { useState } from "react";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";

function Users({ users, currentUser, onAdd, onUpdate, onDelete }) {
  const [editingUser, setEditingUser] = useState(null);

  function handleSave(userData) {
    if (editingUser) {
      onUpdate(editingUser.id, userData);
      setEditingUser(null);
    } else {
      onAdd(userData);
    }
  }

  function handleDelete(user) {
    if (user.id === currentUser.id) {
      window.alert("You cannot delete the account you are logged in with.");
      return;
    }
    if (!window.confirm("Delete " + user.name + "?")) {
      return;
    }
    onDelete(user.id);
    if (editingUser && editingUser.id === user.id) {
      setEditingUser(null);
    }
  }

  return (
    <div>
      <h2>Manage Users</h2>

      <UserForm
        userToEdit={editingUser}
        users={users}
        onSave={handleSave}
        onCancel={() => setEditingUser(null)}
      />

      <h3>User List</h3>
      <UserTable users={users} onEdit={setEditingUser} onDelete={handleDelete} />
    </div>
  );
}

export default Users;

import { useState, useEffect } from "react";
import FormField from "./FormField";
import { ROLES } from "../constants";

const emptyForm = { name: "", membershipId: "", role: "Member", password: "" };

// Used for BOTH adding a new user and updating an existing one
function UserForm({ userToEdit, users, onSave, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (userToEdit) {
      setForm({
        name: userToEdit.name,
        membershipId: userToEdit.membershipId,
        role: userToEdit.role,
        password: userToEdit.password
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [userToEdit]);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function validate() {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    const id = form.membershipId.trim();
    if (!id) {
      newErrors.membershipId = "Membership ID is required";
    } else {
      const idTaken = users.some(
        (user) =>
          user.membershipId.toLowerCase() === id.toLowerCase() &&
          (!userToEdit || user.id !== userToEdit.id)
      );
      if (idTaken) newErrors.membershipId = "That membership ID is already used";
    }

    if (form.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
    }

    // do not allow the last Admin to lose the Admin role
    if (userToEdit && userToEdit.role === "Admin" && form.role !== "Admin") {
      const adminCount = users.filter((user) => user.role === "Admin").length;
      if (adminCount === 1) newErrors.role = "There must be at least one Admin";
    }

    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    onSave({
      name: form.name.trim(),
      membershipId: form.membershipId.trim(),
      role: form.role,
      password: form.password
    });
    setForm(emptyForm);
  }

  return (
    <form className="form-box" onSubmit={handleSubmit} noValidate>
      <h3>{userToEdit ? "Update User" : "Add New User"}</h3>

      <FormField label="Name" name="name" value={form.name} onChange={handleChange} error={errors.name} />
      <FormField label="Membership ID" name="membershipId" value={form.membershipId} onChange={handleChange} error={errors.membershipId} />

      <label>
        Role
        <select name="role" value={form.role} onChange={handleChange}>
          {ROLES.map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
        {errors.role && <span className="error">{errors.role}</span>}
      </label>

      <FormField label="Password" name="password" type="password" value={form.password} onChange={handleChange} error={errors.password} />

      <button type="submit">{userToEdit ? "Save Changes" : "Add User"}</button>
      {userToEdit && (
        <button type="button" className="secondary" onClick={onCancel}>Cancel</button>
      )}
    </form>
  );
}

export default UserForm;

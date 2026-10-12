import { useState } from "react";
import { Navigate } from "react-router-dom";
import FormField from "../components/FormField";

function Login({ currentUser, onLogin }) {
  const [membershipId, setMembershipId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // already logged in? go to the dashboard
  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!membershipId.trim() || !password) {
      setError("Please enter your membership ID and password.");
      return;
    }

    const success = onLogin(membershipId, password);
    if (!success) {
      setError("Wrong membership ID or password.");
    }
  }

  return (
    <div>
      <h2>Login</h2>

      <form className="form-box" onSubmit={handleSubmit} noValidate>
        <FormField
          label="Membership ID"
          name="membershipId"
          value={membershipId}
          onChange={(e) => setMembershipId(e.target.value)}
        />
        <FormField
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Login</button>
      </form>

      <p className="hint">Default admin login: membership ID M001, password admin123</p>
    </div>
  );
}

export default Login;

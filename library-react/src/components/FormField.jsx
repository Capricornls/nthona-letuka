// One label + input + error message.
// It is reused in every form in the app.
function FormField({ label, name, type = "text", value, onChange, error }) {
  return (
    <label>
      {label}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={error ? "input-error" : ""}
      />
      {error && <span className="error">{error}</span>}
    </label>
  );
}

export default FormField;

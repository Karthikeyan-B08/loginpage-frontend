function ErrorMessage({ message }) {
  return (
    <div style={{ color: "red", marginBottom: "10px", textAlign: "center" }}>
      {message}
    </div>
  );
}

export default ErrorMessage;

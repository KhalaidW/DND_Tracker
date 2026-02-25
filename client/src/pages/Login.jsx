export default function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login simulated!");
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" type="email" required />
        <input placeholder="Password" type="password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
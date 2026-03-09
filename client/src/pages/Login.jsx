import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Sending login request:", { email, password });

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      console.log("Backend response:", res.data);
      setMessage(res.data.message);

      if (res.data.message === "Login successful") {
        localStorage.setItem("loggedIn", "true"); 
      }

      setEmail("");
      setPassword("");

    } catch (err) {
      console.error("Login error:", err.response || err);
      setMessage(err.response?.data?.message || "Error logging in");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>} 
    </div>
  );
}
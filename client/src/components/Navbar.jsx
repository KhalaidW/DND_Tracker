import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="container">
      <Link to="/">Home</Link> | 
      <Link to="/login">Login</Link> | 
      <Link to="/register">Register</Link> | 
      <Link to="/dashboard">Dashboard</Link> | 
      <Link to="/api-search">API Search</Link>
    </nav>
  );
}
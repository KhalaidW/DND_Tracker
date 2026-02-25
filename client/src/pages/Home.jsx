import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container" style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the D&D Character Tracker</h1>
      <p>Keep track of your characters and explore D&D content.</p>
      
      <div style={{ marginTop: "20px" }}>
        <Link to="/register" style={{ marginRight: "10px" }}>Register</Link>
        <Link to="/login" style={{ marginLeft: "10px" }}>Login</Link>
      </div>
    </div>
  );
}
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {
  const [characters, setCharacters] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    race: "",
    level: 1,
  });

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    class: "",
    race: "",
    level: 1,
  });

  const API_URL = "http://localhost:5000/api/characters";

  // Fetch characters
  const fetchCharacters = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setCharacters(data);
    } catch (err) {
      console.error("Error fetching characters:", err);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  // Form input change
  const handleChange = (e) => {
    const value =
      e.target.name === "level" ? Number(e.target.value) : e.target.value;

    setFormData({ ...formData, [e.target.name]: value });
  };

  // Submit new character
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({
          name: "",
          class: "",
          race: "",
          level: 1,
        });

        fetchCharacters();
      }
    } catch (err) {
      console.error("Error adding character:", err);
    }
  };

  // Delete character
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchCharacters();
      }
    } catch (err) {
      console.error("Error deleting character:", err);
    }
  };

  // Start editing
  const startEdit = (char) => {
    setEditingId(char._id);
    setEditData({
      name: char.name,
      class: char.class,
      race: char.race,
      level: char.level,
    });
  };

  // Edit form change
  const handleEditChange = (e) => {
    const value =
      e.target.name === "level" ? Number(e.target.value) : e.target.value;

    setEditData({ ...editData, [e.target.name]: value });
  };

  // Update character
  const handleUpdate = async () => {
    try {
      const res = await fetch(`${API_URL}/${editingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      });

      if (res.ok) {
        setEditingId(null);
        fetchCharacters();
      }
    } catch (err) {
      console.error("Error updating character:", err);
    }
  };

  return (
    <div className="container" style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the D&D Character Tracker</h1>
      <p>Keep track of your characters and explore D&D content.</p>

      <div style={{ marginTop: "20px" }}>
        <Link to="/register" style={{ marginRight: "10px" }}>Register</Link>
        <Link to="/login" style={{ marginLeft: "10px" }}>Login</Link>
      </div>

      {/* Add Character */}
      <div style={{ marginTop: "50px", textAlign: "left" }}>
        <h2>Add New Character</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            name="class"
            placeholder="Class"
            value={formData.class}
            onChange={handleChange}
            required
          />

          <input
            name="race"
            placeholder="Race"
            value={formData.race}
            onChange={handleChange}
            required
          />

          <input
            name="level"
            type="number"
            min="1"
            value={formData.level}
            onChange={handleChange}
            required
          />

          <button type="submit">Add Character</button>
        </form>

        {/* Character List */}

        <h2>All Characters</h2>

        <ul>
          {characters.map((char) => (
            <li key={char._id}>

              {editingId === char._id ? (
                <>
                  <input
                    name="name"
                    value={editData.name}
                    onChange={handleEditChange}
                  />

                  <input
                    name="class"
                    value={editData.class}
                    onChange={handleEditChange}
                  />

                  <input
                    name="race"
                    value={editData.race}
                    onChange={handleEditChange}
                  />

                  <input
                    name="level"
                    type="number"
                    value={editData.level}
                    onChange={handleEditChange}
                  />

                  <button onClick={handleUpdate}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  {char.name} — {char.class} — {char.race} — Level {char.level}

                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => startEdit(char)}
                  >
                    Edit
                  </button>

                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => handleDelete(char._id)}
                  >
                    Delete
                  </button>
                </>
              )}

            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
import { useState } from "react";

export default function ApiSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedSpell, setSelectedSpell] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);


  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSelectedSpell(null);

    try {
      const res = await fetch(`https://www.dnd5eapi.co/api/2014/spells?name=${query}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error("Error fetching API:", err);
      setResults([]);
    }

    setLoading(false);
  };

  const fetchSpellDetails = async (url) => {
    setDetailLoading(true);
    try {
      const res = await fetch(`https://www.dnd5eapi.co${url}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setSelectedSpell(data);
    } catch (err) {
      console.error("Error fetching spell details:", err);
      alert("Failed to load spell details. Check console for errors.");
    }
    setDetailLoading(false);
  };

  return (
    <div className="container">
      <h1>D&D Spell Search</h1>
      <form onSubmit={handleSearch}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search spells..."
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {!loading && results.length === 0 && query && <p>No spells found.</p>}

      <ul>
        {results.map((spell) => (
          <li key={spell.index}>
            <button onClick={() => fetchSpellDetails(spell.url)}>
              {spell.name}
            </button>
          </li>
        ))}
      </ul>
      {detailLoading && <p>Loading spell details...</p>}

      {selectedSpell && (
        <div style={{ marginTop: "20px" }}>
          <h2>{selectedSpell.name}</h2>
          <p>
            <strong>Level:</strong> {selectedSpell.level} <br />
            <strong>School:</strong> {selectedSpell.school.name}
          </p>
          {selectedSpell.desc.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      )}
    </div>
  );
}
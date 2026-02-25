import { useState } from "react";

const mockSpells = ["Fireball", "Magic Missile", "Shield", "Cure Wounds"];

export default function ApiSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    setResults(mockSpells.filter(spell => spell.toLowerCase().includes(query.toLowerCase())));
  };

  return (
    <div className="container">
      <h1>D&D API Search (Mock)</h1>
      <form onSubmit={handleSearch}>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search spells..." />
        <button type="submit">Search</button>
      </form>
      <ul>
        {results.map(r => <li key={r}>{r}</li>)}
      </ul>
    </div>
  );
}
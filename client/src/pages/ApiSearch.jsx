import { useState } from "react";

export default function ApiSearch() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("spells");
  const [results, setResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // renamed
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSelectedItem(null);

    try {
      const res = await fetch(
        `https://www.dnd5eapi.co/api/2014/${category}?name=${query}`
      );
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error("Error fetching API:", err);
      setResults([]);
    }

    setLoading(false);
  };

  const fetchDetails = async (url) => {
    setDetailLoading(true);
    try {
      console.log("Fetching details from:", url);
      const res = await fetch(`https://www.dnd5eapi.co${url}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setSelectedItem(data);
    } catch (err) {
      console.error("Error fetching details:", err);
      alert("Failed to load details. Check console for errors.");
    }
    setDetailLoading(false);
  };

  return (
    <div className="container">
      <h1>D&D Search</h1>
      <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ marginRight: "10px" }}
        >
          <option value="spells">Spells</option>
          <option value="classes">Classes</option>
          <option value="races">Races</option>
        </select>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${category}...`}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {!loading && results.length === 0 && query && <p>No results found.</p>}

      <ul>
        {results.map((item) => (
          <li key={item.index}>
            <button onClick={() => fetchDetails(item.url)}>{item.name}</button>
          </li>
        ))}
      </ul>

      {detailLoading && <p>Loading details...</p>}

      {selectedItem && (
        <div style={{ marginTop: "20px" }}>
          <h2>{selectedItem.name}</h2>

          {category === "spells" && selectedItem.desc && (
            <>
              <p>
                <strong>Level:</strong> {selectedItem.level} <br />
                <strong>School:</strong> {selectedItem.school?.name}
              </p>
              {selectedItem.desc.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </>
          )}

          {category === "classes" && (
            <>
              <p>
                <strong>Hit Die:</strong> d{selectedItem.hit_die} <br />
                <strong>Proficiencies:</strong>{" "}
                {selectedItem.proficiencies.map((p) => p.name).join(", ")}
              </p>
            </>
          )}

          {category === "races" && (
            <>
              <p>
                <strong>Speed:</strong> {selectedItem.speed} <br />
                <strong>Ability Bonuses:</strong>{" "}
                {selectedItem.ability_bonuses
                  .map((b) => `${b.ability_score.name} +${b.bonus}`)
                  .join(", ")}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
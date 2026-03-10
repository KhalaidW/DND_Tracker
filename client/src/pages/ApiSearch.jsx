import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function ApiSearch() {
  const categories = ["spells", "monsters", "classes", "races", "feats", "backgrounds"];
  const [category, setCategory] = useState("spells");
  const [cachedCategories, setCachedCategories] = useState({});
  const [allItems, setAllItems] = useState([]);
  const [results, setResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch items for a category with caching
  const fetchCategory = async (cat) => {
    if (cachedCategories[cat]) {
      setAllItems(cachedCategories[cat]);
      setResults(cachedCategories[cat]);
      setSelectedItem(null);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://api.open5e.com/${cat}/?limit=100`);
      const data = await res.json();
      const items = data.results || [];
      setCachedCategories((prev) => ({ ...prev, [cat]: items }));
      setAllItems(items);
      setResults(items);
      setSelectedItem(null);
    } catch (err) {
      console.error("Error fetching category:", err);
      setAllItems([]);
      setResults([]);
      setSelectedItem(null);
    }
    setLoading(false);
  };

  // Load category when changed
  useEffect(() => {
    fetchCategory(category);
    setQuery("");
  }, [category]);

  // Filter results locally
  useEffect(() => {
    if (!query.trim()) {
      setResults(allItems);
      return;
    }

    const filtered = allItems.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query, allItems]);

  const handleSelect = (item) => setSelectedItem(item);

  return (
    <div className="container mt-4">
      <h1 className="mb-3">D&D Search</h1>

      {/* Category Buttons */}
      <div className="btn-group mb-3">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn ${category === cat ? "btn-primary" : "btn-outline-light"}`}
            onClick={() => setCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder={`Search ${category}...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading && <p>Loading...</p>}
      {!loading && query && results.length === 0 && <p>No results found.</p>}

      {/* Two-Column Layout */}
      <div className="row">
        {/* Results List */}
        <div className="col-md-4 mb-3">
          <ul className="list-group">
            {results.map((item) => (
              <li key={item.slug} className="list-group-item">
                <button className="btn btn-link" onClick={() => handleSelect(item)}>
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Details */}
        <div className="col-md-8">
          {selectedItem && (
            <div className="card bg-dark text-white mb-3">
              <div className="card-body">
                <h3 className="card-title">{selectedItem.name}</h3>

                {/* SPELLS */}
                {category === "spells" && (
                  <>
                    <p>
                      <strong>Level:</strong> {selectedItem.level} <br />
                      <strong>School:</strong> {selectedItem.school} <br />
                      <strong>Casting Time:</strong> {selectedItem.casting_time} <br />
                      <strong>Range:</strong> {selectedItem.range} <br />
                      <strong>Components:</strong> {selectedItem.components} <br />
                      {selectedItem.material && <><strong>Material:</strong> {selectedItem.material}<br /></>}
                      <strong>Duration:</strong> {selectedItem.duration}
                    </p>
                    <p>{selectedItem.desc}</p>
                    {selectedItem.higher_level && (
                      <p><strong>At Higher Levels:</strong> {selectedItem.higher_level}</p>
                    )}
                  </>
                )}

                {/* MONSTERS */}
                {category === "monsters" && (
                  <>
                    <p>
                      <strong>Size & Type:</strong> {selectedItem.size ?? "N/A"} {selectedItem.type ?? ""}<br />
                      <strong>Alignment:</strong> {selectedItem.alignment ?? "N/A"}<br />
                      <strong>AC:</strong> {selectedItem.armor_class ?? "N/A"}<br />
                      <strong>HP:</strong> {selectedItem.hit_points ?? "N/A"} ({selectedItem.hit_dice ?? "N/A"})<br />

                      <strong>Speed:</strong>{" "}
                      {selectedItem.speed
                        ? typeof selectedItem.speed === "string"
                          ? selectedItem.speed
                          : Object.entries(selectedItem.speed)
                            .map(([type, val]) => `${type}: ${val}`)
                            .join(", ")
                        : "N/A"}
                      <br />

                      <strong>Senses:</strong>{" "}
                      {selectedItem.senses
                        ? typeof selectedItem.senses === "string"
                          ? selectedItem.senses
                          : Object.entries(selectedItem.senses)
                            .map(([type, val]) => `${type}: ${val}`)
                            .join(", ")
                        : "N/A"}
                    </p>

                    {/* Ability Scores */}
                    <div className="d-flex justify-content-between mb-2">
                      <div><strong>STR:</strong> {selectedItem.str ?? "-"}</div>
                      <div><strong>DEX:</strong> {selectedItem.dex ?? "-"}</div>
                      <div><strong>CON:</strong> {selectedItem.con ?? "-"}</div>
                      <div><strong>INT:</strong> {selectedItem.int ?? "-"}</div>
                      <div><strong>WIS:</strong> {selectedItem.wis ?? "-"}</div>
                      <div><strong>CHA:</strong> {selectedItem.cha ?? "-"}</div>
                    </div>

                    {/* Traits */}
                    {selectedItem.special_abilities?.length > 0 && (
                      <>
                        <h5>Traits</h5>
                        {selectedItem.special_abilities.map((t, i) => (
                          <p key={i}><strong>{t.name ?? "Trait"}:</strong> {t.desc ?? ""}</p>
                        ))}
                      </>
                    )}

                    {/* Actions */}
                    {selectedItem.actions?.length > 0 && (
                      <>
                        <h5>Actions</h5>
                        {selectedItem.actions.map((a, i) => (
                          <p key={i}><strong>{a.name ?? "Action"}:</strong> {a.desc ?? ""}</p>
                        ))}
                      </>
                    )}

                    {/* Legendary Actions */}
                    {selectedItem.legendary_actions?.length > 0 && (
                      <>
                        <h5>Legendary Actions</h5>
                        {selectedItem.legendary_actions.map((l, i) => (
                          <p key={i}><strong>{l.name ?? "Legendary Action"}:</strong> {l.desc ?? ""}</p>
                        ))}
                      </>
                    )}
                  </>
                )}

                {/* CLASSES */}
                {category === "classes" && (
                  <>
                    <p><strong>Hit Die:</strong> d{selectedItem.hit_die ?? "-"}</p>
                    {selectedItem.proficiencies?.length > 0 && (
                      <p><strong>Proficiencies:</strong> {selectedItem.proficiencies.map(p => p.name).join(", ")}</p>
                    )}
                  </>
                )}

                {/* Race Section */}
                {category === "races" && selectedItem && (
                  <div className="race-details">

                    {/* Asi, Size, Alignment, Age, Speed, Vision */}
                    {selectedItem.asi_desc && (
                      <p>
                        <ReactMarkdown>{selectedItem.asi_desc}</ReactMarkdown>
                      </p>
                    )}
                    {selectedItem.age && (
                      <p>
                        <ReactMarkdown>{selectedItem.age}</ReactMarkdown>
                      </p>
                    )}
                    {selectedItem.alignment && (
                      <p>
                        <ReactMarkdown>{selectedItem.alignment}</ReactMarkdown>
                      </p>
                    )}
                    {selectedItem.size && (
                      <p>
                        <ReactMarkdown>{selectedItem.size}</ReactMarkdown>
                      </p>
                    )}
                    {selectedItem.speed_desc && (
                      <p>
                        <ReactMarkdown>{selectedItem.speed_desc}</ReactMarkdown>
                      </p>
                    )}
                    {selectedItem.vision && (
                      <p>
                        <ReactMarkdown>{selectedItem.vision}</ReactMarkdown>
                      </p>
                    )}

                    {/* Languages */}
                    {selectedItem.languages && (
                      <div>
                        {Array.isArray(selectedItem.languages)
                          ? selectedItem.languages.map((lang, i) => (
                            <div key={i}><ReactMarkdown>{lang}</ReactMarkdown></div>
                          ))
                          : <ReactMarkdown>{selectedItem.languages}</ReactMarkdown>}
                      </div>
                    )}

                    {/* Traits */}
                    {selectedItem.traits && (
                      <div>
                        <strong>Traits:</strong>
                        {Array.isArray(selectedItem.traits)
                          ? selectedItem.traits.map((t, i) => (
                            <div key={i}>
                              <strong>{t.name ?? "Trait"}:</strong>{" "}
                              {t.desc && <ReactMarkdown>{t.desc}</ReactMarkdown>}
                            </div>
                          ))
                          : <ReactMarkdown>{selectedItem.traits}</ReactMarkdown>}
                      </div>
                    )}

                    {/* Subraces with full traits and ability increases */}
                    {selectedItem.subraces?.length > 0 && (
                      <div className="mt-2">
                        <strong>Subraces:</strong>
                        {selectedItem.subraces.map((s, i) => (
                          <div key={i} style={{ marginLeft: "1rem", marginTop: "0.5rem" }}>
                            <h5>{s.name ?? "Subrace"}</h5>
                            {/* Description */}
                            {s.desc && <p style={{ whiteSpace: "pre-line" }}>{s.desc}</p>}

                            {/* Asi for subrace */}
                            {s.asi?.length > 0 && (
                              <p>
                                <strong><em>Ability Score Increase.</em></strong>{" "}
                                {s.asi.map(b => `${b.attributes.join(", ")} +${b.value}`).join(", ")}
                              </p>
                            )}

                            {/* Traits for subrace */}
                            {s.traits && (
                              <div>
                                <strong>Traits:</strong>
                                <ReactMarkdown>{s.traits}</ReactMarkdown>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* FEATS / BACKGROUNDS */}
                {(category === "feats" || category === "backgrounds") && (
                  <p>{selectedItem.desc ?? ""}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
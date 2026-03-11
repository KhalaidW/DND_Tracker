import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const categoryFilters = {
    spells: [
        {
            name: "level",
            label: "Level",
            options: [
                { value: "", label: "All Levels" },
                { value: "0", label: "Cantrip" },
                { value: "1", label: "1st" },
                { value: "2", label: "2nd" },
                { value: "3", label: "3rd" },
                { value: "4", label: "4th" },
                { value: "5", label: "5th" },
                { value: "6", label: "6th" },
                { value: "7", label: "7th" },
                { value: "8", label: "8th" },
                { value: "9", label: "9th" }
            ]
        },

        {
            name: "school",
            label: "School",
            options: [
                { value: "", label: "All Schools" },
                { value: "abjuration", label: "Abjuration" },
                { value: "conjuration", label: "Conjuration" },
                { value: "divination", label: "Divination" },
                { value: "enchantment", label: "Enchantment" },
                { value: "evocation", label: "Evocation" },
                { value: "illusion", label: "Illusion" },
                { value: "necromancy", label: "Necromancy" },
                { value: "transmutation", label: "Transmutation" }
            ]
        },


    ],

    monsters: [
        {
            name: "challenge_rating",
            label: "CR",
            options: [
                { value: "", label: "All CR" },
                { value: "0.125", label: "1/8" },
                { value: "0.25", label: "1/4" },
                { value: "0.5", label: "1/2" },
                { value: "1", label: "1" },
                { value: "2", label: "2" },
                { value: "3", label: "3" },
                { value: "4", label: "4" },
                { value: "5", label: "5" },
                { value: "6", label: "6" },
                { value: "7", label: "7" },
                { value: "8", label: "8" },
                { value: "9", label: "9" },
                { value: "10", label: "10" },
                { value: "11", label: "11" },
                { value: "12", label: "12" },
                { value: "13", label: "13" },
                { value: "14", label: "14" },
                { value: "15", label: "15" },
                { value: "16", label: "16" },
                { value: "17", label: "17" },
                { value: "18", label: "18" },
                { value: "19", label: "19" },
                { value: "20", label: "20" },
                { value: "21", label: "21" },
                { value: "22", label: "22" },
                { value: "23", label: "23" },
                { value: "24", label: "24" },
                { value: "25", label: "25" },
                { value: "26", label: "26" },
                { value: "27", label: "27" },
                { value: "28", label: "28" },
                { value: "29", label: "29" },
                { value: "30", label: "30" }
            ]
        }
    ]
};

{/* Pagination component to reuse */ }
const PaginationControls = ({ page, totalPages, pageNumbers, fetchData }) => (
    <div className="d-flex align-items-center gap-2 mb-3">
        <button
            className="btn btn-secondary"
            disabled={page <= 1}
            onClick={() => fetchData(null, page - 1)}
        >
            &lt;
        </button>

        {pageNumbers.map((num) => (
            <button
                key={num}
                className={`btn ${num === page ? "btn-primary" : "btn-outline-secondary"}`}
                onClick={() => fetchData(null, num)}
            >
                {num}
            </button>
        ))}

        <button
            className="btn btn-secondary"
            disabled={page >= totalPages}
            onClick={() => fetchData(null, page + 1)}
        >
            &gt;
        </button>
    </div>
);

export default function ApiCategorySearch({ category }) {

    const [items, setItems] = useState([]);
    const [query, setQuery] = useState("");
    const [filters, setFilters] = useState({});
    const [selectedItem, setSelectedItem] = useState(null);

    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);

    const [loading, setLoading] = useState(false);

    const fetchData = async (url = null, pageNumber = 1) => {

        setLoading(true);
        setSelectedItem(null);

        let baseUrl = `https://api.open5e.com/${category}/?limit=50&`;

        // Apply filters per category
        if (category === "spells") {
            if (filters.level) baseUrl += `level_int=${Number(filters.level)}&`;
            if (filters.school) baseUrl += `school=${filters.school.toLowerCase()}&`;
        } else if (category === "monsters") {
            if (filters.challenge_rating) baseUrl += `cr=${filters.challenge_rating}&`;
        }

        // Add search query
        if (query) baseUrl += `name__icontains=${query}&`;

        // Add other dynamic filters if any
        Object.entries(filters).forEach(([key, val]) => {
            if (val && !["level", "school", "cr"].includes(key)) {
                baseUrl += `${key}=${val.toLowerCase()}&`;
            }
        });

        try {

            const res = await fetch(url || baseUrl);
            const data = await res.json();

            setItems(data.results || []);

            setCount(data.count || 0);
            setPage(pageNumber);

        } catch (err) {
            console.error("API error:", err);
        }

        setLoading(false);
    };

    useEffect(() => {
        const timeout = setTimeout(() => fetchData(), 500);
        return () => clearTimeout(timeout);
    }, [category, query, filters]);

    const pageNumbers = [];
    const totalPages = Math.ceil(count / 50);

    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 ||
            i === totalPages ||
            (i >= page - 2 && i <= page + 2)
        ) {
            pageNumbers.push(i);
        }
    }

    return (
        <div className="container mt-4">
            <h1 className="text-capitalize mb-3">{category}</h1>

            {/* FILTERS */}
            {categoryFilters[category] && (
                <div className="d-flex flex-wrap gap-2 mb-3">
                    {categoryFilters[category].map((filter) => (
                        <div key={filter.name} style={{ minWidth: "150px", flex: "0 0 auto" }}>
                            <select
                                className="form-select"
                                value={filters[filter.name] || ""}
                                onChange={(e) => {
                                    setFilters({
                                        ...filters,
                                        [filter.name]: e.target.value
                                    });
                                    setPage(1);
                                }}
                            >
                                {filter.options.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>
            )}

            {/* SEARCH */}
            <input
                className="form-control mb-3"
                placeholder={`Search ${category}...`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            {/* RESULT COUNT */}
            {count > 0 && (
                <p className="text-white">

                    Showing {(page - 1) * items.length + 1}
                    –
                    {(page - 1) * items.length + items.length}
                    {" "}of {count} {category} (Page {page})

                </p>
            )}

            {loading && <p>Loading...</p>}

            <div className="row">
                {/* RESULTS LIST */}
                <div className="col-md-4">
                    <div className="results-panel">

                        <PaginationControls
                            page={page}
                            totalPages={totalPages}
                            pageNumbers={pageNumbers}
                            fetchData={fetchData}
                        />

                        <ul className="list-group">
                            {items.map((item) => (
                                <li key={item.slug} className={`list-group-item ${selectedItem?.slug === item.slug ? 'active' : ''}`}>

                                    <button
                                        className="btn btn-link"
                                        onClick={() => setSelectedItem(item)}
                                    >
                                        {item.name}
                                    </button>

                                </li>
                            ))}

                        </ul>

                        <PaginationControls
                            page={page}
                            totalPages={totalPages}
                            pageNumbers={pageNumbers}
                            fetchData={fetchData}
                        />

                    </div>
                </div>

                {/* DETAILS PANEL */}
                <div className="col-md-8">
                    <div className="details-panel">
                        {selectedItem && (
                            <div className="card bg-dark text-white">
                                <div className="card-body">

                                    <h3>{selectedItem.name}</h3>

                                    {/* SPELLS */}
                                    {category === "spells" && (
                                        <>
                                            <p>
                                                <strong>Level:</strong> {selectedItem.level}<br />
                                                <strong>School:</strong> {selectedItem.school}<br />
                                                <strong>Casting Time:</strong> {selectedItem.casting_time}<br />
                                                <strong>Range:</strong> {selectedItem.range}<br />
                                                <strong>Components:</strong> {selectedItem.components}<br />
                                                {selectedItem.material && (
                                                    <>
                                                        <strong>Material:</strong> {selectedItem.material}<br />
                                                    </>
                                                )}
                                                <strong>Duration:</strong> {selectedItem.duration}
                                            </p>

                                            <ReactMarkdown>{selectedItem.desc}</ReactMarkdown>

                                            {selectedItem.higher_level && (
                                                <>
                                                    <h5>At Higher Levels</h5>
                                                    <ReactMarkdown>{selectedItem.higher_level}</ReactMarkdown>
                                                </>
                                            )}
                                        </>
                                    )}

                                    {/* MONSTERS */}
                                    {category === "monsters" && selectedItem && (
                                        <div className="card bg-dark text-white">
                                            {/* Header */}
                                            <h5>({selectedItem.size} {selectedItem.type}, {selectedItem.alignment})</h5>
                                            <p>
                                                AC {selectedItem.armor_class} ({selectedItem.armor_desc}) | HP {selectedItem.hit_points} ({selectedItem.hit_dice}) | Speed:{" "}
                                                {selectedItem.speed
                                                    ? Object.entries(selectedItem.speed)
                                                        .map(([k, v]) => `${k.charAt(0).toUpperCase() + k.slice(1)} ${v} ft.`)
                                                        .join(", ")
                                                    : "None"}
                                            </p>

                                            {/* Abilities */}
                                            <div className="d-flex gap-2 mb-3 flex-wrap">
                                                {["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"].map(stat => {
                                                    const label = stat.slice(0, 3).toUpperCase();
                                                    return (
                                                        <div
                                                            key={stat}
                                                            className="text-center bg-secondary px-2 py-1 rounded"
                                                            style={{ minWidth: "50px" }}
                                                        >
                                                            <strong>{label}</strong><br />
                                                            {selectedItem[stat]}
                                                        </div>
                                                    )
                                                })}
                                            </div>

                                            {/* Defenses & Senses */}
                                            <p>
                                                <strong>Damage Resistances:</strong> {selectedItem.damage_resistances || "None"}<br />
                                                <strong>Damage Immunities:</strong> {selectedItem.damage_immunities || "None"}<br />
                                                <strong>Condition Immunities:</strong> {selectedItem.condition_immunities || "None"}<br />
                                                <strong>Senses:</strong> {selectedItem.senses || "None"}<br />
                                                <strong>Languages:</strong> {selectedItem.languages || "None"}<br />
                                                <strong>Challenge:</strong> {selectedItem.challenge_rating} (XP TBD)
                                            </p>

                                            {/* Description */}
                                            <ReactMarkdown>{selectedItem.desc}</ReactMarkdown>

                                            {/* Special Abilities */}
                                            {selectedItem.special_abilities?.length > 0 && (
                                                <>
                                                    <h5>Special Abilities</h5>
                                                    {selectedItem.special_abilities.map((a, i) => (
                                                        <p key={i}><strong>{a.name}.</strong> {a.desc}</p>
                                                    ))}
                                                </>
                                            )}

                                            {/* Actions */}
                                            {selectedItem.actions?.length > 0 && (
                                                <>
                                                    <h5>Actions</h5>
                                                    {selectedItem.actions.map((a, i) => (
                                                        <p key={i}><strong>{a.name}.</strong> {a.desc}</p>
                                                    ))}
                                                </>
                                            )}
                                        </div>
                                    )}

                                    {/* CLASSES */}
                                    {category === "classes" && selectedItem && (
                                        <div className="card bg-dark text-white mb-4">
                                            <div className="card-body">

                                                {/* Hit Dice & Proficiencies */}
                                                <p>
                                                    <strong>Hit Dice:</strong> {selectedItem.hit_dice}<br />
                                                    <strong>Hit Points:</strong> {selectedItem.hp_at_1st_level} (1st level), {selectedItem.hp_at_higher_levels} (higher levels)<br />
                                                    <strong>Armor Proficiencies:</strong> {selectedItem.prof_armor}<br />
                                                    <strong>Weapon Proficiencies:</strong> {selectedItem.prof_weapons}<br />
                                                    <strong>Tool Proficiencies:</strong> {selectedItem.prof_tools}<br />
                                                    <strong>Saving Throws:</strong> {selectedItem.prof_saving_throws}<br />
                                                    <strong>Skills:</strong> {selectedItem.prof_skills}<br />
                                                </p>

                                                {/* Starting Equipment */}
                                                {selectedItem.equipment && (
                                                    <>
                                                        <h5>Starting Equipment</h5>
                                                        <ReactMarkdown>{selectedItem.equipment}</ReactMarkdown>
                                                    </>
                                                )}

                                                {/* Level Progression Table */}
                                                {selectedItem.table && (
                                                    <>
                                                        <h5>Level Progression</h5>
                                                        <div className="table-responsive">
                                                            <table className="table table-dark table-striped table-bordered">
                                                                <tbody>
                                                                    {selectedItem.table
                                                                        .trim()
                                                                        .split("\n")
                                                                        .filter(row => row.startsWith("|") && !row.includes("---"))
                                                                        .map((row, index) => {
                                                                            const cells = row
                                                                                .split("|")
                                                                                .slice(1, -1) // remove empty first and last cells
                                                                                .map(cell => cell.trim());
                                                                            return (
                                                                                <tr key={index}>
                                                                                    {cells.map((cell, i) => (
                                                                                        <td key={i}>{cell}</td>
                                                                                    ))}
                                                                                </tr>
                                                                            );
                                                                        })}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </>
                                                )}


                                                {/* Class Features */}
                                                {selectedItem.desc && (
                                                    <>
                                                        <h5>Class Features</h5>
                                                        <ReactMarkdown>{selectedItem.desc}</ReactMarkdown>
                                                    </>
                                                )}

                                                {/* Subclasses / Archetypes */}
                                                {selectedItem.archetypes?.length > 0 && (
                                                    <>
                                                        <h5>{selectedItem.subtypes_name}</h5>
                                                        <ul>
                                                            {selectedItem.archetypes.map((sub, i) => (
                                                                <li key={i}>{sub.name}</li>
                                                            ))}
                                                        </ul>
                                                    </>
                                                )}

                                            </div>
                                        </div>
                                    )}
                                    {/* RACES */}
                                    {category === "races" && selectedItem && (
                                        <>
                                            {selectedItem.asi_desc && (
                                                <ReactMarkdown>{selectedItem.asi_desc}</ReactMarkdown>
                                            )}

                                            {selectedItem.age && (
                                                <ReactMarkdown>{selectedItem.age}</ReactMarkdown>
                                            )}

                                            {selectedItem.alignment && (
                                                <ReactMarkdown>{selectedItem.alignment}</ReactMarkdown>
                                            )}

                                            {selectedItem.size && (
                                                <ReactMarkdown>{selectedItem.size}</ReactMarkdown>
                                            )}

                                            {selectedItem.speed_desc && (
                                                <ReactMarkdown>{selectedItem.speed_desc}</ReactMarkdown>
                                            )}

                                            {selectedItem.vision && (
                                                <ReactMarkdown>{selectedItem.vision}</ReactMarkdown>
                                            )}

                                            {selectedItem.languages && (
                                                <ReactMarkdown>{selectedItem.languages}</ReactMarkdown>
                                            )}

                                            {selectedItem.traits && (
                                                <>
                                                    <h5>Traits</h5>
                                                    <ReactMarkdown>{selectedItem.traits}</ReactMarkdown>
                                                </>
                                            )}
                                        </>
                                    )}

                                    {/* FEAT DETAILS */}
                                    {selectedItem && category === "feats" && (
                                        <div className="card bg-dark text-white mb-4">
                                            <div className="card-body">

                                                {/* Prerequisite */}
                                                {selectedItem.prerequisite && (
                                                    <p><strong>{selectedItem.prerequisite}</strong></p>
                                                )}

                                                {/* Description */}
                                                {selectedItem.desc && (
                                                    <ReactMarkdown>{selectedItem.desc}</ReactMarkdown>
                                                )}

                                                {/* Effects */}
                                                {selectedItem.effects_desc?.length > 0 && (
                                                    <>
                                                        <h5>Effects</h5>
                                                        <ul>
                                                            {selectedItem.effects_desc.map((effect, i) => (
                                                                <li key={i}>{effect}</li>
                                                            ))}
                                                        </ul>
                                                    </>
                                                )}

                                            </div>
                                        </div>
                                    )}
                                    {/* BACKGROUND DETAILS */}
                                    {selectedItem && category === "backgrounds" && (
                                        <div className="card bg-dark text-white mb-4">
                                            <div className="card-body">

                                                {/* Description */}
                                                {selectedItem.desc && (
                                                    <ReactMarkdown>{selectedItem.desc}</ReactMarkdown>
                                                )}

                                                {/* Proficiencies */}
                                                <p>
                                                    <strong>Skill Proficiencies:</strong> {selectedItem.skill_proficiencies || "None"}<br />
                                                    {selectedItem.tool_proficiencies && (
                                                        <>
                                                            <strong>Tool Proficiencies:</strong> {selectedItem.tool_proficiencies}<br />
                                                        </>
                                                    )}
                                                    <strong>Languages:</strong> {selectedItem.languages || "None"}
                                                </p>

                                                {/* Equipment */}
                                                {selectedItem.equipment && (
                                                    <>
                                                        <h5>Starting Equipment</h5>
                                                        <ReactMarkdown>{selectedItem.equipment}</ReactMarkdown>
                                                    </>
                                                )}

                                                {/* Feature */}
                                                {selectedItem.feature && (
                                                    <>
                                                        <h5>{selectedItem.feature}</h5>
                                                        <ReactMarkdown>{selectedItem.feature_desc}</ReactMarkdown>
                                                    </>
                                                )}

                                                {/* Suggested Characteristics */}
                                                {selectedItem.suggested_characteristics && (
                                                    <>
                                                        <h5>Suggested Characteristics</h5>
                                                        <ReactMarkdown>{selectedItem.suggested_characteristics}</ReactMarkdown>
                                                    </>
                                                )}

                                            </div>
                                        </div>
                                    )}

                                </div>

                            </div>

                        )}
                    </div>

                </div>

            </div>

        </div>
    );
}
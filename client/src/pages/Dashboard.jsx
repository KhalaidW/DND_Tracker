import { characters } from "../mockData";

export default function Dashboard() {
  return (
    <div className="container">
      <h1>Dashboard (Proof of Concept)</h1>
      <ul>
        {characters.map((char) => (
          <li key={char.id}>
            {char.name} - {char.class} (Level {char.level})
          </li>
        ))}
      </ul>
    </div>
  );
}
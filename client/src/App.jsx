import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// API Category Pages
import Races from "./pages/Races";
import Spells from "./pages/Spells";
import Monsters from "./pages/Monsters";
import Classes from "./pages/Classes";
import Feats from "./pages/Feats";
import Backgrounds from "./pages/Backgrounds";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* API Search Pages */}
        <Route path="/api-search/races" element={<Races />} />
        <Route path="/api-search/spells" element={<Spells />} />
        <Route path="/api-search/monsters" element={<Monsters />} />
        <Route path="/api-search/classes" element={<Classes />} />
        <Route path="/api-search/feats" element={<Feats />} />
        <Route path="/api-search/backgrounds" element={<Backgrounds />} />
      </Routes>
    </Router>
  );
}

export default App;
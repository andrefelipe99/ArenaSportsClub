import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import { Team } from "./pages/Team";
import { Home } from "./pages/Home";
import { Match } from "./pages/Match";
import { Championship } from "./pages/Championship";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/campeonato" element={<Championship />} />
        <Route path="/partida/:id" element={<Match />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

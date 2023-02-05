import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Equipe } from "./pages/Equipe";
import { Tabela } from "./pages/Tabela";
import { Match } from "./pages/Match";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/equipe" element={<Equipe />} />
        <Route path="/partida/:id" element={<Match />} />
        <Route path="/" element={<Tabela />} />
      </Routes>
    </Router>
  );
}

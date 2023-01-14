import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Equipe } from "./pages/Equipe";
import { Tabela } from "./pages/Tabela";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/equipe" element={<Equipe />} />
        <Route path="/" element={<Tabela />} />
      </Routes>
    </Router>
  );
}

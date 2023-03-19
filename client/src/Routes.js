import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Header } from "./components/Default/Header";
import { Footer } from "./components/Default/Footer";
import { Team } from "./pages/Team";
import { Home } from "./pages/Home";
import { Match } from "./pages/Match";
import { News } from "./pages/News";
import { Championship } from "./pages/Championship";

export function AppRoutes() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/noticias" element={<News />} />
        <Route path="/equipe" element={<Team />} />
        <Route path="/campeonato" element={<Championship />} />
        {/* <Route path="/equipe/:id" element={<Team />} /> */}
        {/* <Route path="/campeonato/:id" element={<Championship />} /> */}
        <Route path="/partida/:id" element={<Match />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

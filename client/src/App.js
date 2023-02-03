import "../src/styles/fonts.css";
import HeaderApp from "./components/Header";
import FooterApp from "./components/Footer";
import { AppRoutes } from "./Routes";

function App() {
  return (
    <>
      <HeaderApp />
      <AppRoutes />
      <FooterApp />
    </>
  );
}

export default App;

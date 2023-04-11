// import { Footer } from "./components/default/Footer";
import { AppRoutes } from "./Routes";
import { AuthProvider } from "./context/AuthProvider";
import "../src/styles/fonts.css";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;

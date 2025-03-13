import "./App.css";
import { Routes, Route } from "react-router-dom";
import AllRecipesPage from "./pages/AllRecipesPage";
import RecipePage from "./pages/RecipePage";
import SelectedPage from "./pages/SelectedPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AllRecipesPage />} />
      <Route path="/recipe/:id" element={<RecipePage />} />
      <Route path="/favorites" element={<SelectedPage />} />
    </Routes>
  );
}

export default App;

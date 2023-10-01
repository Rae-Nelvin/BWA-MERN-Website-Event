import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./pages/signin";
import DashboardPage from "./pages/dashboard";
import CategoriesPage from "./pages/categories";
import { listen } from "./redux/listener";

function App() {
  useEffect(() => {
    listen();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

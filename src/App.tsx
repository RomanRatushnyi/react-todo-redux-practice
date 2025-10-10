import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAppSelector } from "./store/hooks";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import TodosPage from "./pages/TodosPage";
import "./App.css";

function App() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  function hasCookie(name: string) {
    return document.cookie
      .split("; ")
      .some((row) => row.startsWith(name + "="));
  }

  if (!isAuthenticated && !hasCookie("access_token")) {
    return <LoginPage />;
  }

  return (
    <Routes>
      <Route path="/" element={<TodosPage />} />
      <Route path="/todos" element={<Navigate to="/" replace />} />
      <Route
        path="*"
        element={<NotFoundPage onGoHome={() => navigate("/")} />}
      />
    </Routes>
  );
}

export default App;

import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Quizzes from "./pages/Quizzes";
import PlayerJoin from "./pages/PlayerJoin";
import HostLobby from "./pages/HostLobby";
import Game from "./pages/Game";
import Results from "./pages/Results";
import QuizCreator from "./pages/QuizCreator";
import Settings from "./pages/Settings";

function App() {
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    // With mock auth, we don't need Firebase auth state listener
    // Just set loading to false
    setLoading(false);
  }, [setLoading]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<PlayerJoin />} />
        <Route path="/game" element={<Game />} />
        <Route path="/results" element={<Results />} />

        {/* Protected routes (require auth) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quizzes"
          element={
            <ProtectedRoute>
              <Quizzes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/host"
          element={
            <ProtectedRoute>
              <HostLobby />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz/create"
          element={
            <ProtectedRoute>
              <QuizCreator />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

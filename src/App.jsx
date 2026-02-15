import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import Login from "./pages/Login.jsx";
import Sheets from "./pages/Sheets.jsx";
import Topics from "./pages/Topics.jsx";   // <-- ADD THIS
import Problems from "./pages/Problems.jsx";
import ProblemRoom from "./pages/ProblemRoom.jsx";


function App() {
  const { isAuthenticated } = useAuth();

  return (
  <div className="min-h-screen bg-gray-100">
    <Routes>
      {/* Login */}
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/" /> : <Login />
        }
      />

      {/* Sheets (Home) */}
      <Route
        path="/"
        element={
          isAuthenticated ? <Sheets /> : <Navigate to="/login" />
        }
      />

      {/* Topics inside a Sheet */}
      <Route
        path="/sheets/:sheetId"
        element={
          isAuthenticated ? <Topics /> : <Navigate to="/login" />
        }
      />

      {/* Problems inside a Topic */}
      <Route
        path="/topics/:topicId"
        element={
          isAuthenticated ? <Problems /> : <Navigate to="/login" />
        }
      />

      {/* Single Problem Room */}
      <Route
        path="/problems/:problemId"
        element={
          isAuthenticated ? <ProblemRoom /> : <Navigate to="/login" />
        }
      />
    </Routes>
  </div>
);

}

export default App;

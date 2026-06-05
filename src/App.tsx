import { Routes, Route, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "./api/auth";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RoomPage from "./pages/RoomPage";
import MatchPage from "./pages/MatchPage";
import GroupsPage from "./pages/GroupsPage";
import AuthCallback from "./pages/AuthCallback";

function App() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });

  if (isLoading)
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#00ff87] border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route
        path="/"
        element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
      />
      <Route
        path="/rooms/:id"
        element={user ? <RoomPage user={user} /> : <Navigate to="/login" />}
      />
      <Route
        path="/matches/:id"
        element={user ? <MatchPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/groups"
        element={user ? <GroupsPage /> : <Navigate to="/login" />}
      />

      <Route path="/auth/callback" element={<AuthCallback />} />
    </Routes>
  );
}

export default App;

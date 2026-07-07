import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewAnalysis from "./pages/newAnalysis";
import Processing from "./pages/Processing";
import Results from "./pages/results";
import PrivateRoute from "./components/PrivateRoutes";
import Register from "./pages/Register";
import History from "./pages/History";
import Profile from "./pages/Profile";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analysis/new" element={<NewAnalysis />} />
          <Route path="/analysis/:id/processing" element={<Processing />} />
          <Route path="/analysis/:id/results" element={<Results />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
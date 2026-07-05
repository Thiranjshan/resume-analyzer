import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewAnalysis from "./pages/NewAnalysis";
import Processing from "./pages/Processing";
import Results from "./pages/results";
import PrivateRoute from "./components/PrivateRoutes";
import Register from "./pages/Register";


export default function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route element={<PrivateRoute/>}>

        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analysis/new" element={<NewAnalysis />} />
        <Route path="/analysis/:id/processing" element={<Processing />} />
        <Route path="/analysis/:id/results" element={<Results />} />
        <Route path="*" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
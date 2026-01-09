import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Launch from "../src/pages/Launch";
import Login from "../src/pages/Login";
import Dashboard from "../src/pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Launch />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

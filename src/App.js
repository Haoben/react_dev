import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./views/Login";
import HomePage from "./views/HomePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/HomePage" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

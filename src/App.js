import React from "react";
import HomePage from "./components/HomePage/HomePage";
import MainScreen from "./components/MainScreen/MainScreen";
import Register from "./components/Register/Register";
import Reset from "./components/ResetUser/Reset";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/mainscreen" element={<MainScreen />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;

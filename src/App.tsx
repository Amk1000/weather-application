import React from "react";
import WeatherApp from "./components/weatherapp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" Component={WeatherApp} />
      </Routes>
    </Router>
  );
}

export default App;

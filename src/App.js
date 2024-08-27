import logo from "./logo.svg";
import "./App.css";
import Main from "./components/Main";
import { useState } from "react";
import { Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;


import './App.css';
import FormMaderos from './components/maderos/FormMaderos';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/nav/NavBar';
import Maderos from './components/maderos/Maderos';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Maderos />} />
        <Route path="/adminMaderos" element={<FormMaderos />} />
        {/* Agrega otras rutas aquí según sea necesario */}
      </Routes>
    </Router>
  );
}

export default App;

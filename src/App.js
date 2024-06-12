
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/nav/NavBar';
import Maderos from './components/maderos/Maderos';
import Home from './components/home/Home';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';  // O el tema que prefieras
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adminMaderos" element={<Maderos />} />
        {/* Agrega otras rutas aquí según sea necesario */}
      </Routes>
    </Router>
  );
}

export default App;

import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Games from './pages/Games';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import PrivateRoute from './components/PrivateRoute';

export default function App() {

  // Propiedades de los filtros
  const [filters, setFilters] = useState({});

  // Handlers para los filtros
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <Router>
      <div className="flex flex-col h-screen">
      <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar onFilterChange={handleFilterChange} />
          <main className="flex-1 p-4 overflow-y-auto bg-[#1b2838] text-gray-200">
            <Routes>
              <Route path="/" element={<PrivateRoute><Games filters={filters} /></PrivateRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

function Register() {

    // Hook para la navegación
    const navigate = useNavigate();

    // Estado local para almacenar los valores del formulario
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

    // Hook para manejar el estado de error
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Maneja los cambios en los inputs del formulario
    const handleChange = e => {
      const { name, value } = e.target;

      // Actualiza el estado con el nuevo valor ingresado
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    // Maneja el envío del formulario
  const handleSubmit = async e => {
    e.preventDefault();

    // Validación simple
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await api.post('/api/register/', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      setSuccess("Usuario registrado exitosamente.");
      setError(null);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      console.error(err);
      setError("Error al registrar usuario.");
    }
  };

    return (
      <div className="max-w-md mx-auto bg-gray-900 text-white shadow-lg rounded-xl p-6 mt-12 border border-gray-700">
      <h2 className="text-3xl font-bold mb-6 text-center">Registro</h2>

      {error && <div className="text-red-400 mb-4">{error}</div>}
      {success && <div className="text-green-400 mb-4">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Usuario</label>
          <input
            type="text"
            name="username"
            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 mt-1 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Correo electrónico</label>
          <input
            type="email"
            name="email"
            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 mt-1 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Contraseña</label>
          <input
            type="password"
            name="password"
            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 mt-1 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300">Confirmar Contraseña</label>
          <input
            type="password"
            name="confirmPassword"
            className="w-full bg-gray-81200 border border-gray-700 rounded px-3 py-2 mt-1 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 transition text-white py-2 rounded-lg font-semibold shadow-md"
        >
          Registrarse
        </button>
      </form>
    </div>
    );
}

export default Register;
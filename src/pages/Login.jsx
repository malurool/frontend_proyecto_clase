import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login() {

  // Estado local para almacenar los valores del formulario
  const [formData, setFormData] = useState({ username: '', password: '' });
  // Estado local para manejar errores
  const [error, setError] = useState(null);
  // Contexto de autenticación para manejar el login
  const { login } = useContext(AuthContext);
  //Hook para redirigir a otras rutas
  const navigate = useNavigate();


  // Maneja los cambios en los inputs del formulario
  const handleChange = e => {
    const { name, value } = e.target;
    // Actualiza el estado con el nuevo valor ingresado
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async  e => {
    e.preventDefault();// Previene el comportamiento por defecto del formulario (recarga)
    console.log('Datos ingresados:', formData);
    // Aquí se conectará con el backend en la Fase 3
    try {
      // Intenta iniciar sesión con los datos del formulario
      await login(formData.username, formData.password);
      navigate('/'); // Redirige al usuario si fue exitoso
    } catch (err) {
      // Muestra un error si las credenciales no son válidas
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-900 text-white shadow-lg rounded-xl p-6 mt-12 border border-gray-700">
    <h2 className="text-3xl font-bold mb-6 text-center">Iniciar Sesión</h2>

    {error && <p className="text-red-400 mb-4">{error}</p>}

    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">Usuario</label>
        <input
          type="text"
          name="username"
          className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 mt-1 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300">Contraseña</label>
        <input
          type="password"
          name="password"
          className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 mt-1 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg font-semibold shadow-md"
      >
        Iniciar Sesión
      </button>
    </form>
  </div>
  );
}

export default Login;

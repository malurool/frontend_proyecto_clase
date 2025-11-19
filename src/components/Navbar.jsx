import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Ajusta la ruta si es diferente

export default function Navbar() {
  // Obtiene el contexto de autenticación
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    logout();      // Llama a la función de logout del contexto
    navigate('/login'); // Redirige al login después de cerrar sesión
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">Steam</h1>

      <div className="space-x-4">
        <Link to="/">Home</Link>

        {user ? (
          <>
            <span className="font-semibold">Hola, {user.username}</span>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-2 py-1 rounded hover:bg-gray-100"
            >
              Salir
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

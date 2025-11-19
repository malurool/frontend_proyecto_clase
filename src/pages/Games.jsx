import React, { useEffect, useState } from "react";
import api from "../api/api";
import GameCard from "../components/GameCard";

export default function Games({ filters }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  // Paginación
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const buildParams = () => ({
    page,
    ...filters, // ← los filtros del sidebar
  });

  const loadGames = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/games/", { params: buildParams() });

      if (res.data.results) {
        setGames(res.data.results);
        setNextPage(res.data.next);
        setPrevPage(res.data.previous);
      } else {
        setGames(res.data);
      }
    } catch (error) {
      console.error("Error cargando juegos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGames();
  }, [filters, page]);

  return (
    <div className="flex-1 p-4 bg-[#1b2838] min-h-screen text-gray-200">
      <h1 className="text-3xl font-bold text-blue-400 mb-6">Juegos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading && <p>Cargando...</p>}
        {!loading && games.length === 0 && <p>No hay juegos disponibles.</p>}
        {!loading && games.map((g) => <GameCard key={g.id} game={g} />)}
      </div>

      {/* PAGINACIÓN */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          disabled={!prevPage}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-700 rounded disabled:opacity-40"
        >
          ⬅️ Anterior
        </button>

        <span className="px-4 py-2 bg-gray-800 rounded">Página {page}</span>

        <button
          disabled={!nextPage}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-700 rounded disabled:opacity-40"
        >
          Siguiente ➡️
        </button>
      </div>
    </div>
  );
}

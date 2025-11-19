import React from "react";

export default function GameCard({ game }) {
  const imgUrl = game.image || game.imagen || "";

  return (
    <div className="bg-[#16202a] rounded-md shadow-md overflow-hidden hover:scale-[1.02] transition-transform">
      {/* Imagen */}
      {imgUrl ? (
        <img src={imgUrl} alt={game.title} className="w-full h-48 object-cover" />
      ) : (
        <div className="w-full h-48 bg-gray-700" />
      )}

      <div className="p-4">
        {/* Título */}
        <h2 className="text-lg font-bold text-white">{game.title}</h2>

        {/* Developer */}
        <p className="text-sm text-gray-400">{game.developer}</p>

        {/* Precio */}
        <p className="text-green-400 font-semibold mt-1">${game.price}</p>

        {/* Año */}
        <p className="text-xs text-gray-500">Año: {game.year}</p>

        {/* Descripcion */}
        <p className="text-sm text-gray-300 mt-3 line-clamp-3">
          {game.description || "Sin descripción disponible."}
        </p>
      </div>
    </div>
  );
}

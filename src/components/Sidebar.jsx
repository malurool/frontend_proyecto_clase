// src/components/Sidebar.jsx
import React, { useState, useEffect } from "react";

export default function Sidebar({ onFilterChange, initialFilters = {} }) {
  const [developer, setDeveloper] = useState(initialFilters.developer || "");
  const [title, setTitle] = useState(initialFilters.title || "");
  const [min_price, setMinPrice] = useState(initialFilters.min_price || "");
  const [max_price, setMaxPrice] = useState(initialFilters.max_price || "");
  const [min_year, setMinYear] = useState(initialFilters.min_year || "");
  const [max_year, setMaxYear] = useState(initialFilters.max_year || "");
  const [ordering, setOrdering] = useState(initialFilters.ordering || "");

  // Cuando cualquiera cambia emitimos el objeto completo hacia App
  useEffect(() => {
    const payload = {
      developer: developer || undefined,
      title: title || undefined,
      min_price: min_price || undefined,
      max_price: max_price || undefined,
      min_year: min_year || undefined,
      max_year: max_year || undefined,
      ordering: ordering || undefined,
    };

    // Opcional: eliminar keys undefined
    Object.keys(payload).forEach(k => payload[k] === undefined && delete payload[k]);

    if (typeof onFilterChange === "function") {
      onFilterChange(payload);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [developer, title, min_price, max_price, min_year, max_year, ordering]);

  return (
    <aside className="w-64 bg-[#171a21] text-gray-300 p-4 border-r border-gray-700">
      <h3 className="text-lg font-bold text-blue-400 mb-4">Filtros</h3>

      <label className="block text-sm mb-1">Desarrolladora</label>
      <input value={developer} onChange={e => setDeveloper(e.target.value)}
        placeholder="Ej: Nintendo"
        className="w-full bg-[#1b2838] text-gray-200 border border-gray-600 rounded px-2 py-1 mb-3"
      />

      <label className="block text-sm mb-1">Título</label>
      <input value={title} onChange={e => setTitle(e.target.value)}
        placeholder="Ej: Zelda"
        className="w-full bg-[#1b2838] text-gray-200 border border-gray-600 rounded px-2 py-1 mb-3"
      />

      <label className="block text-sm mb-1">Precio mínimo</label>
      <input type="number" value={min_price} onChange={e => setMinPrice(e.target.value)}
        className="w-full bg-[#1b2838] text-gray-200 border border-gray-600 rounded px-2 py-1 mb-3"
      />

      <label className="block text-sm mb-1">Precio máximo</label>
      <input type="number" value={max_price} onChange={e => setMaxPrice(e.target.value)}
        className="w-full bg-[#1b2838] text-gray-200 border border-gray-600 rounded px-2 py-1 mb-3"
      />

      <label className="block text-sm mb-1">Año mínimo</label>
      <input type="number" value={min_year} onChange={e => setMinYear(e.target.value)}
        className="w-full bg-[#1b2838] text-gray-200 border border-gray-600 rounded px-2 py-1 mb-3"
      />

      <label className="block text-sm mb-1">Año máximo</label>
      <input type="number" value={max_year} onChange={e => setMaxYear(e.target.value)}
        className="w-full bg-[#1b2838] text-gray-200 border border-gray-600 rounded px-2 py-1 mb-3"
      />

      <label className="block text-sm mb-1">Ordenar por</label>
      <select value={ordering} onChange={e => setOrdering(e.target.value)}
        className="w-full bg-[#1b2838] text-gray-200 border border-gray-600 rounded px-2 py-1 mb-3"
      >
        <option value="">-- Seleccionar --</option>
        <option value="price">Precio ↑</option>
        <option value="-price">Precio ↓</option>
        <option value="year">Año ↑</option>
        <option value="-year">Año ↓</option>
      </select>
    </aside>
  );
}

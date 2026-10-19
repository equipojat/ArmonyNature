import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ArrowUpDown, X, Search, Sliders } from 'lucide-react';
import { products } from '../../data/products';
import { ProductGrid } from '../../components/products/ProductGrid';
import { Product } from '../../types';

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Estados para filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(200000);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [petSafeOnly, setPetSafeOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('default');
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // Leer parámetros de URL al montar
  useEffect(() => {
    const searchVal = searchParams.get('search');
    if (searchVal) setSearchQuery(searchVal);

    const catVal = searchParams.get('categoria');
    if (catVal) setSelectedCategories([catVal]);
  }, [searchParams]);

  // Lista de categorías únicas
  const categoriesList = ['Orquídeas', 'Anturios', 'Suculentas', 'Bonsáis', 'Materas'];

  // Todas las plantas comparten propiedades de bienestar

  // Filtrado de productos utilizando useMemo para performance
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Búsqueda por texto (nombre, categoría, descripción, dificultad)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.difficulty.toLowerCase().includes(q) ||
          p.light.toLowerCase().includes(q) ||
          (p.tag && p.tag.toLowerCase().includes(q))
      );
    }

    // 2. Filtro de Categoría
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // 3. Filtro de Rango de Precio
    result = result.filter((p) => p.price <= maxPrice);

    // 4. Filtro de Dificultad
    if (selectedDifficulty.length > 0) {
      result = result.filter((p) => selectedDifficulty.includes(p.difficulty));
    }

    // 5. Filtro de Mascotas (Pet Safe)
    if (petSafeOnly) {
      result = result.filter((p) => p.isPetSafe);
    }

    // 6. Ordenación
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating-desc') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      // Ordena por stock o ID descendente como simulación de recientes
      result.sort((a, b) => b.stock - a.stock);
    }

    return result;
  }, [searchQuery, selectedCategories, maxPrice, selectedDifficulty, petSafeOnly, sortBy]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleDifficultyToggle = (diff: string) => {
    setSelectedDifficulty((prev) =>
      prev.includes(diff) ? prev.filter((d) => d !== diff) : [...prev, diff]
    );
  };

  // handleAffinityToggle removido

  const clearFilters = () => {
    setSelectedCategories([]);
    setMaxPrice(200000);
    setSelectedDifficulty([]);
    setPetSafeOnly(false);
    setSearchQuery('');
    setSortBy('default');
    setSearchParams({});
  };

  const activeFiltersCount =
    selectedCategories.length +
    (maxPrice < 200000 ? 1 : 0) +
    selectedDifficulty.length +
    (petSafeOnly ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header / Title */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-stone-200/50 pb-6">
        <div className="text-center md:text-left space-y-1">
          <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-forest-dark">Nuestra colección</h1>
          <p className="text-xs sm:text-sm text-stone-500 font-light">
            Encuentra plantas, materas y elementos curados para nutrir tu bienestar.
          </p>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-end">
          <div className="flex items-center gap-2 border border-stone-200 bg-white px-3 py-2 rounded-xl text-xs font-semibold text-stone-600">
            <ArrowUpDown className="w-4 h-4 text-stone-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border-none outline-none focus:ring-0 cursor-pointer"
            >
              <option value="default">Relevancia</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="rating-desc">Mejor Calificación</option>
              <option value="newest">Más Vendidos</option>
            </select>
          </div>
          
          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowMobileFilters(true)}
            className="md:hidden flex items-center gap-2 bg-forest text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtros
            {activeFiltersCount > 0 && (
              <span className="bg-white text-forest text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-extrabold ml-1">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* DESKTOP SIDEBAR FILTERS */}
        <aside className="hidden lg:block lg:col-span-3 bg-white border border-stone-100 p-6 rounded-3xl shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div className="flex items-center gap-2 font-bold text-forest-dark text-sm">
              <Sliders className="w-4 h-4 text-forest" />
              <span>Filtros</span>
            </div>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-xs text-stone-400 hover:text-forest hover:underline transition-colors"
              >
                Limpiar todo
              </button>
            )}
          </div>

          {/* Search bar inside Sidebar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-4 py-2 text-xs text-stone-700 focus:outline-none focus:border-forest/50"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Categories Filter */}
          <div className="space-y-2.5">
            <h3 className="text-xs uppercase tracking-wider text-forest font-bold">Categorías</h3>
            <div className="flex flex-col gap-2">
              {categoriesList.map((cat) => (
                <label key={cat} className="flex items-center gap-2.5 text-xs text-stone-600 cursor-pointer hover:text-forest select-none">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryToggle(cat)}
                    className="rounded border-stone-300 text-forest focus:ring-forest"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2.5">
            <div className="flex justify-between text-xs font-bold text-forest uppercase tracking-wider">
              <h3>Precio Máximo</h3>
              <span className="font-semibold text-stone-600">
                {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(maxPrice)}
              </span>
            </div>
            <input
              type="range"
              min="20000"
              max="200000"
              step="5000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-forest cursor-pointer bg-stone-100 h-1.5 rounded-full"
            />
          </div>

          {/* Difficulty Filter */}
          <div className="space-y-2.5">
            <h3 className="text-xs uppercase tracking-wider text-forest font-bold">Dificultad de Cuidado</h3>
            <div className="flex flex-col gap-2">
              {['Fácil', 'Intermedio', 'Avanzado'].map((diff) => (
                <label key={diff} className="flex items-center gap-2.5 text-xs text-stone-600 cursor-pointer hover:text-forest select-none">
                  <input
                    type="checkbox"
                    checked={selectedDifficulty.includes(diff)}
                    onChange={() => handleDifficultyToggle(diff)}
                    className="rounded border-stone-300 text-forest focus:ring-forest"
                  />
                  <span>{diff}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filtros adicionales */}

          {/* Features / Pet Safe */}
          <div className="space-y-2.5 pt-2 border-t border-stone-100">
            <label className="flex items-center gap-2.5 text-xs text-stone-600 font-semibold cursor-pointer hover:text-forest select-none">
              <input
                type="checkbox"
                checked={petSafeOnly}
                onChange={(e) => setPetSafeOnly(e.target.checked)}
                className="rounded border-stone-300 text-forest focus:ring-forest"
              />
              <span>🐾 Seguro para mascotas</span>
            </label>
          </div>
        </aside>

        {/* PRODUCTS SECTION */}
        <main className="lg:col-span-9 space-y-6">
          {/* Active tags display */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 bg-stone-50 p-3 rounded-2xl border border-stone-200/50">
              <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider pl-1">Activos:</span>
              
              {selectedCategories.map((c) => (
                <span key={c} className="bg-forest/5 text-forest border border-forest/10 text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  {c}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => handleCategoryToggle(c)} />
                </span>
              ))}

              {selectedDifficulty.map((d) => (
                <span key={d} className="bg-amber-50 text-amber-800 border border-amber-100 text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  {d}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => handleDifficultyToggle(d)} />
                </span>
              ))}

              {/* Afinidades removido */}

              {maxPrice < 200000 && (
                <span className="bg-stone-100 text-stone-700 border border-stone-200 text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  &lt;= {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(maxPrice)}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setMaxPrice(200000)} />
                </span>
              )}

              {petSafeOnly && (
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  🐾 Seguro para mascotas
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setPetSafeOnly(false)} />
                </span>
              )}

              {searchQuery && (
                <span className="bg-stone-100 text-stone-700 border border-stone-200 text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  "{searchQuery}"
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
                </span>
              )}

              <button
                onClick={clearFilters}
                className="text-xs text-stone-400 hover:text-rose-500 font-medium hover:underline pl-2 py-1"
              >
                Limpiar todo
              </button>
            </div>
          )}

          {/* Grid display */}
          <ProductGrid products={filteredProducts} />
        </main>
      </div>

      {/* MOBILE FILTERS SIDEBAR OVERLAY */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setShowMobileFilters(false)}
          />

          {/* Drawer body */}
          <div className="relative w-full max-w-sm bg-white shadow-2xl flex flex-col z-10 animate-slide-left p-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-4">
              <h2 className="text-lg font-serif font-bold text-forest-dark">Filtros</h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 pr-2">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-stone-700 focus:outline-none"
                />
                <Search className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
              </div>

              {/* Categories */}
              <div className="space-y-2">
                <h3 className="text-xs uppercase tracking-wider text-forest font-bold">Categorías</h3>
                <div className="flex flex-col gap-2">
                  {categoriesList.map((cat) => (
                    <label key={cat} className="flex items-center gap-2.5 text-xs text-stone-600 select-none">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleCategoryToggle(cat)}
                        className="rounded border-stone-300 text-forest"
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-forest uppercase tracking-wider">
                  <h3>Precio Máximo</h3>
                  <span className="font-semibold text-stone-600">
                    {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(maxPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="200000"
                  step="5000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-forest cursor-pointer bg-stone-100 h-1.5 rounded-full"
                />
              </div>

              {/* Difficulty */}
              <div className="space-y-2">
                <h3 className="text-xs uppercase tracking-wider text-forest font-bold">Dificultad</h3>
                <div className="flex flex-col gap-2">
                  {['Fácil', 'Intermedio', 'Avanzado'].map((diff) => (
                    <label key={diff} className="flex items-center gap-2.5 text-xs text-stone-600 select-none">
                      <input
                        type="checkbox"
                        checked={selectedDifficulty.includes(diff)}
                        onChange={() => handleDifficultyToggle(diff)}
                        className="rounded border-stone-300 text-forest"
                      />
                      <span>{diff}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filtro de Afinidad Móvil removido */}

              {/* Pet safe */}
              <div className="pt-2 border-t border-stone-100">
                <label className="flex items-center gap-2.5 text-xs text-stone-600 font-semibold select-none">
                  <input
                    type="checkbox"
                    checked={petSafeOnly}
                    onChange={(e) => setPetSafeOnly(e.target.checked)}
                    className="rounded border-stone-300 text-forest"
                  />
                  <span>🐾 Seguro para mascotas</span>
                </label>
              </div>
            </div>

            {/* Sticky mobile footer buttons */}
            <div className="border-t border-stone-100 pt-4 mt-4 space-y-2">
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full btn-primary py-2.5 text-xs font-bold"
              >
                Aplicar Filtros ({filteredProducts.length} productos)
              </button>
              <button
                onClick={() => {
                  clearFilters();
                  setShowMobileFilters(false);
                }}
                className="w-full btn-secondary py-2 text-xs font-bold"
              >
                Limpiar todo
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

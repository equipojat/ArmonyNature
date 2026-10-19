import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Search, Heart, ShoppingBag, User, Leaf } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useFavoritesStore } from '../../store/useFavoritesStore';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const cartItems = useCartStore((state) => state.items);
  const setCartOpen = useCartStore((state) => state.setOpen);
  const favorites = useFavoritesStore((state) => state.favorites);

  const navigate = useNavigate();
  const location = useLocation();

  // Cerrar menús al cambiar de ruta
  useEffect(() => {
    setIsOpen(false);
    setShowSearch(false);
  }, [location]);

  // Manejar cambio de fondo al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalFavoritesCount = favorites.length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tienda?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/tienda', label: 'Tienda' },
    { to: '/cuidados', label: 'Cuidados' },
    { to: '/encuentra-tu-planta', label: 'Encuentra tu planta' },
    { to: '/blog', label: 'Blog' },
    { to: '/nosotros', label: 'Nosotros' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
          : 'bg-[#faf9f6]/90 backdrop-blur-sm py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-forest/5 flex items-center justify-center text-forest group-hover:bg-forest group-hover:text-white transition-smooth">
              <Leaf className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-forest-dark group-hover:text-forest transition-colors leading-none">
                Armony
              </span>
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold leading-tight">
                Plantas & Bienestar
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Link Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-smooth py-1 border-b-2 ${
                    isActive
                      ? 'border-forest text-forest font-semibold'
                      : 'border-transparent text-stone-600 hover:text-forest hover:border-forest/20'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Icon Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Desktop Search Button */}
            <div className="relative hidden md:block">
              {showSearch ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center animate-fade-in">
                  <input
                    type="text"
                    placeholder="Buscar plantas, macetas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-48 bg-stone-100 border-none outline-none rounded-full px-4 py-1.5 text-xs text-stone-700 focus:ring-1 focus:ring-forest transition-smooth"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowSearch(false)}
                    className="absolute right-3 text-stone-400 hover:text-stone-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className="p-2 text-stone-600 hover:text-forest hover:bg-stone-50 rounded-full transition-smooth"
                  title="Buscar"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Favorites Icon */}
            <Link
              to="/favoritos"
              className="p-2 text-stone-600 hover:text-forest hover:bg-stone-50 rounded-full transition-smooth relative"
              title="Favoritos"
            >
              <Heart className="w-5 h-5" />
              {totalFavoritesCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-gold text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {totalFavoritesCount}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <button
              onClick={() => setCartOpen(true)}
              className="p-2 text-stone-600 hover:text-forest hover:bg-stone-50 rounded-full transition-smooth relative"
              title="Carrito de compras"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-forest-light text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Profile/User Icon */}
            <Link
              to="/checkout" // Por ahora redirigimos al checkout o simulamos un enlace
              className="p-2 text-stone-600 hover:text-forest hover:bg-stone-50 rounded-full transition-smooth hidden sm:block"
              title="Mi Cuenta"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-stone-600 hover:text-forest hover:bg-stone-50 rounded-full transition-smooth md:hidden"
              aria-label="Menú principal"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 animate-slide-down shadow-lg absolute w-full top-full left-0 z-30">
          <div className="px-4 py-4 space-y-4">
            
            {/* Search Input for Mobile */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Buscar plantas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-full pl-10 pr-4 py-2 text-sm text-stone-700 outline-none focus:border-forest/50"
              />
              <Search className="absolute left-3.5 top-2.5 w-4.5 h-4.5 text-stone-400" />
            </form>

            {/* Menu Links */}
            <nav className="flex flex-col gap-3 pb-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-base font-medium px-2 py-1.5 rounded-lg transition-smooth ${
                      isActive
                        ? 'bg-forest/5 text-forest font-semibold'
                        : 'text-stone-600 hover:bg-stone-50 hover:text-forest'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              
              {/* User Account Link for mobile */}
              <Link
                to="/checkout"
                className="text-base font-medium px-2 py-1.5 rounded-lg text-stone-600 hover:bg-stone-50 hover:text-forest flex items-center gap-2 border-t border-stone-100 pt-3 mt-1"
              >
                <User className="w-4 h-4 text-stone-400" />
                Mi Cuenta
              </Link>
            </nav>

          </div>
        </div>
      )}
    </header>
  );
};

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';

// Importación de Páginas
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Product } from './pages/Product';
import { FindPlant } from './pages/FindPlant';
import { Care } from './pages/Care';
import { Blog } from './pages/Blog';
import { BlogDetail } from './pages/BlogDetail';
import { About } from './pages/About';
import { Favorites } from './pages/Favorites';
import { Checkout } from './pages/Checkout';
import { Confirmation } from './pages/Confirmation';

// Componente para restablecer el scroll al cambiar de página
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        {/* Main Content Area */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tienda" element={<Shop />} />
            <Route path="/producto/:id" element={<Product />} />
            <Route path="/encuentra-tu-planta" element={<FindPlant />} />
            <Route path="/cuidados" element={<Care />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/favoritos" element={<Favorites />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/pedido/:id" element={<Confirmation />} />
            
            {/* Fallback a Inicio */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        
        <Footer />
        <CartDrawer />
      </div>
    </Router>
  );
};

export default App;

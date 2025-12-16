// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Contextos
import { AuthProvider } from './contexts/AuthContext';
import { ProductosProvider } from './contexts/ProductosContext';
import { CarritoProvider } from './contexts/CarritoContext';
import { SearchProvider } from './contexts/BusquedaContext';

// Componentes
import Header from "./components/Header";
import Footer from "./components/Footer";
import SEO from "./components/SEO";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import ProductoDetalle from "./pages/ProductoDetalle";
//import Carrito from "./pages/Carrito";
import Nosotros from "./pages/Nosotros";
import ResultadosBusqueda from "./components/ResultadosBusqueda";
import RutaProtegida from "./components/RutaProtegida";

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <ProductosProvider>
          <CarritoProvider>
            <SearchProvider>
              <Router>
                <div className="app-container d-flex flex-column min-vh-100">
                  <SEO />
                  
                  <Header />
                  
                  <main className="flex-grow-1">
                    <Routes>
                      {/* Rutas públicas */}
                      <Route path="/" element={<Inicio />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/nosotros" element={<Nosotros />} />
                      <Route path="/productos/:id" element={<ProductoDetalle />} />
                      <Route path="/busqueda" element={<ResultadosBusqueda />} />
                      
                      {/* Rutas protegidas */}
                      <Route path="/carrito" element={
                        <RutaProtegida>
                          <Carrito />
                        </RutaProtegida>
                      } />
                      
                      <Route path="/admin" element={
                        <RutaProtegida requireAdmin={true}>
                          <Admin />
                        </RutaProtegida>
                      } />
                    </Routes>
                  </main>
                  
                  <Footer />
                  
                  <ToastContainer 
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                  />
                </div>
              </Router>
            </SearchProvider>
          </CarritoProvider>
        </ProductosProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
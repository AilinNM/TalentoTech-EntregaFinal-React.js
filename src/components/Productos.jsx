import { useState } from "react";
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { useProductosContext } from "../contexts/ProductosContext";
import { useCarritoContext } from "../contexts/CarritoContext";
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

const Productos = () => {
  // Usamos el contexto de productos en lugar de estado local
  const { productos, cargando, error } = useProductosContext();
  const { agregarAlCarrito } = useCarritoContext();
  
  // Estados para la paginación
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6; // Productos por página

  // Función para agregar al carrito con Toastify
  const handleAgregarAlCarrito = (producto) => {
    agregarAlCarrito(producto);
    toast.success(` "${producto.title}" agregado al carrito`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  // Cálculos de paginación
  const offset = currentPage * itemsPerPage;
  const currentItems = productos.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(productos.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    // Desplazar hacia arriba al cambiar de página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Estados de carga y error
  if (cargando) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando productos...</span>
        </div>
        <span className="ms-3">Cargando productos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  if (productos.length === 0) {
    return (
      <div className="alert alert-info text-center" role="alert">
        No hay productos disponibles.
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Nuestros Productos</h2>
      
      {/* Paginador superior */}
      {pageCount > 1 && (
        <div className="d-flex justify-content-center mb-4">
          <ReactPaginate
            previousLabel={'« Anterior'}
            nextLabel={'Siguiente »'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            activeClassName={'active'}
            disabledClassName={'disabled'}
            forcePage={currentPage}
          />
        </div>
      )}

      {/* Grid de productos */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {currentItems.map((producto) => (
          <div key={producto.id} className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-img-top d-flex justify-content-center align-items-center p-3" style={{ height: '200px', backgroundColor: '#f8f9fa' }}>
                <img 
                  src={producto.image} 
                  alt={producto.title}
                  className="img-fluid"
                  style={{ 
                    maxHeight: '180px', 
                    objectFit: 'contain',
                    mixBlendMode: 'multiply'
                  }}
                />
              </div>
              
              <div className="card-body d-flex flex-column">
                <h5 className="card-title" style={{ fontSize: '1rem', height: '48px', overflow: 'hidden' }}>
                  {producto.title}
                </h5>
                
                <div className="mb-2">
                  <span className="badge bg-secondary">{producto.category}</span>
                  {producto.rating && (
                    <span className="badge bg-warning text-dark ms-2">
                     {producto.rating.rate} ({producto.rating.count})
                    </span>
                  )}
                </div>
                
                <p className="card-text text-muted small flex-grow-1" style={{ fontSize: '0.85rem', height: '60px', overflow: 'hidden' }}>
                  {producto.description.length > 100 
                    ? `${producto.description.substring(0, 100)}...` 
                    : producto.description}
                </p>
                
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="h5 mb-0 text-primary">${producto.price.toFixed(2)}</span>
                    <span className="text-muted small">ID: {producto.id}</span>
                  </div>
                  
                  <div className="d-grid gap-2 d-md-flex">
                    <button 
                      onClick={() => handleAgregarAlCarrito(producto)}
                      className="btn btn-primary flex-fill"
                    >
                      🛒 Agregar al Carrito
                    </button>
                    <Link 
                      to={`/productos/${producto.id}`}
                      className="btn btn-outline-secondary flex-fill"
                    >
                      🔍 Detalles
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paginador inferior */}
      {pageCount > 1 && (
        <div className="d-flex justify-content-center mt-5">
          <ReactPaginate
            previousLabel={'« Anterior'}
            nextLabel={'Siguiente »'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            activeClassName={'active'}
            disabledClassName={'disabled'}
            forcePage={currentPage}
          />
          
          <div className="ms-4 d-flex align-items-center text-muted small">
            Mostrando {offset + 1}-{Math.min(offset + itemsPerPage, productos.length)} de {productos.length} productos
          </div>
        </div>
      )}
    </div>
  );
};

export default Productos;
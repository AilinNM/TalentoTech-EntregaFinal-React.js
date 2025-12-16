// components/ResultadosBusqueda.jsx
import { useSearch } from '../contexts/BusquedaContext';
import { useProductosContext } from '../contexts/ProductosContext';
import { Link } from 'react-router-dom';

const ResultadosBusqueda = () => {
  const { busqueda } = useSearch();
  const { productos } = useProductosContext();

  if (!busqueda.trim()) {
    return (
      <div className="container py-5 text-center">
        <h2>🔍 Buscar Productos</h2>
        <p className="lead">Ingresa un término en la barra de búsqueda</p>
      </div>
    );
  }

  const resultados = productos.filter(producto => 
    producto.title.toLowerCase().includes(busqueda.toLowerCase()) ||
    producto.description.toLowerCase().includes(busqueda.toLowerCase()) ||
    producto.category.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container py-4">
      <h2 className="mb-4">
        🔍 Resultados para: <span className="text-primary">"{busqueda}"</span>
      </h2>
      
      {resultados.length === 0 ? (
        <div className="alert alert-info">
          No se encontraron productos para "{busqueda}"
        </div>
      ) : (
        <>
          <p className="mb-4">
            Se encontraron <strong>{resultados.length}</strong> producto{resultados.length !== 1 ? 's' : ''}
          </p>
          
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {resultados.map((producto) => (
              <div key={producto.id} className="col">
                <div className="card h-100 shadow-sm">
                  <div className="card-img-top d-flex justify-content-center align-items-center p-3 bg-light" style={{ height: '200px' }}>
                    <img 
                      src={producto.image} 
                      alt={producto.title}
                      className="img-fluid"
                      style={{ maxHeight: '180px', objectFit: 'contain' }}
                    />
                  </div>
                  
                  <div className="card-body">
                    <h5 className="card-title">{producto.title}</h5>
                    <span className="badge bg-secondary mb-2">{producto.category}</span>
                    <p className="card-text text-muted">
                      {producto.description.substring(0, 80)}...
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <strong className="text-primary">${producto.price.toFixed(2)}</strong>
                      <Link 
                        to={`/productos/${producto.id}`}
                        className="btn btn-sm btn-outline-primary"
                      >
                        Ver Detalles
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ResultadosBusqueda;

// components/GestionProductos.jsx
import { useState } from 'react';
import { useProductosContext } from '../contexts/ProductosContext';
import FormProducto from './FormProducto';
import { toast } from 'react-toastify';

const GestionProductos = () => {
  const { productos, eliminarProducto } = useProductosContext();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [modoModal, setModoModal] = useState('agregar');

  const handleAgregarProducto = () => {
    setProductoEditando(null);
    setModoModal('agregar');
    setMostrarModal(true);
  };

  const handleEditarProducto = (producto) => {
    setProductoEditando(producto);
    setModoModal('editar');
    setMostrarModal(true);
  };

  const handleEliminarProducto = async (id) => {
    try {
      await eliminarProducto(id);
      // Toast se muestra desde el contexto
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  const handleCerrarModal = () => {
    setMostrarModal(false);
    setProductoEditando(null);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>📦 Gestión de Productos</h2>
        <button 
          onClick={handleAgregarProducto}
          className="btn btn-primary"
        >
          + Agregar Producto
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          {productos.length === 0 ? (
            <div className="text-center py-5">
              <p className="lead">No hay productos registrados</p>
              <button 
                onClick={handleAgregarProducto}
                className="btn btn-primary"
              >
                Agregar primer producto
              </button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Rating</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((producto) => (
                    <tr key={producto.id}>
                      <td>{producto.id}</td>
                      <td>
                        <img 
                          src={producto.image} 
                          alt={producto.title}
                          style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                          className="img-thumbnail"
                        />
                      </td>
                      <td>
                        <strong>{producto.title}</strong>
                        <br />
                        <small className="text-muted">
                          {producto.description.substring(0, 50)}...
                        </small>
                      </td>
                      <td>
                        <span className="badge bg-secondary">
                          {producto.category}
                        </span>
                      </td>
                      <td>
                        <strong className="text-primary">
                          ${producto.price.toFixed(2)}
                        </strong>
                      </td>
                      <td>
                        {producto.rating && (
                          <div>
                            <small>⭐ {producto.rating.rate}</small>
                            <br />
                            <small>({producto.rating.count})</small>
                          </div>
                        )}
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button 
                            onClick={() => handleEditarProducto(producto)}
                            className="btn btn-outline-primary"
                            title="Editar"
                          >
                            ✏️
                          </button>
                          <button 
                            onClick={() => handleEliminarProducto(producto.id)}
                            className="btn btn-outline-danger"
                            title="Eliminar"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal de FormProducto */}
      {mostrarModal && (
        <FormProducto
          productoInicial={productoEditando || {}}
          modo={modoModal}
          onCerrar={handleCerrarModal}
        />
      )}
    </div>
  );
};

export default GestionProductos;
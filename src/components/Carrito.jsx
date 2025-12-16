// pages/Carrito.jsx
import { useCarritoContext } from '../contexts/CarritoContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Carrito = () => {
  const { carrito, eliminarDelCarrito, actualizarCantidad, vaciarCarrito } = useCarritoContext();
  const navigate = useNavigate();

  const calcularTotal = () => {
    return carrito.reduce((total, item) => {
      return total + (item.price * (item.cantidad || 1));
    }, 0);
  };

  const handleActualizarCantidad = (index, nuevaCantidad) => {
    if (nuevaCantidad < 1) {
      eliminarDelCarrito(index);
      toast.info('Producto eliminado del carrito');
    } else {
      actualizarCantidad(index, nuevaCantidad);
    }
  };

  const handleVaciarCarrito = () => {
    if (carrito.length === 0) {
      toast.info('El carrito ya está vacío');
      return;
    }
    
    if (window.confirm('¿Estás seguro de vaciar todo el carrito?')) {
      vaciarCarrito();
      toast.success('Carrito vaciado');
    }
  };

  const handleCheckout = () => {
    if (carrito.length === 0) {
      toast.error('El carrito está vacío');
      return;
    }
    
    toast.success('¡Compra realizada con éxito! 🎉');
    vaciarCarrito();
    setTimeout(() => navigate('/'), 2000);
  };

  if (carrito.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h2>🛒 Tu Carrito</h2>
          <p className="lead mt-3">Tu carrito está vacío</p>
          <button 
            onClick={() => navigate('/')}
            className="btn btn-primary mt-3"
          >
            Volver a Comprar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>🛒 Tu Carrito de Compras</h2>
        <button 
          onClick={handleVaciarCarrito}
          className="btn btn-outline-danger"
        >
          Vaciar Carrito
        </button>
      </div>
      
      <div className="row">
        <div className="col-lg-8">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              {carrito.map((item, index) => (
                <div key={index} className="row align-items-center mb-3 pb-3 border-bottom">
                  <div className="col-md-2">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="img-fluid rounded"
                      style={{ maxHeight: '80px' }}
                    />
                  </div>
                  
                  <div className="col-md-4">
                    <h6 className="mb-1">{item.title}</h6>
                    <small className="text-muted">{item.category}</small>
                  </div>
                  
                  <div className="col-md-3">
                    <div className="input-group input-group-sm">
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={() => handleActualizarCantidad(index, (item.cantidad || 1) - 1)}
                      >
                        -
                      </button>
                      <input 
                        type="text" 
                        className="form-control text-center"
                        value={item.cantidad || 1}
                        readOnly
                      />
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={() => handleActualizarCantidad(index, (item.cantidad || 1) + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-md-2 text-end">
                    <h6 className="mb-0">
                      ${((item.price || 0) * (item.cantidad || 1)).toFixed(2)}
                    </h6>
                    <small className="text-muted">
                      ${item.price?.toFixed(2)} c/u
                    </small>
                  </div>
                  
                  <div className="col-md-1 text-end">
                    <button 
                      onClick={() => eliminarDelCarrito(index)}
                      className="btn btn-sm btn-outline-danger"
                      aria-label="Eliminar producto"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Resumen de Compra</h5>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Productos ({carrito.length})</span>
                <span>${calcularTotal().toFixed(2)}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Envío</span>
                <span className="text-success">Gratis</span>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-4">
                <strong>Total</strong>
                <strong className="h5 text-primary">${calcularTotal().toFixed(2)}</strong>
              </div>
              
              <button 
                onClick={handleCheckout}
                className="btn btn-success w-100 mb-3"
              >
                Finalizar Compra
              </button>
              
              <button 
                onClick={() => navigate('/')}
                className="btn btn-outline-primary w-100"
              >
                Seguir Comprando
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
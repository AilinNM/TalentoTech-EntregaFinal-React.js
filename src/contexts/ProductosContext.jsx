import { useState, useEffect, createContext, useContext } from 'react';
import { toast } from 'react-toastify';

export const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:3001/productos";
  
  // Solo un useEffect
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setCargando(true);
      setError(null);
      
      // CORRECCIÓN: Usa API_URL, no API
      const respuesta = await fetch(API_URL);
      
      if (!respuesta.ok) 
        throw new Error(`Error HTTP: ${respuesta.status}`);
      
      const datos = await respuesta.json();
      setProductos(datos);

    } catch (error) {
      console.error("Error al cargar productos:", error);
      setError(error.message || "Error al cargar los productos");
      toast.error('Error al cargar productos');
    } finally {
      setCargando(false);
    }
  };

  // Función para agregar el producto a la API
  const agregarProducto = async (producto) => {
    try {
      setError(null);

      const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
      });
      
      if (!respuesta.ok) 
        throw new Error(`Error HTTP: ${respuesta.status}`);

      const nuevoProducto = await respuesta.json();
      
      // Agregar el nuevo producto a la lista
      setProductos(prevProductos => [...prevProductos, nuevoProducto]);
      toast.success(' Producto agregado correctamente');
      return nuevoProducto;

    } catch (error) {
      console.error("Error al agregar:", error);
      const mensajeError = "Hubo un problema al agregar el producto.";
      setError(mensajeError);
      toast.error(`${mensajeError}`);
      throw error; // Importante para manejar el error en FormProducto
    }
  };

  const editarProducto = async (producto) => {
    try {
      setError(null);

      // CORRECCIÓN: Usa API_URL, no API
      const respuesta = await fetch(`${API_URL}/${producto.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
      });

      if (!respuesta.ok) 
        throw new Error(`Error HTTP: ${respuesta.status}`);

      const productoActualizado = await respuesta.json();
      
      setProductos(prevProductos => 
        prevProductos.map(p => 
          p.id === productoActualizado.id ? productoActualizado : p
        )
      );
      
      toast.success('Producto actualizado correctamente');

    } catch (error) {
      console.error("Error al editar:", error);
      const mensajeError = "Hubo un problema al editar el producto.";
      setError(mensajeError);
      toast.error(`${mensajeError}`);
      throw error;
    }
  };

  // Función para eliminar producto de la API
  const eliminarProducto = async (id) => {
    return new Promise((resolve) => {
      // Toast de confirmación personalizado
      toast(
        ({ closeToast }) => (
          <div style={{ padding: '10px' }}>
            <p style={{ marginBottom: '15px' }}>¿Estás seguro de eliminar este producto?</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button 
                onClick={async () => {
                  try {
                    setError(null);
                    
                    const respuesta = await fetch(`${API_URL}/${id}`, {
                      method: "DELETE",
                    });

                    if (!respuesta.ok) 
                      throw new Error("Error al eliminar");  

                    // Filtra y crea un nuevo array sin el producto eliminado
                    setProductos(prevProductos => prevProductos.filter(p => p.id !== id));
                    
                    toast.success(' Producto eliminado correctamente');
                    closeToast();
                    resolve(true);
                    
                  } catch (error) {
                    console.error(error.message);
                    const mensajeError = "Hubo un problema al eliminar el producto.";
                    setError(mensajeError);
                    toast.error(` ${mensajeError}`);
                    resolve(false);
                  }
                }}
                style={{
                  padding: '5px 15px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Sí, eliminar
              </button>
              <button 
                onClick={() => {
                  closeToast();
                  resolve(false);
                }}
                style={{
                  padding: '5px 15px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        ), 
        {
          position: "top-center",
          autoClose: false,
          closeOnClick: false,
          draggable: false,
          closeButton: false
        }
      );
    });
  };

  return (
    <ProductosContext.Provider value={{ 
      productos,
      cargando,
      error, 
      cargarProductos, 
      agregarProducto, 
      editarProducto, 
      eliminarProducto 
    }}>
      {children}
    </ProductosContext.Provider>
  );
};

export const useProductosContext = () => useContext(ProductosContext);
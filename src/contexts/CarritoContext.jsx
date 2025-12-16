import { createContext, useContext, useState, useEffect } from 'react';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  // Cargar carrito desde localStorage al iniciar
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  // Calcular cantidad total de items
  const cantidadItems = carrito.reduce((total, item) => {
    return total + (item.cantidad || 1);
  }, 0);

  // Calcular total monetario
  const totalCarrito = carrito.reduce((total, item) => {
    return total + (item.price * (item.cantidad || 1));
  }, 0);

  // Guardar en localStorage cuando cambia el carrito
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    // Buscar si el producto ya existe en el carrito
    const productoExistente = carrito.findIndex(item => item.id === producto.id);
    
    if (productoExistente !== -1) {
      // Si el producto ya existe, aumentar la cantidad
      const nuevoCarrito = [...carrito];
      const cantidadActual = nuevoCarrito[productoExistente].cantidad || 1;
      nuevoCarrito[productoExistente] = {
        ...nuevoCarrito[productoExistente],
        cantidad: cantidadActual + 1
      };
      setCarrito(nuevoCarrito);
    } else {
      // Si el producto no existe, agregarlo con cantidad 1
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const actualizarCantidad = (indice, nuevaCantidad) => {
    if (nuevaCantidad < 1) {
      eliminarDelCarrito(indice);
      return;
    }
    
    const nuevoCarrito = [...carrito];
    nuevoCarrito[indice] = { ...nuevoCarrito[indice], cantidad: nuevaCantidad };
    setCarrito(nuevoCarrito);
  };

  const eliminarDelCarrito = (indiceAEliminar) => {
    setCarrito(carrito.filter((_, indice) => indice !== indiceAEliminar));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        cantidadItems,       
        totalCarrito,         
        agregarAlCarrito,
        actualizarCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarritoContext = () => useContext(CarritoContext);
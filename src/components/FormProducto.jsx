import { useState } from "react";
import { useProductosContext } from "../contexts/ProductosContext";
import styles from "./FormProdcuto.module.css";
import X from "../assets/X";

const FormProducto = ({ productoInicial = {}, modo = "agregar", onCerrar }) => {
  
  const [producto, setProducto] = useState(productoInicial);
  const [errores, setErrores] = useState({}); // <-- ESTADO PARA ERRORES (AGREGA ESTA LÍNEA)
  const { agregarProducto, editarProducto } = useProductosContext();
  
  const manejarChange = (evento) => {
    const { name, value } = evento.target;
    setProducto({ ...producto, [name]: value });
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    
    // Validar nombre (title)
    if (!producto.title?.trim()) {
      nuevosErrores.title = 'El nombre es obligatorio';
    }
    
    // Validar precio (price)
    if (!producto.price || producto.price <= 0) {
      nuevosErrores.price = 'El precio debe ser mayor a 0';
    }
    
    // Validar categoría (category) - AGREGA ESTO
    if (!producto.category?.trim()) {
      nuevosErrores.category = 'La categoría es obligatoria';
    }
    
    // Validar descripción (description)
    if (!producto.description?.trim()) {
      nuevosErrores.description = 'La descripción es obligatoria';
    } else if (producto.description.length < 10) {
      nuevosErrores.description = 'La descripción debe tener al menos 10 caracteres';
    }
    
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };
  
  // ==================================================================================

  const manejarSubmit = async (evento) => {
    evento.preventDefault();
    
    // ===== VALIDAR ANTES DE ENVIAR (AGREGA ESTE IF) =====
    if (!validarFormulario()) {
      return; // Detiene el envío si hay errores
    }
    // ====================================================
    
    try {
      if (modo === "agregar") {
        await agregarProducto(producto);
      } else {
        await editarProducto(producto);
      }
      onCerrar();
    } catch (error) {
      console.error("Error al guardar producto:", error);
      // Puedes agregar un error general si quieres
      setErrores(prev => ({ ...prev, general: 'Error al guardar el producto' }));
    }
  };

  return (
    <div 
      className={styles.modalOverlay}
      aria-modal="true"
      role="dialog"
    >
      <div className={styles.modalContainer}>
        <div className={styles.modalContent}>   
          <div className={styles.modalHeader}>
            <h3 className={styles.modalHeaderTitle}>
              {modo === "agregar" ? "Agregar Producto" : "Editar Producto"}
            </h3>
            <button 
              type="button" 
              onClick={onCerrar}
              className={styles.closeButton}
            >
              <X />
            </button>
          </div>
          
          {/* ===== MENSAJE DE ERROR GENERAL (OPCIONAL) ===== */}
          {errores.general && (
            <div className={styles.errorGeneral}>
              {errores.general}
            </div>
          )}
          
          <form onSubmit={manejarSubmit}>
            <div className={styles.formGrid}>
              {/* Campo Nombre */}
              <div className={styles.colSpan2}>
                <label className={styles.formLabel}>
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  className={`${styles.formInputBase} ${errores.nombre ? styles.inputError : ''}`} // Clase condicional
                  placeholder="Ingrese el nombre del producto"
                  value={producto.nombre || ""}
                  onChange={manejarChange}
                />
                {/* ===== MENSAJE DE ERROR PARA NOMBRE ===== */}
                {errores.nombre && (
                  <p className={styles.errorMensaje}>{errores.nombre}</p>
                )}
              </div>
              
              {/* Campo Precio */}
              <div className={`${styles.colSpan2} ${styles.smColSpan1}`}>
                <label className={styles.formLabel}>
                  Precio
                </label>
                <input
                  type="number"
                  name="precio"
                  id="precio"
                  className={`${styles.formInputBase} ${errores.precio ? styles.inputError : ''}`}
                  placeholder="$0.00"
                  value={producto.precio || ""}
                  onChange={manejarChange}
                  min="0"
                  step="any"
                />
                {/* ===== MENSAJE DE ERROR PARA PRECIO ===== */}
                {errores.precio && (
                  <p className={styles.errorMensaje}>{errores.precio}</p>
                )}
              </div>

              {/* Campo Categoría - AGREGA ESTO */}
            <div className={`${styles.colSpan2} ${styles.smColSpan1}`}>
                  <label className={styles.formLabel}>
                    Categoría
                  </label>
              <select
                    name="category"         
                    id="category"
                    className={styles.formInputBase}
                    value={producto.category || ""}
                    onChange={manejarChange}
                    required
                    >
                    <option value="">Seleccione una categoría</option>
                    <option value="electronics">Electrónica</option>
                    <option value="clothing">Ropa</option>
                    <option value="home">Hogar</option>
                    <option value="sports">Deportes</option>
                    <option value="accessories">Accesorios</option>
                </select>
                {/* ========== AQUÍ VA EL MENSAJE DE ERROR PARA CATEGORÍA ========== */}
                {errores.category && (
                  <p className={styles.errorMensaje}>{errores.category}</p>
                )}
                </div>
              
              {/* Campo URL de Imagen */}
              <div className={`${styles.colSpan2} ${styles.smColSpan1}`}>
                <label className={styles.formLabel}>
                  URL de Imagen
                </label>
                <input
                  type="text"
                  name="imagen"
                  id="imagen"
                  className={styles.formInputBase}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  value={producto.imagen || ""}
                  onChange={manejarChange}
                />
              </div>
              
              {/* Campo Descripcion */}
              <div className={styles.colSpan2}>
                <label className={styles.formLabel}>
                  Descripción del Producto
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  rows="4"
                  className={`${styles.formInputBase} ${errores.descripcion ? styles.inputError : ''}`}
                  placeholder="Escriba la descripción del producto aquí"
                  value={producto.descripcion || ""}
                  onChange={manejarChange}
                ></textarea>
                {/* ===== MENSAJE DE ERROR PARA DESCRIPCIÓN ===== */}
                {errores.descripcion && (
                  <p className={styles.errorMensaje}>{errores.descripcion}</p>
                )}
              </div>
            </div>
            
            <div className={styles.modalActions}>
              <button 
                type="submit" 
                className={`${styles.btnBase} ${styles.btnPrimary}`}
              >
                {modo === "agregar" ? "Agregar" : "Actualizar"}
              </button>
              <button 
                type="button" 
                onClick={onCerrar}
                className={`${styles.btnBase} ${styles.btnSecondary}`}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormProducto;
// components/Header.jsx
import NavBar from './Navbar';
import BarraBusqueda from './BarraBusqueda';
import { Link } from 'react-router-dom';
import { useCarritoContext } from '../contexts/CarritoContext';
import { useAuthContext } from '../contexts/AuthContext';
import styles from './Header.module.css';
import UserIcon from '../assets/UserIcon';
import BagIcon from '../assets/BagIcon';

const Header = () => {
  const { cantidadItems } = useCarritoContext(); // ✅ Usa contexto real
  const { usuario, logout } = useAuthContext();  // ✅ Para mostrar usuario

  return (
    <header className={styles.header}>
      
      {/* Logo */}
      <div className={styles.logo}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Lain eCommerce
        </Link>
      </div>
      
      {/* Barra de Búsqueda (NUEVO) */}
      <div className={styles.searchContainer}>
        <BarraBusqueda />
      </div>
      
      {/* Navbar */}
      <div className={styles.navbarContainer}>
        <NavBar />
      </div>
      
      {/* Iconos */}
      <div className={styles.iconsContainer}>
        
        {/* Usuario con dropdown */}
        <div className={styles.userDropdown}>
          <UserIcon className={styles.icono} />
          {usuario && (
            <div className={styles.userMenu}>
              <span>Hola, {usuario.nombre}</span>
              {usuario.rol === 'admin' && (
                <Link to="/admin" className={styles.menuItem}>Admin</Link>
              )}
              <button onClick={logout} className={styles.menuItem}>Cerrar Sesión</button>
            </div>
          )}
        </div>
        
        {/* Carrito */}
        <Link to="/carrito" className={styles.iconoDeCarrito}>
          <BagIcon className={styles.icono} />
          {cantidadItems > 0 && (
            <span className={styles.contadorDeCarrito}>
              {cantidadItems}
            </span>
          )}
        </Link>
        
      </div>
    </header>   
  );
};

export default Header;
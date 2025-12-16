// components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import styles from './Navbar.module.css';

const NavBar = () => {
  const { usuario } = useAuthContext();

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.navLink}>Inicio</Link>
      <Link to="/nosotros" className={styles.navLink}>Nosotros</Link>
      <Link to="/carrito" className={styles.navLink}>Carrito</Link>
      
      {/* Solo mostrar Admin si el usuario está logueado */}
      {usuario && (
        <Link to="/admin" className={styles.navLink}>Admin</Link>
      )}
      
      {/* Enlace a Login/Logout */}
      {usuario ? (
        <span className={styles.navLink}>Hola, {usuario.nombre}</span>
      ) : (
        <Link to="/login" className={styles.navLink}>Login</Link>
      )}
    </nav>
  );
};

export default NavBar;
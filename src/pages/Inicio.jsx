// pages/Inicio.jsx
import Productos from "../components/Productos";

const Inicio = () => {
  return (
    <div>
      {/* Solo Productos - el carrito ya está en su propia página */}
      <Productos />
    </div>
  );
};

export default Inicio;
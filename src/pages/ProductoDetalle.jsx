// pages/ProductoDetalle.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useCarritoContext } from "../contexts/CarritoContext";

const ProductoDetalle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const { agregarAlCarrito } = useCarritoContext();

    useEffect(() => {
        const cargarProducto = async () => {
            try {
                setCargando(true);
                // CORRECCIÓN: Usa tu API local, no fakestoreapi
                const respuesta = await fetch(`http://localhost:3001/productos/${id}`);
                
                if (!respuesta.ok) {
                    throw new Error('Producto no encontrado');
                }
                
                const datos = await respuesta.json();
                setProducto(datos);
            } catch (error) {
                console.error("Error:", error);
                toast.error('Error al cargar el producto');
                navigate('/'); // Redirige a inicio si hay error
            } finally {
                setCargando(false);
            }
        };

        cargarProducto();
    }, [id, navigate]);

    const handleAgregarAlCarrito = () => {
        if (!producto) return;
        
        agregarAlCarrito(producto);
        toast.success(`✅ "${producto.title}" agregado al carrito`);
    };

    if (cargando) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-3">Cargando producto...</p>
            </div>
        );
    }

    if (!producto) {
        return (
            <div className="container py-5 text-center">
                <h2>Producto no encontrado</h2>
                <button 
                    onClick={() => navigate('/')}
                    className="btn btn-primary mt-3"
                >
                    Volver al inicio
                </button>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <button 
                onClick={() => navigate(-1)}
                className="btn btn-outline-secondary mb-4"
            >
                ← Volver
            </button>
            
            <div className="row">
                <div className="col-lg-6">
                    <div className="card shadow-sm border-0">
                        <div className="card-body p-4 d-flex justify-content-center align-items-center bg-light" style={{ minHeight: '400px' }}>
                            <img 
                                src={producto.image} 
                                alt={producto.title}
                                className="img-fluid rounded"
                                style={{ 
                                    maxHeight: '350px',
                                    objectFit: 'contain'
                                }}
                            />
                        </div>
                    </div>
                </div>
                
                <div className="col-lg-6">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-body p-4">
                            <div className="mb-3">
                                <span className="badge bg-secondary">{producto.category}</span>
                                {producto.rating && (
                                    <span className="badge bg-warning text-dark ms-2">
                                        ⭐ {producto.rating.rate} ({producto.rating.count} reseñas)
                                    </span>
                                )}
                            </div>
                            
                            <h1 className="mb-3">{producto.title}</h1>
                            
                            <div className="mb-4">
                                <h2 className="text-primary">${producto.price.toFixed(2)}</h2>
                                <small className="text-muted">ID: {producto.id}</small>
                            </div>
                            
                            <div className="mb-4">
                                <h5>Descripción</h5>
                                <p className="lead">{producto.description}</p>
                            </div>
                            
                            <div className="d-grid gap-3">
                                <button 
                                    onClick={handleAgregarAlCarrito}
                                    className="btn btn-primary btn-lg"
                                >
                                    🛒 Agregar al Carrito
                                </button>
                                
                                <button 
                                    onClick={() => navigate('/carrito')}
                                    className="btn btn-outline-primary"
                                >
                                    Ver Carrito
                                </button>
                                
                                <button 
                                    onClick={() => navigate('/')}
                                    className="btn btn-outline-secondary"
                                >
                                    Seguir Comprando
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductoDetalle;
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CarritoProvider } from "./contexts/CarritoContext";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";
import { ProductosProvider } from "./contexts/ProductosContext"
import { SearchProvider } from "./contexts/BusquedaContext"; 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductosProvider>
          <SearchProvider>
            <CarritoProvider>
              <App />
            </CarritoProvider>
          </SearchProvider>
        </ProductosProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
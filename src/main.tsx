import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./Contexts/AuthContext.tsx";
import { StrictMode } from "react";
import { CartProvider } from "./Contexts/CartContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./router/router.jsx";
import { RouterProvider } from "react-router"; 
import AuthProvider from "./context/AuthProvider.jsx";
import { HelmetProvider } from "react-helmet-async";
import Loader from "./pages/Loader.jsx"; // ✅ import loader

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <RouterProvider
          router={router}
          fallbackElement={<Loader />} // ✅ show loader while loading routes
        />
      </HelmetProvider>
    </AuthProvider>
  </StrictMode>
);

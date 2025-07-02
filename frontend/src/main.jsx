import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { SnackbarProvider } from './Dashboard/Components/SnackbarContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx' // ✅ NEW IMPORT

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* ✅ Wrap everything with AuthProvider */}
      <SnackbarProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SnackbarProvider>
    </AuthProvider>
  </StrictMode>
);

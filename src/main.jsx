import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { DataProvider } from './contexts/DataContext';
import { PaymentProvider } from "./contexts/PaymentContext";


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <UserProvider>
        <DataProvider>
          <PaymentProvider>
            <App />
          </PaymentProvider>
        </DataProvider>
      </UserProvider>
    </StrictMode>
  </BrowserRouter>,
)

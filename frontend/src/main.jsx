import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ShopContextProvider } from './context/ShopContext.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from './context/AuthContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ShopContextProvider>
      <AuthContextProvider>
        <ToastContainer
          autoClose={2000}
          style={{
            top: '70px', right: '0px'
          }}
        />
        <App />
      </AuthContextProvider>
    </ShopContextProvider>
  </React.StrictMode>,
)

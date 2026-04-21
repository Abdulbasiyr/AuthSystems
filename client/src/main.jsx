
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import Auth from './components/auth.jsx'
import ResetPassword from './components/Auth components/reset-password.jsx'
import ForgotPassword from './components/Auth components/forgot-password.jsx'
import { AuthProvider } from './components/Provider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    < AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/auth/forgot-password' element={<ForgotPassword />} />
          <Route path='/auth/reset-password'  element={<ResetPassword /> } />
        </Routes>
      </BrowserRouter>
    </ AuthProvider>
  </StrictMode>,
)

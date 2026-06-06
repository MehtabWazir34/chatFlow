import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { StrictMode } from 'react'
import { AuthProvider } from './Cntxts/Context.jsx'
import { MsgProvider } from './Cntxts/MsgsCntxt.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
    <AuthProvider>
      <MsgProvider>
        <App />
      </MsgProvider>
    
    </AuthProvider>
  </StrictMode>
  </BrowserRouter>,
)

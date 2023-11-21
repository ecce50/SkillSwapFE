import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import { AuthContextWrapper } from './context/Auth.context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthContextWrapper>
    <App />
      </AuthContextWrapper>
  </React.StrictMode>
  </BrowserRouter>
)

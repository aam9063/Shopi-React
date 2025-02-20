import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Pages/App'
import { ThemeProvider } from './Context/ThemeContext'
import './Pages/App/App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)

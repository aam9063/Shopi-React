import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext'
import { CartProvider } from './Context/CartContext'
import AppRoutes from './Routes'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App 
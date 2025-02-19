import { useRoutes, BrowserRouter } from 'react-router-dom'

import { AuthProvider } from '../../Context/AuthContext'
import { CartProvider } from '../../Context/CartContext'

import Home from '../Home'
import Products from '../Products'
import ProductDetailPage from '../ProductDetailPage'
import MyAccount from '../MyAccount'
import MyOrders from '../MyOrders'
import NotFound from '../NotFound'
import SignIn from '../SignIn'
import Checkout from '../Checkout'
import './App.css'

// Componente de rutas de la aplicación
const AppRoutes = () => {
  // Definición de rutas usando useRoutes de react-router-dom
  let routes = useRoutes([
    { path: '/', element: <Home /> },                    // Página principal
    { path: '/products', element: <Products /> },        // Lista de productos
    { path: '/product/:id', element: <ProductDetailPage /> }, // Detalle de producto
    { path: '/my-account', element: <MyAccount /> },     // Cuenta de usuario
    { path: '/my-orders', element: <MyOrders /> },       // Lista de órdenes
    { path: '/sign-in', element: <SignIn /> },           // Inicio de sesión
    { path: '/checkout', element: <Checkout /> },
    { path: '/*', element: <NotFound /> },               // Página 404
  ])

  return routes
}

// Componente principal de la aplicación
function App() {
  return (
    // BrowserRouter para habilitar el enrutamiento
    <BrowserRouter>
      {/* Providers de contexto anidados */}
      <AuthProvider>        {/* Contexto de autenticación */}
        <CartProvider>      {/* Contexto del carrito */}
            <AppRoutes />   {/* Renderizado de rutas */}
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
import { BrowserRouter, useRoutes } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext'
import { CartProvider } from './Context/CartContext'
import { ThemeProvider } from './Context/ThemeContext'
import { ShoppingCartProvider } from './Context'

// Importar páginas
import Home from './Pages/Home'
import Products from './Pages/Products'
import ProductDetailPage from './Pages/ProductDetailPage'
import MyAccount from './Pages/MyAccount'
import MyOrder from './Pages/MyOrder'
import MyOrders from './Pages/MyOrders'
import NotFound from './Pages/NotFound'
import SignIn from './Pages/SignIn'
import Checkout from './Pages/Checkout'

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/products', element: <Products /> },
    { path: '/product/:id', element: <ProductDetailPage /> },
    { path: '/my-account', element: <MyAccount /> },
    { path: '/my-order', element: <MyOrder /> },
    { path: '/my-orders', element: <MyOrders /> },
    { path: '/sign-in', element: <SignIn /> },
    { path: '/checkout', element: <Checkout /> },
    { path: '/*', element: <NotFound /> },
  ])

  return routes
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <ShoppingCartProvider>
              <AppRoutes />
            </ShoppingCartProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
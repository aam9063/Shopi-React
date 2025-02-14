// Importación de dependencias necesarias
import { NavLink, useLocation } from 'react-router-dom'
import { ShoppingBagIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import { useCart } from '../../Context/CartContext'
import { useAuth } from '../../Context/AuthContext'

function Navbar() {
  // Hooks y estados necesarios
  const location = useLocation()
  const { toggleCart, cart } = useCart()
  const { user, logout } = useAuth()
  
  // Estilos para los enlaces activos
  const activeStyle = 'underline underline-offset-4'
  // Calcula el total de items en el carrito
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    // Barra de navegación con animación de entrada
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light bg-white shadow-md"
    >
      {/* Lista de navegación izquierda */}
      <ul className='flex items-center gap-3'>
        {/* Logo de la tienda */}
        <motion.li 
          whileHover={{ scale: 1.05 }}
          className='font-semibold text-lg'>
          <NavLink to='/'>
            Shopi
          </NavLink>
        </motion.li>
        {/* Enlaces principales */}
        {['/', '/products'].map((path) => (
          <motion.li key={path} whileHover={{ y: -2 }}>
            <NavLink
              to={path}
              className={({ isActive }) => isActive ? activeStyle : undefined}
            >
              {path === '/' ? 'Home' : 'Products'}
              {/* Indicador de página actual */}
              {location.pathname === path && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                />
              )}
            </NavLink>
          </motion.li>
        ))}
      </ul>

      {/* Lista de navegación derecha */}
      <ul className='flex items-center gap-3'>
        {/* Renderizado condicional basado en autenticación */}
        {user ? (
          <>
            {/* Email del usuario */}
            <li className='text-black/60'>
              {user.email}
            </li>
            {/* Enlaces de usuario autenticado */}
            {['/my-orders', '/my-account'].map((path) => (
              <motion.li key={path} whileHover={{ y: -2 }}>
                <NavLink
                  to={path}
                  className={({ isActive }) => isActive ? activeStyle : undefined}
                >
                  {path.slice(1).split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </NavLink>
              </motion.li>
            ))}
            {/* Botón de cerrar sesión */}
            <motion.li 
              whileHover={{ y: -2 }}
              onClick={logout}
              className="cursor-pointer text-primary hover:text-secondary font-bold"
            >
              Cerrar Sesión
            </motion.li>
          </>
        ) : (
          // Enlace de inicio de sesión para usuarios no autenticados
          <motion.li whileHover={{ y: -2 }}>
            <NavLink
              to="/sign-in"
              className={({ isActive }) => isActive ? activeStyle : undefined}
            >
              Iniciar Sesión
            </NavLink>
          </motion.li>
        )}
        
        {/* Icono del carrito con contador */}
        <motion.li 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleCart}
          className='flex items-center cursor-pointer relative'
        >
          <ShoppingBagIcon className='h-6 w-6 text-black' />
          {/* Contador de items en el carrito */}
          {cartItemsCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
            >
              {cartItemsCount}
            </motion.span>
          )}
        </motion.li>
      </ul>
    </motion.nav>
  )
}

export default Navbar
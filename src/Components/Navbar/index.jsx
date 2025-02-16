// Importación de dependencias necesarias
import { NavLink, useLocation } from 'react-router-dom'
import { ShoppingBagIcon } from '@heroicons/react/24/solid'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../../Context/CartContext'
import { useAuth } from '../../Context/AuthContext'
import { useState } from 'react'

function Navbar() {
  // Hooks y estados necesarios
  const location = useLocation()
  const { toggleCart, cart } = useCart()
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
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
      {/* Logo y botón de menú */}
      <div className='flex items-center gap-3'>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className='font-semibold text-lg'>
          <NavLink to='/'>
            Shopi
          </NavLink>
        </motion.div>
        
        {/* Botón de menú hamburguesa - solo visible en móvil */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Menú para desktop */}
      <ul className='hidden md:flex items-center gap-3'>
        <motion.li whileHover={{ y: -2 }}>
          <NavLink
            to='/'
            className={({ isActive }) => isActive ? activeStyle : undefined}
          >
            Home
          </NavLink>
        </motion.li>
        <motion.li whileHover={{ y: -2 }}>
          <NavLink
            to='/products'
            className={({ isActive }) => isActive ? activeStyle : undefined}
          >
            Products
          </NavLink>
        </motion.li>
        {user && (
          <>
            <motion.li whileHover={{ y: -2 }}>
              <NavLink
                to='/my-orders'
                className={({ isActive }) => isActive ? activeStyle : undefined}
              >
                My Orders
              </NavLink>
            </motion.li>
            <motion.li whileHover={{ y: -2 }}>
              <NavLink
                to='/my-account'
                className={({ isActive }) => isActive ? activeStyle : undefined}
              >
                My Account
              </NavLink>
            </motion.li>
          </>
        )}
      </ul>

      {/* Menú móvil */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden"
          >
            <ul className='flex flex-col py-4 px-8 gap-4'>
              {['/', '/products'].map((path) => (
                <motion.li 
                  key={path} 
                  whileHover={{ x: 5 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <NavLink
                    to={path}
                    className={({ isActive }) => isActive ? activeStyle : undefined}
                  >
                    {path === '/' ? 'Home' : 'Products'}
                  </NavLink>
                </motion.li>
              ))}
              
              {user && (
                <>
                  {['/my-orders', '/my-account'].map((path) => (
                    <motion.li 
                      key={path} 
                      whileHover={{ x: 5 }}
                      onClick={() => setIsMenuOpen(false)}
                    >
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
                </>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Carrito y botón de inicio/cierre de sesión */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm text-gray-400">{user.name}</span>
            <motion.div 
              whileHover={{ y: -2 }}
              onClick={logout}
              className="cursor-pointer text-primary hover:text-secondary font-bold"
            >
              Cerrar Sesión
            </motion.div>
          </>
        ) : (
          <motion.div whileHover={{ y: -2 }}>
            <NavLink
              to='/sign-in'
              className={({ isActive }) => isActive ? activeStyle : undefined}
            >
              Iniciar Sesión
            </NavLink>
          </motion.div>
        )}
        <motion.div 
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
        </motion.div>
      </div>
    </motion.nav>
  )
}

export default Navbar
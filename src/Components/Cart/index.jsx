// Importación de dependencias necesarias
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa'
import { useCart } from '../../Context/CartContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Cart() {
  // Hooks necesarios
  const navigate = useNavigate()
  // Obtener funciones y estado del contexto del carrito
  const { cart, isCartOpen, toggleCart, updateQuantity, removeFromCart, cartTotal } = useCart()
  // Estado local para mensaje de login
  const [showLoginMessage, setShowLoginMessage] = useState(false)

  // Manejador para el proceso de checkout
  const handleCheckout = () => {
    const user = localStorage.getItem('user')
    // Verificar si el usuario está autenticado
    if (!user) {
      setShowLoginMessage(true)
      setTimeout(() => setShowLoginMessage(false), 3000)
      return
    }
    toggleCart()
    navigate('/checkout')
  }

  return (
    // AnimatePresence permite animar la salida de componentes
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay oscuro con efecto blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 z-40 bg-black backdrop-blur-sm"
          />
          {/* Panel lateral del carrito */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed top-0 right-0 z-50 w-full h-full max-w-md p-6 bg-white shadow-lg"
          >
            <div className="flex flex-col h-full">
              {/* Cabecera del carrito */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Carrito</h2>
                <button
                  onClick={toggleCart}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  ✕
                </button>
              </div>

              {/* Mensaje de login si es necesario */}
              {showLoginMessage && (
                <div className="p-4 mb-4 text-center text-white bg-red-500 rounded-lg">
                  Debes iniciar sesión para realizar la compra
                </div>
              )}

              {/* Lista de productos en el carrito */}
              {cart.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-gray-500">Tu carrito está vacío</p>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto">
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex gap-4 p-4 border-b"
                      >
                        {/* Imagen del producto */}
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-20 h-20 object-contain rounded-lg"
                        />
                        
                        {/* Detalles del producto */}
                        <div className="flex-1">
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-primary font-bold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          
                          {/* Controles de cantidad */}
                          <div className="flex items-center gap-2 mt-2">
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 rounded-full hover:bg-gray-100"
                            >
                              <FaMinus className="w-4 h-4" />
                            </motion.button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 rounded-full hover:bg-gray-100"
                            >
                              <FaPlus className="w-4 h-4" />
                            </motion.button>
                            
                            {/* Botón eliminar */}
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={() => removeFromCart(item.id)}
                              className="p-1 text-red-500 rounded-full hover:bg-red-50 ml-auto"
                            >
                              <FaTrash className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pie del carrito con total y botón de checkout */}
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg">Total:</span>
                      <span className="text-2xl font-bold text-primary">
                        ${cartTotal.toFixed(2)}
                      </span>
                    </div>
                    
                    {/* Botón de checkout */}
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCheckout}
                      className="w-full py-3 text-white transition-colors bg-primary hover:bg-secondary rounded-xl"
                    >
                      Finalizar Compra
                    </motion.button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Cart
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../../Context/CartContext'
import { useAuth } from '../../Context/AuthContext'
import Layout from '../../Components/Layout'

function Checkout() {
  const navigate = useNavigate()
  const { cart, cartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const [showSuccess, setShowSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Crear el objeto de orden con ID único
    const order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      products: cart,
      total: cartTotal,
      shipping: formData,
      status: 'Completado',
      user: user.email
    }

    // Obtener órdenes existentes
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    
    // Guardar la nueva orden
    localStorage.setItem('orders', JSON.stringify([...existingOrders, order]))
    
    // Mostrar mensaje de éxito
    setShowSuccess(true)

    // Esperar 2 segundos y luego:
    setTimeout(() => {
      // Limpiar carrito
      clearCart()
      // Redirigir a mis órdenes
      navigate('/my-orders')
    }, 2000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-xl shadow-lg relative"
          >
            {/* Mensaje de éxito */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50 rounded-xl"
                >
                  <div className="text-center p-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center"
                    >
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      ¡Compra realizada con éxito!
                    </h3>
                    <p className="text-gray-600">
                      Redirigiendo a tus pedidos...
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <h2 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h2>
            
            {/* Resumen del pedido */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Resumen del Pedido</h3>
              {cart.map(item => (
                <div key={item.id} className="flex justify-between mb-2">
                  <span>{item.title} (x{item.quantity})</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Formulario de checkout */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Datos de envío */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Datos de Envío</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Dirección
                      </label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Ciudad
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Datos de pago */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Datos de Pago</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Número de tarjeta
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        required
                        maxLength="16"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Fecha de expiración
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          required
                          placeholder="MM/YY"
                          maxLength="5"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          required
                          maxLength="3"
                          value={formData.cvv}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón de finalizar compra */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 text-white transition-colors bg-primary hover:bg-secondary rounded-xl mt-8"
              >
                Finalizar Compra
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}

export default Checkout 
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from '../../Components/Layout'
import { useAuth } from '../../Context/AuthContext'

function MyOrders() {
  // Obtener datos del usuario del contexto de autenticación
  const { user } = useAuth()
  
  // Estado para las órdenes con inicialización desde localStorage
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders')
    return savedOrders ? JSON.parse(savedOrders) : []
  })

  // Función para formatear fechas en español
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Layout>
      {/* Contenedor principal con fondo y padding */}
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Tarjeta principal con animación de entrada */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Mis Pedidos</h2>

            {/* Renderizado condicional basado en existencia de órdenes */}
            {orders.length === 0 ? (
              // Mensaje cuando no hay órdenes
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No tienes pedidos todavía</p>
                <Link
                  to="/products"
                  className="text-primary hover:text-secondary"
                >
                  Ir a comprar
                </Link>
              </div>
            ) : (
              // Lista de órdenes
              <div className="space-y-6">
                {orders.map((order) => (
                  // Tarjeta individual de orden con animación
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    {/* Cabecera de la orden */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          Pedido #{order.id}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDate(order.date)}
                        </p>
                      </div>
                      {/* Estado de la orden */}
                      <span className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary">
                        {order.status}
                      </span>
                    </div>

                    {/* Lista de productos en la orden */}
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4"
                        >
                          {/* Imagen del producto */}
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          {/* Detalles del producto */}
                          <div className="flex-grow">
                            <h3 className="font-medium">{item.title}</h3>
                            <p className="text-sm text-gray-500">
                              Cantidad: {item.quantity}
                            </p>
                          </div>
                          {/* Precio total del item */}
                          <p className="font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Pie de la orden con total */}
                    <div className="mt-6 pt-6 border-t">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total</span>
                        <span className="text-xl font-bold text-primary">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}

export default MyOrders
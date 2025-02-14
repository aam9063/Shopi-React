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
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Layout>
      {/* Contenedor principal con fondo y padding */}
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
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
                <p className="text-gray-500">No tienes pedidos realizados</p>
                <Link
                  to="/products"
                  className="mt-4 inline-block text-primary hover:text-secondary"
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
                        <h3 className="text-lg font-semibold">
                          Pedido #{order.id}
                        </h3>
                        <p className="text-gray-500">
                          {formatDate(order.date)}
                        </p>
                      </div>
                      {/* Estado de la orden */}
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {order.status}
                      </span>
                    </div>

                    {/* Lista de productos en la orden */}
                    <div className="space-y-2">
                      {order.products.map((product) => (
                        <div 
                          key={`${order.id}-${product.id}`}
                          className="flex justify-between items-center"
                        >
                          <div className="flex items-center gap-4">
                            <img 
                              src={product.image} 
                              alt={product.title}
                              className="w-12 h-12 object-contain rounded"
                            />
                            <div>
                              <p className="font-medium">{product.title}</p>
                              <p className="text-sm text-gray-500">
                                Cantidad: {product.quantity}
                              </p>
                            </div>
                          </div>
                          {/* Precio total del item */}
                          <p className="font-medium">
                            ${(product.price * product.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Pie de la orden con total */}
                    <div className="mt-4 pt-4 border-t flex justify-between items-center">
                      <div>
                        <p className="text-gray-500">Enviado a:</p>
                        <p className="font-medium">{order.shipping.fullName}</p>
                        <p className="text-sm text-gray-500">
                          {order.shipping.address}, {order.shipping.city}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-500">Total:</p>
                        <p className="text-2xl font-bold text-primary">
                          ${order.total.toFixed(2)}
                        </p>
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
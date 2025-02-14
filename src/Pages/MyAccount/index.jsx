import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../Context/AuthContext'
import Layout from '../../Components/Layout'

function MyAccount() {
  // Obtener datos y funciones del contexto de autenticación
  const { user, login } = useAuth()
  // Estado para controlar modo de edición
  const [isEditing, setIsEditing] = useState(false)
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    name: user?.name || '',         // Nombre del usuario
    email: user?.email || '',       // Email del usuario
    address: user?.address || '',   // Dirección del usuario
    phone: user?.phone || ''        // Teléfono del usuario
  })

  // Manejador del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault()
    login({ ...user, ...formData }) // Actualiza los datos del usuario
    setIsEditing(false)            // Desactiva modo edición
  }

  return (
    <Layout>
      {/* Contenedor principal con fondo y padding */}
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Tarjeta principal con animación de entrada */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            {/* Cabecera con título y botón de edición */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Mi Cuenta</h2>
              {/* Botón para alternar modo edición */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 text-white bg-primary hover:bg-secondary rounded-xl"
              >
                {isEditing ? 'Cancelar' : 'Editar'}
              </motion.button>
            </div>

            {/* Formulario de datos de usuario */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campo de Nombre */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{formData.name}</p>
                )}
              </div>

              {/* Campo de Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{formData.email}</p>
                )}
              </div>

              {/* Campo de Dirección */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Dirección
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{formData.address || 'No especificada'}</p>
                )}
              </div>

              {/* Campo de Teléfono */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Teléfono
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{formData.phone || 'No especificado'}</p>
                )}
              </div>

              {/* Botón de guardar (solo visible en modo edición) */}
              {isEditing && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 text-white bg-primary hover:bg-secondary rounded-xl"
                >
                  Guardar Cambios
                </motion.button>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}

export default MyAccount
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Mi Cuenta</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 text-white bg-primary hover:bg-secondary rounded-xl"
              >
                {isEditing ? 'Cancelar' : 'Editar'}
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nombre
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                ) : (
                  <p className="mt-1 text-gray-900 dark:text-white">{formData.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                ) : (
                  <p className="mt-1 text-gray-900 dark:text-white">{formData.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Dirección
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                ) : (
                  <p className="mt-1 text-gray-900 dark:text-white">{formData.address || 'No especificada'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Teléfono
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                ) : (
                  <p className="mt-1 text-gray-900 dark:text-white">{formData.phone || 'No especificado'}</p>
                )}
              </div>

              {isEditing && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 text-white transition-colors bg-primary hover:bg-secondary rounded-xl"
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
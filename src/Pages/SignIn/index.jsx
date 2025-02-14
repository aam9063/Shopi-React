import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../Context/AuthContext'
import Layout from '../../Components/Layout'

function SignIn() {
  // Hook para navegación programática
  const navigate = useNavigate()
  // Obtener función login del contexto de autenticación
  const { login } = useAuth()
  
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  // Estado para mensajes de error
  const [error, setError] = useState('')

  // Manejador del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    // Simulación de autenticación básica
    if (formData.email && formData.password) {
      // Simula login exitoso con datos básicos
      login({
        email: formData.email,
        name: formData.email.split('@')[0]  // Usa parte del email como nombre
      })
      navigate('/my-account')  // Redirige a la cuenta del usuario
    } else {
      setError('Por favor, completa todos los campos')
    }
  }

  // Manejador de cambios en los inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Layout>
      {/* Contenedor principal con fondo y padding */}
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Tarjeta del formulario con animación de entrada */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            {/* Cabecera del formulario */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Iniciar Sesión
              </h2>
              <p className="mt-2 text-gray-600">
                Bienvenido de nuevo a Shopi
              </p>
            </div>

            {/* Mensaje de error condicional */}
            {error && (
              <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-lg">
                {error}
              </div>
            )}

            {/* Formulario de inicio de sesión */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campo de email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>

              {/* Campo de contraseña */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>

              {/* Botón de submit con animaciones */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Iniciar Sesión
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}

export default SignIn
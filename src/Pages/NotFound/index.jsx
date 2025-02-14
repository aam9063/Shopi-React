import { motion } from 'framer-motion'          // Para animaciones
import { Link } from 'react-router-dom'         // Para navegación
import { FaHome, FaSearch } from 'react-icons/fa'  // Iconos

function NotFound() {
  return (
    // Contenedor principal centrado y con altura mínima de pantalla
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      {/* Contenedor del contenido con animación de entrada */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}   // Estado inicial
        animate={{ opacity: 1, scale: 1 }}      // Estado final
        transition={{ duration: 0.5 }}          // Duración de la animación
        className="text-center max-w-lg"
      >
        {/* Número 404 con animación de caída */}
        <motion.h1 
          initial={{ y: -50 }}                  // Comienza 50px arriba
          animate={{ y: 0 }}                    // Termina en su posición
          transition={{ 
            delay: 0.2,                         // Espera 0.2s antes de empezar
            type: "spring",                     // Animación tipo resorte
            stiffness: 200                      // Rigidez del resorte
          }}
          className="text-9xl font-extrabold text-primary mb-4"
        >
          404
        </motion.h1>

        {/* Icono de búsqueda con animación de rotación */}
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 10, 0],       // Secuencia de rotación
            scale: [1, 1.1, 1]                 // Secuencia de escala
          }}
          transition={{ 
            duration: 1,
            delay: 0.5,
            times: [0, 0.2, 0.4, 0.6, 0.8]    // Tiempos de la secuencia
          }}
          className="mb-8"
        >
          <FaSearch className="mx-auto text-6xl text-gray-400" />
        </motion.div>

        {/* Mensajes de error */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          ¡Ups! Página no encontrada
        </h2>
        <p className="text-gray-600 mb-8">
          Parece que te has perdido en el espacio. La página que buscas no existe o ha sido movida a otra galaxia.
        </p>

        {/* Botón de retorno al inicio con animaciones */}
        <motion.div
          whileHover={{ scale: 1.05 }}         // Escala al hover
          whileTap={{ scale: 0.95 }}           // Escala al click
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3 text-white bg-primary hover:bg-secondary rounded-xl transition-colors duration-300"
          >
            <FaHome className="text-xl" />
            <span>Volver al inicio</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFound
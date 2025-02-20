// Importación de dependencias necesarias
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../../Context/CartContext'
import { PlusIcon, MinusIcon, ArrowLeftIcon, ShoppingCartIcon } from '@heroicons/react/24/solid'
import Layout from '../../Components/Layout'

function ProductDetailPage() {
  // Obtener el ID del producto de la URL
  const { id } = useParams()
  const navigate = useNavigate()
  // Obtener función para añadir al carrito del contexto
  const { addToCart } = useCart()

  // Estados para manejar el producto y la UI
  const [product, setProduct] = useState(null)      // Datos del producto
  const [quantity, setQuantity] = useState(1)       // Cantidad seleccionada
  const [loading, setLoading] = useState(true)      // Estado de carga
  const [error, setError] = useState(null)          // Estado de error

  // Efecto para cargar los datos del producto
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(response => {
        if (!response.ok) throw new Error('Producto no encontrado')
        return response.json()
      })
      .then(data => {
        setProduct(data)
        setLoading(false)
      })
      .catch(error => {
        setError(error.message)
        setLoading(false)
      })
  }, [id])

  // Manejador para cambiar la cantidad
  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, quantity + value)  // No permite cantidades menores a 1
    setQuantity(newQuantity)
  }

  // Manejador para añadir al carrito
  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: quantity
    })
  }

  // Renderizado durante la carga
  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  // Renderizado en caso de error
  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center text-red-500">
              Error: {error}
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  // Renderizado principal del producto
  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Botón para volver atrás */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="absolute top-24 left-8 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </motion.button>

            {/* Contenedor principal del producto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col md:flex-row gap-8"
            >
              {/* Imagen del producto */}
              <div className="flex-1">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-[400px] object-contain bg-white dark:bg-gray-700 p-4 rounded-lg"
                />
              </div>

              {/* Detalles del producto */}
              <div className="flex-1 flex flex-col">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {product.title}
                  </h1>
                  <span className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                    {product.category}
                  </span>
                  <p className="mt-6 text-gray-600 dark:text-gray-300">
                    {product.description}
                  </p>
                  <p className="mt-6 text-3xl font-bold text-primary dark:text-secondary">
                    ${product.price}
                  </p>
                </div>

                {/* Controles de cantidad y botón de añadir al carrito */}
                <div className="space-y-6 pt-6 border-t dark:border-gray-700 mt-auto">
                  <div className="flex items-center justify-center gap-8">
                    {/* Botón de disminuir cantidad */}
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleQuantityChange(-1)}
                      className="p-3 border-2 border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <MinusIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    </motion.button>
                    {/* Mostrar cantidad */}
                    <span className="text-3xl font-bold text-gray-900 dark:text-white w-12 text-center">
                      {quantity}
                    </span>
                    {/* Botón de aumentar cantidad */}
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleQuantityChange(1)}
                      className="p-3 border-2 border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <PlusIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    </motion.button>
                  </div>

                  {/* Botón de añadir al carrito */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-primary hover:bg-secondary mb-4"
                  >
                    <ShoppingCartIcon className="w-6 h-6" />
                    Add to Cart - ${(product.price * quantity).toFixed(2)}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProductDetailPage
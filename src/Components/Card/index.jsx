import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCartContext } from '../../Context'
import { PlusIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import { useCart } from '../../Context/CartContext'

function Card({ data: product, index }) {
  // Obtener contexto del carrito de compras (legacy)
  const context = useContext(ShoppingCartContext)
  // Obtener función para añadir al carrito del nuevo contexto
  const { addToCart } = useCart()

  // Función legacy para añadir productos al carrito
  const addProductsToCart = (event, productData) => {
    event.stopPropagation()
    context.setCount(context.count + 1)
    context.setCartProducts([...context.cartProducts, productData])
  }

  // Nueva función para manejar la adición al carrito
  const handleAddToCart = (e) => {
    e.stopPropagation()  // Previene la navegación al hacer clic en el botón
    addToCart({
      ...product,
      quantity: 1  // Añade cantidad inicial de 1
    })
  }

  return (
    // Contenedor principal con animaciones de entrada
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}  // Efecto cascada basado en el índice
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow h-[400px] flex flex-col"
    >
      {/* Enlace a la página de detalle del producto */}
      <Link to={`/product/${product.id}`} className="block h-[200px]">
        <figure className="relative w-full h-full">
          {/* Etiqueta de categoría flotante */}
          <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5">
            {product.category.name}
          </span>
          {/* Imagen del producto */}
          <img
            className="w-full h-full object-contain rounded-lg p-4"
            src={product.images}
            alt={product.title}
          />
        </figure>
      </Link>

      {/* Contenedor de información del producto */}
      <div className="flex flex-col flex-1 p-4">
        <div className="flex flex-col flex-1">
          {/* Título del producto con límite de 2 líneas */}
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">
            {product.title}
          </h3>
          {/* Etiqueta de categoría con estilo personalizado */}
          <span className="px-2 py-1 text-sm rounded-lg bg-primary/10 text-primary self-start">
            {product.category.name}
          </span>
        </div>

        {/* Pie de la tarjeta con precio y botón */}
        <div className="flex items-center justify-between mt-4">
          {/* Precio del producto */}
          <span className="text-2xl font-bold text-primary">
            ${product.price}
          </span>
          
          {/* Botón de añadir al carrito con animaciones */}
          <motion.button
            whileHover={{ scale: 1.1 }}    // Escala al pasar el mouse
            whileTap={{ scale: 0.95 }}     // Escala al hacer clic
            onClick={handleAddToCart}
            className="flex items-center gap-2 p-2 text-white transition-colors duration-300 rounded-xl bg-primary hover:bg-secondary"
          >
            <PlusIcon className="h-6 w-6" />
            {/* Texto "Añadir" visible solo en pantallas medianas y grandes */}
            <span className="hidden sm:inline">Añadir</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default Card
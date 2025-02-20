import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useCart } from '../../Context/CartContext'

function Card({ data: product, index }) {
  const navigate = useNavigate()
  const { addToCart, toggleCart } = useCart()

  const handleNavigate = () => {
    navigate(`/product/${product.id}`)
  }

  const handleAddToCart = (event) => {
    event.stopPropagation()
    
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images || product.image,
      category: typeof product.category === 'string' ? product.category : product.category.name,
      description: product.description,
      quantity: 1
    })
    
    toggleCart()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
    >
      <div 
        onClick={handleNavigate}
        className="relative cursor-pointer"
      >
        <img
          src={product.images || product.image}
          alt={product.title}
          className="w-full h-48 object-contain bg-white dark:bg-gray-700 p-4"
        />
      </div>

      <div className="flex flex-col flex-1 p-4">
        <div className="flex flex-col flex-1">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-2 mb-2">
            {product.title}
          </h3>
          <span className="px-2 py-1 text-sm rounded-lg bg-primary/10 text-primary dark:bg-primary/20 self-start">
            {typeof product.category === 'string' ? product.category : product.category.name}
          </span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-primary dark:text-secondary">
            ${product.price}
          </span>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="flex items-center gap-2 p-2 text-white transition-colors duration-300 rounded-xl bg-primary hover:bg-secondary"
          >
            <PlusIcon className="h-6 w-6" />
            <span className="hidden sm:inline">Add to Cart</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default Card
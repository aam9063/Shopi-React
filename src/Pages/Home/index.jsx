// Importación de dependencias necesarias
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '../../Components/Layout'
import Hero from '../../Components/Hero'
import Card from '../../Components/Card'

function Home() {
  // Estados para manejar los productos y errores
  const [items, setItems] = useState(null)                    // Productos normales
  const [featuredProducts, setFeaturedProducts] = useState([]) // Productos destacados
  const [error, setError] = useState(null)                    // Estado de error

  // Efecto para cargar los productos de la API
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok')
        return response.json()
      })
      .then(data => {
        // Mezcla aleatoria de productos y división en destacados y normales
        const shuffled = [...data].sort(() => 0.5 - Math.random())
        setFeaturedProducts(shuffled.slice(0, 3))  // Primeros 3 para destacados
        setItems(shuffled.slice(3, 9))             // Siguientes 6 para la grid
      })
      .catch(error => {
        console.error('Error fetching data:', error)
        setError(error.message)
      })
  }, [])

  // Renderizado de error si existe
  if (error) return <div>Error: {error}</div>

  return (
    <Layout>
      {/* Sección Hero con productos destacados */}
      <Hero featuredProducts={featuredProducts} />
      
      {/* Sección de productos principales */}
      <section className="container px-4 py-16 mx-auto">
        {/* Título con animación de entrada */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-3xl font-bold text-center"
        >
          Productos Destacados
        </motion.h2>
        
        {/* Grid de productos */}
        <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-[1400px]'>
          {items?.map((item, index) => (
            <Card 
              key={item.id} 
              data={{
                ...item,
                images: item.image || '',
                category: {
                  name: item.category
                }
              }}
              index={index}
            />
          ))}
        </div>
      </section>
    </Layout>
  )
}

export default Home
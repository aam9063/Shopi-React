import { useState, useEffect, useMemo } from 'react'
import Layout from '../../Components/Layout'
import Card from '../../Components/Card'
import ProductFilters from '../../Components/ProductFilters'
import { motion } from 'framer-motion'

function Products() {
  // Estados para manejar los productos y la interfaz
  const [items, setItems] = useState(null)          // Almacena todos los productos
  const [error, setError] = useState(null)          // Maneja errores de la API
  const [currentPage, setCurrentPage] = useState(1)  // Página actual para paginación
  const [filters, setFilters] = useState({
    category: '',      // Filtro por categoría
    maxPrice: 1000,    // Precio máximo para filtrar
    sort: 'default'    // Orden de los productos
  })
  
  // Número de productos por página
  const productsPerPage = 8

  // Efecto para cargar los productos de la API
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok')
        return response.json()
      })
      .then(data => setItems(data))
      .catch(error => {
        console.error('Error fetching data:', error)
        setError(error.message)
      })
  }, [])

  // Filtrar y ordenar productos usando useMemo para optimizar rendimiento
  const filteredProducts = useMemo(() => {
    if (!items) return []
    
    return items
      .filter(item => {
        const matchesCategory = !filters.category || item.category === filters.category
        const matchesPrice = item.price <= filters.maxPrice
        return matchesCategory && matchesPrice
      })
      .sort((a, b) => {
        switch (filters.sort) {
          case 'price-asc':
            return a.price - b.price
          case 'price-desc':
            return b.price - a.price
          case 'name-asc':
            return a.title.localeCompare(b.title)
          case 'name-desc':
            return b.title.localeCompare(a.title)
          default:
            return 0
        }
      })
  }, [items, filters])

  // Cálculos para la paginación
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  // Función para cambiar de página
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Renderizado condicional si hay error
  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </Layout>
    )
  }

  // Renderizado principal del componente
  return (
    <Layout>
      <div className="flex flex-col min-h-screen pb-24"> {/* Contenedor principal con padding bottom */}
        {/* Componente de filtros */}
        <ProductFilters
          filters={filters}
          setFilters={setFilters}
          categories={[...new Set(items?.map(item => item.category) || [])]}
          priceRange={{
            min: 0,
            max: Math.ceil(Math.max(...(items?.map(item => item.price) || [0])))
          }}
          sortOptions={[
            { value: 'default', label: 'Por defecto' },
            { value: 'price-asc', label: 'Precio: Menor a Mayor' },
            { value: 'price-desc', label: 'Precio: Mayor a Menor' },
            { value: 'name-asc', label: 'Nombre: A-Z' },
            { value: 'name-desc', label: 'Nombre: Z-A' }
          ]}
        />

        {/* Grid de productos */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4">
          {currentProducts.map((item) => (
            <Card 
              key={item.id}
              data={{
                ...item,
                images: item.image,
                category: {
                  name: item.category
                }
              }}
            />
          ))}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8 mb-12">
            {/* Botón Anterior */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => currentPage > 1 && paginate(currentPage - 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1 
                  ? 'bg-gray-200 cursor-not-allowed' 
                  : 'bg-primary text-white hover:bg-secondary'
              }`}
              disabled={currentPage === 1}
            >
              Anterior
            </motion.button>
            
            {/* Números de página */}
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <motion.button
                  key={index + 1}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => paginate(index + 1)}
                  className={`w-10 h-10 rounded-lg ${
                    currentPage === index + 1
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {index + 1}
                </motion.button>
              ))}
            </div>

            {/* Botón Siguiente */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages 
                  ? 'bg-gray-200 cursor-not-allowed' 
                  : 'bg-primary text-white hover:bg-secondary'
              }`}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </motion.button>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Products
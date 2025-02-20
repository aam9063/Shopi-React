import { Swiper, SwiperSlide } from 'swiper/react'          
import { Autoplay, Pagination, Navigation } from 'swiper/modules'  
import { motion } from 'framer-motion'                      
import { Link } from 'react-router-dom'                    

// Importación de estilos de Swiper
import 'swiper/css'                // Estilos base
import 'swiper/css/pagination'     // Estilos para paginación
import 'swiper/css/navigation'     // Estilos para navegación
import 'swiper/css/effect-fade'    // Estilos para efecto fade

function Hero({ featuredProducts }) {
  // Si no hay productos destacados, no renderizar nada
  if (!featuredProducts?.length) return null

  return (
    // Contenedor principal del hero con altura y fondo definidos
    <div className="h-[80vh] w-full bg-gray-50 dark:bg-gray-800">
      {/* Configuración del carrusel Swiper */}
      <Swiper
        spaceBetween={0}           // Sin espacio entre slides
        centeredSlides={true}      // Slides centrados
        effect="fade"              // Efecto de transición fade
        autoplay={{                // Configuración del autoplay
          delay: 5000,             // 5 segundos entre slides
          disableOnInteraction: false,  // No detener en interacción
        }}
        pagination={{              // Configuración de paginación
          clickable: true,         // Bullets clickeables
          dynamicBullets: true,    // Bullets dinámicos
        }}
        navigation={true}          // Habilitar navegación
        modules={[Autoplay, Pagination, Navigation]}  // Módulos activos
        className="w-full h-full"
      >
        {/* Mapeo de productos destacados */}
        {featuredProducts.map((product) => (
          <SwiperSlide key={product.id} className="w-full">
            {/* Contenedor de slide individual */}
            <div className="relative flex items-center justify-center w-full h-full px-4 md:px-8">
              {/* Contenedor del contenido con layout responsive */}
              <div className="container relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Sección de texto con animación */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}     // Estado inicial
                  animate={{ opacity: 1, x: 0 }}       // Estado final
                  transition={{ duration: 0.5 }}       // Duración de la animación
                  className="max-w-xl"
                >
                  {/* Título del producto */}
                  <h2 className="mb-4 text-3xl font-bold text-gray-800 dark:text-white md:text-5xl lg:text-6xl">
                    {product.title}
                  </h2>
                  {/* Descripción del producto limitada a 3 líneas */}
                  <p className="mb-8 text-lg text-gray-600 dark:text-gray-300 line-clamp-3">
                    {product.description}
                  </p>
                  {/* Contenedor de CTA y precio */}
                  <div className="flex items-center gap-4">
                    {/* Botón de acción principal */}
                    <Link
                      to={`/product/${product.id}`}
                      className="px-8 py-3 text-white transition-colors bg-primary hover:bg-secondary rounded-xl"
                    >
                      View Product
                    </Link>
                    {/* Precio del producto */}
                    <span className="text-3xl font-bold text-gray-800 dark:text-white">
                      ${product.price}
                    </span>
                  </div>
                </motion.div>

                {/* Contenedor de imagen con animación */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}   // Estado inicial
                  animate={{ opacity: 1, scale: 1 }}     // Estado final
                  transition={{ duration: 0.5 }}         // Duración de la animación
                  className="w-full md:w-1/2 h-[40vh] md:h-[60vh]"
                >
                  {/* Imagen del producto */}
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="object-contain w-full h-full"
                  />
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Hero 
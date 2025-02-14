import { useContext } from 'react'                    // Hook para usar contextos
import { ShoppingCartContext } from '../../Context'   // Contexto del carrito
import Navbar from '../Navbar'                        // Barra de navegación
import Footer from '../Footer'                        // Pie de página
import Cart from '../Cart'                            // Componente del carrito

// Componente Layout que actúa como estructura base para todas las páginas
function Layout({ children }) {
  // Obtener el contexto del carrito de compras
  const context = useContext(ShoppingCartContext)

  return (
    // Contenedor principal con flex column y altura mínima de pantalla completa
    <div className="flex flex-col min-h-screen">
      {/* Barra de navegación fija en la parte superior */}
      <Navbar />

      {/* 
        Contenedor principal del contenido
        flex-1: toma el espacio restante
        pt-[68px]: padding top para compensar la navbar fija
      */}
      <div className="flex-1 pt-[68px]">
        {/* Renderiza el contenido hijo pasado como prop */}
        {children}
      </div>

      {/* 
        Componente del carrito que se muestra/oculta 
        según el estado del contexto 
      */}
      <Cart />

      {/* Pie de página siempre visible al final */}
      <Footer />
    </div>
  )
}

export default Layout
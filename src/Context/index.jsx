import { createContext, useState } from 'react'

// Creación del contexto del carrito de compras
export const ShoppingCartContext = createContext()

// Componente proveedor del carrito de compras
export const ShoppingCartProvider = ({children}) => {
  // Estado para la cantidad de items en el carrito
  const [count, setCount] = useState(0)

  // Estados y funciones para el detalle del producto
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
  // Función para abrir el detalle
  const openProductDetail = () => setIsProductDetailOpen(true)
  // Función para cerrar el detalle
  const closeProductDetail = () => setIsProductDetailOpen(false)

  // Estado para almacenar el producto a mostrar en detalle
  const [productToShow, setProductToShow] = useState({})

  // Estado para los productos en el carrito
  const [cartProducts, setCartProducts] = useState([])

  // Proveedor del contexto que expone todos los estados y funciones
  return (
    <ShoppingCartContext.Provider value={{
      count,               // Cantidad de items
      setCount,            // Función para actualizar cantidad
      openProductDetail,   // Función para abrir detalle
      closeProductDetail,  // Función para cerrar detalle
      isProductDetailOpen, // Estado de visibilidad del detalle
      productToShow,       // Producto en detalle
      setProductToShow,    // Función para establecer producto en detalle
      cartProducts,        // Array de productos en carrito
      setCartProducts      // Función para actualizar productos en carrito
    }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}
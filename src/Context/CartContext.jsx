import { createContext, useContext, useState, useEffect } from 'react'

// Creación del contexto del carrito
const CartContext = createContext()

// Componente proveedor del carrito
export function CartProvider({ children }) {
  // Estado para controlar la visibilidad del carrito
  const [isCartOpen, setIsCartOpen] = useState(false)
  
  // Estado del carrito con inicialización desde localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  })

  // Efecto para persistir el carrito en localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // Calcula el total del carrito sumando precio * cantidad de cada item
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  // Función para mostrar/ocultar el carrito
  const toggleCart = () => setIsCartOpen(!isCartOpen)

  // Función para añadir productos al carrito
  const addToCart = (product) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id)
      if (existingItem) {
        return currentCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        )
      }
      return [...currentCart, product]
    })
  }

  // Función para actualizar la cantidad de un producto
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId)
      return
    }
    setCart(currentCart =>
      currentCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId) => {
    setCart(currentCart => currentCart.filter(item => item.id !== productId))
  }

  // Nueva función para limpiar el carrito
  const clearCart = () => {
    setCart([])
    setIsCartOpen(false)
  }

  // Proveedor del contexto que expone el estado y las funciones
  return (
    <CartContext.Provider value={{
      cart,           // Estado del carrito
      isCartOpen,     // Estado de visibilidad
      toggleCart,     // Función para mostrar/ocultar
      addToCart,      // Función para añadir productos
      updateQuantity, // Función para actualizar cantidades
      removeFromCart, // Función para eliminar productos
      cartTotal,      // Total calculado del carrito
      clearCart       // Nueva función para limpiar el carrito
    }}>
      {children}
    </CartContext.Provider>
  )
}

// Hook personalizado para usar el contexto del carrito
export const useCart = () => useContext(CartContext) 
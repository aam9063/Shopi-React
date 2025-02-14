import { createContext, useContext, useState, useEffect } from 'react'

// Creación del contexto de autenticación
const AuthContext = createContext()

// Componente proveedor de autenticación
export function AuthProvider({ children }) {
  // Estado para el usuario con inicialización desde localStorage
  const [user, setUser] = useState(() => {
    // Intenta recuperar el usuario guardado en localStorage
    const savedUser = localStorage.getItem('user')
    // Si existe, lo parsea; si no, retorna null
    return savedUser ? JSON.parse(savedUser) : null
  })

  // Efecto para sincronizar el estado del usuario con localStorage
  useEffect(() => {
    if (user) {
      // Si hay usuario, lo guarda en localStorage
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      // Si no hay usuario, elimina la entrada de localStorage
      localStorage.removeItem('user')
    }
  }, [user]) // Se ejecuta cuando cambia el usuario

  // Función para iniciar sesión
  const login = (userData) => {
    setUser(userData)
  }

  // Función para cerrar sesión
  const logout = () => {
    setUser(null)
  }

  // Provider del contexto que expone el estado y las funciones
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext) 
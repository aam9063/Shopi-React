# Documentación del Proyecto Shopi


## Índice

1. [Descripción General](#descripción-general)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Componentes Principales](#componentes-principales)
4. [Contextos](#contextos)
5. [Páginas](#páginas)
6. [Estilos](#estilos)


## Descripción General

Shopi es una aplicación de comercio electrónico desarrollada en React que permite a los usuarios navegar productos, gestionar un carrito de compras y realizar pedidos.


### Tecnologías Principales

- React
- React Router
- Framer Motion
- Tailwind CSS
- Context API


## Estructura del Proyecto

```
src/
├── Components/
│   ├── Card/
│   ├── Cart/
│   ├── Footer/
│   ├── Hero/
│   ├── Layout/
│   └── Navbar/
├── Context/
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
│   └── index.jsx
├── Pages/
│   ├── App/
│   ├── Home/
│   ├── MyAccount/
│   ├── MyOrder/
│   ├── MyOrders/
│   ├── NotFound/
│   ├── ProductDetailPage/
│   ├── Products/
│   └── SignIn/
```


## Componentes Principales

### Layout

```8:38:src/Components/Layout/index.jsx
function Layout({ children }) {
  // Obtener el contexto del carrito de compras
  const context = useContext(ShoppingCartContext)
      <div className="flex-1 pt-[68px]">
  return (
    // Contenedor principal con flex column y altura mínima de pantalla completa
    <div className="flex flex-col min-h-screen">
      {/* Barra de navegación fija en la parte superior */}
      <Navbar />
  )
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
```


### Navbar

```8:24:src/Components/Navbar/index.jsx
function Navbar() {
  // Hooks y estados necesarios
  const location = useLocation()
  const { toggleCart, cart } = useCart()
  const { user, logout } = useAuth()
  useEffect(() => {
  // Estilos para los enlaces activos
  const activeStyle = 'underline underline-offset-4'
  // Calcula el total de items en el carrito
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)
    return () => window.removeEventListener('scroll', handleScroll)
  return (
    // Barra de navegación con animación de entrada
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light bg-white shadow-md"
```


### Card

```8:29:src/Components/Card/index.jsx
function Card({ data: product, index }) {
  // Obtener contexto del carrito de compras (legacy)
  const context = useContext(ShoppingCartContext)
  // Obtener función para añadir al carrito del nuevo contexto
  const { addToCart } = useCart()
    context.setCartProducts([...context.cartProducts, productData])
  // Función legacy para añadir productos al carrito
  const addProductsToCart = (event, productData) => {
    event.stopPropagation()
    context.setCount(context.count + 1)
    context.setCartProducts([...context.cartProducts, productData])
  }
      transition={{ delay: index * 0.1 }}
  // Nueva función para manejar la adición al carrito
  const handleAddToCart = (e) => {
    e.stopPropagation()  // Previene la navegación al hacer clic en el botón
    addToCart({
      ...product,
      quantity: 1  // Añade cantidad inicial de 1
    })
  }
            className="w-full h-full object-contain rounded-lg p-4"
```


## Contextos

### AuthContext

```6:43:src/Context/AuthContext.jsx
// Componente proveedor de autenticación
export function AuthProvider({ children }) {
  // Estado para el usuario con inicialización desde localStorage
  const [user, setUser] = useState(() => {
    // Intenta recuperar el usuario guardado en localStorage
    const savedUser = localStorage.getItem('user')
    // Si existe, lo parsea; si no, retorna null
    return savedUser ? JSON.parse(savedUser) : null
  })
      localStorage.removeItem('user')
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
  )
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
```


### CartContext
Maneja el estado del carrito de compras y sus operaciones.


## Páginas

### SignIn

```7:124:src/Pages/SignIn/index.jsx
function SignIn() {
  // Hook para navegación programática
  const navigate = useNavigate()
  // Obtener función login del contexto de autenticación
  const { login } = useAuth()
    password: ''
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  // Estado para mensajes de error
  const [error, setError] = useState('')
    // Simulación de autenticación
  // Manejador del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
        name: formData.email.split('@')[0]
    // Simulación de autenticación básica
    if (formData.email && formData.password) {
      // Simula login exitoso con datos básicos
      login({
        email: formData.email,
        name: formData.email.split('@')[0]  // Usa parte del email como nombre
      })
      navigate('/my-account')  // Redirige a la cuenta del usuario
    } else {
      setError('Por favor, completa todos los campos')
    }
    })
  }
  // Manejador de cambios en los inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
            animate={{ opacity: 1, y: 0 }}
  return (
    <Layout>
      {/* Contenedor principal con fondo y padding */}
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Tarjeta del formulario con animación de entrada */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            {/* Cabecera del formulario */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Iniciar Sesión
              </h2>
              <p className="mt-2 text-gray-600">
                Bienvenido de nuevo a Shopi
              </p>
            </div>
                  Email
            {/* Mensaje de error condicional */}
            {error && (
              <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-lg">
                {error}
              </div>
            )}
                  value={formData.email}
            {/* Formulario de inicio de sesión */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campo de email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
                />
              {/* Campo de contraseña */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
  )
              {/* Botón de submit con animaciones */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Iniciar Sesión
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}
```

### ProductDetailPage

```9:84:src/Pages/ProductDetailPage/index.jsx
function ProductDetailPage() {
  // Obtener el ID del producto de la URL
  const { id } = useParams()
  const navigate = useNavigate()
  // Obtener función para añadir al carrito del contexto
  const { addToCart } = useCart()
  const [error, setError] = useState(null)
  // Estados para manejar el producto y la UI
  const [product, setProduct] = useState(null)      // Datos del producto
  const [quantity, setQuantity] = useState(1)       // Cantidad seleccionada
  const [loading, setLoading] = useState(true)      // Estado de carga
  const [error, setError] = useState(null)          // Estado de error
        return response.json()
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
  const handleAddToCart = () => {
  // Manejador para cambiar la cantidad
  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, quantity + value)  // No permite cantidades menores a 1
    setQuantity(newQuantity)
  }
  }
  // Manejador para añadir al carrito
  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: quantity
    })
    navigate('/products')  // Redirige a la página de productos
  }
            </div>
  // Renderizado durante la carga
  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
              onClick={() => navigate(-1)}
  // Renderizado en caso de error
  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center text-red-500">
              Error: {error}
            </div>
          </div>
        </div>
      </Layout>
    )
  }
          <motion.button
  // Renderizado principal del producto
```


### NotFound

```5:70:src/Pages/NotFound/index.jsx
function NotFound() {
  return (
    // Contenedor principal centrado y con altura mínima de pantalla
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      {/* Contenedor del contenido con animación de entrada */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}   // Estado inicial
        animate={{ opacity: 1, scale: 1 }}      // Estado final
        transition={{ duration: 0.5 }}          // Duración de la animación
        className="text-center max-w-lg"
      >
        {/* Número 404 con animación de caída */}
        <motion.h1 
          initial={{ y: -50 }}                  // Comienza 50px arriba
          animate={{ y: 0 }}                    // Termina en su posición
          transition={{ 
            delay: 0.2,                         // Espera 0.2s antes de empezar
            type: "spring",                     // Animación tipo resorte
            stiffness: 200                      // Rigidez del resorte
          }}
          className="text-9xl font-extrabold text-primary mb-4"
        >
          404
        </motion.h1>

        {/* Icono de búsqueda con animación de rotación */}
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 10, 0],       // Secuencia de rotación
            scale: [1, 1.1, 1]                 // Secuencia de escala
          }}
          transition={{ 
            duration: 1,
            delay: 0.5,
            times: [0, 0.2, 0.4, 0.6, 0.8]    // Tiempos de la secuencia
          }}
          className="mb-8"
        >
          <FaSearch className="mx-auto text-6xl text-gray-400" />
        </motion.div>

        {/* Mensajes de error */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          ¡Ups! Página no encontrada
        </h2>
        <p className="text-gray-600 mb-8">
          Parece que te has perdido en el espacio. La página que buscas no existe o ha sido movida a otra galaxia.
        </p>

        {/* Botón de retorno al inicio con animaciones */}
        <motion.div
          whileHover={{ scale: 1.05 }}         // Escala al hover
          whileTap={{ scale: 0.95 }}           // Escala al click
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3 text-white bg-primary hover:bg-secondary rounded-xl transition-colors duration-300"
          >
            <FaHome className="text-xl" />
            <span>Volver al inicio</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
```

## Estilos

### Configuración Global

```1:14:src/Pages/App/App.css
@tailwind base;        /* Estilos base de Tailwind */
@tailwind components;  /* Componentes de Tailwind */
@tailwind utilities;   /* Utilidades de Tailwind */


/* Variables CSS globales */
:root {
    --primary-color: #3ea987;    /* Color principal (verde) */
    --secondary-color: #000000;  /* Color secundario (negro) */
}
  html {
/* Comportamiento suave del scroll */
html {
    scroll-behavior: smooth;  /* Hace que el scroll sea suave */
```



## Características Principales

1. Autenticación de usuarios

2. Gestión de carrito de compras

3. Listado y filtrado de productos

4. Animaciones fluidas

5. Diseño responsive

6. Persistencia de datos


## Instalación y Uso

```bash
# Instalar dependencias
npm install

# Iniciar en desarrollo
npm run dev

# Construir para producción
npm run build
```
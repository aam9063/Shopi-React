import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaTiktok, 
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa'

function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    categorías: [
      { name: "Men's clothing", path: '/products?category=mens-clothing' },
      { name: "Women's clothing", path: '/products?category=womens-clothing' },
      { name: 'Jewelery', path: '/products?category=jewelery' },
      { name: 'Electronics', path: '/products?category=electronics' }
    ],
    empresa: [
      { name: 'Sobre Nosotros', path: '/about' },
      { name: 'Contacto', path: '/contact' },
      { name: 'Trabaja con Nosotros', path: '/careers' },
      { name: 'Blog', path: '/blog' }
    ],
    ayuda: [
      { name: 'FAQ', path: '/faq' },
      { name: 'Envíos', path: '/shipping' },
      { name: 'Devoluciones', path: '/returns' },
      { name: 'Garantía', path: '/warranty' }
    ],
    legal: [
      { name: 'Términos y Condiciones', path: '/terms' },
      { name: 'Política de Privacidad', path: '/privacy' },
      { name: 'Cookies', path: '/cookies' },
      { name: 'Aviso Legal', path: '/legal' }
    ]
  }

  const socialLinks = [
    { icon: <FaFacebookF />, url: 'https://facebook.com' },
    { icon: <FaTwitter />, url: 'https://twitter.com' },
    { icon: <FaInstagram />, url: 'https://instagram.com' },
    { icon: <FaTiktok />, url: 'https://tiktok.com' },
    { icon: <FaYoutube />, url: 'https://youtube.com' }
  ]

  return (
    <footer className="text-gray-300 bg-gray-900">
      <div className="container px-4 py-12 mx-auto">
        {/* Sección superior */}
        <div className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo y descripción */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6 text-3xl font-bold text-white">
              Trends Shop
            </Link>
            <p className="mb-6 text-gray-400">
              Tu tienda de confianza para todo tipo de productos. Ofrecemos la mejor
              selección con garantía de calidad y servicio excepcional.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-primary" />
                <span>+34 900 123 456</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-primary" />
                <span>info@trendsshop.com</span>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-primary" />
                <span>Calle Principal 123, Alicante</span>
              </div>
            </div>
          </div>

          {/* Enlaces */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 font-semibold text-white uppercase">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 transition-colors hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Separador */}
        <hr className="my-8 border-gray-800" />

        {/* Sección inferior */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Copyright */}
          <div className="text-sm text-gray-400">
            © {currentYear} Shopi. Todos los derechos reservados.
          </div>

          {/* Redes sociales */}
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 text-gray-400 transition-colors bg-gray-800 rounded-full hover:bg-primary hover:text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gray-800">
        <div className="container px-4 py-6 mx-auto">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <h4 className="mb-2 font-semibold text-white">
                Suscríbete a nuestra newsletter
              </h4>
              <p className="text-gray-400">
                Recibe las últimas novedades y ofertas exclusivas
              </p>
            </div>
            <form className="flex w-full gap-2 md:w-auto">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 px-4 py-2 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 md:w-64 rounded-xl focus:outline-none focus:border-primary"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-6 py-2 text-white transition-colors bg-primary rounded-xl hover:bg-secondary"
              >
                Suscribirse
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 
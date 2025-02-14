import PropTypes from 'prop-types'

function ProductFilters({ 
  filters, 
  setFilters, 
  categories, 
  priceRange,
  sortOptions 
}) {
  return (
    <div className="p-6 mb-8 bg-white shadow-md rounded-xl">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Filtro por categoría */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Categoría
          </label>
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary focus:ring-primary"
          >
            <option value="">Todas</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por precio */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Precio máximo: ${filters.maxPrice}
          </label>
          <input
            type="range"
            min={priceRange.min}
            max={priceRange.max}
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:bg-secondary"
          />
        </div>

        {/* Ordenamiento */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Ordenar por
          </label>
          <select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary focus:ring-primary"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

ProductFilters.propTypes = {
  filters: PropTypes.shape({
    category: PropTypes.string,
    maxPrice: PropTypes.number,
    sort: PropTypes.string
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  priceRange: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number
  }).isRequired,
  sortOptions: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string
  })).isRequired
}

export default ProductFilters 
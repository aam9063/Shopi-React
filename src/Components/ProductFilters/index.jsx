import PropTypes from 'prop-types'

function ProductFilters({ 
  filters, 
  setFilters, 
  categories, 
  priceRange,
  sortOptions 
}) {
  return (
    <div className="mb-8 mt-8 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Categoría */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Precio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Max Price: ${filters.maxPrice}
          </label>
          <input
            type="range"
            min={priceRange.min}
            max={priceRange.max}
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
            className="w-full"
          />
        </div>

        {/* Ordenar */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Order by
          </label>
          <select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
import { useState, useEffect } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Eye, Star, Package, Download } from 'lucide-react';
import { useSearch } from '../../hooks/useSearch';
import ExportModal from '../../components/ExportModal';
import Loader from '../../components/Loader';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery, setSearchQuery } = useSearch();
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [showExportModal, setShowExportModal] = useState(false);

  useEffect(() => {
    // Mock products data
    setTimeout(() => {
      setProducts([
        { id: 1, name: 'Wireless Headphones Pro', category: 'Electronics', price: 299.99, stock: 45, sales: 234, rating: 4.8, image: '🎧', status: 'active', sku: 'WHP-001' },
        { id: 2, name: 'Smart Watch Series 5', category: 'Electronics', price: 399.99, stock: 28, sales: 189, rating: 4.6, image: '⌚', status: 'active', sku: 'SWT-005' },
        { id: 3, name: 'Running Shoes Ultra', category: 'Clothing', price: 129.99, stock: 67, sales: 456, rating: 4.9, image: '👟', status: 'active', sku: 'RSU-102' },
        { id: 4, name: 'Laptop Backpack Premium', category: 'Accessories', price: 79.99, stock: 52, sales: 312, rating: 4.7, image: '🎒', status: 'active', sku: 'LBP-220' },
        { id: 5, name: 'Bluetooth Speaker Mini', category: 'Electronics', price: 49.99, stock: 0, sales: 567, rating: 4.5, image: '🔊', status: 'out_of_stock', sku: 'BSM-088' },
        { id: 6, name: 'Fitness Tracker Band', category: 'Electronics', price: 89.99, stock: 34, sales: 278, rating: 4.4, image: '⌚', status: 'active', sku: 'FTB-156' },
        { id: 7, name: 'Gaming Mouse RGB', category: 'Electronics', price: 69.99, stock: 41, sales: 423, rating: 4.8, image: '🖱️', status: 'active', sku: 'GMR-304' },
        { id: 8, name: 'Yoga Mat Premium', category: 'Sports', price: 39.99, stock: 78, sales: 234, rating: 4.6, image: '🧘', status: 'active', sku: 'YMP-445' },
        { id: 9, name: 'USB-C Hub 7-in-1', category: 'Accessories', price: 54.99, stock: 15, sales: 198, rating: 4.7, image: '🔌', status: 'low_stock', sku: 'UCH-711' },
        { id: 10, name: 'Water Bottle Insulated', category: 'Sports', price: 24.99, stock: 92, sales: 678, rating: 4.9, image: '🍶', status: 'active', sku: 'WBI-889' },
        { id: 11, name: 'Phone Case Protective', category: 'Accessories', price: 19.99, stock: 156, sales: 892, rating: 4.5, image: '📱', status: 'active', sku: 'PCP-667' },
        { id: 12, name: 'Desk Lamp LED', category: 'Home', price: 44.99, stock: 23, sales: 145, rating: 4.6, image: '💡', status: 'active', sku: 'DLL-334' },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      categoryFilter === 'all' || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-100 text-green-700',
      out_of_stock: 'bg-red-100 text-red-700',
      low_stock: 'bg-yellow-100 text-yellow-700',
    };
    const labels = {
      active: 'In Stock',
      out_of_stock: 'Out of Stock',
      low_stock: 'Low Stock',
    };
    return { style: styles[status], label: labels[status] };
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.status === 'active').length;
  const outOfStock = products.filter(p => p.status === 'out_of_stock').length;
  const lowStock = products.filter(p => p.status === 'low_stock').length;

  return (
    <div className="p-6 fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
          <p className="text-gray-600 mt-1">Manage your product catalog</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <Download size={18} />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600">Total Products</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{totalProducts}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <p className="text-sm text-gray-600">In Stock</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{activeProducts}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
          <p className="text-sm text-gray-600">Low Stock</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{lowStock}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
          <p className="text-sm text-gray-600">Out of Stock</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{outOfStock}</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by name or SKU..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="all">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Accessories">Accessories</option>
            <option value="Sports">Sports</option>
            <option value="Home">Home</option>
          </select>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg transition ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50'}`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg transition ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50'}`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const statusBadge = getStatusBadge(product.status);
            return (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition group">
                <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 p-8 flex items-center justify-center">
                  <div className="text-6xl">{product.image}</div>
                  <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${statusBadge.style}`}>
                    {statusBadge.label}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">SKU: {product.sku}</p>
                  
                  <div className="flex items-center gap-1 mb-3">
                    <Star size={14} className="text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                    <span className="text-xs text-gray-500">({product.sales} sales)</span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                    <span className="text-sm text-gray-600">Stock: {product.stock}</span>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm">
                      <Edit size={14} className="inline mr-1" />
                      Edit
                    </button>
                    <button className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 transition">
                      <Eye size={14} />
                    </button>
                    <button className="px-3 py-2 border border-red-300 text-red-600 rounded hover:bg-red-50 transition">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sales</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => {
                const statusBadge = getStatusBadge(product.status);
                return (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{product.image}</div>
                        <div>
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-xs text-gray-500">{product.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">${product.price}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.stock}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.sales}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusBadge.style}`}>
                        {statusBadge.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-900"><Edit size={18} /></button>
                        <button className="text-gray-600 hover:text-gray-900"><Eye size={18} /></button>
                        <button className="text-red-600 hover:text-red-900"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        data={filteredProducts.map(({ id, name, category, price, stock, sales, rating, sku, status }) => ({
          id,
          name,
          category,
          'SKU': sku,
          'Price': `$${price}`,
          'Stock': stock,
          'Sales': sales,
          'Rating': rating,
          'Status': status,
        }))}
        filename={`products-${new Date().toISOString().split('T')[0]}`}
        dataName="Products"
      />
    </div>
  );
};

export default AllProducts;
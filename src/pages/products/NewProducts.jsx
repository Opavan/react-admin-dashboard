import { useState, useEffect } from 'react';
import { Plus, Check, X, Clock, TrendingUp, Tag, Package } from 'lucide-react';
import Loader from '../../components/Loader';

const NewProducts = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState('7days');

  useEffect(() => {
    // Mock data - products added in last 7 days
    setTimeout(() => {
      setNewProducts([
        { 
          id: 1, name: 'Mechanical Keyboard RGB', category: 'Electronics', price: 149.99, 
          stock: 25, addedAt: '2 hours ago', status: 'pending', image: '⌨️', 
          supplier: 'Tech Supplies Inc', expectedSales: 150, profitMargin: '35%'
        },
        { 
          id: 2, name: 'Wireless Earbuds Pro', category: 'Electronics', price: 179.99, 
          stock: 30, addedAt: '5 hours ago', status: 'approved', image: '🎧', 
          supplier: 'Audio Masters', expectedSales: 200, profitMargin: '40%'
        },
        { 
          id: 3, name: 'Smart LED Bulbs 4-Pack', category: 'Home', price: 44.99, 
          stock: 60, addedAt: '1 day ago', status: 'pending', image: '💡', 
          supplier: 'Smart Home Co', expectedSales: 180, profitMargin: '28%'
        },
        { 
          id: 4, name: 'Portable SSD 1TB', category: 'Electronics', price: 129.99, 
          stock: 20, addedAt: '1 day ago', status: 'approved', image: '💾', 
          supplier: 'Storage Solutions', expectedSales: 120, profitMargin: '32%'
        },
        { 
          id: 5, name: 'Ergonomic Office Chair', category: 'Furniture', price: 299.99, 
          stock: 15, addedAt: '2 days ago', status: 'pending', image: '🪑', 
          supplier: 'Comfort Furniture', expectedSales: 80, profitMargin: '45%'
        },
        { 
          id: 6, name: 'Webcam HD 1080p', category: 'Electronics', price: 89.99, 
          stock: 35, addedAt: '3 days ago', status: 'approved', image: '📷', 
          supplier: 'Vision Tech', expectedSales: 160, profitMargin: '38%'
        },
        { 
          id: 7, name: 'Desk Organizer Set', category: 'Office', price: 34.99, 
          stock: 50, addedAt: '4 days ago', status: 'pending', image: '📋', 
          supplier: 'Office Essentials', expectedSales: 220, profitMargin: '42%'
        },
        { 
          id: 8, name: 'Coffee Maker Smart', category: 'Home', price: 159.99, 
          stock: 18, addedAt: '5 days ago', status: 'approved', image: '☕', 
          supplier: 'Kitchen Pro', expectedSales: 95, profitMargin: '36%'
        },
      ]);
      setLoading(false);
    }, 800);
  }, [timeFilter]);

  const handleApprove = (productId) => {
    setNewProducts(products =>
      products.map(p =>
        p.id === productId ? { ...p, status: 'approved' } : p
      )
    );
  };

  const handleReject = (productId) => {
    if (window.confirm('Are you sure you want to reject this product?')) {
      setNewProducts(products => products.filter(p => p.id !== productId));
    }
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  const pendingCount = newProducts.filter(p => p.status === 'pending').length;
  const approvedCount = newProducts.filter(p => p.status === 'approved').length;
  const totalValue = newProducts.reduce((sum, p) => sum + (p.price * p.stock), 0);

  return (
    <div className="p-6 fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">New Products</h1>
          <p className="text-gray-600 mt-1">Recently added products awaiting approval</p>
        </div>
        <div className="flex gap-3">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="24hours">Last 24 Hours</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <Plus size={18} />
            Add New
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">New Products</p>
              <p className="text-3xl font-bold mt-2">{newProducts.length}</p>
            </div>
            <Package size={40} className="opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Pending Approval</p>
              <p className="text-3xl font-bold mt-2">{pendingCount}</p>
            </div>
            <Clock size={40} className="opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Approved</p>
              <p className="text-3xl font-bold mt-2">{approvedCount}</p>
            </div>
            <Check size={40} className="opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Total Value</p>
              <p className="text-3xl font-bold mt-2">${totalValue.toLocaleString()}</p>
            </div>
            <TrendingUp size={40} className="opacity-50" />
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {newProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
            <div className="flex">
              {/* Product Image Section */}
              <div className="w-32 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                <div className="text-6xl">{product.image}</div>
              </div>

              {/* Product Details */}
              <div className="flex-1 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    product.status === 'approved' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {product.status === 'approved' ? 'Approved' : 'Pending'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Price</p>
                    <p className="text-lg font-bold text-blue-600">${product.price}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Stock</p>
                    <p className="text-lg font-bold text-gray-800">{product.stock} units</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Profit Margin</p>
                    <p className="text-sm font-semibold text-green-600">{product.profitMargin}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Expected Sales</p>
                    <p className="text-sm font-semibold text-purple-600">{product.expectedSales}/mo</p>
                  </div>
                </div>

                <div className="mb-4 pb-4 border-b">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Tag size={14} />
                    <span className="font-medium">Supplier:</span>
                    <span>{product.supplier}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <Clock size={14} />
                    <span>Added {product.addedAt}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                {product.status === 'pending' ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(product.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
                    >
                      <Check size={16} />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(product.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
                    >
                      <X size={16} />
                      Reject
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 py-2 bg-green-50 text-green-700 rounded-lg">
                    <Check size={18} />
                    <span className="font-medium">Product Approved</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {newProducts.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Package size={64} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No New Products</h3>
          <p className="text-gray-600">There are no new products pending approval.</p>
        </div>
      )}
    </div>
  );
};

export default NewProducts;
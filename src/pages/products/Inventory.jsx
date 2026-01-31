import { useState, useEffect } from 'react';
import { AlertTriangle, TrendingDown, Package, RefreshCw, Plus, Minus, Search, Download } from 'lucide-react';
import { useSearch } from '../../hooks/useSearch';
import { useNotification } from '../../hooks/useNotification';
import ExportModal from '../../components/ExportModal';
import Loader from '../../components/Loader';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery, setSearchQuery } = useSearch();
  const { addNotification } = useNotification();
  const [filterStatus, setFilterStatus] = useState('all');
  const [showExportModal, setShowExportModal] = useState(false);

  useEffect(() => {
    // Mock inventory data
    setTimeout(() => {
      const inventoryData = [
        { id: 1, name: 'Wireless Headphones Pro', sku: 'WHP-001', currentStock: 12, minStock: 20, maxStock: 100, reorderPoint: 25, lastRestocked: '2024-01-10', status: 'low', image: '🎧', category: 'Electronics' },
        { id: 2, name: 'Bluetooth Speaker Mini', sku: 'BSM-088', currentStock: 0, minStock: 15, maxStock: 80, reorderPoint: 20, lastRestocked: '2024-01-05', status: 'out', image: '🔊', category: 'Electronics' },
        { id: 3, name: 'Smart Watch Series 5', sku: 'SWT-005', currentStock: 45, minStock: 20, maxStock: 100, reorderPoint: 30, lastRestocked: '2024-01-15', status: 'good', image: '⌚', category: 'Electronics' },
        { id: 4, name: 'USB-C Hub 7-in-1', sku: 'UCH-711', currentStock: 8, minStock: 10, maxStock: 50, reorderPoint: 15, lastRestocked: '2024-01-08', status: 'critical', image: '🔌', category: 'Accessories' },
        { id: 5, name: 'Running Shoes Ultra', sku: 'RSU-102', currentStock: 78, minStock: 30, maxStock: 150, reorderPoint: 40, lastRestocked: '2024-01-12', status: 'good', image: '👟', category: 'Clothing' },
        { id: 6, name: 'Laptop Backpack Premium', sku: 'LBP-220', currentStock: 67, minStock: 25, maxStock: 100, reorderPoint: 35, lastRestocked: '2024-01-14', status: 'good', image: '🎒', category: 'Accessories' },
        { id: 7, name: 'Gaming Mouse RGB', sku: 'GMR-304', currentStock: 18, minStock: 20, maxStock: 80, reorderPoint: 25, lastRestocked: '2024-01-11', status: 'low', image: '🖱️', category: 'Electronics' },
        { id: 8, name: 'Yoga Mat Premium', sku: 'YMP-445', currentStock: 92, minStock: 30, maxStock: 120, reorderPoint: 40, lastRestocked: '2024-01-16', status: 'good', image: '🧘', category: 'Sports' },
        { id: 9, name: 'Water Bottle Insulated', sku: 'WBI-889', currentStock: 5, minStock: 40, maxStock: 200, reorderPoint: 50, lastRestocked: '2024-01-09', status: 'critical', image: '🍶', category: 'Sports' },
        { id: 10, name: 'Phone Case Protective', sku: 'PCP-667', currentStock: 156, minStock: 50, maxStock: 300, reorderPoint: 75, lastRestocked: '2024-01-15', status: 'good', image: '📱', category: 'Accessories' },
      ];

      setInventory(inventoryData);
      
      // Show notifications for critical items
      inventoryData.forEach((item) => {
        if (item.status === 'out') {
          addNotification(`⚠️ ${item.name} is out of stock!`, 'error', 0);
        } else if (item.status === 'critical') {
          addNotification(`🔴 CRITICAL: ${item.name} - Only ${item.currentStock} items left`, 'warning', 0);
        } else if (item.status === 'low') {
          addNotification(`📦 Low stock: ${item.name} - ${item.currentStock} remaining`, 'info', 0);
        }
      });

      setLoading(false);
    }, 800);
  }, [addNotification]);

  const getStatusInfo = (status) => {
    const statusMap = {
      critical: { label: 'Critical', color: 'red', bgColor: 'bg-red-100', textColor: 'text-red-700', barColor: '#ef4444' },
      out: { label: 'Out of Stock', color: 'red', bgColor: 'bg-red-100', textColor: 'text-red-700', barColor: '#ef4444' },
      low: { label: 'Low Stock', color: 'yellow', bgColor: 'bg-yellow-100', textColor: 'text-yellow-700', barColor: '#f59e0b' },
      good: { label: 'Good', color: 'green', bgColor: 'bg-green-100', textColor: 'text-green-700', barColor: '#10b981' },
    };
    return statusMap[status];
  };

  const handleAdjustStock = (productId, adjustment) => {
    setInventory(items =>
      items.map(item => {
        if (item.id === productId) {
          const newStock = Math.max(0, item.currentStock + adjustment);
          let newStatus = 'good';
          if (newStock === 0) newStatus = 'out';
          else if (newStock < item.minStock) newStatus = 'critical';
          else if (newStock < item.reorderPoint) newStatus = 'low';
          
          return { ...item, currentStock: newStock, status: newStatus };
        }
        return item;
      })
    );
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return <Loader fullScreen />;
  }

  const criticalCount = inventory.filter(i => i.status === 'critical').length;
  const outOfStockCount = inventory.filter(i => i.status === 'out').length;
  const lowStockCount = inventory.filter(i => i.status === 'low').length;
  const goodStockCount = inventory.filter(i => i.status === 'good').length;

  // Chart data
  const chartData = inventory.map(item => ({
    name: item.sku,
    stock: item.currentStock,
    reorder: item.reorderPoint,
    status: item.status,
  }));

  return (
    <div className="p-6 fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
          <p className="text-gray-600 mt-1">Monitor and manage stock levels</p>
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
            <RefreshCw size={18} />
            Refresh Stock
          </button>
        </div>
      </div>

      {/* Status Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Critical / Out of Stock</p>
              <p className="text-3xl font-bold mt-2">{criticalCount + outOfStockCount}</p>
              <p className="text-red-100 text-sm mt-2">Needs immediate action</p>
            </div>
            <AlertTriangle size={40} className="opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Low Stock</p>
              <p className="text-3xl font-bold mt-2">{lowStockCount}</p>
              <p className="text-yellow-100 text-sm mt-2">Below reorder point</p>
            </div>
            <TrendingDown size={40} className="opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Good Stock</p>
              <p className="text-3xl font-bold mt-2">{goodStockCount}</p>
              <p className="text-green-100 text-sm mt-2">Adequate levels</p>
            </div>
            <Package size={40} className="opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Products</p>
              <p className="text-3xl font-bold mt-2">{inventory.length}</p>
              <p className="text-blue-100 text-sm mt-2">In inventory</p>
            </div>
            <Package size={40} className="opacity-50" />
          </div>
        </div>
      </div>

      {/* Stock Level Chart */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Stock Levels Overview</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="stock" name="Current Stock">
              {chartData.map((entry, index) => {
                const statusInfo = getStatusInfo(entry.status);
                return <Cell key={`cell-${index}`} fill={statusInfo.barColor} />;
              })}
            </Bar>
            <Bar dataKey="reorder" name="Reorder Point" fill="#94a3b8" />
          </BarChart>
        </ResponsiveContainer>
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
              placeholder="Search by product name or SKU..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="all">All Status</option>
            <option value="critical">Critical</option>
            <option value="out">Out of Stock</option>
            <option value="low">Low Stock</option>
            <option value="good">Good Stock</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reorder Point</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Restocked</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInventory.map((item) => {
                const statusInfo = getStatusInfo(item.status);
                const stockPercentage = (item.currentStock / item.maxStock) * 100;
                
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{item.image}</div>
                        <div>
                          <div className="font-medium text-gray-900">{item.name}</div>
                          <div className="text-xs text-gray-500">{item.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">{item.sku}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-bold text-gray-900">{item.currentStock}</div>
                        <div className="text-xs text-gray-500">/ {item.maxStock}</div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className={`h-2 rounded-full ${
                            stockPercentage > 50 ? 'bg-green-500' : 
                            stockPercentage > 20 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.reorderPoint}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.bgColor} ${statusInfo.textColor}`}>
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.lastRestocked}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleAdjustStock(item.id, 10)}
                          className="p-2 bg-green-100 text-green-600 rounded hover:bg-green-200 transition"
                          title="Add 10"
                        >
                          <Plus size={16} />
                        </button>
                        <button
                          onClick={() => handleAdjustStock(item.id, -10)}
                          className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                          title="Remove 10"
                        >
                          <Minus size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        data={filteredInventory.map(({ id, name, sku, currentStock, minStock, maxStock, reorderPoint, lastRestocked, status, category }) => ({
          id,
          'Product Name': name,
          'SKU': sku,
          'Current Stock': currentStock,
          'Min Stock': minStock,
          'Max Stock': maxStock,
          'Reorder Point': reorderPoint,
          'Status': status.toUpperCase(),
          'Category': category,
          'Last Restocked': lastRestocked,
        }))}
        filename={`inventory-${new Date().toISOString().split('T')[0]}`}
        dataName="Inventory"
      />
    </div>
  );
};

export default Inventory;
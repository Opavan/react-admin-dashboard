import { useState, useEffect } from 'react';
import { Search, Filter, Download, UserPlus, Edit, Trash2, Mail, Phone, MoreVertical } from 'lucide-react';
import Loader from '../../components/Loader';

const AllCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 10;

  useEffect(() => {
    // Mock data - replace with API call
    setTimeout(() => {
      setCustomers([
        { id: 1, name: 'John Smith', email: 'john.smith@example.com', phone: '+1 234-567-8901', status: 'active', verified: true, orders: 24, totalSpent: '$2,450', joined: '2024-01-15', avatar: 'JS' },
        { id: 2, name: 'Sarah Johnson', email: 'sarah.j@example.com', phone: '+1 234-567-8902', status: 'active', verified: true, orders: 18, totalSpent: '$1,890', joined: '2024-02-20', avatar: 'SJ' },
        { id: 3, name: 'Michael Brown', email: 'michael.b@example.com', phone: '+1 234-567-8903', status: 'inactive', verified: false, orders: 5, totalSpent: '$450', joined: '2024-03-10', avatar: 'MB' },
        { id: 4, name: 'Emily Davis', email: 'emily.davis@example.com', phone: '+1 234-567-8904', status: 'active', verified: true, orders: 32, totalSpent: '$3,200', joined: '2023-12-05', avatar: 'ED' },
        { id: 5, name: 'David Wilson', email: 'david.w@example.com', phone: '+1 234-567-8905', status: 'active', verified: true, orders: 15, totalSpent: '$1,560', joined: '2024-01-28', avatar: 'DW' },
        { id: 6, name: 'Lisa Anderson', email: 'lisa.a@example.com', phone: '+1 234-567-8906', status: 'pending', verified: false, orders: 2, totalSpent: '$180', joined: '2024-04-02', avatar: 'LA' },
        { id: 7, name: 'James Taylor', email: 'james.t@example.com', phone: '+1 234-567-8907', status: 'active', verified: true, orders: 28, totalSpent: '$2,850', joined: '2023-11-20', avatar: 'JT' },
        { id: 8, name: 'Jennifer Martinez', email: 'jennifer.m@example.com', phone: '+1 234-567-8908', status: 'active', verified: true, orders: 21, totalSpent: '$2,100', joined: '2024-01-05', avatar: 'JM' },
        { id: 9, name: 'Robert Garcia', email: 'robert.g@example.com', phone: '+1 234-567-8909', status: 'inactive', verified: false, orders: 3, totalSpent: '$290', joined: '2024-03-25', avatar: 'RG' },
        { id: 10, name: 'Mary Rodriguez', email: 'mary.r@example.com', phone: '+1 234-567-8910', status: 'active', verified: true, orders: 19, totalSpent: '$1,950', joined: '2024-02-14', avatar: 'MR' },
        { id: 11, name: 'William Lee', email: 'william.l@example.com', phone: '+1 234-567-8911', status: 'active', verified: true, orders: 26, totalSpent: '$2,680', joined: '2023-12-18', avatar: 'WL' },
        { id: 12, name: 'Patricia White', email: 'patricia.w@example.com', phone: '+1 234-567-8912', status: 'pending', verified: false, orders: 1, totalSpent: '$95', joined: '2024-04-10', avatar: 'PW' },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  // Filter and search
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    
    const matchesFilter = 
      filterStatus === 'all' || customer.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  // Pagination
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="p-6 fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">All Customers</h1>
          <p className="text-gray-600 mt-1">Manage and view all customer information</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            <Download size={18} />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <UserPlus size={18} />
            Add Customer
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600">Total Customers</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{customers.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <p className="text-sm text-gray-600">Active</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{customers.filter(c => c.status === 'active').length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{customers.filter(c => c.status === 'pending').length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-500">
          <p className="text-sm text-gray-600">Verified</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{customers.filter(c => c.verified).length}</p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email, or phone..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <Filter size={18} />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                        {customer.avatar}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        {customer.verified && (
                          <span className="text-xs text-green-600 flex items-center gap-1">
                            ✓ Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center gap-1">
                      <Mail size={14} className="text-gray-400" />
                      {customer.email}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <Phone size={14} className="text-gray-400" />
                      {customer.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{customer.orders}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{customer.totalSpent}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      customer.status === 'active' ? 'bg-green-100 text-green-800' :
                      customer.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.joined}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900" title="Edit">
                        <Edit size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-900" title="Delete">
                        <Trash2 size={18} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900" title="More">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{indexOfFirstCustomer + 1}</span> to{' '}
            <span className="font-medium">{Math.min(indexOfLastCustomer, filteredCustomers.length)}</span> of{' '}
            <span className="font-medium">{filteredCustomers.length}</span> results
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-4 py-2 border rounded-lg transition ${
                  currentPage === idx + 1
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-300 hover:bg-white'
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCustomers;
import { useState, useEffect } from 'react';
import { UserCheck, UserX, Eye, Clock, TrendingUp } from 'lucide-react';
import Loader from '../../components/Loader';

const NewCustomers = () => {
  const [newCustomers, setNewCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState('7days');

  useEffect(() => {
    // Mock data - customers from last 7 days
    setTimeout(() => {
      setNewCustomers([
        { id: 1, name: 'Patricia White', email: 'patricia.w@example.com', phone: '+1 234-567-8912', registeredAt: '2 hours ago', source: 'Website', status: 'pending', avatar: 'PW', activity: 'Browsing products' },
        { id: 2, name: 'Thomas Harris', email: 'thomas.h@example.com', phone: '+1 234-567-8913', registeredAt: '5 hours ago', source: 'Mobile App', status: 'pending', avatar: 'TH', activity: 'Added items to cart' },
        { id: 3, name: 'Linda Clark', email: 'linda.c@example.com', phone: '+1 234-567-8914', registeredAt: '1 day ago', source: 'Social Media', status: 'active', avatar: 'LC', activity: 'Completed first order' },
        { id: 4, name: 'Christopher Lewis', email: 'chris.l@example.com', phone: '+1 234-567-8915', registeredAt: '1 day ago', source: 'Referral', status: 'pending', avatar: 'CL', activity: 'Email not verified' },
        { id: 5, name: 'Barbara Walker', email: 'barbara.w@example.com', phone: '+1 234-567-8916', registeredAt: '2 days ago', source: 'Website', status: 'active', avatar: 'BW', activity: 'Viewing products' },
        { id: 6, name: 'Daniel Hall', email: 'daniel.h@example.com', phone: '+1 234-567-8917', registeredAt: '3 days ago', source: 'Mobile App', status: 'pending', avatar: 'DH', activity: 'Profile incomplete' },
        { id: 7, name: 'Nancy Allen', email: 'nancy.a@example.com', phone: '+1 234-567-8918', registeredAt: '4 days ago', source: 'Google Ads', status: 'active', avatar: 'NA', activity: 'Active shopper' },
        { id: 8, name: 'Paul Young', email: 'paul.y@example.com', phone: '+1 234-567-8919', registeredAt: '5 days ago', source: 'Website', status: 'pending', avatar: 'PY', activity: 'Awaiting verification' },
      ]);
      setLoading(false);
    }, 800);
  }, [timeFilter]);

  const handleApprove = (customerId) => {
    alert(`Approved customer ${customerId}`);
  };

  const handleReject = (customerId) => {
    if (window.confirm('Are you sure you want to reject this customer?')) {
      alert(`Rejected customer ${customerId}`);
    }
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  const pendingCount = newCustomers.filter(c => c.status === 'pending').length;
  const activeCount = newCustomers.filter(c => c.status === 'active').length;

  return (
    <div className="p-6 fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">New Customers</h1>
          <p className="text-gray-600 mt-1">Recently registered customers awaiting review</p>
        </div>
        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="24hours">Last 24 Hours</option>
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total New Customers</p>
              <p className="text-3xl font-bold mt-2">{newCustomers.length}</p>
              <p className="text-blue-100 text-sm mt-2 flex items-center gap-1">
                <TrendingUp size={16} />
                +23% from last week
              </p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Clock size={32} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Pending Review</p>
              <p className="text-3xl font-bold mt-2">{pendingCount}</p>
              <p className="text-yellow-100 text-sm mt-2">Needs your attention</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <UserCheck size={32} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Already Active</p>
              <p className="text-3xl font-bold mt-2">{activeCount}</p>
              <p className="text-green-100 text-sm mt-2">Verified & approved</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <UserCheck size={32} />
            </div>
          </div>
        </div>
      </div>

      {/* New Customers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {newCustomers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-lg">
                    {customer.avatar}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{customer.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock size={14} />
                      {customer.registeredAt}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  customer.status === 'active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {customer.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-medium">Email:</span>
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-medium">Phone:</span>
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-medium">Source:</span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                    {customer.source}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-medium">Activity:</span>
                  <span className="text-gray-800">{customer.activity}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <button
                  onClick={() => handleApprove(customer.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  <UserCheck size={18} />
                  Approve
                </button>
                <button
                  onClick={() => handleReject(customer.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  <UserX size={18} />
                  Reject
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <Eye size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {newCustomers.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserCheck size={40} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No New Customers</h3>
          <p className="text-gray-600">There are no new customer registrations at this time.</p>
        </div>
      )}
    </div>
  );
};

export default NewCustomers;
import { useState, useEffect } from 'react';
import { ShieldCheck, Award, Star, TrendingUp, Mail, Phone, MapPin, Search } from 'lucide-react';
import { useSearch } from '../../hooks/useSearch';
import Loader from '../../components/Loader';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const VerifiedCustomers = () => {
  const [verifiedCustomers, setVerifiedCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery, setSearchQuery } = useSearch();
  const [selectedTier, setSelectedTier] = useState('all');

  useEffect(() => {
    // Mock data - verified customers with purchase history
    setTimeout(() => {
      setVerifiedCustomers([
        { 
          id: 1, name: 'Emily Davis', email: 'emily.davis@example.com', phone: '+1 234-567-8904', 
          location: 'New York, USA', tier: 'platinum', totalSpent: '$3,200', orders: 32, 
          verifiedDate: '2023-12-10', loyaltyPoints: 3200, avatar: 'ED',
          purchaseHistory: [
            { month: 'Oct', amount: 450 },
            { month: 'Nov', amount: 520 },
            { month: 'Dec', amount: 680 },
            { month: 'Jan', amount: 550 },
          ]
        },
        { 
          id: 2, name: 'John Smith', email: 'john.smith@example.com', phone: '+1 234-567-8901', 
          location: 'Los Angeles, USA', tier: 'gold', totalSpent: '$2,450', orders: 24, 
          verifiedDate: '2024-01-20', loyaltyPoints: 2450, avatar: 'JS',
          purchaseHistory: [
            { month: 'Oct', amount: 320 },
            { month: 'Nov', amount: 380 },
            { month: 'Dec', amount: 450 },
            { month: 'Jan', amount: 410 },
          ]
        },
        { 
          id: 3, name: 'James Taylor', email: 'james.t@example.com', phone: '+1 234-567-8907', 
          location: 'Chicago, USA', tier: 'platinum', totalSpent: '$2,850', orders: 28, 
          verifiedDate: '2023-12-01', loyaltyPoints: 2850, avatar: 'JT',
          purchaseHistory: [
            { month: 'Oct', amount: 400 },
            { month: 'Nov', amount: 470 },
            { month: 'Dec', amount: 520 },
            { month: 'Jan', amount: 480 },
          ]
        },
        { 
          id: 4, name: 'Sarah Johnson', email: 'sarah.j@example.com', phone: '+1 234-567-8902', 
          location: 'Miami, USA', tier: 'silver', totalSpent: '$1,890', orders: 18, 
          verifiedDate: '2024-02-25', loyaltyPoints: 1890, avatar: 'SJ',
          purchaseHistory: [
            { month: 'Oct', amount: 250 },
            { month: 'Nov', amount: 310 },
            { month: 'Dec', amount: 380 },
            { month: 'Jan', amount: 290 },
          ]
        },
        { 
          id: 5, name: 'William Lee', email: 'william.l@example.com', phone: '+1 234-567-8911', 
          location: 'Seattle, USA', tier: 'gold', totalSpent: '$2,680', orders: 26, 
          verifiedDate: '2023-12-25', loyaltyPoints: 2680, avatar: 'WL',
          purchaseHistory: [
            { month: 'Oct', amount: 370 },
            { month: 'Nov', amount: 420 },
            { month: 'Dec', amount: 490 },
            { month: 'Jan', amount: 440 },
          ]
        },
        { 
          id: 6, name: 'Jennifer Martinez', email: 'jennifer.m@example.com', phone: '+1 234-567-8908', 
          location: 'Boston, USA', tier: 'gold', totalSpent: '$2,100', orders: 21, 
          verifiedDate: '2024-01-08', loyaltyPoints: 2100, avatar: 'JM',
          purchaseHistory: [
            { month: 'Oct', amount: 300 },
            { month: 'Nov', amount: 350 },
            { month: 'Dec', amount: 420 },
            { month: 'Jan', amount: 360 },
          ]
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const filteredCustomers = verifiedCustomers.filter((customer) => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery) ||
      customer.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTier = 
      selectedTier === 'all' || customer.tier === selectedTier;
    
    return matchesSearch && matchesTier;
  });

  const getTierBadge = (tier) => {
    const styles = {
      platinum: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white',
      gold: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white',
      silver: 'bg-gradient-to-r from-gray-400 to-gray-500 text-white',
    };
    const icons = {
      platinum: '💎',
      gold: '👑',
      silver: '⭐',
    };
    return { style: styles[tier], icon: icons[tier] };
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  const platinumCount = verifiedCustomers.filter(c => c.tier === 'platinum').length;
  const goldCount = verifiedCustomers.filter(c => c.tier === 'gold').length;
  const silverCount = verifiedCustomers.filter(c => c.tier === 'silver').length;

  return (
    <div className="p-6 fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <ShieldCheck className="text-green-600" size={32} />
            Verified Customers
          </h1>
          <p className="text-gray-600 mt-1">Top tier customers with verified accounts</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, location..."
              className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="all">All Tiers</option>
            <option value="platinum">Platinum</option>
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
          </select>
        </div>
      </div>

      {/* Tier Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">💎 Platinum Tier</p>
              <p className="text-3xl font-bold mt-2">{platinumCount}</p>
              <p className="text-purple-100 text-sm mt-2">$3,000+ spent</p>
            </div>
            <Award size={48} className="opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">👑 Gold Tier</p>
              <p className="text-3xl font-bold mt-2">{goldCount}</p>
              <p className="text-yellow-100 text-sm mt-2">$2,000-$3,000 spent</p>
            </div>
            <Award size={48} className="opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-100 text-sm">⭐ Silver Tier</p>
              <p className="text-3xl font-bold mt-2">{silverCount}</p>
              <p className="text-gray-100 text-sm mt-2">$1,000-$2,000 spent</p>
            </div>
            <Award size={48} className="opacity-50" />
          </div>
        </div>
      </div>

      {/* Customer Cards with Charts */}
      <div className="grid grid-cols-1 gap-6">
        {filteredCustomers.map((customer) => {
          const tierBadge = getTierBadge(customer.tier);
          return (
            <div key={customer.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                {/* Customer Info */}
                <div className="lg:col-span-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                      {customer.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-800">{customer.name}</h3>
                        <ShieldCheck size={18} className="text-green-600" />
                      </div>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${tierBadge.style}`}>
                        {tierBadge.icon} {customer.tier.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail size={16} className="text-gray-400" />
                      <span>{customer.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone size={16} className="text-gray-400" />
                      <span>{customer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin size={16} className="text-gray-400" />
                      <span>{customer.location}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Loyalty Points</span>
                      <span className="text-lg font-bold text-blue-600">{customer.loyaltyPoints}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Verified Since</span>
                      <span className="text-sm font-medium text-gray-800">{customer.verifiedDate}</span>
                    </div>
                  </div>
                </div>

                {/* Purchase Stats */}
                <div className="lg:col-span-1 border-l-0 lg:border-l pl-0 lg:pl-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-4">Purchase Statistics</h4>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-xs text-blue-600 font-medium">Total Orders</p>
                      <p className="text-2xl font-bold text-blue-700 mt-1">{customer.orders}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-xs text-green-600 font-medium">Total Spent</p>
                      <p className="text-2xl font-bold text-green-700 mt-1">{customer.totalSpent}</p>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-xs text-purple-600 font-medium mb-2">Average Order Value</p>
                    <p className="text-xl font-bold text-purple-700">
                      ${(parseFloat(customer.totalSpent.replace(/[$,]/g, '')) / customer.orders).toFixed(2)}
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                      <TrendingUp size={14} />
                      <span>+12% vs last month</span>
                    </div>
                  </div>
                </div>

                {/* Purchase Trend Chart */}
                <div className="lg:col-span-1 border-l-0 lg:border-l pl-0 lg:pl-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-4">Purchase Trend (Last 4 Months)</h4>
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={customer.purchaseHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="amount" stroke="#8b5cf6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                  
                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
                      View Profile
                    </button>
                    <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm">
                      Order History
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <ShieldCheck size={64} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Verified Customers</h3>
          <p className="text-gray-600">No customers match the selected tier filter.</p>
        </div>
      )}
    </div>
  );
};

export default VerifiedCustomers;
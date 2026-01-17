import { useState, useEffect } from 'react';
import { TrendingUp, Users, DollarSign, ShoppingCart, ArrowUp, ArrowDown } from 'lucide-react';
import Chart from '../components/Chart';
import Loader from '../components/Loader';
import {
  getDashboardStats,
  getRevenueData,
  getUserGrowthData,
  getCategoryData,
  getRecentActivities,
} from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [userGrowthData, setUserGrowthData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, revenue, userGrowth, categories, recentActivities] = await Promise.all([
          getDashboardStats(),
          getRevenueData(),
          getUserGrowthData(),
          getCategoryData(),
          getRecentActivities(),
        ]);

        setStats(statsData);
        setRevenueData(revenue);
        setUserGrowthData(userGrowth);
        setCategoryData(categories);
        setActivities(recentActivities);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader fullScreen />;
  }

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: stats.revenueChange,
      icon: DollarSign,
      positive: stats.revenueChange > 0,
    },
    {
      title: 'Active Users',
      value: stats.activeUsers.toLocaleString(),
      change: stats.usersChange,
      icon: Users,
      positive: stats.usersChange > 0,
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      change: stats.ordersChange,
      icon: ShoppingCart,
      positive: stats.ordersChange > 0,
    },
    {
      title: 'Conversion Rate',
      value: `${stats.conversionRate}%`,
      change: stats.conversionChange,
      icon: TrendingUp,
      positive: stats.conversionChange > 0,
    },
  ];

  return (
    <div className="p-6 fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-blue-50">
                  <Icon className="text-blue-600" size={24} />
                </div>
                <div
                  className={`flex items-center text-sm font-semibold ${
                    stat.positive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stat.positive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                  {Math.abs(stat.change)}%
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Chart type="bar" data={revenueData} title="Revenue vs Expenses" />
        <Chart type="line" data={userGrowthData} title="User Growth" />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Chart type="pie" data={categoryData} title="Sales by Category" height={250} />

        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between py-3 border-b last:border-b-0"
              >
                <div className="flex items-center">
                  <div
                    className={`w-2 h-2 rounded-full mr-3 ${
                      activity.status === 'success'
                        ? 'bg-green-500'
                        : activity.status === 'warning'
                        ? 'bg-yellow-500'
                        : 'bg-blue-500'
                    }`}
                  />
                  <span className="text-gray-800">{activity.action}</span>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import { useState, useEffect } from 'react';
import {
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  Download,
  Filter,
} from 'lucide-react';
import Chart from '../components/Chart';
import Loader from '../components/Loader';
import {
  getRevenueData,
  getUserGrowthData,
  getCategoryData,
} from '../services/api';

const Analytics = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [userGrowthData, setUserGrowthData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('6months');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [revenue, userGrowth, categories] = await Promise.all([
          getRevenueData(),
          getUserGrowthData(),
          getCategoryData(),
        ]);

        setRevenueData(revenue);
        setUserGrowthData(userGrowth);
        setCategoryData(categories);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

  if (loading) {
    return <Loader fullScreen />;
  }

  const metrics = [
    {
      label: 'Total Revenue',
      value: '$29,500',
      trend: '+12.5%',
      icon: DollarSign,
      color: 'blue',
    },
    {
      label: 'Active Users',
      value: '4,239',
      trend: '+18.2%',
      icon: Users,
      color: 'green',
    },
    {
      label: 'Growth Rate',
      value: '23.4%',
      trend: '+5.1%',
      icon: TrendingUp,
      color: 'purple',
    },
    {
      label: 'Avg. Session',
      value: '8m 42s',
      trend: '+2.3%',
      icon: Calendar,
      color: 'orange',
    },
  ];

  return (
    <div className="p-6 fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-grey-100">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Comprehensive data insights and trends
          </p>
        </div>

        <div className="flex gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>

          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          const colorClasses = {
            blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40',
            green: 'bg-green-100 text-green-600 dark:bg-green-900/40',
            purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/40',
            orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/40',
          };

          return (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-lg ${colorClasses[metric.color]}`}
                >
                  <Icon size={24} />
                </div>
                <span className="text-sm font-semibold text-green-600">
                  {metric.trend}
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {metric.label}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {metric.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <Chart
            type="line"
            data={userGrowthData}
            title="User Growth Trend"
            height={350}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <Chart
            type="bar"
            data={revenueData}
            title="Revenue Analysis"
            height={300}
          />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <Chart
            type="pie"
            data={categoryData}
            title="Category Distribution"
            height={300}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Detailed Metrics
          </h3>
          <button className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            <Filter size={16} />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Metric
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Current
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Previous
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Change
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {[
                ['Page Views', '45,234', '38,912', '+16.2%'],
                ['Bounce Rate', '42.3%', '45.8%', '-7.6%'],
                ['Avg. Session Duration', '8m 42s', '8m 12s', '+6.1%'],
                ['Conversion Rate', '3.24%', '2.98%', '+8.7%'],
                ['New Users', '1,847', '1,623', '+13.8%'],
              ].map((row, i) => (
                <tr
                  key={i}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                    {row[0]}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {row[1]}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {row[2]}
                  </td>
                  <td className="px-6 py-4 text-sm text-green-600 font-medium">
                    {row[3]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

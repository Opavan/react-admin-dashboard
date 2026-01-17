import { useState } from 'react';
import { FileText, Download, Calendar, Filter, TrendingUp, DollarSign, Users, Package } from 'lucide-react';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('sales');

  const reportTypes = [
    { id: 'sales', name: 'Sales Report', icon: DollarSign, color: 'blue' },
    { id: 'customers', name: 'Customer Report', icon: Users, color: 'green' },
    { id: 'inventory', name: 'Inventory Report', icon: Package, color: 'purple' },
    { id: 'revenue', name: 'Revenue Report', icon: TrendingUp, color: 'orange' },
  ];

  const savedReports = [
    { id: 1, name: 'Q1 2024 Sales Summary', type: 'Sales', date: '2024-04-01', size: '2.4 MB', downloads: 45 },
    { id: 2, name: 'March Customer Analytics', type: 'Customers', date: '2024-03-31', size: '1.8 MB', downloads: 32 },
    { id: 3, name: 'Inventory Status - March', type: 'Inventory', date: '2024-03-30', size: '3.1 MB', downloads: 28 },
    { id: 4, name: 'Revenue Analysis Q1', type: 'Revenue', date: '2024-03-28', size: '2.7 MB', downloads: 51 },
    { id: 5, name: 'February Sales Report', type: 'Sales', date: '2024-03-01', size: '2.2 MB', downloads: 38 },
  ];

  const quickStats = [
    { label: 'Total Reports', value: '127', change: '+12%', icon: FileText, color: 'blue' },
    { label: 'Generated This Month', value: '23', change: '+8%', icon: Calendar, color: 'green' },
    { label: 'Total Downloads', value: '842', change: '+15%', icon: Download, color: 'purple' },
    { label: 'Average Size', value: '2.3 MB', change: '-5%', icon: Filter, color: 'orange' },
  ];

  const handleGenerateReport = () => {
    alert(`Generating ${selectedReport} report for ${selectedPeriod}...`);
  };

  const handleDownloadReport = (reportId) => {
    alert(`Downloading report ${reportId}...`);
  };

  return (
    <div className="p-6 fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
          <p className="text-gray-600 mt-1">Generate and download business reports</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {quickStats.map((stat, idx) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'from-blue-500 to-blue-600',
            green: 'from-green-500 to-green-600',
            purple: 'from-purple-500 to-purple-600',
            orange: 'from-orange-500 to-orange-600',
          };
          
          return (
            <div key={idx} className={`bg-gradient-to-br ${colorClasses[stat.color]} rounded-lg shadow-lg p-6 text-white`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  <p className="text-white/80 text-sm mt-2">{stat.change} from last month</p>
                </div>
                <Icon size={40} className="opacity-50" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Generate New Report */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Generate New Report</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {reportTypes.map((type) => {
            const Icon = type.icon;
            const colorClasses = {
              blue: 'border-blue-500 bg-blue-50 text-blue-700',
              green: 'border-green-500 bg-green-50 text-green-700',
              purple: 'border-purple-500 bg-purple-50 text-purple-700',
              orange: 'border-orange-500 bg-orange-50 text-orange-700',
            };
            
            return (
              <button
                key={type.id}
                onClick={() => setSelectedReport(type.id)}
                className={`p-4 border-2 rounded-lg transition ${
                  selectedReport === type.id
                    ? colorClasses[type.color]
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon size={32} className="mx-auto mb-2" />
                <p className="text-sm font-medium">{type.name}</p>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Period</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="pdf">PDF</option>
              <option value="excel">Excel (XLSX)</option>
              <option value="csv">CSV</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Include</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="summary">Summary Only</option>
              <option value="detailed">Detailed Data</option>
              <option value="charts">With Charts</option>
              <option value="all">Everything</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerateReport}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          <FileText size={20} />
          Generate Report
        </button>
      </div>

      {/* Saved Reports */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Recent Reports</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Report Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Generated Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Downloads</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {savedReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText size={20} className="text-blue-600" />
                      </div>
                      <div className="font-medium text-gray-900">{report.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                      {report.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{report.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{report.size}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{report.downloads} times</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDownloadReport(report.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                    >
                      <Download size={16} />
                      Download
                    </button>
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

export default Reports;
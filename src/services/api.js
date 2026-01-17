// Mock API functions - replace with real API call//
// Get dashboard statistics
export const getDashboardStats = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalRevenue: 54239,
        revenueChange: 12.5,
        activeUsers: 4239,
        usersChange: 18.2,
        totalOrders: 1429,
        ordersChange: -4.3,
        conversionRate: 3.24,
        conversionChange: 2.1,
      });
    }, 500);
  });
};

// Get revenue data for charts
export const getRevenueData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { month: 'Jan', revenue: 4200, expenses: 2400 },
        { month: 'Feb', revenue: 3800, expenses: 2200 },
        { month: 'Mar', revenue: 5100, expenses: 2800 },
        { month: 'Apr', revenue: 4600, expenses: 2600 },
        { month: 'May', revenue: 6200, expenses: 3100 },
        { month: 'Jun', revenue: 5800, expenses: 2900 },
      ]);
    }, 500);
  });
};

// Get user growth data
export const getUserGrowthData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { month: 'Jan', users: 1200 },
        { month: 'Feb', users: 1900 },
        { month: 'Mar', users: 2400 },
        { month: 'Apr', users: 2800 },
        { month: 'May', users: 3500 },
        { month: 'Jun', users: 4200 },
      ]);
    }, 500);
  });
};

// Get category data
export const getCategoryData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: 'Electronics', value: 35 },
        { name: 'Clothing', value: 25 },
        { name: 'Food', value: 20 },
        { name: 'Others', value: 20 },
      ]);
    }, 500);
  });
};

// Get users list
export const getUsers = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user', status: 'inactive' },
        { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'user', status: 'active' },
        { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'user', status: 'active' },
      ]);
    }, 500);
  });
};

// Get recent activities
export const getRecentActivities = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, action: 'New order received', time: '2 minutes ago', status: 'success' },
        { id: 2, action: 'Payment processed', time: '15 minutes ago', status: 'success' },
        { id: 3, action: 'User registered', time: '1 hour ago', status: 'info' },
        { id: 4, action: 'System update completed', time: '2 hours ago', status: 'warning' },
      ]);
    }, 500);
  });
};
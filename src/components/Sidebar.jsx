import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Package,
  FileText,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { isAdmin } = useAuth();
  const [expandedMenus, setExpandedMenus] = useState({
    customers: false,
    products: false,
  });

  const toggleMenu = (menu) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const mainNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Reports', path: '/reports', icon: FileText },
  ];

  const customerSubItems = [
    { name: 'All Customers', path: '/customers/all' },
    { name: 'New Customers', path: '/customers/new' },
    { name: 'Verified Customers', path: '/customers/verified' },
  ];

  const productSubItems = [
    { name: 'All Products', path: '/products/all' },
    { name: 'New Products', path: '/products/new' },
    { name: 'Inventory', path: '/products/inventory' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed lg:relative lg:translate-x-0 z-30 w-64 h-full bg-slate-900 text-slate-200 transition-transform duration-300`}
      >
        <div className="flex flex-col h-full">

          {/* Header */}
          <div className="p-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <LayoutDashboard size={22} />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">AdminHub</h1>
                <p className="text-xs text-slate-400">Management System</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">

            {mainNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all ${
                      isActive
                        ? 'bg-blue-600/15 text-blue-400 border-l-4 border-blue-500'
                        : 'hover:bg-slate-800 text-slate-300'
                    }`
                  }
                >
                  <Icon size={18} />
                  {item.name}
                </NavLink>
              );
            })}

            {/* Customers */}
            {isAdmin && (
              <>
                <div className="pt-4">
                  <button
                    onClick={() => toggleMenu('customers')}
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm hover:bg-slate-800 transition"
                  >
                    <span className="flex items-center gap-3">
                      <Users size={18} />
                      Customers
                    </span>
                    {expandedMenus.customers ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </button>
                </div>

                {expandedMenus.customers && (
                  <div className="ml-6 mt-1 space-y-1 border-l border-slate-700 pl-4">
                    {customerSubItems.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded-md text-xs transition ${
                            isActive
                              ? 'text-blue-400 bg-blue-600/10'
                              : 'text-slate-400 hover:bg-slate-800'
                          }`
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                )}

                {/* Products */}
                <div className="pt-2">
                  <button
                    onClick={() => toggleMenu('products')}
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm hover:bg-slate-800 transition"
                  >
                    <span className="flex items-center gap-3">
                      <Package size={18} />
                      Products
                    </span>
                    {expandedMenus.products ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </button>
                </div>

                {expandedMenus.products && (
                  <div className="ml-6 mt-1 space-y-1 border-l border-slate-700 pl-4">
                    {productSubItems.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded-md text-xs transition ${
                            isActive
                              ? 'text-blue-400 bg-blue-600/10'
                              : 'text-slate-400 hover:bg-slate-800'
                          }`
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Settings */}
            <div className="pt-4">
              <NavLink
                to="/settings"
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition ${
                    isActive
                      ? 'bg-blue-600/15 text-blue-400 border-l-4 border-blue-500'
                      : 'hover:bg-slate-800 text-slate-300'
                  }`
                }
              >
                <Settings size={18} />
                Settings
              </NavLink>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-slate-800 text-center text-xs text-slate-500">
            © 2025 AdminHub · v1.0.0
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

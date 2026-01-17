
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

// Customer Pages
import AllCustomers from './pages/customers/AllCustomers';
import NewCustomers from './pages/customers/NewCustomers';
import VerifiedCustomers from './pages/customers/VerifiedCustomers';

// Product Pages
import AllProducts from './pages/products/AllProducts';
import NewProducts from './pages/products/NewProducts';
import Inventory from './pages/products/Inventory';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // STEP 1: Load dark mode from localStorage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  // STEP 2: Save dark mode when it changes
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // STEP 3: Apply dark class to <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <div className={`flex h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                  
                  <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />

                  <div className="flex-1 flex flex-col overflow-hidden">
                    <Navbar
                      sidebarOpen={sidebarOpen}
                      setSidebarOpen={setSidebarOpen}
                      darkMode={darkMode}
                      setDarkMode={setDarkMode}
                    />

                    <main className="flex-1 overflow-auto p-4">
                      <Routes>

                        {/* Default */}
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />

                        {/* Main Pages */}
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/reports" element={<Reports />} />
                        <Route path="/settings" element={<Settings />} />

                        {/* Customer Routes */}
                        <Route
                          path="/customers/all"
                          element={
                            <ProtectedRoute requireAdmin>
                              <AllCustomers />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/customers/new"
                          element={
                            <ProtectedRoute requireAdmin>
                              <NewCustomers />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/customers/verified"
                          element={
                            <ProtectedRoute requireAdmin>
                              <VerifiedCustomers />
                            </ProtectedRoute>
                          }
                        />

                        {/* Product Routes */}
                        <Route
                          path="/products/all"
                          element={
                            <ProtectedRoute requireAdmin>
                              <AllProducts />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/products/new"
                          element={
                            <ProtectedRoute requireAdmin>
                              <NewProducts />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/products/inventory"
                          element={
                            <ProtectedRoute requireAdmin>
                              <Inventory />
                            </ProtectedRoute>
                          }
                        />

                        {/* 404 */}
                        <Route path="*" element={<Navigate to="/dashboard" replace />} />

                      </Routes>
                    </main>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

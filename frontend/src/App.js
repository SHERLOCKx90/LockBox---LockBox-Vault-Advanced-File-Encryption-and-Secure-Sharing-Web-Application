import React, { createContext, useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

// Create a Context for Authentication
const AuthContext = createContext();

// Custom Hook to use Auth Context
const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [userId, setUserId] = useState(localStorage.getItem('userId')); // Manage user authentication state

  const login = (id) => {
    setUserId(id);
    localStorage.setItem('userId', id);
  };

  const logout = () => {
    setUserId(null);
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={<ProtectedRoute Component={Login} redirectTo="/dashboard" />}
            />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={<ProtectedRoute Component={Dashboard} redirectTo="/" />}
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

// Protected Route Component
function ProtectedRoute({ Component, redirectTo }) {
  const { userId } = useAuth();

  if (redirectTo === "/dashboard" && userId) {
    return <Navigate to={redirectTo} />;
  }

  if (redirectTo === "/" && !userId) {
    return <Navigate to={redirectTo} />;
  }

  return <Component />;
}

export { useAuth };
export default App;

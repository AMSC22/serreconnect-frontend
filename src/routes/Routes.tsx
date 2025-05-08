import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ResetPassword from '../pages/ResetPassword';
import History from '../pages/History';
import Alerts from '../pages/Alerts';
import Settings from '../pages/Settings';
import Terms from '../pages/Terms';
import Privacy from '../pages/Privacy';
import FAQ from '../pages/FAQ';
import ForgotPassword from '../pages/ForgotPassword';
import AdminDashboard from '../pages/AdminDashboard';
import GreenhouseCreate from '../pages/GreenhouseCreate';
import GreenhouseDashboard from '../pages/GreenhouseDashboard';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminRoute from '../components/AdminRoute';
import AdminSettings from '../pages/AdminSettings';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/faq" element={<FAQ />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/greenhouse/create"
        element={
          <ProtectedRoute>
            <GreenhouseCreate />
          </ProtectedRoute>
        }
      />
      <Route
        path="/greenhouse/:greenhouseId"
        element={
          <ProtectedRoute>
            <GreenhouseDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/history/:greenhouseId"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />
      <Route
        path="/alerts/:greenhouseId"
        element={
          <ProtectedRoute>
            <Alerts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings/:greenhouseId"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute>
            <AdminSettings />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<div>Page non trouvée</div>} />
    </Routes>
  );
};

export default AppRoutes;
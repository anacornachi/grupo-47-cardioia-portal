import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {AuthProvider} from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import {useAuth} from "./contexts/useAuth";
import type {ReactNode} from "react";
import {GlobalStyle} from "./styles/global";

const Layout = ({children}: {children: ReactNode}) => {
  const {isAuthenticated} = useAuth();
  return (
    <>
      {isAuthenticated && <Navbar />}
      {children}
    </>
  );
};

const AppRoutes = () => (
  <Layout>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/patients"
        element={
          <PrivateRoute>
            <Patients />
          </PrivateRoute>
        }
      />
      <Route
        path="/appointments"
        element={
          <PrivateRoute>
            <Appointments />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </Layout>
);

const App = () => (
  <BrowserRouter>
    <GlobalStyle />
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </BrowserRouter>
);

export default App;

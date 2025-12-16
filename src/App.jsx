// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Header from './components/header';
import Footer from './components/footer';
import ContactUsPage from './components/contactus';
import PopularDestinations from './components/destinations/page'; 
import DestinationDetails from './components/des-details/page';
import PlanningTripPage from './components/planning';
import CategoryPage from './components/category-page';
import AboutUsPage from './components/about-us';
import KeyExperiencesPage from './components/key-exp';
import CustomizePackages from './components/customize-packages';

// Context imports
import { PublicPackagesProvider } from './context/PublicPackagesContext';
import { CategoryProvider } from './context/CategoryContext';

// Admin imports
import { AuthProvider } from './admin/context/AuthContext';
import { PackageProvider } from './admin/context/PackageContext';
import AdminLogin from './admin/pages/AdminLogin';
import AdminLayout from './admin/components/AdminLayout';
import ProtectedRoute from './admin/components/ProtectedRoute';
import Dashboard from './admin/pages/Dashboard';
import PackageList from './admin/pages/PackageList';
import PackageForm from './admin/pages/PackageForm';
import PackageDetail from './admin/pages/PackageDetail';
import Customers from './admin/pages/Customers';
import CustomizedPackages from './admin/pages/CustomizedPackages';
import CategoryList from './admin/pages/CategoryList';
import CategoryForm from './admin/pages/CategoryForm';
import ImageStorageTest from './admin/pages/ImageStorageTest';

import "leaflet/dist/leaflet.css";
import './admin/styles/premium.css';

function App() {
  return (
    <AuthProvider>
      <PackageProvider>
        <CategoryProvider>
          <PublicPackagesProvider>
            <Router>
            <div className="App">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={
                  <>
                    <Header />
                    <Home />
                    <Footer />
                  </>
                } />
                <Route path="/about" element={
                  <>
                    <Header />
                    <AboutUsPage />
                    <Footer />
                  </>
                } />
                <Route path="/planning" element={
                  <>
                    <Header />
                    <PlanningTripPage />
                    <Footer />
                  </>
                } />
                <Route path="/planning/category/:categoryId" element={
                  <>
                    <Header />
                    <CategoryPage />
                    <Footer />
                  </>
                } />
                <Route path="/destinations" element={
                  <>
                    <Header />
                    <PopularDestinations />
                    <Footer />
                  </>
                } />
                <Route path="/destinations/:id" element={
                  <>
                    <Header />
                  <DestinationDetails />
                  <Footer />
                </>
              } />
              <Route path="/experiences" element={
                <>
                  <Header />
                  <KeyExperiencesPage />
                  <Footer />
                </>
              } />
              <Route path="/contactus" element={
                <>
                  <Header />
                  <ContactUsPage />
                  <Footer />
                </>
              } />
              <Route path="/customize-packages" element={
                <>
                  <Header />
                  <CustomizePackages />
                  <Footer />
                </>
              } />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="packages" element={<PackageList />} />
                <Route path="packages/new" element={<PackageForm />} />
                <Route path="packages/:id" element={<PackageDetail />} />
                <Route path="packages/:id/edit" element={<PackageForm />} />
                <Route path="categories" element={<CategoryList />} />
                <Route path="categories/new" element={<CategoryForm />} />
                <Route path="categories/edit/:categoryId" element={<CategoryForm />} />
                <Route path="customers" element={<Customers />} />
                <Route path="customized-packages" element={<CustomizedPackages />} />
                <Route path="test-images" element={<ImageStorageTest />} />
                <Route index element={<Dashboard />} />
              </Route>
            </Routes>
          </div>
        </Router>
        </PublicPackagesProvider>
        </CategoryProvider>
      </PackageProvider>
    </AuthProvider>
  );
}

export default App;

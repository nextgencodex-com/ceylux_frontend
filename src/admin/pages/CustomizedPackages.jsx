import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiUsers, 
  FiCalendar, 
  FiMapPin, 
  FiDollarSign,
  FiMail,
  FiPhone,
  FiEye,
  FiCheck,
  FiX,
  FiClock
} from 'react-icons/fi';
import { databaseService } from '../../services/databaseService';

const CustomizedPackages = () => {
  const [customizedPackages, setCustomizedPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadCustomizedPackages();
    
    // Set up real-time listener
    const unsubscribe = databaseService.customizedPackages.onSnapshot((updatedPackages) => {
      setCustomizedPackages(updatedPackages);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loadCustomizedPackages = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await databaseService.customizedPackages.getAll();
      if (result.success) {
        setCustomizedPackages(result.data);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Failed to load customized packages');
    } finally {
      setIsLoading(false);
    }
  };

  const updatePackageStatus = async (id, status) => {
    try {
      const result = await databaseService.customizedPackages.updateStatus(id, status);
      if (result.success) {
        // Update will be reflected via real-time listener
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Failed to update package status');
    }
  };

  const viewPackageDetails = (pkg) => {
    setSelectedPackage(pkg);
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading customized packages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customized Packages</h1>
          <p className="mt-2 text-gray-600">
            Manage customer customization requests and bookings
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-white rounded-lg border border-gray-200 px-4 py-2">
            <span className="text-sm text-gray-600">Total Requests: </span>
            <span className="font-semibold text-gray-900">{customizedPackages.length}</span>
          </div>
        </div>
      </motion.div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Packages Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        {customizedPackages.length === 0 ? (
          <div className="text-center py-12">
            <FiMapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-2">No customized packages yet</p>
            <p className="text-gray-500">Customer customizations will appear here</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Package Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Travel Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customizedPackages.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {pkg.customerInfo?.name || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <FiMail className="h-3 w-3" />
                          {pkg.customerInfo?.email || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <FiPhone className="h-3 w-3" />
                          {pkg.customerInfo?.phone || 'N/A'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {pkg.packageTitle || 'Custom Package'}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <FiCalendar className="h-3 w-3" />
                          {pkg.duration?.days || 0} days, {pkg.duration?.nights || 0} nights
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <FiUsers className="h-3 w-3" />
                          {pkg.dayDetails?.reduce((total, day) => total + (day.guests || 0), 0) || 0} guests
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(pkg.travelDates?.from)} - {formatDate(pkg.travelDates?.to)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 flex items-center gap-1">
                        <FiDollarSign className="h-4 w-4" />
                        {pkg.totalPrice || 0} {pkg.currency || 'USD'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(pkg.status)}`}>
                        {pkg.status || 'pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => viewPackageDetails(pkg)}
                        className="text-indigo-600 hover:text-indigo-900 inline-flex items-center gap-1"
                      >
                        <FiEye className="h-4 w-4" />
                        View
                      </button>
                      {pkg.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updatePackageStatus(pkg.id, 'confirmed')}
                            className="text-green-600 hover:text-green-900 inline-flex items-center gap-1"
                          >
                            <FiCheck className="h-4 w-4" />
                            Confirm
                          </button>
                          <button
                            onClick={() => updatePackageStatus(pkg.id, 'cancelled')}
                            className="text-red-600 hover:text-red-900 inline-flex items-center gap-1"
                          >
                            <FiX className="h-4 w-4" />
                            Cancel
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Package Details Modal */}
      {showModal && selectedPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Package Details
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Name</label>
                    <p className="text-sm text-gray-900">{selectedPackage.customerInfo?.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-sm text-gray-900">{selectedPackage.customerInfo?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <p className="text-sm text-gray-900">{selectedPackage.customerInfo?.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Special Requests</label>
                    <p className="text-sm text-gray-900">{selectedPackage.customerInfo?.specialRequests || 'None'}</p>
                  </div>
                </div>
              </div>

              {/* Package Details */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Package Details</h3>
                <div className="space-y-4">
                  {selectedPackage.dayDetails?.map((day, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Day {day.day}</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Guests</label>
                          <p className="text-sm text-gray-900">{day.guests}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Transportation</label>
                          <p className="text-sm text-gray-900">{day.transportation}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Hotel</label>
                          <p className="text-sm text-gray-900">{day.hotel?.name}</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <label className="text-sm font-medium text-gray-500">Activities</label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {day.activities?.map((activity, actIndex) => (
                            <span key={actIndex} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {activity.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Pricing</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-900">Total Price:</span>
                    <span className="text-xl font-bold text-green-600">
                      ${selectedPackage.totalPrice} {selectedPackage.currency}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomizedPackages;
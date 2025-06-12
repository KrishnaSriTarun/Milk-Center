import React, { useState, useEffect } from 'react';
import { Package, Calendar, DollarSign, Droplets, RefreshCw } from 'lucide-react';
import { getAllSupply } from './../../Services/Supply';
import { toast } from 'react-toastify';

function Dashboard() {
      const [suppliesData, setSuppliesData] = useState({
            currentPage: 1,
            totalPages: 1,
            totalSupplies: 0,
            supplies: []
      });

      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [sellerFilter, setSellerFilter] = useState('');

      const fetchSupplies = async () => {
            setLoading(true);
            setError(null);
            try {
                  const response = await getAllSupply();
                  toast.success('Data refreshed successfully');
                  setSuppliesData(response.data);
            } catch (err) {
                  console.error('Error fetching supplies:', err);
                  setError('Failed to load supplies data');
                  toast.error('Failed to load supplies');
            } finally {
                  setLoading(false);
            }
      };

      useEffect(() => {
            fetchSupplies();
      }, []);

      const formatAmount = (amount) => {
            return new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
            }).format(amount);
      };

      const getFatBadgeClass = (fat) => {
            if (fat < 4.5) return 'badge bg-danger';
            if (fat < 7) return 'badge bg-warning';
            return 'badge bg-success';
      };

      const filteredSupplies = suppliesData.supplies.filter(supply =>
            sellerFilter === '' || supply.sellerId.toString().includes(sellerFilter)
      );

      if (loading) {
            return (
                  <div className="container-fluid py-4">
                        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                              <div className="text-center">
                                    <div className="spinner-border text-primary mb-3" role="status">
                                          <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <p className="text-muted">Loading supplies data...</p>
                              </div>
                        </div>
                  </div>
            );
      }

      return (
            <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
                  {/* Header */}
                  <div className="card mb-4 shadow-sm">
                        <div className="card-body">
                              <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                          <h1 className="card-title h2 mb-2">Supplies Dashboard</h1>
                                          <p className="text-muted mb-0">Manage and track your milk supplies</p>
                                    </div>
                                    <button 
                                          className="btn btn-primary d-flex align-items-center gap-2" 
                                          onClick={fetchSupplies} 
                                          disabled={loading}
                                    >
                                          <RefreshCw size={16} className={loading ? 'spinner-border spinner-border-sm' : ''} />
                                          Refresh Data
                                    </button>
                              </div>
                              {error && (
                                    <div className="alert alert-danger mt-3 mb-0" role="alert">
                                          {error}
                                    </div>
                              )}
                        </div>
                  </div>

                  {/* Filter */}
                  <div className="card mb-4 shadow-sm">
                        <div className="card-body">
                              <div className="row align-items-center">
                                    <div className="col-md-6">
                                          <div className="d-flex align-items-center gap-3">
                                                <label htmlFor="sellerFilter" className="form-label mb-0 fw-semibold">
                                                      Filter by Seller ID:
                                                </label>
                                                <input
                                                      type="text"
                                                      id="sellerFilter"
                                                      className="form-control"
                                                      style={{ maxWidth: '200px' }}
                                                      value={sellerFilter}
                                                      onChange={(e) => setSellerFilter(e.target.value)}
                                                      placeholder="Enter seller ID"
                                                />
                                          </div>
                                    </div>
                                    <div className="col-md-6 text-md-end mt-2 mt-md-0">
                                          <small className="text-muted">
                                                Showing {filteredSupplies.length} of {suppliesData.totalSupplies} records
                                          </small>
                                    </div>
                              </div>
                        </div>
                  </div>

                  {/* Supplies Table */}
                  <div className="card shadow-sm">
                        <div className="card-header bg-white">
                              <h5 className="card-title mb-0">Milk Records</h5>
                        </div>
                        <div className="card-body p-0">
                              <div className="table-responsive">
                                    <table className="table table-hover mb-0">
                                          <thead className="table-light">
                                                <tr>
                                                      <th className="border-0">Seller ID</th>
                                                      <th className="border-0">Name</th>
                                                      <th className="border-0">Quantity</th>
                                                      <th className="border-0">Fat %</th>
                                                      <th className="border-0">Rate</th>
                                                      <th className="border-0">Amount</th>
                                                      <th className="border-0">Status</th>
                                                </tr>
                                          </thead>
                                          <tbody>
                                                {filteredSupplies.length > 0 ? (
                                                      filteredSupplies.map((supply, index) => (
                                                            <tr key={supply._id}>
                                                                  <td>
                                                                        <div className="d-flex align-items-center">
                                                                              <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-2" 
                                                                                    style={{ width: '32px', height: '32px' }}>
                                                                                    <span className="text-dark fw-semibold small">{supply.sellerId}</span>
                                                                              </div>
                                                                        </div>
                                                                  </td>
                                                                  <td>
                                                                        <span className="text-muted">Name</span>
                                                                  </td>
                                                                  <td>
                                                                        <span className="fw-medium">{supply.quantity} L</span>
                                                                  </td>
                                                                  <td>
                                                                        <span className={getFatBadgeClass(supply.fat)}>
                                                                              {supply.fat}%
                                                                        </span>
                                                                  </td>
                                                                  <td>
                                                                        <span className="fw-medium">${supply.rate}</span>
                                                                  </td>
                                                                  <td>
                                                                        <span className="fw-semibold text-success">{formatAmount(supply.amount)}</span>
                                                                  </td>
                                                                  <td>
                                                                        <span className={`badge ${supply.status === 'Completed' ? 'bg-success' : 'bg-warning text-dark'} px-2 py-1 rounded`}>{supply.status}
                                                                        </span>
                                                                  </td>
                                                            </tr>
                                                      ))
                                                ) : (
                                                      <tr>
                                                            <td colSpan="8" className="text-center py-4">
                                                                  <div className="text-muted">
                                                                        <Package size={48} className="mb-2 opacity-50" />
                                                                        <p className="mb-0">No supplies found matching your filter</p>
                                                                  </div>
                                                            </td>
                                                      </tr>
                                                )}
                                          </tbody>
                                    </table>
                              </div>
                        </div>
                  </div>

                  {/* Pagination */}
                  {suppliesData.totalPages > 1 && (
                        <div className="card mt-4 shadow-sm">
                              <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center">
                                          <div>
                                                <span className="text-muted">
                                                      Showing page <strong>{suppliesData.currentPage}</strong> of{' '}
                                                      <strong>{suppliesData.totalPages}</strong>
                                                </span>
                                          </div>
                                          <nav>
                                                <ul className="pagination mb-0">
                                                      <li className={`page-item ${suppliesData.currentPage === 1 ? 'disabled' : ''}`}>
                                                            <button className="page-link" disabled={suppliesData.currentPage === 1}>
                                                                  Previous
                                                            </button>
                                                      </li>
                                                      <li className={`page-item ${suppliesData.currentPage === suppliesData.totalPages ? 'disabled' : ''}`}>
                                                            <button className="page-link" disabled={suppliesData.currentPage === suppliesData.totalPages}>
                                                                  Next
                                                            </button>
                                                      </li>
                                                </ul>
                                          </nav>
                                    </div>
                              </div>
                        </div>
                  )}
            </div>
      );
}

export default Dashboard;
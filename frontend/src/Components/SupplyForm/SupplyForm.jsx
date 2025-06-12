import React, { useState } from 'react';
import { addNewSupply } from '../../Services/Supply';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SupplyForm() {
      const [formData, setFormData] = useState({
            sellerId: '',
            quantity: '',
            fat: '',
            status: 'Pending',
      });

      const handleChange = (e) => {
            setFormData({
                  ...formData,
                  [e.target.name]: e.target.value
            });
      };

      const handleSubmit = async (e) => {
            e.preventDefault();

            const formattedData = {
                  sellerId: parseInt(formData.sellerId),
                  quantity: parseFloat(formData.quantity),
                  fat: parseFloat(formData.fat),
                  status: formData.status,
            };

            try {
                  const response = await addNewSupply(formattedData);
                  toast.success('Supply added successfully');
                  setFormData({ sellerId: '', quantity: '', fat: '', status: 'Pending' });
            } catch (error) {
                  toast.error('Something went wrong');
            }
      };

      return (
            <div className="container my-5">
                  <div className="card shadow-sm mx-auto" style={{ maxWidth: '500px' }}>
                        <div className="card-body">
                              <h2 className="card-title text-center mb-4">Add Milk Supply</h2>
                              <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                          <label className="form-label">Seller ID</label>
                                          <input
                                                type="number"
                                                name="sellerId"
                                                value={formData.sellerId}
                                                onChange={handleChange}
                                                className="form-control"
                                                required
                                          />
                                    </div>
                                    <div className="mb-3">
                                          <label className="form-label">Quantity (litres)</label>
                                          <input
                                                type="number"
                                                step="0.1"
                                                name="quantity"
                                                value={formData.quantity}
                                                onChange={handleChange}
                                                className="form-control"
                                                required
                                          />
                                    </div>
                                    <div className="mb-3">
                                          <label className="form-label">Fat %</label>
                                          <input
                                                type="number"
                                                step="0.1"
                                                name="fat"
                                                value={formData.fat}
                                                onChange={handleChange}
                                                className="form-control"
                                                required
                                          />
                                    </div>
                                    {/* {total amount popup} */}
                                    <button type="submit" className="btn btn-primary w-100">
                                          Add Supply
                                    </button>
                              </form>
                        </div>
                  </div>

                  <ToastContainer position="top-center" autoClose={3000} />
            </div>
      );
}

export default SupplyForm;

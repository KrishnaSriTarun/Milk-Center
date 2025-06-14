import { useEffect, useState } from 'react';
import { addNewSupply, getAllSupply } from '../../Services/Supply';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getlatestRate } from '../../Services/Rate';

function SupplyForm({ setSubmittedData }) {
      const [loading, setLoading] = useState(false)
      const [formData, setFormData] = useState({
            sellerId: '',
            quantity: '',
            fat: '',
      });
      const [rate, setRate] = useState(0);


      const [sellerIds, setSellerIds] = useState([]);
      useEffect(() => {
            const fetchSellerIds = async () => {
                  try {
                        const res = await getAllSupply();
                        setSellerIds(res.data.distinctUserIds || []);
                  } catch (err) {
                        toast.error('Failed to fetch user IDs');
                        console.error(err);
                  }
            };

            fetchSellerIds();
      }, []);
      useEffect(() => {
            const fetchRate = async () => {
                  try {
                        const res = await getlatestRate();
                        setRate(res.data.rate);
                  } catch (err) {
                        toast.error('Failed to fetch user IDs');
                        console.error(err);
                  }
            };
            fetchRate();
      }, []);

      const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({
                  ...prev,
                  [name]: value,
            }));
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true)
            const supplyData = {
                  sellerId: Number(formData.sellerId),
                  quantity: Number(formData.quantity),
                  fat: Number(formData.fat),
                  status: 'Pending'
            };
            try {
                  await addNewSupply(supplyData);
                  toast.success('Supply added successfully!');
                  console.log("Submitting with rate:", rate);
                  setSubmittedData({ ...supplyData, amount: totalAmount(),rate: rate });
                  setFormData({ sellerId: '', quantity: '', fat: '' });
            } catch (err) {
                  toast.error('Failed to add supply');
                  console.error(err);
            }
            finally {
                  setLoading(false)
            }
      };
      const totalAmount = () => {
            const { quantity, fat } = formData;
            if (!quantity || !fat || !rate) return 0;
            return Math.floor(quantity * fat * rate);
      };


      return (
            <div
                  className="category-form-container"
                  style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}
            >
                  <div className="mx-2 mt-2">
                        <div className="row ">
                              <div className="card col-md-12 form-container" style={{ borderRadius: '16px' }}>
                                    <div className="card-body">
                                          <form onSubmit={handleSubmit}>
                                                <div className="mb-3">
                                                      <label htmlFor="sellerId" className="form-label text-dark">
                                                            User ID
                                                      </label>
                                                      <select
                                                            name="sellerId"
                                                            className="form-select"
                                                            onChange={handleChange}
                                                            value={formData.sellerId}
                                                            required
                                                      >
                                                            <option value="">Select User</option>
                                                            {sellerIds.map((id) => (
                                                                  <option key={id} value={id}>
                                                                        {id}
                                                                  </option>
                                                            ))}
                                                      </select>
                                                </div>

                                                {/* Quantity Input */}
                                                <div className="mb-3">
                                                      <label htmlFor="quantity" className="form-label text-dark">
                                                            Quantity
                                                      </label>
                                                      <input
                                                            type="number"
                                                            step="0.01"
                                                            name="quantity"
                                                            id="quantity"
                                                            className="form-control"
                                                            placeholder="Enter quantity"
                                                            value={formData.quantity}
                                                            onChange={handleChange}
                                                            required />
                                                </div>
                                                <div className="mb-3">
                                                      <label htmlFor="fat" className="form-label text-dark">
                                                            Fat (%)
                                                      </label>
                                                      <input
                                                            type="number"
                                                            step="0.01"
                                                            name="fat"
                                                            id="fat"
                                                            className="form-control"
                                                            placeholder="Enter fat %"
                                                            value={formData.fat}
                                                            onChange={handleChange}
                                                            required
                                                      />
                                                </div>
                                                <button type="submit" className="btn btn-warning w-100" disabled={loading}>{loading ? "Loading" : "Submit"}</button>
                                          </form>
                                          <div className="card mt-3 shadow-sm " >
                                                <div className="card-body">
                                                      <h5 className="text-dark">Total Amount:</h5>
                                                      <p className="fs-5 fw-semibold text-success">₹ {totalAmount()}</p>
                                                      <small className="text-muted">
                                                            Based on Quantity × Fat × Rate (₹{rate})
                                                      </small>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
}

export default SupplyForm;

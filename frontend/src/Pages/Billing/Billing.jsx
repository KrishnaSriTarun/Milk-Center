import { useState } from 'react';
import { getSupplyByRange, markDone, deleteSupply } from '../../Services/Supply';
import './Billing.css';
import { toast } from 'react-toastify';

function Billing() {
      const [sellerId, setSellerId] = useState('');
      const [from, setFrom] = useState('');
      const [to, setTo] = useState('');
      const [supplies, setSupplies] = useState([]);
      const [total, setTotal] = useState(0);

      const handleFetch = async () => {
            try {
                  const res = await getSupplyByRange({ sellerId, from, to });
                  setSupplies(res.data.supplies || []);
                  setTotal(res.data.totalAmount || 0);
            } catch (err) {
                  toast.error('Failed to fetch supply data');
                  console.error(err);
            }
      };

      const handleMarkCompleted = async () => {
            const confirmed = window.confirm('Mark all as Completed?');
            if (!confirmed) return;

            try {
                  const res = await markDone(sellerId, from, to);
                  toast.success(res.data.message);
                  handleFetch(); // Refresh the data
            } catch (err) {
                  toast.error('Failed to update status');
                  console.error(err);
            }
      };

      const handleDelete = async (id) => {
            try {
                  await deleteSupply(id);
                  toast.success('Supply deleted successfully!');
                  handleFetch();
            } catch (err) {
                  toast.error('Failed to delete supply');
                  console.error(err);
            }
      };

      return (
            <div className="billing-container">
                  <h4 className="text-center">Billing Section</h4>
                  <div className="form-group mb-3">
                        <input
                              type="text"
                              placeholder="Seller ID"
                              value={sellerId}
                              onChange={(e) => setSellerId(e.target.value)}
                              className="form-control mb-2"
                        />
                        <input
                              type="date"
                              value={from}
                              onChange={(e) => setFrom(e.target.value)}
                              className="form-control mb-2"
                        />
                        <input
                              type="date"
                              value={to}
                              onChange={(e) => setTo(e.target.value)}
                              className="form-control mb-2"
                        />
                        <button onClick={handleFetch} className="btn btn-primary w-100">Get Supplies</button>
                  </div>

                  {supplies.length > 0 && (
                        <div className="results">
                              <h5>Supplies:</h5>
                              <ul className="list-group">
                                    {supplies.map((supply) => (
                                          <li key={supply._id} className="list-group-item d-flex justify-content-between align-items-center">
                                                <div>
                                                      <span className='bg-warning px-2 rounded'>{supply.createAt?.slice(0, 10)}</span> =
                                                      {supply.quantity}L × {supply.fat}% = ₹{supply.amount} [{supply.status}]
                                                </div>
                                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(supply._id)}>Delete</button>
                                          </li>
                                    ))}
                              </ul>
                              <p className="mt-3"><strong>Total:</strong> ₹{total}</p>
                              <button className="btn btn-success w-100" onClick={handleMarkCompleted}>Mark as Completed</button>
                        </div>
                  )}
            </div>
      );
}

export default Billing;

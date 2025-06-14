import { useEffect, useState } from 'react';
import { getlatestRate, updateRate } from '../../Services/Rate';
import { toast } from 'react-toastify';
import './Rate.css';

function Rate() {
      const [rateId, setRateId] = useState('');
      const [rate, setRate] = useState('');
      const [specialRate, setSpecialRate] = useState('');

      useEffect(() => {
            const fetchRate = async () => {
                  try {
                        const res = await getlatestRate();
                        setRate(res.data.rate);
                        setSpecialRate(res.data.specialRate);
                        setRateId(res.data._id);
                  } catch (err) {
                        toast.error('Failed to fetch latest rate');
                        console.error(err);
                  }
            };
            fetchRate();
      }, []);

      const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                  await updateRate(rateId, {
                        rate: parseFloat(rate),
                        specialRate: parseFloat(specialRate)
                  });
                  toast.success('Rate updated successfully!');
            } catch (err) {
                  toast.error('Failed to update rate');
                  console.error(err);
            }
      };


      return (
            <div className="rate-container">
                  <h4 className="text-center">Milk Rate Settings</h4>
                  <form className="rate-form" onSubmit={handleSubmit}>
                        <div className="mb-3">
                              <label className="form-label">Rate (₹):</label>
                              <input
                                    type="number"
                                    step="0.01"
                                    value={rate}
                                    onChange={(e) => setRate(e.target.value)}
                                    required
                                    className="form-control"
                              />
                        </div>
                        <div className="mb-3">
                              <label className="form-label">Special Rate (₹):</label>
                              <input
                                    type="number"
                                    step="0.01"
                                    value={specialRate}
                                    onChange={(e) => setSpecialRate(e.target.value)}
                                    required
                                    className="form-control"
                              />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                              Update Rate
                        </button>
                  </form>
            </div>
      );
}

export default Rate;

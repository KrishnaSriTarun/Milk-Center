import { useState } from 'react';
import SupplyForm from '../../Components/SupplyForm/SupplyForm';
import SupplyReceipt from '../../Components/SupplyReceipt/SupplyReceipt';
import './Sellers.css';

function Sellers() {
      const [submittedData, setSubmittedData] = useState(null);

      return (
            <div className="category-container text-light">
                  <div className="left-column">
                        <SupplyForm setSubmittedData={setSubmittedData} />
                  </div>
                  <div className="right-column">
                        {submittedData && <SupplyReceipt data={submittedData} />}
                  </div>
            </div>
      );
}

export default Sellers;
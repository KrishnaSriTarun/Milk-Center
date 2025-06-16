import { useState } from 'react';
import SupplyReceipt from '../../Components/SupplyReceipt/SupplyReceipt';
import './SpecialSeller.css';
import SupplyFormSpecial from '../../Components/SupplyFormSpecial/SupplyFormSpecial';
function SpecialSeller() {
      const [submittedData, setSubmittedData] = useState(null);

      return (
            <div className="category-container text-light">
                  <div className="left-column">
                        <SupplyFormSpecial setSubmittedData={setSubmittedData} />
                  </div>
                  <div className="right-column">
                        {submittedData && <SupplyReceipt data={submittedData} />}
                  </div>
            </div>
      );
}


export default SpecialSeller;
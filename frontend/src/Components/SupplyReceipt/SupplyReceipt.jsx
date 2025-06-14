import './SupplyReceipt.css';

function SupplyReceipt({ data }) {
      if (!data) {
            return (
                  <div className="receipt-container no-data">
                        <p>No Data Available</p>
                  </div>
            );
      }

      return (
            <div className="receipt-container">
                  <h5>Supply Receipt</h5>
                  <p><strong>User ID:</strong> {data.sellerId}</p>
                  <p><strong>Quantity:</strong> {data.quantity}</p>
                  <p><strong>Fat:</strong> {data.fat}%</p>
                  <p><strong>Rate:</strong> ₹ {data.rate}</p>
                  <p><strong>Total Amount:</strong> ₹ {data.amount}</p>
            </div>
      );
}

export default SupplyReceipt;

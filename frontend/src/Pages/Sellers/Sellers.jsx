
import SupplyForm from '../../Components/SupplyForm/SupplyForm';
import './Sellers.css';
function Sellers() {
      return (
            <div className="category-container text-light">
                  <div className="left-column">
                        <div><SupplyForm/></div>
                  </div> 
                  <div className="right-column">
                        <div>Supply Recent List</div>
                  </div>
            </div>
      );
}

export default Sellers;
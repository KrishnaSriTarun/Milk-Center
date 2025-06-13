
import { Link } from 'react-router-dom';
import './Navbar.css';
import { assets } from '../../assets/Assets';
const Navbar = () => {
      return (
            <div>
                  <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2">
                        <a className="navbar-brand ms-3" href="#">
                              <img src={assets.logo} alt="Logo" height="40" />
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                              <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse p-2" id="navbarNav">
                              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                          <Link className="nav-link" to="/dashboard">DashBoard</Link>
                                    </li>
                                    <li className="nav-item">
                                          <Link className="nav-link" to="/addMilk">Add Milk</Link>
                                    </li>
                                    <li className="nav-item">
                                          <Link className="nav-link" to="/billing">Billing</Link>
                                    </li>
                                    <li className="nav-item">
                                          <Link className="nav-link" to="/newRate">Rate</Link>
                                    </li>
                                    <li className="nav-item">
                                          <Link className="nav-link" to="/newRate">Manage Users</Link>
                                    </li>
                              </ul>
                        </div>
                  </nav>
            </div>
      );
};

export default Navbar;

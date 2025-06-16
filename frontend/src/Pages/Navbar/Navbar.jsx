
import { Link, useLocation } from 'react-router-dom';

import './Navbar.css';
import { assets } from '../../assets/Assets';
const Navbar = () => {
      const location = useLocation();

      let addMilkLabel = "Add Milk";
      if (location.pathname === "/addMilk/normal") {
            addMilkLabel = "Normal";
      } else if (location.pathname === "/addMilk/special") {
            addMilkLabel = "Special";
      }

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
                                    <li className="nav-item dropdown">
                                          <a
                                                className="nav-link dropdown-toggle"
                                                href="#"
                                                id="addMilkDropdown"
                                                role="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                          >
                                                {addMilkLabel}
                                          </a>
                                          <ul className="dropdown-menu" aria-labelledby="addMilkDropdown">
                                                <li>
                                                      <Link className="dropdown-item" to="/addMilk/normal">Normal</Link>
                                                </li>
                                                <li>
                                                      <Link className="dropdown-item" to="/addMilk/special">Special</Link>
                                                </li>
                                          </ul>
                                    </li>

                                    <li className="nav-item">
                                          <Link className="nav-link" to="/billing">Billing</Link>
                                    </li>
                                    <li className="nav-item">
                                          <Link className="nav-link" to="/newRate">Rate</Link>
                                    </li>
                                    <li className="nav-item">
                                          <Link className="nav-link" to="/users">Manage Users</Link>
                                    </li>
                              </ul>
                        </div>
                  </nav>
            </div>
      );
};

export default Navbar;

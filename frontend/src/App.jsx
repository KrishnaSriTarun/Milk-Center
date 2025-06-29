import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from './Pages/Navbar/Navbar';
import Dashboard from './Pages/Dashboard/Dashboard';
import Sellers from './Pages/Sellers/Sellers';
import { ToastContainer } from 'react-toastify';
import Billing from "./Pages/Billing/Billing";
import Rate from "./Pages/Rate/Rate";
import SpecialSeller from "./Pages/SpecialSeller/SpecialSeller";
import Login from "./Pages/Login/Login";
import Users from "./Pages/Users/Users";
import PrivateRoute from "./PrivateRoute";
import SellerUser from "./Pages/SellerUser/SellerUser";

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login";
  const role=localStorage.getItem("sellerRole");
  return (
    <div>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
        <Route path="/addMilk/normal" element={<PrivateRoute> <Sellers /> </PrivateRoute>} />
        <Route path="/addMilk/special" element={ <PrivateRoute> <SpecialSeller /></PrivateRoute>}/>
        <Route path="/billing" element={<PrivateRoute><Billing /></PrivateRoute>}/>
        <Route path="/newRate"element={<PrivateRoute><Rate /></PrivateRoute>}/>
        <Route path="/addUsers"element={<PrivateRoute><Users /></PrivateRoute>}/>
        <Route path="/users"element={<PrivateRoute><SellerUser /></PrivateRoute>}/>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;


import { Routes, Route } from "react-router-dom";
import Navbar from './Pages/Navbar/Navbar';
import Dashboard from './Pages/Dashboard/Dashboard';
import Sellers from './Pages/Sellers/Sellers';
import { ToastContainer } from 'react-toastify';
import Billing from "./Pages/Billing/Billing";
import Rate from "./Pages/Rate/Rate";
import SpecialSeller from "./Pages/SpecialSeller/SpecialSeller";
import Login from "./Pages/Login/Login";
import Users from "./Pages/Users/Users";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/addMilk/normal' element={<Sellers />} />
        <Route path='/addMilk/special' element={<SpecialSeller />} />
        <Route path='/billing' element={<Billing />} />
        <Route path='/newRate' element={<Rate />} />
        <Route path='/users' element={<Users />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;

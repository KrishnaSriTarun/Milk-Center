
import { Routes, Route } from "react-router-dom";
import Navbar from './Pages/Navbar/Navbar';
import Dashboard from './Pages/Dashboard/Dashboard';
import Sellers from './Pages/Sellers/Sellers';
import { ToastContainer } from 'react-toastify';
import Billing from "./Pages/Billing/Billing";
import Rate from "./Pages/Rate/Rate";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/addMilk' element={<Sellers />} />
        <Route path='/billing' element={<Billing />} />
        <Route path='/newRate' element={<Rate />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;

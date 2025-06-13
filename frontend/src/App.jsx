
import { Routes, Route } from "react-router-dom";
import Navbar from './Pages/Navbar/Navbar';
import Dashboard from './Pages/Dashboard/Dashboard';
import Sellers from './Pages/Sellers/Sellers';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/addMilk' element={<Sellers />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;

import './App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from './Pages/Navbar/Navbar';
import Dashboard from './Pages/Dashboard/Dashboard';
import SupplyForm from './Components/SupplyForm/SupplyForm';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/addSupply' element={<SupplyForm />} />
      </Routes>
    </div>
  );
}

export default App;

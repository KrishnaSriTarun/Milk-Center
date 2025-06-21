import { useEffect, useState } from 'react';
import UserForm from '../../Components/UserForm/UserForm';
import UserList from '../../Components/UserList/UserList';
import './Users.css';
import toast from 'react-hot-toast';
import { sellerData } from '../../Services/Seller';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUsers() {
      try {
        setLoading(true);
        const response = await sellerData();
        setUsers(response.data.sellerData); 
        // console.log(response.data)
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Unable to fetch users");
      } finally {
        setLoading(false);
      }
    }

    getUsers();
  }, []);

  return (
    <div className="users-container text-light">
      <div className="left-column">
        <UserForm setUsers={setUsers} />
      </div>
      <div className="right-column">
        <UserList users={users} setUsers={setUsers} loading={loading} />
      </div>
    </div>
  );
}

export default Users;

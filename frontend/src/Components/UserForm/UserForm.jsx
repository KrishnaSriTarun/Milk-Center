import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { sellerRegister } from "../../Services/Seller";

function UserForm({ setUsers }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    sellerId: "",
    name: "",
    PhoneNumber: "",
    role: "ROLE_SELLER",
    password: "",
  });

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await sellerRegister(data);

      setUsers((prevUsers) => [
        ...(Array.isArray(prevUsers) ? prevUsers : []),
        response.data,
      ]);

      toast.success(`Registered successfully`);

      setData({
        sellerId: "",
        name: "",
        PhoneNumber: "",
        role: "ROLE_SELLER",
        password: "",
      });
    } catch (error) {
      console.error("Error registering seller:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Failed to register";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-2 mt-2">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="row justify-content-center">
        <div className="card col-12 col-md-12 form-container">
          <div className="card-body">
            <form onSubmit={onSubmitHandler}>
              <div className="mb-3">
                <label htmlFor="sellerId" className="form-label text-dark">Seller ID</label>
                <input
                  type="text"
                  name="sellerId"
                  id="sellerId"
                  className="form-control"
                  value={data.sellerId}
                  onChange={onChangeHandle}
                  placeholder="Enter Seller ID"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="name" className="form-label text-dark">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  value={data.name}
                  onChange={onChangeHandle}
                  placeholder="Enter Name"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="PhoneNumber" className="form-label text-dark">Phone Number</label>
                <input
                  type="text"
                  name="PhoneNumber"
                  id="PhoneNumber"
                  className="form-control"
                  value={data.PhoneNumber}
                  onChange={onChangeHandle}
                  placeholder="Enter Phone Number"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="role" className="form-label text-dark">Role</label>
                <select
                  name="role"
                  id="role"
                  className="form-select"
                  value={data.role}
                  onChange={onChangeHandle}
                  required
                >
                  <option value="ROLE_SELLER">ROLE_SELLER</option>
                  <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label text-dark">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  value={data.password}
                  onChange={onChangeHandle}
                  placeholder="Enter Password"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-warning w-100"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register Seller"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserForm;

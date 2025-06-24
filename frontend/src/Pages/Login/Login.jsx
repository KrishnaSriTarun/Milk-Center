import { useEffect, useState } from "react";
import "./Login.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { sellerLogin } from "../../Services/Seller";

function Login() {
      const navigate = useNavigate();
      const [loading, setLoading] = useState(false);
      const [data, setData] = useState({
            PhoneNumber: "",
            password: "",
      });
      const onChangeHandler = (e) => {
            const { name, value } = e.target;
            setData((prev) => ({ ...prev, [name]: value }));
      };

      const onSubmitHandler = async (e) => {
            e.preventDefault();
            setLoading(true);
            try {
                  const response = await sellerLogin(data);
                  console.log(response);

                  if (response.status === 200) {
                        toast.success("Login successful");
                        localStorage.setItem("sellerToken", response.data.token);
                        localStorage.setItem("sellerRole", response.data.role);
                        navigate("/dashboard");
                  }
            } catch (err) {
                  console.error(err);
                  toast.error("Phone number or password is incorrect");
            } finally {
                  setLoading(false);
            }
      };
      useEffect(() => {
            const token = localStorage.getItem("sellerToken");
            if (token) {
                  navigate("/dashboard", { replace: true });
            }
      }, []);

      return (
            <div className="bg-light d-flex align-items-center justify-content-center vh-100 login-background ">
                  <div className="cards shadow-lg w-100" style={{ maxWidth: '480px', borderRadius: "25px" }}>
                        <div className="cards-body">
                              <div className="text-center">
                                    <h1 className="card-title">Seller Login</h1>
                                    <p className="card-text text-muted">
                                          Login with your phone number and password.
                                    </p>
                              </div>
                              <div className="mt-4">
                                    <form onSubmit={onSubmitHandler}>
                                          <div className="mb-4">
                                                <label htmlFor="PhoneNumber" className="form-label text-muted">Phone Number</label>
                                                <input
                                                      type="text"
                                                      name="PhoneNumber"
                                                      id="PhoneNumber"
                                                      placeholder="Enter your phone number"
                                                      className="form-control"
                                                      onChange={onChangeHandler}
                                                      value={data.PhoneNumber}
                                                />
                                          </div>
                                          <div className="mb-4">
                                                <label htmlFor="password" className="form-label text-muted">Password</label>
                                                <input
                                                      type="password"
                                                      name="password"
                                                      id="password"
                                                      placeholder="********"
                                                      className="form-control"
                                                      onChange={onChangeHandler}
                                                      value={data.password}
                                                />
                                          </div>
                                          <div className="d-grid">
                                                <button type="submit" className="btn btn-dark btn-lg" disabled={loading}>
                                                      {loading ? "Loading..." : "Sign in"}
                                                </button>
                                          </div>
                                    </form>
                              </div>
                        </div>
                  </div>
            </div>
      );
}

export default Login;

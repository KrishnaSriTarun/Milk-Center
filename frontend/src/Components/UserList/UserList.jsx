import { useState } from "react";
import "./UserList.css";

function UserList({ users }) {
  console.log(users)
  const [searchUser, setSearchUser] = useState("");

  const filteredUsers = (Array.isArray(users) ? users : []).filter((user) =>
    user?.name?.toLowerCase().includes(searchUser.toLowerCase())
  );

  const getUserColor = (name = "") => {
    const colors = [
      "rgba(79, 70, 229, 0.9)",
      "rgba(16, 185, 129, 0.9)",
      "rgba(245, 158, 11, 0.9)",
      "rgba(239, 68, 68, 0.9)",
      "rgba(59, 130, 246, 0.9)",
      "rgba(236, 72, 153, 0.9)",
    ];
    const charSum = name
      .split("")
      .reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colors[charSum % colors.length];
  };

  return (
    <div className="category-list-container">
      <div className="row pe-2 mb-2">
        <div className="col-12">
          <div className="input-group search-container">
            <input
              type="text"
              name="keyword"
              id="keyword"
              className="form-control search-input"
              placeholder="Search users..."
              onChange={(e) => setSearchUser(e.target.value)}
              value={searchUser}
            />
            <span className="btn btn-warning">
              <i className="bi bi-search fs-4 fw-bold"></i>
            </span>
          </div>
        </div>
      </div>

      <div className="row pe-2">
        {filteredUsers.map((user, index) => (
          <div key={index} className="col-12">
            <div className="user-card">
              <div className="card-body p-3">
                <div className="d-flex align-items-center">
                  <div
                    className="user-avatar"
                    style={{
                      backgroundColor: getUserColor(user.name),
                      boxShadow: `0 4px 12px ${getUserColor(user.name).replace(
                        "0.9",
                        "0.4"
                      )}`,
                    }}
                  >
                    {user.sellerId || "--"}
                  </div>
                  <div className="user-info ms-3">
                    <h5 className="user-name">{user.name || "Unnamed"}</h5>
                    <div className="user-email">
                      <i className="bi bi-telephone me-2"></i>
                      <span>{user.PhoneNumber || "No Phone"}</span>
                    </div>
                    {user.role && (
                      <div className="mt-2">
                        <span className="role-badge">
                          {user.role.replace("ROLE_", "")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <div className="col-12">
            <div className="alert alert-info text-center">No users found.</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserList;

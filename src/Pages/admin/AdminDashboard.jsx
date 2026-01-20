import React from "react";
import { useNavigate } from "react-router";
import { logout } from "../../utils/logout";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // function to logout from dashbaord
  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <>
      <div>
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
};

export default AdminDashboard;

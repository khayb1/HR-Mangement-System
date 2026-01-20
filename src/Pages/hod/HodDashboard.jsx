import React from "react";
import { useNavigate } from "react-router";
import { logout } from "../../utils/logout";

const HodDashboard = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <>
      <main className="flex justify-center items-center flex-col py-5">
        <h1>Hod Dashboard</h1>
        <button className="border" onClick={handleClick}>
          Logout
        </button>
      </main>
    </>
  );
};

export default HodDashboard;

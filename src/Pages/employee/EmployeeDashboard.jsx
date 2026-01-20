import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";
import { logout } from "../../utils/logout";
import { useAuth } from "../../context/AuthContext";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Proper date
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Logout
  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <>
      <nav className="flex justify-between items-center px-10 py-5 bg-gray-100">
        <div>
          <p className="font-bold text-2xl">Employee Dashboard</p>
          <p className="text-sm text-gray-600">Welcome back {user?.email}</p>
        </div>

        <div className="flex items-center gap-2">
          <Calendar />
          <span>{today}</span>
        </div>
      </nav>

      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Leave Overview</h1>
        <div className="flex gap-5 ">
          {/* total leave days  */}
          <span>
            <div>
              <p>22</p>
              <p>Total leave days</p>
            </div>
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </main>
    </>
  );
};

export default EmployeeDashboard;

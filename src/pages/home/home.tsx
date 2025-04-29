import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
  interface User {
    fname: string;
    lname: string;
    email: string;
    role: string;
  }
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const getAlluser = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("No token found. Please login again.");
        navigate("/login");
        return;
      }

      const response = await axios.get(
        "http://localhost:8080/api/auth/get-all-users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.Status === "success") {
        setUsers(response.data.data);
      } else {
        navigate("/login");
        localStorage.removeItem("token");
        toast.error("Failed to fetch users");
      }
    } catch (error: any) {
      if (error.response) {
        console.error("Error Response:", error.response.data);
        navigate("/login");
        localStorage.removeItem("token");
        toast.error(
          `${error.response.data.Error.message || "Failed to fetch users"}`
        );
      } else {
        console.error("Axios error:", error.message);
        navigate("/login");
        localStorage.removeItem("token");
        toast.error("An error occurred while fetching users.");
      }
    }
  };

  useEffect(() => {
    getAlluser();
  }, []);

  const renderTable = (title: string, role: string) => {
    const filteredUsers = users.filter((user: User) => user.role === role);

    return (
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white border border-gray-300 text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">First Name</th>
                <th className="px-6 py-3">Last Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user: User, idx: number) => (
                <tr key={idx} className="border-t">
                  <td className="px-6 py-3">{user.fname.trim()}</td>
                  <td className="px-6 py-3">{user.lname.trim()}</td>
                  <td className="px-6 py-3">{user.email}</td>
                  <td className="px-6 py-3 capitalize">{user.role}</td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-4 text-center text-gray-400"
                  >
                    No {role}s found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto px-4">
      {renderTable("Customer List", "customer")}
      {renderTable("Admin List", "admin")}
    </div>
  );
}

export default Home;

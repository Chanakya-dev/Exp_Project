import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000"
    : "http://backend:8000";


function UserManager() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ email: "", password: "" });
  const [updateEmail, setUpdateEmail] = useState("");

  const fetchUsers = async () => {
    const res = await axios.get(`${API_URL}/getall`);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async () => {
    await axios.post(`${API_URL}/postdata`, form);
    fetchUsers();
    setForm({ email: "", password: "" });
  };

  const updateUser = async () => {
    await axios.put(`${API_URL}/update/${updateEmail}`, form);
    fetchUsers();
    setForm({ email: "", password: "" });
    setUpdateEmail("");
  };

  const deleteUser = async (email) => {
    await axios.get(`${API_URL}/delete/${email}`);
    fetchUsers();
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "24px",
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderRadius: "10px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#1d4ed8", marginBottom: "24px" }}>
        🚀 User Manager
      </h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "24px",
        }}
      >
        <div style={{ flex: 1, minWidth: "250px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            type="text"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={{ padding: "10px", borderRadius: "4px", border: "1px solid #999" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            style={{ padding: "10px", borderRadius: "4px", border: "1px solid #999" }}
          />
          <button
            onClick={createUser}
            style={{
              padding: "10px",
              backgroundColor: "#22c55e",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            ➕ Create User
          </button>
        </div>

        <div style={{ flex: 1, minWidth: "250px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            type="text"
            placeholder="Email to update"
            value={updateEmail}
            onChange={(e) => setUpdateEmail(e.target.value)}
            style={{ padding: "10px", borderRadius: "4px", border: "1px solid #999" }}
          />
          <button
            onClick={updateUser}
            style={{
              padding: "10px",
              backgroundColor: "#facc15",
              color: "#000",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            ✏️ Update User
          </button>
        </div>
      </div>

      <h3 style={{ fontSize: "18px", marginBottom: "12px" }}>📋 User List</h3>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#e0f2fe", textAlign: "left" }}>
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>#</th>
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>Email</th>
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>Password</th>
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>{i + 1}</td>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>{u.email}</td>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>{u.password}</td>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                  <button
                    onClick={() => deleteUser(u.email)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#ef4444",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="4" style={{ padding: "20px", textAlign: "center", color: "#777" }}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManager;

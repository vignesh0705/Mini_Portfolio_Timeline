"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const token = Cookies.get("token");
      const response = await fetch("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      const token = Cookies.get("token");
      const response = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        setUsers(users.filter((user) => user.id !== userId));
      } else {
        const errorData = await response.json();
        alert("Error: " + errorData.error);
      }
    } catch (error) {
      alert("Failed to delete user");
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-error">
        <h2>Access Denied</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <p>Manage users and system settings</p>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-number">{users.length}</p>
        </div>
        <div className="stat-card">
          <h3>Regular Users</h3>
          <p className="stat-number">
            {users.filter((u) => u.role === "user").length}
          </p>
        </div>
        <div className="stat-card">
          <h3>Admins</h3>
          <p className="stat-number">
            {users.filter((u) => u.role === "admin").length}
          </p>
        </div>
        <div className="stat-card">
          <h3>Total Portfolio Items</h3>
          <p className="stat-number">
            {users.reduce((sum, u) => sum + u.portfolioItemsCount, 0)}
          </p>
        </div>
      </div>

      <div className="users-table-container">
        <h3>User Management</h3>
        <div className="users-table">
          <div className="table-header">
            <div className="table-cell">Name</div>
            <div className="table-cell">Email</div>
            <div className="table-cell">Role</div>
            <div className="table-cell">Portfolio Items</div>
            <div className="table-cell">Created</div>
            <div className="table-cell">Actions</div>
          </div>

          {users.map((user) => (
            <div key={user.id} className="table-row">
              <div className="table-cell">
                <strong>{user.name}</strong>
              </div>
              <div className="table-cell">{user.email}</div>
              <div className="table-cell">
                <span className={`role-badge ${user.role}`}>
                  {user.role === "admin" ? "👑" : "👤"} {user.role}
                </span>
              </div>
              <div className="table-cell">{user.portfolioItemsCount}</div>
              <div className="table-cell">
                {new Date(user.createdAt).toLocaleDateString()}
              </div>
              <div className="table-cell">
                {user.role !== "admin" && (
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="button button-danger button-small"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminDashboard from "@/components/AdminDashboard";
import ThemeToggle from "@/components/ThemeToggle";

function AdminContent() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== "admin") {
      router.push("/portfolio");
    }
  }, [user, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="admin-access-denied">
        <h2>Access Denied</h2>
        <p>You need admin privileges to access this page.</p>
        <button
          onClick={() => router.push("/portfolio")}
          className="button button-primary"
        >
          Go to Portfolio
        </button>
      </div>
    );
  }

  return (
    <main className="admin-page">
      <div className="admin-nav">
        <div className="admin-nav-left">
          <h1>Admin Panel</h1>
          <p>Welcome, {user.name}</p>
        </div>
        <div className="admin-nav-right">
          <button
            onClick={() => router.push("/portfolio")}
            className="button button-secondary"
          >
            My Portfolio
          </button>
          <button onClick={handleLogout} className="button button-secondary">
            Logout
          </button>
          <ThemeToggle />
        </div>
      </div>

      <AdminDashboard />
    </main>
  );
}

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <AdminContent />
    </ProtectedRoute>
  );
}

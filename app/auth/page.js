"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import ThemeToggle from "@/components/ThemeToggle";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/portfolio");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="auth-loading">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect
  }

  return (
    <main className="auth-page">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {isLogin ? (
        <LoginForm onToggleMode={() => setIsLogin(false)} />
      ) : (
        <RegisterForm onToggleMode={() => setIsLogin(true)} />
      )}
    </main>
  );
}

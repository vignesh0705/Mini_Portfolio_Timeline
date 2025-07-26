"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleNavigation = (path) => {
    router.push(path);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <main className="home-container">
      <h1>Welcome to Mini Portfolio Timeline</h1>
      <p>Track and showcase your developer journey.</p>

      <section className="description">
        <h2>What is Mini Portfolio Timeline?</h2>
        <p>
          Mini Portfolio Timeline helps you map out your developer milestones —
          including internships, certifications, and projects — in a beautiful
          timeline layout.
        </p>

        <h2>Key Features:</h2>
        <ul>
          <li>
            Add key events like internships, achievements, and side-projects
          </li>
          <li>View all milestones in a vertical scrollable timeline</li>
          <li>Personal dashboard and light/dark theme toggle</li>
        </ul>

        <h2>Why Use It?</h2>
        <p>
          Showcase your growth journey and easily share your timeline with
          recruiters, mentors, or future collaborators.
        </p>
      </section>

      <div className="navigation">
        {user ? (
          <>
            <button
              onClick={() => handleNavigation("/portfolio")}
              className="nav-button"
            >
              View My Portfolio
            </button>
            {user.role === "admin" && (
              <button
                onClick={() => handleNavigation("/admin")}
                className="nav-button"
              >
                👑 Admin Panel
              </button>
            )}
            <button
              onClick={handleLogout}
              className="nav-button nav-button-secondary"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => handleNavigation("/auth")}
              className="nav-button"
            >
              Get Started
            </button>
            <button
              onClick={() => handleNavigation("/auth")}
              className="nav-button nav-button-secondary"
            >
              Sign In
            </button>
          </>
        )}
      </div>
      <ThemeToggle />
    </main>
  );
}

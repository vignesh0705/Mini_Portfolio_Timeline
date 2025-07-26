"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import TimelineItem from "@/components/TimelineItem";
import TimelineForm from "@/components/TimelineForm";
import CategoryFilter from "@/components/CategoryFilter";
import ThemeToggle from "@/components/ThemeToggle";
import Cookies from "js-cookie";

function PortfolioContent() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    loadPortfolioItems();
  }, []);

  const loadPortfolioItems = async () => {
    try {
      const token = Cookies.get("token");
      const response = await fetch("/api/portfolio", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setItems(data.items || []);
      } else {
        console.error("Failed to load portfolio items");
      }
    } catch (error) {
      console.error("Error loading portfolio items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveItems = async (newItems) => {
    try {
      const token = Cookies.get("token");
      const response = await fetch("/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items: newItems }),
      });

      if (response.ok) {
        setItems(newItems);
      } else {
        console.error("Failed to save portfolio items");
      }
    } catch (error) {
      console.error("Error saving portfolio items:", error);
    }
  };

  const handleAddItem = (item) => {
    const newItem = {
      ...item,
      id: Date.now(),
      tags: item.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };
    const updatedItems = [...items, newItem];
    saveItems(updatedItems);
  };

  const handleUpdateItem = (updatedItem) => {
    const updatedItems = items.map((item) =>
      item.id === updatedItem.id
        ? {
            ...updatedItem,
            tags:
              typeof updatedItem.tags === "string"
                ? updatedItem.tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean)
                : updatedItem.tags,
          }
        : item
    );
    saveItems(updatedItems);
    setEditingItem(null);
  };

  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    saveItems(updatedItems);
  };

  if (isLoading) {
    return (
      <div className="container">
        <div className="header slide-up">
          <h1 className="title">Loading...</h1>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // Filter items based on selected category
  const filteredItems =
    selectedCategory === "all"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  // Count items by category
  const itemCounts = items.reduce((counts, item) => {
    const category = item.category || "experience";
    counts[category] = (counts[category] || 0) + 1;
    return counts;
  }, {});

  return (
    <main className="container relative">
      {/* Header with user info and controls */}
      <div className="portfolio-header">
        <div className="user-info">
          <h1 className="title">Welcome back, {user?.name}!</h1>
          <p className="subtitle">Visual timeline of your career milestones</p>
        </div>
        <div className="header-controls">
          {user?.role === "admin" && (
            <button
              onClick={() => router.push("/admin")}
              className="button button-primary admin-btn"
            >
              👑 Admin Panel
            </button>
          )}
          <button
            onClick={handleLogout}
            className="button button-secondary logout-btn"
          >
            Logout
          </button>
          <ThemeToggle />
        </div>
      </div>

      <TimelineForm
        onAdd={handleAddItem}
        onUpdate={handleUpdateItem}
        editingItem={editingItem}
        onCancel={() => setEditingItem(null)}
      />

      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        itemCounts={itemCounts}
      />

      <div className="timeline-container">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              isLast={index === filteredItems.length - 1}
              onEdit={() => setEditingItem(item)}
              onDelete={() => handleDelete(item.id)}
            />
          ))
        ) : (
          <div className="empty-state fade-in">
            <p>
              {selectedCategory === "all"
                ? "Your timeline is empty. Add your first entry above!"
                : `No ${selectedCategory} entries found. Try a different category or add a new entry.`}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default function PortfolioPage() {
  return (
    <ProtectedRoute>
      <PortfolioContent />
    </ProtectedRoute>
  );
}

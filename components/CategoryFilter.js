"use client";

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
  itemCounts,
}) {
  const categories = [
    { value: "all", label: "All", icon: "📋" },
    { value: "experience", label: "Experience", icon: "💼" },
    { value: "education", label: "Education", icon: "🎓" },
    { value: "project", label: "Projects", icon: "💻" },
    { value: "certification", label: "Certifications", icon: "📜" },
    { value: "skill", label: "Skills", icon: "⚡" },
    { value: "milestone", label: "Milestones", icon: "🏆" },
  ];

  return (
    <div className="category-filter">
      <h3 className="filter-title">Filter by Category</h3>
      <div className="filter-buttons">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => onCategoryChange(category.value)}
            className={`filter-button ${
              selectedCategory === category.value ? "active" : ""
            }`}
          >
            <span className="filter-icon">{category.icon}</span>
            <span className="filter-label">{category.label}</span>
            <span className="filter-count">
              (
              {category.value === "all"
                ? Object.values(itemCounts).reduce(
                    (sum, count) => sum + count,
                    0
                  )
                : itemCounts[category.value] || 0}
              )
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";

export default function TimelineItem({ item, isLast, onEdit, onDelete }) {
  const getCategoryIcon = (category) => {
    switch (category) {
      case "education":
        return "🎓";
      case "project":
        return "💻";
      case "certification":
        return "📜";
      case "skill":
        return "⚡";
      case "milestone":
        return "🏆";
      default:
        return "💼";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "education":
        return "#10b981";
      case "project":
        return "#3b82f6";
      case "certification":
        return "#f59e0b";
      case "skill":
        return "#8b5cf6";
      case "milestone":
        return "#ef4444";
      default:
        return "#6d28d9";
    }
  };

  return (
    <div className="timeline-item">
      <div
        className="timeline-dot"
        style={{ backgroundColor: getCategoryColor(item.category) }}
        title={item.category}
      >
        <span className="timeline-icon">{getCategoryIcon(item.category)}</span>
      </div>
      {!isLast && <div className="timeline-line"></div>}

      <div className="timeline-card fade-in">
        <div className="timeline-header">
          <div className="timeline-category">
            <span
              className="category-badge"
              style={{ backgroundColor: getCategoryColor(item.category) }}
            >
              {getCategoryIcon(item.category)} {item.category}
            </span>
          </div>
          <h3 className="timeline-title">{item.title}</h3>
          {item.company && (
            <p className="timeline-company">at {item.company}</p>
          )}
          <p className="timeline-date">{item.date}</p>
        </div>

        {item.description && (
          <p className="timeline-description">{item.description}</p>
        )}

        {item.tags && item.tags.length > 0 && (
          <div className="tags-container">
            {item.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="timeline-actions">
          <button
            onClick={() => onEdit(item)}
            className="button button-secondary"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="button button-primary"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

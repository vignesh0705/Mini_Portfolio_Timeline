"use client";

import { useState, useEffect } from "react";

export default function TimelineForm({
  onAdd,
  onUpdate,
  editingItem,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    date: "",
    description: "",
    tags: "",
    category: "experience",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingItem) {
      setFormData({
        title: editingItem.title,
        company: editingItem.company || "",
        date: editingItem.date,
        description: editingItem.description,
        tags: Array.isArray(editingItem.tags)
          ? editingItem.tags.join(", ")
          : editingItem.tags,
        category: editingItem.category || "experience",
      });
    }
  }, [editingItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.date.trim()) {
      newErrors.date = "Date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (editingItem) {
      onUpdate({ ...formData, id: editingItem.id });
    } else {
      onAdd(formData);
    }

    setFormData({
      title: "",
      company: "",
      date: "",
      description: "",
      tags: "",
      category: "experience",
    });
  };

  return (
    <div className="form-container scale-in">
      <h2 className="form-title">
        {editingItem ? "Edit Timeline Item" : "Add New Item"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="experience">Work Experience</option>
              <option value="education">Education</option>
              <option value="project">Project</option>
              <option value="certification">Certification</option>
              <option value="skill">Skill</option>
              <option value="milestone">Milestone</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="title">Title/Role</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-control"
              required
            />
            {errors.title && <span className="text-error">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="company">Company/Institution</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date/Period</label>
            <input
              type="text"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="form-control"
              placeholder="e.g. Jan 2022 - Present"
              required
            />
            {errors.date && <span className="text-error">{errors.date}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags/Skills (comma separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="form-control"
              placeholder="e.g. React, JavaScript, CSS"
            />
          </div>

          <div className="form-group textarea">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="form-control form-textarea"
            />
          </div>
        </div>

        <div className="form-actions">
          {editingItem && (
            <button
              type="button"
              onClick={onCancel}
              className="button button-secondary"
            >
              Cancel
            </button>
          )}
          <button type="submit" className="button button-primary">
            {editingItem ? "Update" : "Add"} Item
          </button>
        </div>
      </form>
    </div>
  );
}

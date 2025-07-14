import React, { useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/Resources.css";

const initialResources = [
  {
    id: 1,
    title: "FreeCodeCamp",
    url: "https://www.freecodecamp.org/",
    description: "Comprehensive free coding tutorials and projects.",
    category: "Tutorial",
    tags: ["JavaScript", "Web", "Beginner"],
  },
  {
    id: 2,
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org/",
    description: "Official documentation for web technologies.",
    category: "Documentation",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: 3,
    title: "LeetCode",
    url: "https://leetcode.com/",
    description: "Practice coding problems for interviews.",
    category: "Practice",
    tags: ["DSA", "Algorithms", "Interview"],
  },
];

const categories = ["All", "Tutorial", "Documentation", "Practice", "Blog"];

const Resources = () => {
  const { user } = useAuth();
  const [resources, setResources] = useState(initialResources);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Admin form state
  const [newResource, setNewResource] = useState({
    title: "",
    url: "",
    description: "",
    category: "Tutorial",
    tags: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const filteredResources = useMemo(() => {
    return resources.filter((res) => {
      const matchesCategory = categoryFilter === "All" || res.category === categoryFilter;
      const matchesSearch =
        res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, categoryFilter, resources]);

  const handleInputChange = (e) => {
    setNewResource({ ...newResource, [e.target.name]: e.target.value });
  };

  const handleAddResource = (e) => {
    e.preventDefault();
    if (!newResource.title.trim() || !newResource.url.trim()) {
      setErrorMsg("Title and URL are required.");
      return;
    }
    if (!/^https?:\/\//i.test(newResource.url.trim())) {
      setErrorMsg("Please enter a valid URL starting with http:// or https://");
      return;
    }
    const tagsArray = newResource.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const resource = {
      id: Date.now(),
      title: newResource.title.trim(),
      url: newResource.url.trim(),
      description: newResource.description.trim(),
      category: newResource.category,
      tags: tagsArray,
    };
    setResources([resource, ...resources]);
    setNewResource({ title: "", url: "", description: "", category: "Tutorial", tags: "" });
    setErrorMsg("");
  };

  const isAdmin = user?.role === "admin";

  return (
    <div className="page resources-page">
      <h2>📚 Curated Resources</h2>
      <p>Handpicked tutorials, tools, and websites to boost your learning.</p>

      {isAdmin && (
        <form className="add-resource-form" onSubmit={handleAddResource}>
          <h3>Add New Resource</h3>
          {errorMsg && <p className="error-msg">{errorMsg}</p>}
          <input
            type="text"
            name="title"
            placeholder="Resource Title"
            value={newResource.title}
            onChange={handleInputChange}
            required
            aria-label="Resource title"
          />
          <input
            type="url"
            name="url"
            placeholder="Resource URL (https://...)"
            value={newResource.url}
            onChange={handleInputChange}
            required
            aria-label="Resource URL"
          />
          <textarea
            name="description"
            placeholder="Description (optional)"
            value={newResource.description}
            onChange={handleInputChange}
            rows={3}
            aria-label="Resource description"
          />
          <select
            name="category"
            value={newResource.category}
            onChange={handleInputChange}
            aria-label="Resource category"
          >
            {categories.filter((c) => c !== "All").map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            value={newResource.tags}
            onChange={handleInputChange}
            aria-label="Resource tags"
          />
          <button type="submit">Add Resource</button>
        </form>
      )}

      <div className="filters">
        <input
          type="search"
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search resources"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          aria-label="Filter by category"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {filteredResources.length === 0 ? (
        <p className="no-results">No resources found.</p>
      ) : (
        <div className="resources-grid">
          {filteredResources.map(({ id, title, url, description, tags }) => (
            <article key={id} className="resource-card">
              <a href={url} target="_blank" rel="noopener noreferrer" className="resource-link">
                <h3>{title}</h3>
              </a>
              <p>{description}</p>
              <div className="tags">
                {tags.map((tag) => (
                  <span key={tag} className="tag">
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Resources;
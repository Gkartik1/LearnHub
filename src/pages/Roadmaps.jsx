import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Roadmaps.css";

const initialRoadmaps = [
  {
    id: 1,
    title: "Frontend Development",
    children: [
      { id: 11, title: "HTML Basics", completed: true },
      { id: 12, title: "CSS Fundamentals", completed: false },
      {
        id: 13,
        title: "JavaScript",
        completed: false,
        children: [
          { id: 131, title: "ES6+", completed: false },
          { id: 132, title: "DOM Manipulation", completed: false },
        ],
      },
      { id: 14, title: "React Basics", completed: false },
    ],
  },
  {
    id: 2,
    title: "Backend Development",
    children: [
      { id: 21, title: "Node.js Basics", completed: false },
      { id: 22, title: "Express.js", completed: false },
      { id: 23, title: "Databases", completed: false },
    ],
  },
];

const Roadmaps = () => {
  const { user } = useAuth();
  const [roadmaps, setRoadmaps] = useState(() => {
    const saved = localStorage.getItem("learnhub-roadmaps");
    return saved ? JSON.parse(saved) : initialRoadmaps;
  });
  const [expandedNodes, setExpandedNodes] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [newRoadmapTitle, setNewRoadmapTitle] = useState("");
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [selectedRoadmapId, setSelectedRoadmapId] = useState(null);

  useEffect(() => {
    localStorage.setItem("learnhub-roadmaps", JSON.stringify(roadmaps));
  }, [roadmaps]);

  // Toggle expand/collapse
  const toggleExpand = (id) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  // Toggle completion of a topic by id
  const toggleComplete = (id, nodes = roadmaps) => {
    const toggle = (list) =>
      list.map((node) => {
        if (node.id === id) {
          return { ...node, completed: !node.completed };
        }
        if (node.children) {
          return { ...node, children: toggle(node.children) };
        }
        return node;
      });
    setRoadmaps(toggle(nodes));
  };

  // Add new roadmap (admin only)
  const addRoadmap = () => {
    if (!newRoadmapTitle.trim()) return alert("Please enter roadmap title");
    setRoadmaps((prev) => [
      ...prev,
      { id: Date.now(), title: newRoadmapTitle.trim(), children: [] },
    ]);
    setNewRoadmapTitle("");
  };

  // Add new topic to selected roadmap (admin only)
  const addTopic = () => {
    if (!newTopicTitle.trim() || !selectedRoadmapId) return alert("Select roadmap and enter topic title");
    const addTopicToRoadmap = (list) =>
      list.map((node) => {
        if (node.id === selectedRoadmapId) {
          return {
            ...node,
            children: [...(node.children || []), { id: Date.now(), title: newTopicTitle.trim(), completed: false }],
          };
        }
        if (node.children) {
          return { ...node, children: addTopicToRoadmap(node.children) };
        }
        return node;
      });
    setRoadmaps(addTopicToRoadmap(roadmaps));
    setNewTopicTitle("");
  };

  // Recursive filter by search term
  const filterRoadmaps = (nodes, term) => {
    if (!term) return nodes;
    return nodes
      .map((node) => {
        const match = node.title.toLowerCase().includes(term.toLowerCase());
        if (node.children) {
          const filteredChildren = filterRoadmaps(node.children, term);
          if (filteredChildren.length > 0 || match) {
            return { ...node, children: filteredChildren };
          }
        } else if (match) {
          return node;
        }
        return null;
      })
      .filter(Boolean);
  };

  const filteredRoadmaps = useMemo(() => filterRoadmaps(roadmaps, searchTerm), [roadmaps, searchTerm]);

  // Calculate progress percentage for a roadmap node
  const calculateProgress = (node) => {
    if (!node.children || node.children.length === 0) {
      return node.completed ? 100 : 0;
    }
    const total = node.children.length;
    const completedCount = node.children.reduce((acc, child) => acc + (child.completed ? 1 : 0), 0);
    return Math.round((completedCount / total) * 100);
  };

  // Recursive component to render roadmap tree
  const RenderNode = ({ node }) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const progress = calculateProgress(node);

    // Admin check
    const isAdmin = user && user.role === "admin";

    return (
      <li className="roadmap-node">
        <div className="node-header">
          {hasChildren && (
            <button
              className="expand-btn"
              onClick={() => toggleExpand(node.id)}
              aria-label={isExpanded ? "Collapse" : "Expand"}
              aria-expanded={isExpanded}
            >
              {isExpanded ? "▼" : "▶"}
            </button>
          )}
          <label className={`node-label ${node.completed ? "completed" : ""}`}>
            <input
              type="checkbox"
              checked={node.completed}
              onChange={() => toggleComplete(node.id)}
            />
            {node.title}
          </label>
          <div className="progress-circle" aria-label={`Progress: ${progress}%`}>
            <svg viewBox="0 0 36 36" className="circular-chart">
              <path
                className="circle-bg"
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="circle"
                strokeDasharray={`${progress}, 100`}
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="20.35" className="percentage">{progress}%</text>
            </svg>
          </div>
          {isAdmin && (
            <button
              className="add-topic-btn"
              onClick={() => {
                setSelectedRoadmapId(node.id);
                const title = prompt("Enter new topic title:");
                if (title) {
                  setRoadmaps((prev) => {
                    const addTopic = (list) =>
                      list.map((n) => {
                        if (n.id === node.id) {
                          return {
                            ...n,
                            children: [...(n.children || []), { id: Date.now(), title, completed: false }],
                          };
                        }
                        if (n.children) {
                          return { ...n, children: addTopic(n.children) };
                        }
                        return n;
                      });
                    return addTopic(prev);
                  });
                  setExpandedNodes((prev) => new Set(prev).add(node.id));
                }
              }}
              aria-label={`Add new topic to ${node.title}`}
            >
              + Add Topic
            </button>
          )}
        </div>
        <AnimatePresence>
          {hasChildren && isExpanded && (
            <motion.ul
              className="roadmap-children"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {node.children.map((child) => (
                <RenderNode key={child.id} node={child} />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </li>
    );
  };

  return (
    <div className="page roadmaps-page">
      <h2>Your Learning Roadmaps</h2>

      <input
        type="search"
        placeholder="Search topics..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search roadmap topics"
        className="search-input"
      />

      <ul className="roadmap-tree" aria-label="Learning roadmap tree">
        {filteredRoadmaps.length === 0 ? (
          <p>No topics found.</p>
        ) : (
          filteredRoadmaps.map((node) => <RenderNode key={node.id} node={node} />)
        )}
      </ul>
    </div>
  );
};

export default Roadmaps;
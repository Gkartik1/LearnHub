import React, { useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/Community.css";

const dummyMembers = [
  { id: 1, name: "Riya Singh", role: "Student" },
  { id: 2, name: "Mohit Sharma", role: "Mentor" },
  { id: 3, name: "Anjali Patel", role: "Student" },
  { id: 4, name: "Suman Das", role: "Mentor" },
  { id: 5, name: "Mansi Gupta", role: "Student" },
];

const dummyThreads = [
  {
    id: 1,
    title: "How to prepare for coding interviews?",
    author: "Riya Singh",
    replies: 12,
    lastUpdated: "2025-07-10",
  },
  {
    id: 2,
    title: "Best resources for React beginners",
    author: "Mohit Sharma",
    replies: 8,
    lastUpdated: "2025-07-08",
  },
  {
    id: 3,
    title: "Tips for remote internships",
    author: "Anjali Patel",
    replies: 5,
    lastUpdated: "2025-07-05",
  },
];

const Community = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [newThread, setNewThread] = useState({ title: "", content: "" });
  const [threads, setThreads] = useState(dummyThreads);

  const filteredThreads = useMemo(() => {
    if (!searchTerm.trim()) return threads;
    return threads.filter((thread) =>
      thread.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, threads]);

  const canPost = user != null; // logged-in users can post

  const handleInputChange = (e) => {
    setNewThread({ ...newThread, [e.target.name]: e.target.value });
  };

  const handleThreadSubmit = (e) => {
    e.preventDefault();
    if (!newThread.title.trim() || !newThread.content.trim()) return;
    const newEntry = {
      id: Date.now(),
      title: newThread.title,
      author: user.name || "Anonymous",
      replies: 0,
      lastUpdated: new Date().toISOString(),
    };
    setThreads([newEntry, ...threads]);
    setNewThread({ title: "", content: "" });
  };

  return (
    <div className="page community-page">
      <h2>👥 Community Hub</h2>
      <p>Connect, discuss, and collaborate with fellow learners and mentors.</p>

      {canPost && (
        <form className="new-thread-form" onSubmit={handleThreadSubmit}>
          <h3>Start a New Discussion</h3>
          <input
            type="text"
            name="title"
            placeholder="Thread Title"
            value={newThread.title}
            onChange={handleInputChange}
            required
            aria-label="Thread title"
          />
          <textarea
            name="content"
            placeholder="Write your message here..."
            value={newThread.content}
            onChange={handleInputChange}
            rows={4}
            required
            aria-label="Thread content"
          />
          <button type="submit">Post Thread</button>
        </form>
      )}

      <div className="search-container">
        <input
          type="search"
          placeholder="Search discussion threads..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search discussion threads"
        />
      </div>

      <section className="threads-section">
        <h3>Discussion Threads</h3>
        {filteredThreads.length === 0 ? (
          <p>No threads found.</p>
        ) : (
          <ul className="threads-list" aria-label="List of discussion threads">
            {filteredThreads.map((thread) => (
              <li key={thread.id} tabIndex={0} className="thread-item">
                <h4>{thread.title}</h4>
                <small>
                  Started by {thread.author} | {thread.replies} replies | Last updated{" "}
                  {new Date(thread.lastUpdated).toLocaleDateString()}
                </small>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="chatroom-placeholder">
        <h3>Chatroom</h3>
        <p>
          Chatroom feature coming soon! Stay tuned to chat live with mentors and peers.
        </p>
      </section>
    </div>
  );
};

export default Community;
import React, { useState } from "react";
import "../styles/Announcements.css";

const initialAnnouncements = [
  {
    id: 1,
    title: "Platform Maintenance",
    date: "2025-07-20",
    content:
      "LearnHub will undergo scheduled maintenance on July 20th from 1 AM to 4 AM UTC. During this time, the platform may be unavailable.",
  },
  {
    id: 2,
    title: "New Roadmaps Added",
    date: "2025-07-10",
    content:
      "We have added new roadmaps for AI/ML and Cybersecurity tracks. Check them out in the Roadmaps section!",
  },
  {
    id: 3,
    title: "Community Meetup",
    date: "2025-07-25",
    content:
      "Join our monthly virtual meetup on July 25th. Network with mentors and peers, and get your questions answered live.",
  },
];

const Announcements = () => {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [isAdmin] = useState(true); // Simulate admin logged in

  const addAnnouncement = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;
    const newAnnouncement = {
      id: Date.now(),
      title: newTitle,
      date: new Date().toISOString().split("T")[0],
      content: newContent,
    };
    setAnnouncements([newAnnouncement, ...announcements]);
    setNewTitle("");
    setNewContent("");
  };

  return (
    <div className="page announcements-page">
      <h2>📢 Latest Announcements</h2>
      {isAdmin && (
        <form className="announcement-form" onSubmit={addAnnouncement}>
          <input
            type="text"
            placeholder="Announcement Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Announcement Content"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            required
          />
          <button type="submit">Post Announcement</button>
        </form>
      )}

      <ul className="announcement-list">
        {announcements.map(({ id, title, date, content }) => (
          <li key={id} className="announcement-card">
            <h3>{title}</h3>
            <small>{new Date(date).toLocaleDateString()}</small>
            <p>{content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;
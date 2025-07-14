import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/Blog.css";

const initialBlogs = [
  {
    id: 1,
    title: "Breaking into Web Development",
    author: "Suman Das",
    date: "July 2025",
    tags: ["Web", "HTML", "JavaScript"],
    readingTime: 7,
    content:
      "This is my journey of learning front-end via LearnHub. I started with HTML & CSS, then React...",
    comments: [
      { id: 1, user: "Riya", text: "Great post! Very helpful." },
      { id: 2, user: "Aman", text: "Thanks for sharing your experience." },
    ],
  },
  {
    id: 2,
    title: "DSA Tips from a Final Year Student",
    author: "Mansi Gupta",
    date: "May 2025",
    tags: ["DSA", "Coding", "Interviews"],
    readingTime: 5,
    content:
      "Here are 5 tips I followed while preparing for placement rounds...",
    comments: [],
  },
];

const Blog = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState(initialBlogs);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    tags: "",
  });
  const [error, setError] = useState("");

  const canPost = user != null; // logged-in users can post

  const handleInputChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) {
      setError("Title and content are required.");
      return;
    }
    const tagsArray = newPost.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const newBlog = {
      id: Date.now(),
      title: newPost.title,
      author: user.name || "Anonymous",
      date: new Date().toLocaleDateString(),
      tags: tagsArray,
      readingTime: Math.max(1, Math.floor(newPost.content.length / 200)),
      content: newPost.content,
      comments: [],
    };
    setBlogs([newBlog, ...blogs]);
    setNewPost({ title: "", content: "", tags: "" });
    setError("");
  };

  return (
    <div className="page blog-page">
      <h2>📝 Community Blogs & Resources</h2>
      <p>Read stories, tips, and tutorials shared by our students and mentors.</p>

      {canPost && (
        <form className="new-post-form" onSubmit={handlePostSubmit}>
          <h3>Share Your Story</h3>
          {error && <p className="error-msg">{error}</p>}
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={newPost.title}
            onChange={handleInputChange}
            required
            aria-label="Blog title"
          />
          <textarea
            name="content"
            placeholder="Write your blog content here..."
            value={newPost.content}
            onChange={handleInputChange}
            rows={6}
            required
            aria-label="Blog content"
          />
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            value={newPost.tags}
            onChange={handleInputChange}
            aria-label="Blog tags"
          />
          <button type="submit">Post Blog</button>
        </form>
      )}

      <div className="blog-list">
        {blogs.map((blog) => (
          <article key={blog.id} className="blog-card">
            <h3>{blog.title}</h3>
            <div className="blog-meta">
              <span>By {blog.author}</span> | <span>{blog.date}</span> |{" "}
              <span>{blog.readingTime} min read</span>
            </div>
            <p>{blog.content}</p>
            <div className="tags">
              {blog.tags.map((tag) => (
                <span key={tag} className="tag">
                  #{tag}
                </span>
              ))}
            </div>
            <div className="comments-section">
              <h4>Comments ({blog.comments.length})</h4>
              {blog.comments.length === 0 && <p>No comments yet.</p>}
              <ul>
                {blog.comments.map((comment) => (
                  <li key={comment.id}>
                    <strong>{comment.user}:</strong> {comment.text}
                  </li>
                ))}
              </ul>
              <p className="comment-placeholder">
                <em>Commenting feature coming soon...</em>
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
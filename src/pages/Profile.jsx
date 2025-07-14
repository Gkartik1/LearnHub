import React, { useState, useRef } from "react";
import "../styles/Profile.css";

const dummyBookmarks = [
  { id: 1, title: "React Basics", url: "/materials/1" },
  { id: 2, title: "Advanced JavaScript", url: "/materials/2" },
];

const dummyChatrooms = [
  { id: 1, name: "Frontend Devs" },
  { id: 2, name: "DSA Study Group" },
];

const Profile = () => {
  const [avatar, setAvatar] = useState(null);
  const [bio, setBio] = useState("Passionate tech learner.");
  const [interests, setInterests] = useState("React, Node.js, Algorithms");
  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirmPass: "" });
  const [passwordMsg, setPasswordMsg] = useState("");
  const fileInputRef = useRef();

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.newPass !== passwords.confirmPass) {
      setPasswordMsg("New passwords do not match.");
      return;
    }
    if (passwords.newPass.length < 6) {
      setPasswordMsg("New password must be at least 6 characters.");
      return;
    }
    setPasswordMsg("Password changed successfully!");
    setPasswords({ current: "", newPass: "", confirmPass: "" });
  };

  return (
    <div className="page profile-page">
      <h2>Your Profile</h2>

      <section className="avatar-section">
        <h3>Profile Picture</h3>
        <div className="avatar-preview" onClick={() => fileInputRef.current.click()} tabIndex={0} role="button" aria-label="Upload avatar">
          {avatar ? (
            <img src={avatar} alt="User avatar" />
          ) : (
            <div className="avatar-placeholder">Click to upload</div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleAvatarChange}
          style={{ display: "none" }}
        />
      </section>

      <section className="bio-section">
        <h3>Bio</h3>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
          aria-label="Edit bio"
        />
      </section>

      <section className="interests-section">
        <h3>Interests</h3>
        <input
          type="text"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          aria-label="Edit interests"
        />
      </section>

      <section className="bookmarks-section">
        <h3>Bookmarked Resources</h3>
        {dummyBookmarks.length === 0 ? (
          <p>No bookmarks yet.</p>
        ) : (
          <ul>
            {dummyBookmarks.map((bm) => (
              <li key={bm.id}>
                <a href={bm.url}>{bm.title}</a>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="chatrooms-section">
        <h3>Joined Chatrooms</h3>
        {dummyChatrooms.length === 0 ? (
          <p>No chatrooms joined yet.</p>
        ) : (
          <ul>
            {dummyChatrooms.map((chat) => (
              <li key={chat.id}>{chat.name}</li>
            ))}
          </ul>
        )}
      </section>

      <section className="password-section">
        <h3>Change Password</h3>
        <form onSubmit={handlePasswordSubmit}>
          <label>
            Current Password
            <input
              type="password"
              name="current"
              value={passwords.current}
              onChange={handlePasswordChange}
              required
              aria-label="Current password"
            />
          </label>
          <label>
            New Password
            <input
              type="password"
              name="newPass"
              value={passwords.newPass}
              onChange={handlePasswordChange}
              required
              aria-label="New password"
            />
          </label>
          <label>
            Confirm New Password
            <input
              type="password"
              name="confirmPass"
              value={passwords.confirmPass}
              onChange={handlePasswordChange}
              required
              aria-label="Confirm new password"
            />
          </label>
          <button type="submit">Change Password</button>
          {passwordMsg && <p className="password-msg">{passwordMsg}</p>}
        </form>
      </section>
    </div>
  );
};

export default Profile;
import React, { useState, useEffect } from "react";
import "./PostModal.css";

const PostModal = ({ user, onClose, onPost }) => {
  const [postContent, setPostContent] = useState("");
  const [currentUser, setCurrentUser] = useState("QUAN ANH PHAM"); // Default user

  // ✅ Load user from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.fullName) {
      setCurrentUser(storedUser.fullName);
    }
  }, []);

  // ✅ Handle Post Submission
  const handlePost = () => {
    if (!postContent.trim()) return;

    // ✅ Create New Post Object
    const newPost = {
      id: Date.now(),
      user: currentUser,
      avatar: "/img/avatar-user.png",
      time: "Vừa xong",
      content: postContent,
      image: null,
      likes: 0,
      comments: 0,
      shares: 0,
    };

    // ✅ Log the post (You can replace this with API call)
    console.log("✅ New Post Created:", newPost);

    // ✅ Pass the new post to parent component (e.g., `FrontPage.js`)
    if (onPost) {
      onPost(newPost);
    }

    // ✅ Clear input and close modal
    setPostContent("");
    onClose();
  };

  return (
    <div className="post-modal-overlay">
      <div className="post-modal">
        <div className="post-modal-header">
          <h2>Tạo bài viết</h2>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>

        {/* ✅ User Profile Section */}
        <div className="post-modal-user">
          <img src="/img/avatar-user.png" alt="Avatar" className="post-avatar" />
          <div className="post-user-info">
            <h3>{currentUser}</h3>
            <span>🛡 Bạn bè</span>
          </div>
        </div>

        {/* ✅ Input Box */}
        <textarea
          className="post-textarea"
          placeholder="Quan ơi, bạn đang nghĩ gì thế?"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        ></textarea>

        {/* ✅ Post Features (Above Button) */}
        <div className="post-features">
          <button>📷 Ảnh/Video</button>
          <button>😊 Cảm xúc</button>
          <button>📍 Địa điểm</button>
          <button>GIF</button>
        </div>

        {/* ✅ Post Button */}
        <button className="post-submit" onClick={handlePost}>Đăng</button>
      </div>
    </div>
  );
};

export default PostModal;

import React, { useState, useEffect } from "react";
import "./PostModal.css";

const PostModal = ({ user, onClose }) => {
  const [postContent, setPostContent] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setPostContent({ ...postContent, user: storedUser.fullName || "QUAN ANH PHAM" });
    }
  }, []);

  const handlePost = () => {
    if (!postContent.trim()) return;
    console.log("Post Created:", postContent);
    onClose(); // Close the modal after posting
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
            <h3>{user?.fullName || "QUAN ANH PHAM"}</h3>
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

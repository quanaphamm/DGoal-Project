import React, { useState, useEffect } from "react";
import PostModal from "../components/PostModal"; // ✅ Import the PostModal
import "./FrontPage.css";

const FrontPage = () => {
  const [posts, setPosts] = useState([]);
  const [showPostModal, setShowPostModal] = useState(false);
  const storedUser = JSON.parse(localStorage.getItem("user")) || { fullName: "QUAN ANH PHAM" };

  useEffect(() => {
    // ✅ Load posts from localStorage or use mock data
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [
      {
        id: 1,
        user: "IFact",
        avatar: "/img/avatar1.png",
        time: "6 giờ trước",
        content: "KẾT QUẢ KIỂM TRA CỦA SỞ Y TẾ ĐẮK LẮK...",
        image: "/img/post1.jpg",
        likes: 10,
        comments: 5,
        shares: 2,
      },
      {
        id: 2,
        user: "Nguyễn Văn A",
        avatar: "/img/avatar2.png",
        time: "2 giờ trước",
        content: "Hôm nay là một ngày tuyệt vời! ☀️",
        image: null,
        likes: 4,
        comments: 2,
        shares: 1,
      },
    ];
    setPosts(storedPosts);
  }, []); // ✅ No unnecessary dependencies

  const handleNewPost = (content) => {
    if (!content.trim()) return;

    const newEntry = {
      id: posts.length + 1,
      user: storedUser.fullName,
      avatar: "/img/avatar-user.png",
      time: "Vừa xong",
      content,
      image: null,
      likes: 0,
      comments: 0,
      shares: 0,
    };

    const updatedPosts = [newEntry, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  return (
    <div className="frontpage-wrapper">
      <div className="frontpage-container">
        {/* ✅ Post Status Box (Click to Open Modal) */}
        <div className="post-status" onClick={() => setShowPostModal(true)}>
          <img src="/img/avatar-user.png" alt="User Avatar" className="avatar" />
          <input type="text" placeholder="Quan ơi, bạn đang nghĩ gì thế?" readOnly />
        </div>

        {/* ✅ Show PostModal when clicked */}
        {showPostModal && (
          <PostModal
            user={storedUser}
            onClose={() => setShowPostModal(false)}
            onPost={(content) => handleNewPost(content)}
          />
        )}

        {/* ✅ Display Posts */}
        <div className="posts">
          {posts.map((post) => (
            <div key={post.id} className="post">
              <div className="post-header">
                <img src={post.avatar} alt="Avatar" className="avatar" />
                <div>
                  <h4>{post.user}</h4>
                  <p>{post.time}</p>
                </div>
              </div>
              <p className="post-content">{post.content}</p>
              {post.image && <img src={post.image} alt="Post" className="post-image" />}
              <div className="post-actions">
                <span>👍 {post.likes} Thích</span>
                <span>💬 {post.comments} Bình luận</span>
                <span>🔄 {post.shares} Chia sẻ</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FrontPage;

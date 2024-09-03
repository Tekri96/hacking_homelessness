import React, { useState, useEffect } from 'react';
import styles from './RippleOfKindness.module.css';

const RippleOfKindness = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', description: '', image: null });

  useEffect(() => {
    // In a real app, you'd fetch posts from an API here
    // For now, we'll use some dummy data
    setPosts([
      { id: 1, title: 'Subway Sandwiches', description: 'Bought two footlongs for a homeless couple', date: '2024-09-01', likes: 15 },
      { id: 2, title: 'Warm Blankets', description: 'Distributed 5 blankets in the park', date: '2024-09-02', likes: 23 },
    ]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setNewPost(prev => ({ ...prev, image: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this data to an API
    const post = {
      id: posts.length + 1,
      ...newPost,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
    };
    setPosts(prev => [post, ...prev]);
    setNewPost({ title: '', description: '', image: null });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Ripple of Kindness</h2>
      <p className={styles.description}>Share your acts of kindness and inspire others!</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="title"
          value={newPost.title}
          onChange={handleInputChange}
          placeholder="Title of your kind act"
          required
          className={styles.input}
        />
        <textarea
          name="description"
          value={newPost.description}
          onChange={handleInputChange}
          placeholder="Describe your act of kindness"
          required
          className={styles.textarea}
        />
        <input
          type="file"
          onChange={handleImageUpload}
          accept="image/*"
          className={styles.fileInput}
        />
        <button type="submit" className={styles.button}>Share Your Kindness</button>
      </form>

      <div className={styles.posts}>
        {posts.map(post => (
          <div key={post.id} className={styles.post}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <div className={styles.postFooter}>
              <span>{post.date}</span>
              <button className={styles.likeButton}>❤️ {post.likes}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RippleOfKindness;
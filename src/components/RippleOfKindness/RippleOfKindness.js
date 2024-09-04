import React, { useState, useEffect } from 'react';
import styles from './RippleOfKindness.module.css';
import { collection, addDoc, getDocs, query, orderBy, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/frontend/firebase';

const RippleOfKindness = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', description: '', image: null });
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const kindnessDocRef = doc(db, 'homelessness', 'kindness');
    const postsCollection = collection(kindnessDocRef, 'acts');
    const q = query(postsCollection, orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    const fetchedPosts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setPosts(fetchedPosts);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setNewPost(prev => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setUploadProgress(0);

    try {
      let imageUrl = '';
      if (newPost.image) {
        const storageRef = ref(storage, `homelessness/kindness/${Date.now()}_${newPost.image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, newPost.image);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
            },
            (error) => reject(error),
            async () => {
              imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      }

      const post = {
        title: newPost.title,
        description: newPost.description,
        imageUrl,
        date: new Date().toISOString(),
        likes: 0
      };

      const kindnessDocRef = doc(db, 'homelessness', 'kindness');
      const actsCollectionRef = collection(kindnessDocRef, 'acts');
      const docRef = await addDoc(actsCollectionRef, post);

      setPosts(prev => [{ id: docRef.id, ...post }, ...prev]);
      setNewPost({ title: '', description: '', image: null });
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
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
        {uploading && (
          <div className={styles.progressContainer}>
            <div
              className={styles.progressBar}
              style={{ width: `${uploadProgress}%` }}
            ></div>
            <span className={styles.progressText}>{Math.round(uploadProgress)}%</span>
          </div>
        )}
        <button type="submit" className={styles.button} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Share Your Kindness'}
        </button>
      </form>

      <div className={styles.posts}>
        {posts.map(post => (
          <div key={post.id} className={styles.post}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            {post.imageUrl && (
              <img src={post.imageUrl} alt={post.title} className={styles.postImage} />
            )}
            <div className={styles.postFooter}>
              <span>{new Date(post.date).toLocaleDateString()}</span>
              <button className={styles.likeButton}>❤️ {post.likes}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RippleOfKindness;
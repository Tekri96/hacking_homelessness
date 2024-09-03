// components/HomePage.js
import React, { useState, useEffect } from 'react';
import styles from './HomePage.module.css';
import { FaHome } from 'react-icons/fa';

const HomePage = () => {
  const [showRipple, setShowRipple] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowRipple(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <FaHome className={styles.icon} />
          <h1>CalgaryConnect</h1>
        </div>
        <p className={styles.subtitle}>Bridging Communities, Building Hope</p>
      </header>

      <main className={styles.main}>
        <div className={styles.interactiveArea}>
          <div className={`${styles.circle} ${showRipple ? styles.animate : ''}`}></div>
          <div className={`${styles.circle} ${showRipple ? styles.animate : ''}`}></div>
          <div className={`${styles.circle} ${showRipple ? styles.animate : ''}`}></div>
        </div>

        <section className={styles.missionSection}>
          <h2>Our Mission</h2>
          <p>CalgaryConnect is dedicated to creating a compassionate and supportive community for those experiencing homelessness in Calgary. We strive to connect individuals with vital resources, foster understanding, and inspire collective action to address the root causes of homelessness.</p>
        </section>
      </main>

      
    </div>
  );
};

export default HomePage;
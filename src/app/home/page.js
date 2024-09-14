"use client";
// pages/index.js
import styles from '../../styles/WelcomePage.module.css';
import { FaDonate } from 'react-icons/fa';

export default function WelcomePage() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to HomelessHelp</h1>
        <p className={styles.description}>
          Together, we can make a difference in tackling homelessness.
        </p>

        <button className={styles.donateButton}>
          <FaDonate className={styles.icon} />
          <span className={styles.text}>Make a Difference</span>
        </button>
      </main>

      <footer className={styles.footer}>
        <p>© 2024 HomelessHelp. All rights reserved.</p>
      </footer>
    </div>
  );
}
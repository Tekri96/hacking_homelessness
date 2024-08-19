// components/DonateButton.js
import React from 'react';
import { FaDonate } from 'react-icons/fa';
import styles from './DonateButton.module.css';

const DonateButton = ({ onClick }) => {
  return (
    <button className={styles.donateButton} onClick={onClick}>
      <FaDonate className={styles.icon} />
      <span className={styles.text}>Make a Difference</span>
    </button>
  );
};

export default DonateButton;
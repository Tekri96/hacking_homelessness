import React from 'react';
import styles from './Navigation.module.css';

const Navigation = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'resourceMap', label: 'Resource Map' },
    { id: 'askForHelp', label: 'Ask for Help' },
    { id: 'makeDonation', label: 'Make a Donation' },
    { id: 'successStories', label: 'Success Stories' },
    { id: 'rippleOfKindness', label: 'Ripple of Kindness' },
    { id: 'auth', label: 'Login' },
  ];

  return (
    <nav className={styles.navigation}>
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li key={item.id} className={styles.navItem}>
            <button
              className={`${styles.navButton} ${activeSection === item.id ? styles.active : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
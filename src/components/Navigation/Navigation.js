import React from 'react';
import styles from './Navigation.module.css';

const Navigation = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'resourceMap', label: 'Resource Map' },
    { id: 'rippleOfKindness', label: 'Ripple of Kindness' },
    { id: 'askForHelp', label: 'Ask For Help' },
    { id: 'makeDonation', label: 'Make a Donation' },
    { id: 'successStories', label: 'Success Stories' },
  ];

  return (
    <nav className={styles.navigation}>
      <ul>
        {navItems.map((item) => (
          <li key={item.id}>
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
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import styles from './Navigation.module.css';

const Navigation = ({ activeSection, setActiveSection }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', alwaysShow: true },
    { id: 'resourceMap', label: 'Resource Map', authRequired: true },
    { id: 'ChatWithNand', label: 'Ask for Help', alwaysShow: true },
    { id: 'makeDonation', label: 'Make a Donation', alwaysShow: true },
    { id: 'successStories', label: 'Success Stories', alwaysShow: true },
    { id: 'rippleOfKindness', label: 'Ripple of Kindness', authRequired: true },
    { id: 'auth', label: user ? 'Profile' : 'Login', alwaysShow: true },
  ];

  const handleNavClick = (id) => {
    setActiveSection(id);
  };

  const filteredNavItems = navItems.filter(item => item.alwaysShow || (item.authRequired && user));

  return (
    <nav className={styles.navigation}>
      <ul className={styles.navList}>
        {filteredNavItems.map((item) => (
          <li key={item.id} className={styles.navItem}>
            <button
              className={`${styles.navButton} ${activeSection === item.id ? styles.active : ''}`}
              onClick={() => handleNavClick(item.id)}
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
// components/HomePage.js
// import React, { useState, useEffect } from 'react';
// import styles from './HomePage.module.css';
// import { FaHome } from 'react-icons/fa';

// const HomePage = () => {
//   const [showRipple, setShowRipple] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setShowRipple(true), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className={styles.container}>
//       <header className={styles.header}>
//         <div className={styles.logo}>
//           <FaHome className={styles.icon} />
//           <h1>CalgaryConnect</h1>
//         </div>
//         <p className={styles.subtitle}>Bridging Communities, Building Hope</p>
//       </header>

//       <main className={styles.main}>
//         <div className={styles.interactiveArea}>
//           <div className={`${styles.circle} ${showRipple ? styles.animate : ''}`}></div>
//           <div className={`${styles.circle} ${showRipple ? styles.animate : ''}`}></div>
//           <div className={`${styles.circle} ${showRipple ? styles.animate : ''}`}></div>
//         </div>

//         <section className={styles.missionSection}>
//           <h2>Our Mission</h2>
//           <p>CalgaryConnect is dedicated to creating a compassionate and supportive community for those experiencing homelessness in Calgary. We strive to connect individuals with vital resources, foster understanding, and inspire collective action to address the root causes of homelessness.</p>
//         </section>
//       </main>

      
//     </div>
//   );
// };

// export default HomePage;





// components/HomePage.js
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import Firebase Auth functions
import styles from './HomePage.module.css';
import { FaHome, FaInfoCircle } from 'react-icons/fa'; // Import FaInfoCircle for the login banner

const HomePage = ({ setActiveSection }) => { // Added setActiveSection as a prop
  const [user, setUser] = useState(null); // State to track the user
  const [showRipple, setShowRipple] = useState(false); // State for ripple effect

  useEffect(() => {
    const auth = getAuth(); // Initialize Firebase Auth
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => { // Track user state changes
      setUser(currentUser); // Update user state
    });

    const timer = setTimeout(() => setShowRipple(true), 1000); // Timer for ripple effect

    return () => {
      unsubscribe(); // Clean up onAuthStateChanged listener
      clearTimeout(timer); // Clear ripple timer on component unmount
    };
  }, []);

  return (
    <div className={styles.container}>
      {/* Display login banner if user is not logged in */}
      {!user && (
        <div className={styles.loginBanner}>
          <FaInfoCircle className={styles.infoIcon} />
          <p>
            Log in to access our Resource Map and Ripple of Kindness features.
            <button onClick={() => setActiveSection('auth')} className={styles.loginLink}>
              Log In
            </button>
          </p>
        </div>
      )}

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

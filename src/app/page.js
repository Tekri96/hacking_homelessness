// "use client";
// // pages/index.js
// import { useState } from 'react';
// import styles from '../styles/WelcomePage.module.css';
// import DonateButton from '../components/DonateButton/DonateButton.js';
// import Navigation from '../components/Navigation/Navigation.js';
// import ResourceMap from '../components/ResourceMap/ResourceMap.js';
// import AskForHelp from '../components/AskForHelp/AskForHelp.js';
// import MakeDonation from '../components/MakeDonation/MakeDonation.js';
// import SuccessStories from '../components/SuccessStories/SuccessStories.js';

// export default function WelcomePage() {
//   const [activeSection, setActiveSection] = useState('home');

//   const renderSection = () => {
//     switch (activeSection) {
//       case 'resourceMap':
//         return <ResourceMap />;
//       case 'askForHelp':
//         return <AskForHelp />;
//       case 'makeDonation':
//         return <MakeDonation />;
//       case 'successStories':
//         return <SuccessStories />;
//       default:
//         return (
//           <>
//             <h1 className={styles.title}>Welcome to HomelessHelp</h1>
//             <p className={styles.description}>
//               Together, we can make a difference in tackling homelessness.
//             </p>
//           </>
//         );
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
//       <main className={styles.main}>
//         {renderSection()}
//       </main>
//       <footer className={styles.footer}>
//         <p>© 2024 HomelessHelp. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

"use client";
import { useState } from 'react';
import styles from '../styles/WelcomePage.module.css';
import HomePage from '../components/HomePage/HomePage';
import Navigation from '../components/Navigation/Navigation.js';
import ResourceMap from '../components/ResourceMap/ResourceMap.js';
import AskForHelp from '../components/AskForHelp/AskForHelp.js';
import MakeDonation from '../components/MakeDonation/MakeDonation.js';
import SuccessStories from '../components/SuccessStories/SuccessStories.js';
import RippleOfKindness from '../components/RippleOfKindness/RippleOfKindness.js';

export default function WelcomePage() {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomePage />;
      case 'resourceMap':
        return <ResourceMap />;
      case 'askForHelp':
        return <AskForHelp />;
      case 'makeDonation':
        return <MakeDonation />;
      case 'successStories':
        return <SuccessStories />;
      case 'rippleOfKindness':
        return <RippleOfKindness />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className={styles.container}>
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className={styles.main}>
        {renderSection()}
      </main>
      <footer className={styles.footer}>
        <p>© 2024 CalgaryConnect. All rights reserved.</p>
      </footer>
    </div>
  );
}
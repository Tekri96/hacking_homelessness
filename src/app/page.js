"use client";
import { useState } from 'react';
import styles from '../styles/WelcomePage.module.css';
import HomePage from '@/components/HomePage/HomePage';
import Navigation from '@/components/Navigation/Navigation.js';
import ResourceMap from '@/components/ResourceMap/ResourceMap.js';
import ChatWithNand from '@/components/ChatWithNand/ChatWithNand.js';
import MakeDonation from '@/components/MakeDonation/MakeDonation.js';
import SuccessStories from '@/components/SuccessStories/SuccessStories.js';
import RippleOfKindness from '@/components/RippleOfKindness/RippleOfKindness.js';
import AuthForm from '@/components/AuthForm/AuthForm.js';

export default function WelcomePage() {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomePage />;
      case 'resourceMap':
        return <ResourceMap />;
      case 'ChatWithNand':
        return <ChatWithNand />;
      case 'makeDonation':
        return <MakeDonation />;
      case 'successStories':
        return <SuccessStories />;
      case 'rippleOfKindness':
        return <RippleOfKindness />;
      case 'auth':
        return <AuthForm />;
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
      <div className={styles.footerContent}>
        <img 
          src="https://shivam-sahil.vercel.app/morpankh.svg" 
          alt="CalgaryConnect Logo" 
          className={styles.footerLogo}
        />
        <p>© 2024 CalgaryConnect. All rights reserved.</p>
      </div>
    </footer>
  </div>
);
}
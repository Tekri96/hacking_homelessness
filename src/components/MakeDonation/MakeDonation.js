// components/MakeDonation.js
import React from 'react';
import styles from './MakeDonation.module.css';

const MakeDonation = () => {
  const organizations = [
    {
      name: "Alpha House",
      description: "Support Alpha House by purchasing items from their Amazon Wishlist.",
      link: "https://www.amazon.ca/hz/wishlist/ls/1U4579JMPVFZ?ref_=wl_share",
      buttonText: "View Wishlist"
    },
    {
      name: "Calgary Drop-In",
      description: "Help Calgary Drop-In by purchasing items from their Amazon Wishlist.",
      link: "https://www.amazon.ca/hz/wishlist/ls/1G1G5IXZ3HXQP?ref_=wl_share",
      buttonText: "View Wishlist"
    },
    {
      name: "Salvation Army",
      description: "Make a direct donation to support Salvation Army's initiatives.",
      link: "https://donate.salvationarmy.ca/page/63189/donate/1?ea.tracking.id=TSMBing&utm_source=sep-bing&utm_medium=cpc&utm_campaign=restock2024&utm_content=responsive-search1&utm_term=branded&msclkid=6760bfa4baef131ad2fdda30e8ab5432",
      buttonText: "Donate Now"
    },
    {
      name: "The Mustard Seed",
      description: "Support The Mustard Seed's Winter Wish List campaign.",
      link: "https://theseed.ca/winter-lists",
      buttonText: "View Winter List"
    },
    {
      name: "Parachute for Pets",
      description: "Help support people with their pets through Parachute for Pets.",
      link: "https://www.parachutesforpets.com/",
      buttonText: "Donate"
    },
    {
      name: "United Way of Calgary and Area",
      description: "Improve lives in Calgary and area through United Way.",
      link: "https://calgaryunitedway.org/donate/",
      buttonText: "Donate"
    }
  ];

  return (
    <div className={styles.makeDonation}>
      <h2>Make a Donation</h2>
      <p>Your contribution can make a real difference. Choose an organization to support:</p>
      <div className={styles.organizationGrid}>
        {organizations.map((org, index) => (
          <div key={index} className={styles.organizationCard}>
            <h3>{org.name}</h3>
            <p>{org.description}</p>
            <a href={org.link} target="_blank" rel="noopener noreferrer" className={styles.donateButton}>
              {org.buttonText}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MakeDonation;
// components/SuccessStories.js
// import React from 'react';
// import styles from './SuccessStories.module.css';

// const stories = [
//   {
//     id: 1,
//     title: "Alberta government announces $12M in funding for Calgary homelessness supports",
//     excerpt: "The Alberta government is investing $12 million in funding to support three Calgary organizations that help people experiencing homelessness.",
//     imageUrl: "https://i.cbc.ca/1.7225904.1705096711!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/jeremy-nixon.jpg",
//     link: "https://www.cbc.ca/news/canada/calgary/alberta-government-calgary-homeless-support-1.7225900"
//   },
//   {
//     id: 2,
//     title: "Calgary homeless shelter sees 60% increase in families needing help",
//     excerpt: "Inn from the Cold says inflation and a lack of affordable housing are driving more families to seek shelter",
//     imageUrl: "https://smartcdn.gprod.postmedia.digital/calgaryherald/wp-content/uploads/2023/01/0113-news-homeless-w.jpg",
//     link: "https://calgaryherald.com/news/local-news/homelessness-in-calgary-inn-from-the-cold-inflation-rental-market"
//   },
//   {
//     id: 3,
//     title: "Calgary woman who experienced homelessness now helps others get back on their feet",
//     excerpt: "Lisa Grigolato went from living on the streets to working with homeless-serving agencies",
//     imageUrl: "https://i.cbc.ca/1.6359516.1645745155!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/lisa-grigolato.jpg",
//     link: "https://www.cbc.ca/news/canada/calgary/lisa-grigolato-drop-in-centre-mustard-seed-alpha-house-homeless-1.6359480"
//   }
// ];

// const SuccessStories = () => {
//   return (
//     <div className={styles.successStories}>
//       <h2>Success Stories and News</h2>
//       <p>Read about the lives we've helped change and recent developments in tackling homelessness:</p>
//       <div className={styles.storyGrid}>
//         {stories.map((story) => (
//           <a key={story.id} href={story.link} target="_blank" rel="noopener noreferrer" className={styles.storyCard}>
//             <img src={story.imageUrl} alt={story.title} className={styles.storyImage} />
//             <div className={styles.storyContent}>
//               <h3 className={styles.storyTitle}>{story.title}</h3>
//               <p className={styles.storyExcerpt}>{story.excerpt}</p>
//             </div>
//           </a>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SuccessStories;


'use client';

import React from 'react';
import styles from './SuccessStories.module.css';
import Image from 'next/image';

const stories = [
  {
    id: 1,
    url: "https://calgaryherald.com/news/local-news/province-breaks-ground-navigation-support-centre-calgary-homeless",
    fallbackTitle: "New Support Center Brings Hope to Calgary's Homeless",
    fallbackDescription: "A navigation and support center opening in Calgary aims to provide comprehensive assistance to those experiencing homelessness, offering a path to stability and a better life.",
    fallbackImage: "https://smartcdn.gprod.postmedia.digital/calgaryherald/wp-content/uploads/2024/06/20240605_Homeless_CalgaryJW012-copy.jpg?quality=90&strip=all&w=564&type=webp&sig=lgjC6q7mnWKpX2fjJ_rCKw"
  },
  {
    id: 2,
    url: "https://www.cbc.ca/news/canada/calgary/lisa-grigolato-drop-in-centre-mustard-seed-alpha-house-homeless-1.6359480",
    fallbackTitle: "Calgary woman who experienced homelessness now helps others",
    fallbackDescription: "Lisa Grigolato shares her story of unexpected homelessness, challenging common misconceptions and highlighting the diverse backgrounds of those facing housing insecurity in Calgary.",
    fallbackImage: "https://i.cbc.ca/1.6359588.1645478722!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/lisa-grigolato.jpg"
  },
  {
    id: 3,
    url: "https://calgaryherald.com/sponsored/news-sponsored/calgary-student-overcomes-homelessness-and-hardship-to-pursue-her-dreams",
    fallbackTitle: "From Homelessness to Valedictorian: A Calgary Student's Inspiring Journey",
    fallbackDescription: "Lubna Ismail's story of overcoming homelessness and becoming her school's first Hijab-wearing Muslim valedictorian showcases resilience and the power of community support in transforming lives.",
    fallbackImage: "https://smartcdn.gprod.postmedia.digital/calgaryherald/wp-content/uploads/2024/08/3-3.jpg?quality=90&strip=all&w=1128&type=webp&sig=fUa3NFvTRALSi9PgBpPelw"
  },
  {
    id: 4,
    url: "https://calgaryherald.com/news/local-news/province-bolsters-calgarys-year-round-shelter-space",
    fallbackTitle: "Calgary Expands Women-Only Emergency Shelter Spaces",
    fallbackDescription: "Forty new shelter beds dedicated to women experiencing homelessness open in Calgary, offering tailored services and support in response to growing demand.",
    fallbackImage: "https://smartcdn.gprod.postmedia.digital/calgaryherald/wp-content/uploads/2022/10/0323-mustard-seed.jpg?quality=90&strip=all&w=1128&h=846&type=webp&sig=jTlEgmDLpmfFwISmF_6T5A"
  },
  {
    id: 5,
    url: "https://calgary.citynews.ca/2024/08/13/calgary-shelter-for-seniors-homeless-part-2/",
    fallbackTitle: "Calgary Senior Shares Her Year-Long Journey Through Homelessness",
    fallbackDescription: "A 70-year-old woman's story highlights the growing crisis of senior homelessness in Calgary, revealing the challenges of finding affordable housing and the harsh realities of life on the streets for elderly individuals.",
    fallbackImage: "https://calgary.citynews.ca/wp-content/blogs.dir/sites/8/2024/08/12/Untitled-design-62.png"
  },
  {
    id: 6,
    url: "https://calgary.citynews.ca/2024/01/10/calgary-versus-edmonton-encampments/",
    fallbackTitle: "Calgary Adopts 'Compassionate' Approach to Homeless Encampments",
    fallbackDescription: "While Edmonton faces controversy over aggressive encampment clearances, Calgary emphasizes a more compassionate strategy in addressing homelessness, focusing on balancing dignity, safety, and community concerns.",
    fallbackImage: "https://calgary.citynews.ca/wp-content/blogs.dir/sites/8/2024/01/20240109140156-30b3423fda9a014dbcd4261057d1331dbbca1159dae4bcb620122d1f86db906d.jpg"
  }
];

const SuccessStories = () => {
  return (
    <div className={styles.successStories}>
      <h2 className={styles.mainTitle}>Success Stories and News</h2>
      <p className={styles.mainDescription}>Read about the lives we've helped change and recent developments in tackling homelessness:</p>
      <div className={styles.storyGrid}>
        {stories.map((story) => (
          <a key={story.id} href={story.url} target="_blank" rel="noopener noreferrer" className={styles.storyCard}>
            <div className={styles.imageWrapper}>
              <Image
                src={story.fallbackImage}
                alt={story.fallbackTitle}
                layout="fill"
                objectFit="cover"
                className={styles.storyImage}
              />
            </div>
            <div className={styles.storyContent}>
              <h3 className={styles.storyTitle}>{story.fallbackTitle}</h3>
              <p className={styles.storyExcerpt}>{story.fallbackDescription}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SuccessStories;
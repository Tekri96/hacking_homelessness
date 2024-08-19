// components/ResourceMap.js
import React, { useState } from 'react';
import styles from './ResourceMap.module.css';

const ResourceMap = () => {
  const [selectedResource, setSelectedResource] = useState(null);
  const resources = [
    'Shelter Locations',
    'Public Library',
    'Public Restrooms',
    'Community Association',
    'Food Centre'
  ];

  const handleResourceClick = (resource) => {
    setSelectedResource(resource);
    // Here you would typically make an API call to get the locations
    // and update the map accordingly
    console.log(`Fetching locations for ${resource}`);
  };

  return (
    <div className={styles.resourceMap}>
      <h2>Resource Map</h2>
      <div className={styles.filters}>
        {resources.map((resource) => (
          <button
            key={resource}
            className={`${styles.filterButton} ${selectedResource === resource ? styles.active : ''}`}
            onClick={() => handleResourceClick(resource)}
          >
            {resource}
          </button>
        ))}
      </div>
      <div className={styles.mapContainer}>
        {selectedResource ? (
          <p>Google Maps view of {selectedResource} would be displayed here.</p>
        ) : (
          <p>Select a resource to view locations on the map.</p>
        )}
        {/* Here you would integrate the Google Maps component */}
      </div>
    </div>
  );
};

export default ResourceMap;
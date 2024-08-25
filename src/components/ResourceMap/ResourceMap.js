// components/ResourceMap.js
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
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

  // Coordinates for the University of Calgary
  const center = {
    lat: 51.0785,
    lng: -114.1354
  };

  const handleResourceClick = (resource) => {
    setSelectedResource(resource);
    // Here you would typically make an API call to get the locations
    // and update the map accordingly
    console.log(`Fetching locations for ${resource}`);
  };
  const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;
  if (!apiKey) alert(`Please set your Google Maps API key in a .env file at the root of your project. The key should be named NEXT_PUBLIC_MAPS_API_KEY.`);

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
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '400px' }}
            center={center}
            zoom={15}
          >
            {/* You can add markers here based on selectedResource */}
            {selectedResource && <Marker position={center} />}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default ResourceMap;

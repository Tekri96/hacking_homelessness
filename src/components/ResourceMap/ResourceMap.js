// components/ResourceMap.js
import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import styles from './ResourceMap.module.css';
const resources = [
  'Shelter Locations',
  'Public Library',
  'Public Restrooms',
  'Community Association',
  'Food Centre',
];

// Coordinates for the University of Calgary
const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 51.07842779539652,
  lng: -114.1346499091544,
};
const zoom = 10;
const ResourceMap = () => {
  const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;
  if (!apiKey)
    alert(
      `Please set your Google Maps API key in a .env file at the root of your project. The key should be named NEXT_PUBLIC_MAPS_API_KEY.`
    );
  const [selectedResource, setSelectedResource] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script-hacking-homelessness',
    googleMapsApiKey: apiKey,
  });
  const [map, setMap] = useState(null);
  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    map.setZoom(zoom);

    setMap(map);
  }, []);
  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);
  return (
    <div className={styles.resourceMap}>
      <h2>Resource Map</h2>
      <div className={styles.filters}>
        {resources.map((resource) => (
          <button
            key={resource}
            className={`${styles.filterButton} ${selectedResource === resource ? styles.active : ''
              }`}
            onClick={() => handleResourceClick(resource)}>
            {resource}
          </button>
        ))}
      </div>
      <div className={styles.mapContainer}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            onLoad={onLoad}
            onUnmount={onUnmount}>
            <></>
          </GoogleMap>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ResourceMap;

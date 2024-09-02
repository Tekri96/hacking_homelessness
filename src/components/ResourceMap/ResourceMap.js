import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import styles from './ResourceMap.module.css';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 51.0447,
  lng: -114.0719
};

const ResourceMap = () => {
  const [locations, setLocations] = useState([]);
  const [map, setMap] = useState(null);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    const fetchLocations = async () => {
      console.log('Fetching shelter locations');
      try {
        const res = await fetch('/api/locations');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log('Received shelter data:', data);
        setLocations(data.shelters || []);
      } catch (error) {
        console.error('Error fetching shelter locations:', error);
        setError('Failed to fetch shelter locations. Please try again later.');
        setLocations([]);
      }
    };

    fetchLocations();
  }, []);

  const onLoad = useCallback(function callback(map) {
    console.log('Map loaded');
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    if (map && locations.length > 0) {
      console.log('Adjusting map bounds for', locations.length, 'shelters');
      const bounds = new window.google.maps.LatLngBounds();
      locations.forEach((location) => {
        bounds.extend(new window.google.maps.LatLng(location.lat, location.lng));
      });
      map.fitBounds(bounds);
    }
  }, [map, locations]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div className={styles.resourceMap}>
      <h2>Shelter Locations</h2>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.mapContainer}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.lat, lng: location.lng }}
              onClick={() => setSelectedLocation(location)}
            />
          ))}
          {selectedLocation && (
            <InfoWindow
              position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
              onCloseClick={() => setSelectedLocation(null)}
            >
              <div>
                <h3>{selectedLocation.name}</h3>
                <p>{selectedLocation.address}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.shelterTable}>
          <thead>
            <tr>
              <th>Shelter Name</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location, index) => (
              <tr key={index}>
                <td>{location.name}</td>
                <td>{location.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResourceMap;
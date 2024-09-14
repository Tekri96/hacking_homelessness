import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
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
  const [resourceType, setResourceType] = useState('shelters');
  const [user, setUser] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return; // Don't fetch if user is not logged in

    const fetchLocations = async () => {
      console.log(`Fetching ${resourceType} locations`);
      try {
        const res = await fetch('/api/locations');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log(`Received ${resourceType} data:`, data);
        if (data[resourceType]) {
          setLocations(data[resourceType]);
          setError(null);
        } else {
          setError(`No data available for ${resourceType}`);
          setLocations([]);
        }
      } catch (error) {
        console.error(`Error fetching ${resourceType} locations:`, error);
        setError(`Failed to fetch ${resourceType} locations. Please try again later.`);
        setLocations([]);
      }
    };

    fetchLocations();
  }, [resourceType, user]);

  const onLoad = useCallback(function callback(map) {
    console.log('Map loaded');
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    if (map && locations.length > 0) {
      console.log('Adjusting map bounds for', locations.length, resourceType);
      const bounds = new window.google.maps.LatLngBounds();
      locations.forEach((location) => {
        bounds.extend(new window.google.maps.LatLng(location.lat, location.lng));
      });
      map.fitBounds(bounds);
    }
  }, [map, locations, resourceType]);

  const handleResourceTypeChange = (type) => {
    setResourceType(type);
    setSelectedLocation(null);
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  const resourceTitles = {
    shelters: 'Shelter Locations',
    libraries: 'Public Libraries',
    restrooms: 'Public Restrooms',
    foodCentres: 'Food Centres'
  };

  if (!user) {
    return (
      <div className={styles.resourceMap}>
        <h2>Resource Map</h2>
        <p className={styles.loginMessage}>Please log in to see the resources.</p>
      </div>
    );
  }

  return (
    <div className={styles.resourceMap}>
      <h2>{resourceTitles[resourceType]}</h2>
      <div className={styles.resourceTypeButtons}>
        <button onClick={() => handleResourceTypeChange('shelters')}>Shelter Locations</button>
        <button onClick={() => handleResourceTypeChange('libraries')}>Public Libraries</button>
        <button onClick={() => handleResourceTypeChange('restrooms')}>Public Restrooms</button>
        <button onClick={() => handleResourceTypeChange('foodCentres')}>Food Centres</button>
      </div>
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
                {selectedLocation.phone && <p>Phone: {selectedLocation.phone}</p>}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.resourceTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              {resourceType !== 'restrooms' && <th>Phone</th>}
            </tr>
          </thead>
          <tbody>
            {locations.map((location, index) => (
              <tr key={index}>
                <td>{location.name}</td>
                <td>{location.address}</td>
                {resourceType !== 'restrooms' && <td>{location.phone || 'N/A'}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResourceMap;
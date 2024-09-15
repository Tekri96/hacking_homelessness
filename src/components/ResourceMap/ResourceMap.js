// import React, { useState, useCallback, useEffect } from 'react';
// import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import styles from './ResourceMap.module.css';

// const containerStyle = {
//   width: '100%',
//   height: '400px',
// };

// const center = {
//   lat: 51.0447,
//   lng: -114.0719
// };

// const ResourceMap = () => {
//   const [locations, setLocations] = useState([]);
//   const [map, setMap] = useState(null);
//   const [error, setError] = useState(null);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [resourceType, setResourceType] = useState('shelters');
//   const [user, setUser] = useState(null);

//   const { isLoaded, loadError } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
//   });

//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });

//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     if (!user) return; // Don't fetch if user is not logged in

//     const fetchLocations = async () => {
//       console.log(`Fetching ${resourceType} locations`);
//       try {
//         const res = await fetch('/api/locations');
//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }
//         const data = await res.json();
//         console.log(`Received ${resourceType} data:`, data);
//         if (data[resourceType]) {
//           setLocations(data[resourceType]);
//           setError(null);
//         } else {
//           setError(`No data available for ${resourceType}`);
//           setLocations([]);
//         }
//       } catch (error) {
//         console.error(`Error fetching ${resourceType} locations:`, error);
//         setError(`Failed to fetch ${resourceType} locations. Please try again later.`);
//         setLocations([]);
//       }
//     };

//     fetchLocations();
//   }, [resourceType, user]);

//   const onLoad = useCallback(function callback(map) {
//     console.log('Map loaded');
//     setMap(map);
//   }, []);

//   const onUnmount = useCallback(function callback(map) {
//     setMap(null);
//   }, []);

//   useEffect(() => {
//     if (map && locations.length > 0) {
//       console.log('Adjusting map bounds for', locations.length, resourceType);
//       const bounds = new window.google.maps.LatLngBounds();
//       locations.forEach((location) => {
//         bounds.extend(new window.google.maps.LatLng(location.lat, location.lng));
//       });
//       map.fitBounds(bounds);
//     }
//   }, [map, locations, resourceType]);

//   const handleResourceTypeChange = (type) => {
//     setResourceType(type);
//     setSelectedLocation(null);
//   };

//   if (loadError) {
//     return <div>Error loading maps</div>;
//   }

//   if (!isLoaded) {
//     return <div>Loading maps</div>;
//   }

//   const resourceTitles = {
//     shelters: 'Shelter Locations',
//     libraries: 'Public Libraries',
//     restrooms: 'Public Restrooms',
//     foodCentres: 'Food Centres'
//   };

//   if (!user) {
//     return (
//       <div className={styles.resourceMap}>
//         <h2>Resource Map</h2>
//         <p className={styles.loginMessage}>Please log in to see the resources.</p>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.resourceMap}>
//       <h2>{resourceTitles[resourceType]}</h2>
//       <div className={styles.resourceTypeButtons}>
//         <button onClick={() => handleResourceTypeChange('shelters')}>Shelter Locations</button>
//         <button onClick={() => handleResourceTypeChange('libraries')}>Public Libraries</button>
//         <button onClick={() => handleResourceTypeChange('restrooms')}>Public Restrooms</button>
//         <button onClick={() => handleResourceTypeChange('foodCentres')}>Food Centres</button>
//       </div>
//       {error && <p className={styles.error}>{error}</p>}
//       <div className={styles.mapContainer}>
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={center}
//           zoom={10}
//           onLoad={onLoad}
//           onUnmount={onUnmount}
//         >
//           {locations.map((location, index) => (
//             <Marker
//               key={index}
//               position={{ lat: location.lat, lng: location.lng }}
//               onClick={() => setSelectedLocation(location)}
//             />
//           ))}
//           {selectedLocation && (
//             <InfoWindow
//               position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
//               onCloseClick={() => setSelectedLocation(null)}
//             >
//               <div>
//                 <h3>{selectedLocation.name}</h3>
//                 <p>{selectedLocation.address}</p>
//                 {selectedLocation.phone && <p>Phone: {selectedLocation.phone}</p>}
//               </div>
//             </InfoWindow>
//           )}
//         </GoogleMap>
//       </div>
//       <div className={styles.tableContainer}>
//         <table className={styles.resourceTable}>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Address</th>
//               {resourceType !== 'restrooms' && <th>Phone</th>}
//             </tr>
//           </thead>
//           <tbody>
//             {locations.map((location, index) => (
//               <tr key={index}>
//                 <td>{location.name}</td>
//                 <td>{location.address}</td>
//                 {resourceType !== 'restrooms' && <td>{location.phone || 'N/A'}</td>}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ResourceMap;

// import React, { useState, useCallback, useEffect } from 'react';
// import { GoogleMap, useJsApiLoader, Marker, InfoWindow, DirectionsRenderer } from '@react-google-maps/api';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import styles from './ResourceMap.module.css';

// const containerStyle = {
//   width: '100%',
//   height: '400px',
// };

// const center = {
//   lat: 51.0447,
//   lng: -114.0719
// };

// const libraries = ['places'];

// const ResourceMap = () => {
//   const [locations, setLocations] = useState([]);
//   const [map, setMap] = useState(null);
//   const [error, setError] = useState(null);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [resourceType, setResourceType] = useState('shelters');
//   const [user, setUser] = useState(null);
//   const [userLocation, setUserLocation] = useState(null);
//   const [directions, setDirections] = useState(null);
//   const [isLoadingUserLocation, setIsLoadingUserLocation] = useState(true);

//   const { isLoaded, loadError } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
//     libraries: ['places', 'directions'],
//   });

//   // Add this useEffect hook to verify the API key is loaded correctly
// useEffect(() => {
//   if (isLoaded) {
//     console.log('Google Maps API loaded successfully');
//   }
//   if (loadError) {
//     console.error('Error loading Google Maps API:', loadError);
//   }
// }, [isLoaded, loadError]);

//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });

//     return () => unsubscribe();
//   }, []);

//   const requestUserLocation = useCallback(() => {
//     setIsLoadingUserLocation(true);
//     if (navigator.geolocation) {
//       console.log('Requesting user location');
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           console.log('User location received:', position.coords);
//           setUserLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           });
//           setIsLoadingUserLocation(false);
//           setError(null);
//         },
//         (err) => {
//           console.error('Error getting user location:', err);
//           setError('Unable to retrieve your location. Please ensure location services are enabled and you have granted permission.');
//           setIsLoadingUserLocation(false);
//         },
//         { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//       );
//     } else {
//       console.error('Geolocation is not supported');
//       setError('Geolocation is not supported by your browser');
//       setIsLoadingUserLocation(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (!user) return; // Don't fetch if user is not logged in

//     const fetchLocations = async () => {
//       console.log(`Fetching ${resourceType} locations`);
//       try {
//         const res = await fetch('/api/locations');
//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }
//         const data = await res.json();
//         console.log(`Received ${resourceType} data:`, data);
//         if (data[resourceType]) {
//           setLocations(data[resourceType]);
//           setError(null);
//         } else {
//           setError(`No data available for ${resourceType}`);
//           setLocations([]);
//         }
//       } catch (error) {
//         console.error(`Error fetching ${resourceType} locations:`, error);
//         setError(`Failed to fetch ${resourceType} locations. Please try again later.`);
//         setLocations([]);
//       }
//     };

//     fetchLocations();
//     requestUserLocation();
//   }, [resourceType, user, requestUserLocation]);

//   const onLoad = useCallback(function callback(map) {
//     console.log('Map loaded');
//     setMap(map);
//   }, []);

//   const onUnmount = useCallback(function callback(map) {
//     setMap(null);
//   }, []);

//   useEffect(() => {
//     if (map && locations.length > 0) {
//       console.log('Adjusting map bounds for', locations.length, resourceType);
//       const bounds = new window.google.maps.LatLngBounds();
//       locations.forEach((location) => {
//         bounds.extend(new window.google.maps.LatLng(location.lat, location.lng));
//       });
//       map.fitBounds(bounds);
//     }
//   }, [map, locations, resourceType]);

//   const handleResourceTypeChange = (type) => {
//     setResourceType(type);
//     setSelectedLocation(null);
//     setDirections(null);
//   };

//   const getDirections = useCallback(() => {
//     console.log('getDirections called');
//     console.log('User location:', userLocation);
//     console.log('Selected location:', selectedLocation);
  
//     if (!selectedLocation || !userLocation) {
//       console.error('Cannot get directions: missing selected location or user location');
//       if (!selectedLocation) console.error('Selected location is missing');
//       if (!userLocation) console.error('User location is missing');
//       setError('Unable to get directions: location information is missing');
//       return;
//     }
  
//     if (!window.google || !window.google.maps) {
//       console.error('Google Maps API not loaded');
//       setError('Unable to get directions: Google Maps API not loaded');
//       return;
//     }
  
//     const directionsService = new window.google.maps.DirectionsService();
  
//     console.log('Requesting directions from', userLocation, 'to', selectedLocation);
  
//     directionsService.route(
//       {
//         origin: new window.google.maps.LatLng(userLocation.lat, userLocation.lng),
//         destination: new window.google.maps.LatLng(selectedLocation.lat, selectedLocation.lng),
//         travelMode: window.google.maps.TravelMode.DRIVING,
//       },
//       (result, status) => {
//         console.log('Directions service response:', status);
//         if (status === window.google.maps.DirectionsStatus.OK) {
//           console.log('Directions received:', result);
//           setDirections(result);
//           setError(null);
//         } else {
//           console.error('Error fetching directions:', status);
//           setError(`Error fetching directions: ${status}. Please try again.`);
//           setDirections(null);
//         }
//       }
//     );
//   }, [selectedLocation, userLocation]);





  

//   if (loadError) {
//     return <div>Error loading maps</div>;
//   }

//   if (!isLoaded) {
//     return <div>Loading maps</div>;
//   }

//   const resourceTitles = {
//     shelters: 'Shelter Locations',
//     libraries: 'Public Libraries',
//     restrooms: 'Public Restrooms',
//     foodCentres: 'Food Centres'
//   };

//   if (!user) {
//     return (
//       <div className={styles.resourceMap}>
//         <h2>Resource Map</h2>
//         <p className={styles.loginMessage}>Please log in to see the resources.</p>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.resourceMap}>
//       <h2>{resourceTitles[resourceType]}</h2>
//       <div className={styles.resourceTypeButtons}>
//         <button onClick={() => handleResourceTypeChange('shelters')}>Shelter Locations</button>
//         <button onClick={() => handleResourceTypeChange('libraries')}>Public Libraries</button>
//         <button onClick={() => handleResourceTypeChange('restrooms')}>Public Restrooms</button>
//         <button onClick={() => handleResourceTypeChange('foodCentres')}>Food Centres</button>
//       </div>
//       {error && <p className={styles.error}>{error}</p>}
//       {isLoadingUserLocation && <p>Loading your location...</p>}
//       {!userLocation && !isLoadingUserLocation && (
//         <button onClick={requestUserLocation} className={styles.locationButton}>
//           Share Your Location
//         </button>
//       )}
//       <div className={styles.mapContainer}>
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={center}
//           zoom={10}
//           onLoad={onLoad}
//           onUnmount={onUnmount}
//         >
//           {locations.map((location, index) => (
//             <Marker
//               key={index}
//               position={{ lat: location.lat, lng: location.lng }}
//               onClick={() => {
//                 console.log('Location selected:', location);
//                 setSelectedLocation(location);
//               }}
//             />
//           ))}
//           {selectedLocation && (
//             <InfoWindow
//               position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
//               onCloseClick={() => setSelectedLocation(null)}
//             >
//               <div className={styles.infoWindow}>
//                 <h3>{selectedLocation.name}</h3>
//                 <p>{selectedLocation.address}</p>
//                 {selectedLocation.phone && <p>Phone: {selectedLocation.phone}</p>}
//                 <button onClick={getDirections} className={styles.directionsButton}>Get Directions</button>
//               </div>
//             </InfoWindow>
//           )}
//           {userLocation && (
//             <Marker
//               position={userLocation}
//               icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
//             />
//           )}
//           {directions && (
//             <DirectionsRenderer
//               directions={directions}
//               options={{
//                 suppressMarkers: true,
//                 polylineOptions: {
//                   strokeColor: "#1a5f7a",
//                   strokeWeight: 4,
//                 },
//               }}
//             />
//           )}
//         </GoogleMap>
//       </div>
//       {selectedLocation && (
//         <div className={styles.selectedLocationInfo}>
//           <h3>Selected Location: {selectedLocation.name}</h3>
//           <p>{selectedLocation.address}</p>
//           {selectedLocation.phone && <p>Phone: {selectedLocation.phone}</p>}
//           <button onClick={getDirections} className={styles.directionsButton}>Get Directions</button>
//         </div>
//       )}
//       <div className={styles.tableContainer}>
//         <table className={styles.resourceTable}>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Address</th>
//               {resourceType !== 'restrooms' && <th>Phone</th>}
//             </tr>
//           </thead>
//           <tbody>
//             {locations.map((location, index) => (
//               <tr key={index}>
//                 <td>{location.name}</td>
//                 <td>{location.address}</td>
//                 {resourceType !== 'restrooms' && <td>{location.phone || 'N/A'}</td>}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ResourceMap;

import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, DirectionsRenderer } from '@react-google-maps/api';
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

const libraries = ['places', 'directions'];

const ResourceMap = () => {
  const [locations, setLocations] = useState([]);
  const [map, setMap] = useState(null);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [resourceType, setResourceType] = useState('shelters');
  const [user, setUser] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [directions, setDirections] = useState(null);
  const [isLoadingUserLocation, setIsLoadingUserLocation] = useState(true);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  useEffect(() => {
    if (isLoaded) {
      console.log('Google Maps API loaded successfully');
    }
    if (loadError) {
      console.error('Error loading Google Maps API:', loadError);
    }
  }, [isLoaded, loadError]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const requestUserLocation = useCallback(() => {
    setIsLoadingUserLocation(true);
    if (navigator.geolocation) {
      console.log('Requesting user location');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('User location received:', position.coords);
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLoadingUserLocation(false);
          setError(null);
        },
        (err) => {
          console.error('Error getting user location:', err);
          setError('Unable to retrieve your location. Please ensure location services are enabled and you have granted permission.');
          setIsLoadingUserLocation(false);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      console.error('Geolocation is not supported');
      setError('Geolocation is not supported by your browser');
      setIsLoadingUserLocation(false);
    }
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
        console.log(`Received data:`, data);
        if (data[resourceType]) {
          console.log(`${resourceType} data:`, data[resourceType]);
          setLocations(data[resourceType]);
          setError(null);
        } else {
          console.error(`No data available for ${resourceType}`);
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
    requestUserLocation();
  }, [resourceType, user, requestUserLocation]);

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
        bounds.extend(new window.google.maps.LatLng(parseFloat(location.lat), parseFloat(location.lng)));
      });
      map.fitBounds(bounds);
    }
  }, [map, locations, resourceType]);

  const handleResourceTypeChange = (type) => {
    console.log('Changing resource type to:', type);
    setResourceType(type);
    setSelectedLocation(null);
    setDirections(null);
  };

  const getDirections = useCallback(() => {
    console.log('getDirections called');
    console.log('User location:', userLocation);
    console.log('Selected location:', selectedLocation);
  
    if (!selectedLocation || !userLocation) {
      console.error('Cannot get directions: missing selected location or user location');
      if (!selectedLocation) console.error('Selected location is missing');
      if (!userLocation) console.error('User location is missing');
      setError('Unable to get directions: location information is missing');
      return;
    }
  
    if (!window.google || !window.google.maps) {
      console.error('Google Maps API not loaded');
      setError('Unable to get directions: Google Maps API not loaded');
      return;
    }
  
    const directionsService = new window.google.maps.DirectionsService();
  
    console.log('Requesting directions from', userLocation, 'to', selectedLocation);
  
    directionsService.route(
      {
        origin: new window.google.maps.LatLng(parseFloat(userLocation.lat), parseFloat(userLocation.lng)),
        destination: new window.google.maps.LatLng(parseFloat(selectedLocation.lat), parseFloat(selectedLocation.lng)),
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        console.log('Directions service response:', status);
        if (status === window.google.maps.DirectionsStatus.OK) {
          console.log('Directions received:', result);
          setDirections(result);
          setError(null);
        } else {
          console.error('Error fetching directions:', status);
          setError(`Error fetching directions: ${status}. Please try again.`);
          setDirections(null);
        }
      }
    );
  }, [selectedLocation, userLocation]);

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
      {isLoadingUserLocation && <p>Loading your location...</p>}
      {!userLocation && !isLoadingUserLocation && (
        <button onClick={requestUserLocation} className={styles.locationButton}>
          Share Your Location
        </button>
      )}
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
              position={{ lat: parseFloat(location.lat), lng: parseFloat(location.lng) }}
              onClick={() => {
                console.log('Location selected:', location);
                setSelectedLocation(location);
              }}
            />
          ))}
          {selectedLocation && (
            <InfoWindow
              position={{ lat: parseFloat(selectedLocation.lat), lng: parseFloat(selectedLocation.lng) }}
              onCloseClick={() => setSelectedLocation(null)}
            >
              <div className={styles.infoWindow}>
                <h3>{selectedLocation.name}</h3>
                <p>{selectedLocation.address}</p>
                {selectedLocation.phone && <p>Phone: {selectedLocation.phone}</p>}
                <button onClick={getDirections} className={styles.directionsButton}>Get Directions</button>
              </div>
            </InfoWindow>
          )}
          {userLocation && (
            <Marker
              position={userLocation}
              icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            />
          )}
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                suppressMarkers: true,
                polylineOptions: {
                  strokeColor: "#1a5f7a",
                  strokeWeight: 4,
                },
              }}
            />
          )}
        </GoogleMap>
      </div>
      {selectedLocation && (
        <div className={styles.selectedLocationInfo}>
          <h3>Selected Location: {selectedLocation.name}</h3>
          <p>{selectedLocation.address}</p>
          {selectedLocation.phone && <p>Phone: {selectedLocation.phone}</p>}
          <button onClick={getDirections} className={styles.directionsButton}>Get Directions</button>
        </div>
      )}
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








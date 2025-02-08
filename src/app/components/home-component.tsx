'use client'

import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { encodeLocation } from '@/utils/encode-utils';
import { SearchBar } from './search-bar';

export const LocationButton = () => {
  const [gettingLocation, setGettingLocation] = useState(false);

  const getUserLocation = () => {
    setGettingLocation(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const encodedLocation = encodeLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              name: 'Current Location'
            });
            window.location.href = `/forecast/${encodeURIComponent(encodedLocation)}`;
          } catch (error) {
            console.error('Error getting location:', error);
          } finally {
            setGettingLocation(false);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setGettingLocation(false);
        }
      );
    }
  };

  return (
    <button
      onClick={getUserLocation}
      className="mt-4 flex items-center justify-center w-full gap-2 px-4 py-2 text-sm text-gray-600 border rounded-lg hover:bg-gray-50"
      disabled={gettingLocation}
    >
      <MapPin className="w-4 h-4" />
      {gettingLocation ? 'Getting location...' : 'Use my location'}
    </button>
  );
};


const HomeComponent = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <SearchBar />
      <LocationButton />
    </div>
  );
};

export default HomeComponent;
'use client'

import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { encodeLocation } from '@/utils/encode-utils';

const LocationSearch = () => {
  const [search, setSearch] = useState('');
  const [gettingLocation, setGettingLocation] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      window.location.href = `/forecast/`;
    }
  };

  const getUserLocation = () => {
    setGettingLocation(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const encodedLocation = encodeLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude, name: 'Current location' });
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
    <div className="w-full max-w-md mx-auto">

      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter location name..."
          className="w-full px-4 py-2 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700"
        >
          <Search className="w-5 h-5" />
        </button>
      </form>

      <button
        onClick={getUserLocation}
        className="mt-4 flex items-center justify-center w-full gap-2 px-4 py-2 text-sm text-gray-600 border rounded-lg hover:bg-gray-50"
        disabled={gettingLocation}
      >
        <MapPin className="w-4 h-4" />
        {gettingLocation ? 'Getting location...' : 'Use my location'}
      </button>
    </div>
  );
};

export default LocationSearch;

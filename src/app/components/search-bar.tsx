'use client'
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { locationService } from '@/services/location-service';
import { encodeLocation } from '@/utils/encode-utils';
import { GpsLocation } from '@/types/gps-location';

export const SearchBar = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      await locationService.getLocations(search).then(res => {
        if (res.matches && res.matches.length > 0) {
          const match: GpsLocation = {
            latitude: res.matches[0].latitude,
            longitude: res.matches[0].longitude,
            name: res.matches[0].name
          };
          router.push(`/forecast/${encodeURIComponent(encodeLocation(match))}`)
        }
      });
    }
  };

  return (
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
  );
};

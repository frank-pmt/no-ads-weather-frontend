'use client'

import ForecastPage from "@/components/forecast-page";
import { SearchBar } from "@/components/search-bar";
import { DailyWeatherResponse } from "@/types/weather-response";
import { decodeLocation } from "@/utils/encode-utils";
import { Home } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Forecast() {
  const [displayTitle, setDisplayTitle] = useState(false);
  const [numDays, setNumDays] = useState(0);
  const params = useParams<{ location: string }>()

  const decodedLocation = decodeLocation(params.location);

  const handleDataReceived = (data: DailyWeatherResponse) => {
    setNumDays(data.dailyDetails.length);
    setDisplayTitle(true);
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between w-full mb-5">
          <div className="flex-grow mr-2">
            <SearchBar />
          </div>
          <button type="button" className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            onClick={() => window.location.href = '/'}>
            <Home />
          </button>
        </div>
        {displayTitle &&
          <div>
            <h1 className="text-2xl font-bold ml-4 mb-4">{numDays} Day Forecast for {decodedLocation.name}</h1>
          </div>
        }
        <ForecastPage location={decodeURIComponent(params.location)} onDataReceived={handleDataReceived} />
      </div>
    </div>
  );
}


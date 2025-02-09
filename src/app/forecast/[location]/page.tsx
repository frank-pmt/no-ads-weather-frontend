'use client'

import ForecastComponent from "@/components/forecast-component";
import ForecastPage from "@/components/forecast-component";
import { SearchBar } from "@/components/search-bar";
import { WeatherIcon } from "@/components/weather-icon";
import { weatherService } from "@/services/weather-service";
import { ForecastItem } from "@/types/forecast-item";
import { DailyWeatherResponse } from "@/types/weather-response";
import { decodeLocation } from "@/utils/encode-utils";
import { ChevronLeft, Home, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Forecast() {
  const [numDays, setNumDays] = useState(0);
  const [currentWeather, setCurrentWeather] = useState<ForecastItem>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const params = useParams<{ location: string }>()

  const decodedLocation = decodeLocation(params.location);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await weatherService.getForecast(params.location);
        setCurrentWeather(response.currentWeather);
        setForecast(response.dailyDetails);
        setNumDays(response.dailyDetails.length);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load forecast');
      } finally {
        setLoading(false);
      }
    };
    setLoading(true);
    fetchForecast();
  }, [params.location]);


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }



  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.href = '/'}
          className="mt-4 inline-flex items-center text-blue-500 hover:underline"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to home
        </button>
      </div>
    );
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
        {currentWeather &&
          <div>
            <div className="text-2xl font-bold flex items-center w-full mb-5">
              <div className="mr-4">Weather in {decodedLocation.name} </div>
              <WeatherIcon code={currentWeather.code} />
            </div>
          </div>
        }
        <div>
          <h2 className="text-2xl font-bold ml-4 mb-4">{numDays} Day Forecast</h2>
        </div>
        <ForecastComponent location={decodeURIComponent(params.location)} forecast={forecast} showChart={true}/>
      </div>
    </div>
  );
}


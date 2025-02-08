import { GpsLocation } from "@/types/gps-location";
import { DailyWeatherResponse, DetailedWeatherResponse } from "@/types/weather-response";
import { decodeLocation } from "@/utils/encode-utils";

console.log('API: ', process.env.NEXT_PUBLIC_API_URL);

export const weatherService = {

  async getForecast(location: string): Promise<DailyWeatherResponse> {
    const decodedLocation: GpsLocation = decodeLocation(location);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/weather/${encodeURIComponent(decodedLocation.latitude)}/${encodeURIComponent(decodedLocation.longitude)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch forecast');
    }
    const jsonData: DailyWeatherResponse = await response.json();
    return {
      currentWeather: jsonData.currentWeather,
      dailyDetails: jsonData.dailyDetails.map(item => ({ ...item, datetime: new Date(item.datetime) }))
    }
  },

  async getDayDetails(location: string, date: string): Promise<DetailedWeatherResponse> {
    const decodedLocation: GpsLocation = decodeLocation(location);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/weather//${encodeURIComponent(decodedLocation.latitude)}/${encodeURIComponent(decodedLocation.longitude)}/${date}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch day details');
    }
    const jsonData: DetailedWeatherResponse = await response.json();
    return {
      currentWeather: jsonData.currentWeather,
      hourlyDetails: jsonData.hourlyDetails.map(item => ({ ...item, datetime: new Date(item.datetime) }))
    }
  }
};
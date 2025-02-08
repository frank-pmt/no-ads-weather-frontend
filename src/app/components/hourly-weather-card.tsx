import { ForecastItem } from "@/types/forecast-item";
import { formatHoursOf } from "@/utils/date-utils";
import { Clock, CloudRain, Droplets, Thermometer, Wind } from "lucide-react";


const HourlyWeatherCard = ({ forecast }: { forecast: ForecastItem}) => {
    return (
      <div data-testid="hourly-weather-card" className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
        <div className="grid grid-cols-5 gap-2 items-center text-sm">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-gray-500" />
            <span className="font-medium">{formatHoursOf(forecast.datetime)}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Thermometer className="w-3 h-3 text-red-500" />
            <span>{forecast.temperature}°</span>
          </div>
          
          <div className="flex items-center gap-1">
            <CloudRain className="w-3 h-3 text-blue-500" />
            <span>{forecast.precipitation}mm</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Droplets className="w-3 h-3 text-blue-300" />
            <span>{forecast.humidity}%</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Wind className="w-3 h-3 text-gray-500" />
            <span>{forecast.windSpeed}</span>
          </div>
        </div>
      </div>
    );
  };

  export default HourlyWeatherCard;
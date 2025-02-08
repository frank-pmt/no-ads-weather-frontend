import { ForecastItem } from "@/types/forecast-item";
import { WeatherIcon } from "./weather-icon";
import { formatLocaleDateShort, formatLocaleDayOfWeek } from "@/utils/date-utils";
import { Droplets } from "lucide-react";

const WeatherCard = ({ forecast, locale, units, isSelected, onClick }: { // eslint-disable-line @typescript-eslint/no-unused-vars
    forecast: ForecastItem;
    locale: string,
    units: string,
    isSelected: boolean;
    onClick: () => void;
}) => {

    const classNames = `weather-card p-4 rounded-lg cursor-pointer transition-all 
        ${isSelected ? 'bg-blue-50 border-blue-200' : 'bg-white hover:bg-gray-50'} 
        border shadow-sm
    `;

    return (
        <div className={classNames} onClick={onClick}>
            <div className="flex flex-col items-center gap-2">
                <span className="text-sm font-medium text-gray-600">{formatLocaleDayOfWeek(forecast.datetime, locale)}</span>
                <span className="text-sm font-medium text-gray-600">{formatLocaleDateShort(forecast.datetime, locale)}</span>
                <WeatherIcon code={forecast.code} />
                <div className="flex gap-2 text-sm">
                    <span className="font-semibold text-gray-900">{Math.round(forecast.maxTemperature)}°</span>
                    <span className="text-gray-500">{Math.round(forecast.minTemperature)}°</span>
                </div>
                <div className="flex items-center">
                    <Droplets className="w-5 h-5 mr-2 text-blue-300" />
                    <span>{forecast.precipitationProbability}%</span>
                </div>
                <div>{forecast.description}</div>
            </div>
        </div>
    );
}

export default WeatherCard;
import { ForecastItem } from "@/types/forecast-item";
import { WeatherIcon } from "./weather-icon";
import { formatLocaleDateShort, formatLocaleDayOfWeek, formatLocaleDayOfWeekShort } from "@/utils/date-utils";
import { Droplets } from "lucide-react";

const isMobile = () => {
    const userAgent = window.navigator.userAgent;
    const mobileBrowser = /iPhone|iPad|iPod|Android/i.test(userAgent);
    const mobileViewport = window.matchMedia('(max-width: 768px)').matches;
    return mobileBrowser || mobileViewport;
}

const WeatherCard = ({ forecast, locale, units, today, isSelected, onClick }: { // eslint-disable-line @typescript-eslint/no-unused-vars
    forecast: ForecastItem;
    locale: string,
    units: string,
    today: boolean,
    isSelected: boolean;
    onClick: () => void;
}) => {

    const classNames = `weather-card h-full p-4 rounded-lg cursor-pointer transition-all 
        ${isSelected ? 'bg-blue-50 border-blue-200' : 'bg-white hover:bg-gray-50'} 
        border shadow-sm
    `;

    const dayOfWeek = isMobile() ? formatLocaleDayOfWeekShort(forecast.datetime, locale) : formatLocaleDayOfWeek(forecast.datetime, locale);

    return (
        <div className={classNames} onClick={onClick}>
            <div className="flex flex-col items-center gap-2">
                {today ?
                     <span className="text-sm font-bold text-gray-800">Today</span>
                    : <span className="text-sm font-medium text-gray-600">{dayOfWeek}</span>
                }
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
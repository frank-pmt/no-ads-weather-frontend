'use client'

import React, { useState, useEffect } from 'react';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { ForecastItem } from '@/types/forecast-item';
import { DailyWeatherResponse } from '@/types/weather-response';
import { SimpleLineChart } from './simple-line-chart';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js/auto';
import WeatherCard from './weather-card';
import HourlyWeatherCard from './hourly-weather-card';
import { formatAsIsoDate, formatLocaleDate, formatLocaleDateShort, formatLocaleDayAndMonth } from '@/utils/date-utils';
import { weatherService } from '@/services/weather-service';
import { settingsService } from '@/services/settings-service';

interface ForecastProps {
    location: string;
    forecast: ForecastItem[];
    showChart: boolean;
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const ForecastComponent = ({ location, forecast, showChart }: ForecastProps) => {
    const [loading, setLoading] = useState(true);
    const [locale, setLocale] = useState(null);
    const [units, setUnits] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [maxMobileIndex, setMaxMobileIndex] = useState(0);
    const [visibleItems, setVisibleItems] = useState<ForecastItem[]>([]);
    const [chartData, setChartData] = useState<number[]>(null);
    const [chartLabels, setChartLabels] = useState<string[]>(null);
    const [hourlyDetails, setHourlyDetails] = useState<ForecastItem[]>([]);
    const [selectedDay, setSelectedDay] = useState<Date | null>(null);

    const fetchSettings = async () => {
        const localeResponse = await settingsService.getUserLocale();
        setLocale(localeResponse);
        const unitsResponse = await settingsService.getUnitsPreference();
        setUnits(unitsResponse);
        setLoading(false);
    };

    const processChartData = (forecast: ForecastItem[]) => {
        const chartData = forecast?.map(day => day.maxTemperature) || [];
        const chartLabels = forecast?.map(day =>
            new Date(day.datetime).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric'
            })) || [];
        setChartData(chartData);
        setChartLabels(chartLabels);
    }

    const nextSlide = () => {
        console.log(currentIndex);
        const next = Math.min(currentIndex + 1, maxMobileIndex);
        setCurrentIndex(next);
        setVisibleItems(forecast.slice(next, next + 3))
    };

    const prevSlide = () => {
        console.log(currentIndex);
        const prev = Math.max(currentIndex - 1, 0);
        setCurrentIndex(prev);
        setVisibleItems(forecast.slice(prev, prev + 3))
    };

    const daySelected = (day: Date) => {
        if (selectedDay === day) {
            setSelectedDay(null);
        } else {
            setSelectedDay(day);
            weatherService.getDayDetails(location, formatAsIsoDate(day)).then(resp => {
                setHourlyDetails(resp.hourlyDetails);
            });
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchSettings();
    }, []);

    useEffect(() => {
        setLoading(true);
        processChartData(forecast);
        setVisibleItems(forecast.slice(currentIndex, currentIndex + 3));
        setMaxMobileIndex(forecast.length - 3);
        setLoading(false);
    }, [location, forecast])

    if (loading) {
        return (<div></div>)
    }

    return (
        <div>
            <div className="w-full mb-4">
                {showChart && chartData && <SimpleLineChart labels={chartLabels} values={chartData} title="The title" />}
            </div>

            <div className="max-w-auto mx-auto">
                <div className="hidden md:grid md:grid-cols-7 gap-4">
                    {forecast.map((day, index) => (
                        <div key={day.datetime + ""} data-testid={"d-day-" + (index + 1)}>
                            <WeatherCard forecast={day} today={index === 0} locale={locale} units={units} isSelected={selectedDay === day.datetime} onClick={() => daySelected(day.datetime)} />
                        </div>
                    ))
                    }
                </div>
                <div className="md:hidden">


                    <div className="flex items-center justify-between mb-4">
                        <button onClick={prevSlide} disabled={currentIndex === 0} className="p-2">
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <h2 className="text-lg font-semibold">
                            {formatLocaleDayAndMonth(visibleItems[0].datetime, locale)} - {formatLocaleDayAndMonth(visibleItems[2].datetime, locale)}
                        </h2>
                        <button onClick={nextSlide} disabled={currentIndex === maxMobileIndex} className="p-2">
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>


                    <div className="flex justify-between w-full gap-2">
                        {visibleItems.map((day, index) => (
                            <div key={day.datetime + ""} data-testid={"m-day-" + (index + 1)} className="w-1/3 min-w-0 hover:shadow-lg transition-shadow">
                                <div className="lex flex-col justify-between h-full">
                                    <WeatherCard forecast={day} today={index === 0} locale={locale} units={units} isSelected={selectedDay === day.datetime} onClick={() => daySelected(day.datetime)} />
                                </div>
                            </div>
                        ))}
                    </div>


                    <div className="flex justify-center gap-1 mt-4">
                        {forecast.map((_, index) => {
                            const isVisible = index >= currentIndex &&
                                index < currentIndex + 3;
                            return (
                                <div
                                    key={index}
                                    className={`h-1 w-4 rounded-full ${isVisible ? 'bg-blue-700' : 'bg-blue-300'}`}
                                />
                            );
                        })}
                    </div>

                </div>
            </div>

            <div className="w-full mx-auto py-4">
                {selectedDay && hourlyDetails && hourlyDetails.map((forecast, index) => (
                    <HourlyWeatherCard key={index} forecast={forecast} />
                ))}
            </div>

        </div>
    );
};

export default ForecastComponent;

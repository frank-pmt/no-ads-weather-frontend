'use client'

import React, { useState, useEffect } from 'react';
import { Loader2, ChevronLeft } from 'lucide-react';
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
import { formatAsIsoDate } from '@/utils/date-utils';
import { weatherService } from '@/services/weather-service';
import { settingsService } from '@/services/settings-service';

interface ForecastProps {
    location: string;
    onDataReceived: (response: DailyWeatherResponse) => void;
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

const ForecastPage = ({ location, onDataReceived }: ForecastProps) => {
    const [locale, setLocale] = useState(null);
    const [units, setUnits] = useState(null);
    const [forecast, setForecast] = useState<ForecastItem[]>([]);
    const [chartData, setChartData] = useState<number[]>(null);
    const [chartLabels, setChartLabels] = useState<string[]>(null);
    const [hourlyDetails, setHourlyDetails] = useState<ForecastItem[]>([]);
    const [selectedDay, setSelectedDay] = useState<Date | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSettings = async () => {
            const localeResponse = await settingsService.getUserLocale();
            setLocale(localeResponse);
            const unitsResponse = await settingsService.getUnitsPreference();
            setUnits(unitsResponse);
        };
        fetchSettings();
    }, []);


    useEffect(() => {
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

        const fetchForecast = async () => {
            try {
                const response = await weatherService.getForecast(location);
                setForecast(response.dailyDetails);
                processChartData(response.dailyDetails);


                onDataReceived(response);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load forecast');
            } finally {
                setLoading(false);
            }
        };
        fetchForecast();
    }, [location, onDataReceived]);


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

    return (
        <div>
            <div className="w-full" data-testid="tmp">
                {forecast && <SimpleLineChart labels={chartLabels} values={chartData} title="The title" />}
            </div>

            <div className="max-w-auto mx-auto p-4">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4">
                    {forecast.map((day, index) => (
                        <div key={day.datetime + ""} data-testid={"day-" + (index + 1)}>
                            <WeatherCard forecast={day} locale={locale} units={units} isSelected={selectedDay === day.datetime} onClick={() => daySelected(day.datetime)} />
                        </div>
                    ))
                    }
                </div>
            </div>

            <div className="w-full mx-auto p-4">
                {hourlyDetails && hourlyDetails.map((forecast, index) => (
                    <HourlyWeatherCard key={index} forecast={forecast} />
                ))}
            </div>

        </div>
    );
};

export default ForecastPage;

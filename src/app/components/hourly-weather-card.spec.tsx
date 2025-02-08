import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ForecastItem } from '@/types/forecast-item';
import HourlyWeatherCard from './hourly-weather-card';

describe('HourlyWeatherCard Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('displays weather info', async () => {
      const item: ForecastItem = {
        datetime: new Date(),
        code: 'cloudy',
        description: 'cloudy',
        temperature: 15.5,
        humidity: 58,
        precipitation: 0.5,
        precipitationProbability: 50,
        windSpeed: 10,
        windDirection: "150",
        windGusts: 12,
        uvIndex: 0
    }
    
    render(<HourlyWeatherCard forecast={item}/>);

    expect(screen.getByTestId('hourly-weather-card')).toBeInTheDocument();

  })

});
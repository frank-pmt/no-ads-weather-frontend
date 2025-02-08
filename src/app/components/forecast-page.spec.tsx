import { describe, test, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ForecastPage from './forecast-page';
import { DailyWeatherResponse } from '@/types/weather-response';
import { ForecastItem } from '@/types/forecast-item';
import { encodeLocation } from '@/utils/encode-utils';

global.fetch = vi.fn();

function mockFetchResponse(data: DailyWeatherResponse) {
    return {
        ok: true,
        json: () => Promise.resolve(data)
    };
}

describe('ForecastPage Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
            value: () => ({
              fill: vi.fn(),
              fillRect: vi.fn(),
              clearRect: vi.fn(),
              getImageData: vi.fn(),
              putImageData: vi.fn(),
              createPattern: vi.fn(),
              createLinearGradient: vi.fn(),
              drawImage: vi.fn(),
            }),
          });
    });

    test('loads initial data', async () => {
        const mockCurrentWeather: ForecastItem = {
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
        const mockData: DailyWeatherResponse = {
            currentWeather: mockCurrentWeather,
            dailyDetails: [
                {
                    datetime: new Date(),
                    code: 'cloudy',
                    description: 'cloudy',
                    temperature: 15.5,
                    minTemperature: 11.7,
                    maxTemperature: 17.0,
                    humidity: 58,
                    precipitation: 0.5,
                    precipitationProbability: 50,
                    windSpeed: 10,
                    windDirection: "150",
                    windGusts: 12,
                    uvIndex: 0
                }
            ]
        };
        (fetch as Mock).mockImplementationOnce(() =>
            new Promise(resolve =>
                setTimeout(() => resolve(mockFetchResponse(mockData)), 100)
            )
        );
        
        const location = encodeLocation({latitude: 48.85341, longitude: 2.3488, name: 'Paris'})

        render(<ForecastPage location={location} onDataReceived={() => {}}/>);

        await waitFor(() => {
            expect(screen.getByTestId('day-1')).toBeInTheDocument()
            const button = screen.getByTestId('day-1');
            expect(button).toBeVisible();
            fireEvent.click(button);
        });
        
        const element = screen.getByTestId('day-1');

        expect(element).toBeInTheDocument();
        expect(element.querySelector('.weather-card')).toBeInTheDocument();

    });

});
import { describe, test, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ForecastPage from './forecast-component';
import { DailyWeatherResponse } from '@/types/weather-response';
import { ForecastItem } from '@/types/forecast-item';
import { encodeLocation } from '@/utils/encode-utils';

global.fetch = vi.fn();

global.matchMedia = vi.fn();

const mockFetchResponse = (data: DailyWeatherResponse) => {
    return {
        ok: true,
        json: () => Promise.resolve(data)
    };
}

const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
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

    test('Display forecast data', async () => {
        const d = new Date();
        const mockCurrentWeather: ForecastItem = {
            datetime: d,
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
        const sunnyWeather: ForecastItem = {
            datetime: d,
            code: 'sunny',
            description: 'sunny',
            temperature: 19.5,
            minTemperature: 14.2,
            maxTemperature: 20.5,
            humidity: 52,
            precipitation: 0.0,
            precipitationProbability: 0,
            windSpeed: 10,
            windDirection: "150",
            windGusts: 12,
            uvIndex: 0

        }
        const mockData: DailyWeatherResponse = {
            currentWeather: mockCurrentWeather,
            dailyDetails: [
                { ...sunnyWeather, datetime: addDays(d, 1) },
                { ...sunnyWeather, datetime: addDays(d, 2) },
                { ...sunnyWeather, datetime: addDays(d, 3) },
                { ...sunnyWeather, datetime: addDays(d, 4) },
                { ...sunnyWeather, datetime: addDays(d, 5) },
                { ...sunnyWeather, datetime: addDays(d, 6) },
                { ...sunnyWeather, datetime: addDays(d, 7) },
            ]
        };
        (fetch as Mock).mockImplementationOnce(() =>
            new Promise(resolve =>
                setTimeout(() => resolve(mockFetchResponse(mockData)), 100)
            )
        );

        (matchMedia as Mock).mockImplementation(() => []);

        const location = encodeLocation({ latitude: 48.85341, longitude: 2.3488, name: 'Paris' })

        render(<ForecastPage location={location} forecast={mockData.dailyDetails} showChart={false}/>);

        await waitFor(() => {
            expect(screen.getByTestId('d-day-1')).toBeInTheDocument()
            const button = screen.getByTestId('d-day-1');
            expect(button).toBeVisible();
            fireEvent.click(button);
        });

        const element = screen.getByTestId('d-day-1');

        expect(element).toBeInTheDocument();
        expect(element.querySelector('.weather-card')).toBeInTheDocument();

    });

});
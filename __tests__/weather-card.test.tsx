import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ForecastItem } from '@/types/forecast-item'
import WeatherCard from '@/components/weather-card'

 
test('WeatherCard', () => {
  
    const forecast: ForecastItem = {
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
    };
    render(<WeatherCard forecast={forecast} locale='en-US' units='celsius' isSelected={false} onClick={() => {}} />);
 
    const cloudyText = screen.getAllByText('cloudy')
 
    expect(cloudyText).toBeDefined()

    const sunnyText = screen.queryByText('sunny')
 
    expect(sunnyText).toBeFalsy()

})


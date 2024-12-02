import { useEffect, useState } from 'react';

// const API_KEY = 'b9359cd5055d955d654e877e34f9f491';
// const API_URL = 'https://api.openweathermap.org/data/2.5';
const API_URL = process.env.NEXT_PUBLIC_WEATHER_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export default function LocationComponent() {
    const [weatherData, setWeatherData] = useState<any>(null);
    const [userLocation, setUserLocation] = useState('Location unavailable');

    useEffect(() => {
        fetchWeatherData();
    }, []);

    const fetchWeatherData = async () => {
        try {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;

                        // Ensure API_KEY is not undefined
                        if (!API_KEY) {
                            throw new Error('API key is missing');
                        }

                        const response = await fetch(`${API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);

                        if (!response.ok) {
                            throw new Error(`Error: ${response.status} ${response.statusText}`);
                        }

                        const data = await response.json();
                        setWeatherData(data);
                        setUserLocation(data?.name || 'Location unavailable');
                    },
                    (error) => {
                        console.error('Error getting geolocation:', error);
                        alert('Please enable location services.');
                        setUserLocation('Location unavailable');
                    }
                );
            } else {
                console.error('Geolocation is not supported by your browser');
                setUserLocation('Geolocation not supported');
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setUserLocation('Weather data unavailable');
        }
    };

    return (
        <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-700">
                {userLocation}
            </span>
        </div>
    );
}

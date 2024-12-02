'use client';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Image from "next/image";
import sun from '@/assets/weathericons/sun.gif';
import moon from '@/assets/weathericons/moon.gif';
import cloudsday from '@/assets/weathericons/few-clouds-day.gif';
import cloudsnight from '@/assets/weathericons/few-clouds-night.gif';
import scatteredclouds from '@/assets/weathericons/scattered-clouds.gif';
import brokenclouds from '@/assets/weathericons/broken-clouds.gif';
import showerrain from '@/assets/weathericons/shower-rain.gif';
import rainday from '@/assets/weathericons/rain-day.gif';
import rainnight from '@/assets/weathericons/rain-night.gif';
import thunderstorm from '@/assets/weathericons/thunderstorm.gif';
import snow from '@/assets/weathericons/snow.gif';
import mist from '@/assets/weathericons/mist.svg';
import wind from '@/assets/weathericons/wind.gif';
import windpressure from '@/assets/weathericons/wind-pressure.gif';
import humidity from '@/assets/weathericons/humidity.gif';
import { MdLocationOn } from "react-icons/md";
import PageHeader from './PageHeader';
import { Button } from '../ui/button';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

interface WeatherData {
    name: string;
    main: {
        temp: number;
        pressure: number;
        humidity: number;
        temp_min: number;
        temp_max: number;
        feels_like: number;
    };
    weather: [{ main: string; icon: string }];
    wind: { speed: number };
    sys: { sunset: number };
}

const WeatherView = ({ onWeatherClick, fullView }: { onWeatherClick?: () => void, fullView?: boolean }) => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentDate] = useState<string>(moment(new Date()).format('dddd, DD MMM YYYY'));
    const [isDay, setIsDay] = useState<boolean>(false);
    const [showDetailView, setShowDetailView] = useState<boolean>(false);
    const [weatherForecastData, setWeatherForecastData] = useState<any>(null);
    const [weatherIcon, setWeatherIcon] = useState('');

    const localStorageKey = 'weatherData';
    const expirationTimeKey = 'weatherDataExpiration';
    const oneHourInMilliseconds = 60 * 60 * 1000;
    const forecastStorageKey = 'forecastData';
    const forecastExpirationKey = 'forecastDataExpiration';

    const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const API_URL = process.env.NEXT_PUBLIC_WEATHER_API_URL;

    const kelvinToCelsius = (kelvin: number) => {
        return (kelvin - 273.15).toFixed(2);
    };

    useEffect(() => {
        getWeatherData();
        getFinalForecastWeather();
    }, []);

    const getWeatherData = async () => {
        const currentTimestamp = new Date().getTime();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const response = await fetch(`${API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
                        const data = await response.json();
                        setWeatherData(data);
                        setWeatherIcon(getWeatherIcon(data.weather[0].icon));

                        setIsDay(new Date().getTime() < new Date(data.sys.sunset * 1000).getTime());
                        localStorage.setItem(localStorageKey, JSON.stringify(data));
                        localStorage.setItem(expirationTimeKey, (currentTimestamp + oneHourInMilliseconds).toString());
                    } catch (error) {
                        console.error('Error fetching weather data:', error);
                    } finally {
                        setLoading(false);
                    }
                },
                (error) => console.error('Error getting geolocation:', error)
            );
        } else {
            console.error('Geolocation is not supported by your browser');
        }
    };

    function getWeatherIcon(icon: string) {
        switch (icon) {
            case '01d': return sun;
            case '01n': return moon;
            case '02d': return cloudsday;
            case '02n': return cloudsnight;
            case '03d': return scatteredclouds;
            case '03n': return scatteredclouds;
            case '04d': return brokenclouds;
            case '04n': return brokenclouds;
            case '09d': return showerrain;
            case '09n': return showerrain;
            case '10d': return rainday;
            case '10n': return rainnight;
            case '11d': return thunderstorm;
            case '11n': return thunderstorm;
            case '13d': return snow;
            case '13n': return snow;
            case '50d': return mist;
            case '50n': return mist;
        }
    }

    const fetchForecastData = async (latitude: any, longitude: any) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_WEATHER_SOIL_API_URL}/weather/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_SOIL_API_KEY}`
            );
            const data = await response.json();
            setWeatherForecastData(data);

            const currentTimestamp = new Date().getTime();
            localStorage.setItem(forecastStorageKey, JSON.stringify(data));
            localStorage.setItem(forecastExpirationKey, (currentTimestamp + oneHourInMilliseconds).toString());


        } catch (error) {
            console.error('Error fetching forecast data:', error);
        }
    };

    const getFinalForecastWeather = async () => {
        const currentTimestamp = new Date().getTime();
        const forecastData = localStorage.getItem(forecastStorageKey);
        const forecastExpiration = localStorage.getItem(forecastExpirationKey);

        if (forecastData && forecastExpiration && currentTimestamp < parseInt(forecastExpiration)) {
            setWeatherForecastData(JSON.parse(forecastData));
        } else {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        fetchForecastData(latitude, longitude);
                    },
                    (error) => {
                        console.error('Error getting geolocation:', error);
                    }
                );
            } else {
                console.error('Geolocation is not supported by your browser');
            }
        }
    };

    const getWeatherIconUrl = (icon: string) => {
        switch (icon) {
            case '01d': return sun;
            case '01n': return moon;
            case '02d': return cloudsday;
            case '02n': return cloudsnight;
            case '03d': return scatteredclouds;
            case '03n': return scatteredclouds;
            case '04d': return brokenclouds;
            case '04n': return brokenclouds;
            case '09d': return showerrain;
            case '09n': return showerrain;
            case '10d': return rainday;
            case '10n': return rainnight;
            case '11d': return thunderstorm;
            case '11n': return thunderstorm;
            case '13d': return snow;
            case '13n': return snow;
            case '50d': return mist;
            case '50n': return mist;
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!weatherData) {
        return <div>Unable to fetch weather data.</div>;
    }

    const handleWeatherSummary = () =>{
        onWeatherClick;
        setShowDetailView(true);
    }

    const WeatherSummary = () => (
        <section className="weather mx-3 flex flex-row justify-between p-2 bg-black text-white rounded-xl shadow-lg cursor-pointer"
         onClick={handleWeatherSummary}>
            <div className="flex flex-row">
                <Image
                    className=" rounded-full"
                    height={50}
                    width={50}
                    src={getWeatherIcon(weatherData?.weather[0]?.icon ?? '')}
                    alt={weatherData?.weather[0]?.main ?? 'Weather Icon'}
                />

                <div>
                    <h1 className="text-xl font-semibold px-2 pt-2">{weatherData?.name}</h1>
                    <p className="text-xs  px-2">{currentDate}</p>
                </div>

            </div>
            <div className="flex justify-between mt-4">
                <div className="text-2xl">
                    {weatherData?.main?.temp !== undefined ? Math.round(weatherData.main.temp - 273.15) : '--'}°C
                </div>
            </div>
        </section>
    );

    const handleBackClick = () => {
        setShowDetailView(false);
    };

    const WeatherDetailView = () => (
        <section className="weatherViewCast p-2  rounded-lg shadow-lg">
            <div onClick={handleBackClick}
                className="text-white  px-4 py-2 rounded-lg mt-4">
                <div className="flex items-center flex-1 cursor-pointer">
                    <MdOutlineKeyboardArrowLeft size={24} className='text-black' />
                    <h1 className="ml-2 text-sm font-semibold capitalize text-gray-600">Weather</h1>
                </div>
            </div>

            <div className='bg-black text-white pb-8  rounded-br-3xl rounded-bl-3xl mb-5'>
                <div className="flex flex-col justify-center items-center text-center">
                    <h1 className="flex flex-row text-lg my-2 font-semibold">
                        <MdLocationOn size={18} className=' text-white mt-1' />
                        {weatherData?.name}
                    </h1>
                    <Image
                        className="object-cover rounded-full"
                        height={85}
                        width={85}
                        src={getWeatherIcon(weatherData?.weather[0]?.icon ?? '')}
                        alt={weatherData?.weather[0]?.main ?? 'Weather Icon'}
                    />
                    <div className="currentWeather my-3">
                        <div className="weather text-5xl font-bold my-1">
                            <h2>
                                {kelvinToCelsius(weatherData.main.temp)}°C
                            </h2>
                        </div>
                        <div className="windInfo my-3 text-2xl font-bold">
                            <h5 className=' uppercase '>{weatherData?.weather[0].main}</h5>
                            <span className="date text-lg font-bold mt-1">
                                {currentDate}
                            </span>
                        </div>
                    </div>
                </div>

                <ul className="grid grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 text-gray-600 font-bold text-sm mx-4">
                    <li className=' bg-white mt-3 flex flex-col justify-center items-center p-5 rounded-md '>
                        <Image src={wind} height={48} width={48} className='object-cover rounded-full border border-gray-400' alt="Wind" />
                        <h6 className=' flex flex-col mt-2'>Speed : <span>{weatherData?.wind.speed}</span></h6>
                    </li>
                    <li className=' bg-white mt-3 flex flex-col justify-center items-center p-5 rounded-md'>
                        <Image src={windpressure} height={48} width={48} className='object-cover rounded-full border border-gray-400' alt="Wind Pressure" />
                        <h6 className=' flex flex-col'>Pressure: <span>{weatherData?.main?.pressure} </span></h6>
                    </li>
                    <li className=' bg-white mt-3 flex flex-col justify-center items-center p-5 rounded-md'>
                        <Image src={humidity} height={48} width={48} className='object-cover rounded-full border border-gray-400' alt="Humidity" />
                        <h6 className=' flex flex-col'>Humidity: <span>{weatherData?.main?.humidity}</span></h6>
                    </li>
                </ul>
            </div>

            <div className="hourlyForecast">
                <div className="sectionHeader">
                    <h2 className="text-lg font-semibold mb-4">
                        Hourly Forecast
                    </h2>
                </div>
                <ul className="cast grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                    {weatherForecastData.slice(0, 8).map((item: any, index: any) => (
                        <li key={index} className="flex flex-col items-center p-2 border-2 border-gray-300 rounded-lg">
                            <span className="temp text-xl font-bold my-2">
                                {kelvinToCelsius(item?.main?.temp)} <sup>°</sup>
                            </span>
                            <Image
                                src={getWeatherIconUrl(item?.weather[0]?.icon)}
                                width={48}
                                height={48}
                                alt="Weather Icon"
                                className="object-cover"
                            />
                            <span className="status mt-1 text-sm font-bold">{item?.weather[0]?.main}</span>
                            <small className="forecastDate text-xs text-gray-500">
                                {new Date(item?.dt * 1000).toLocaleString('en-US', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </small>
                        </li>
                    ))}
                </ul>
            </div>

        </section>
    );

    if (fullView) {
        return <WeatherDetailView />;
    }

    return (
        <div>

            {showDetailView ? <WeatherDetailView /> : <WeatherSummary />}
        </div>
    );
};

export default WeatherView;

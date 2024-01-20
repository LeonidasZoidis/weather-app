// ui icons
import search_icon from '../../assets/search.png';
import humidity_icon from '../../assets/humidity.png';
import wind_icon from '../../assets/wind.png';

// weather icons
import clear_sky_day from '../../assets/animated_weather_icons/day.svg';
import clear_sky_night from '../../assets/animated_weather_icons/night.svg';
import few_clouds_day from '../../assets/animated_weather_icons/cloudy-day-1.svg';
import few_clouds_night from '../../assets/animated_weather_icons/cloudy-night-3.svg';
import scattered_clouds from '../../assets/animated_weather_icons/cloudy.svg';
import shower_rain from '../../assets/animated_weather_icons/rainy-5.svg';
import rain_day from '../../assets/animated_weather_icons/rainy-2.svg';
import rain_night from '../../assets/animated_weather_icons/rainy-6.svg';
import thunder from '../../assets/animated_weather_icons/thunder.svg';
import snow from '../../assets/animated_weather_icons/snowy-6.svg';

import './Weather.css';
import { useState } from 'react';

export const Weather = () => {
    const [weatherIcon, setWeatherIcon] = useState();
    const [bg, setBg] = useState('bg-default');

    const date = new Date();
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const displayDate = ` ${date.getDate()} ${
        monthNames[date.getMonth()]
    }, ${date.getFullYear()}`;

    const weatherAPI = import.meta.env.VITE_REACT_APP_API_KEY;

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            fetchData();
        }
    };

    const fetchData = async () => {
        const inputField =
            document.getElementsByClassName('cityInput')[0].value;

        if (inputField === '') {
            console.log('search clicked');
            console.log(inputField);
            return;
        }

        let APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputField}&units=Metric&appid=${weatherAPI}`;

        const response = await fetch(APIUrl);
        const data = await response.json();
        console.log('fetch api data res:', data);
        const humidity = document.getElementsByClassName(
            'humidity-percentage'
        )[0];
        const wind = document.getElementsByClassName('wind-rate')[0];
        const temperature = document.getElementsByClassName('weather-temp')[0];
        const location = document.getElementsByClassName('weather-location')[0];
        const feelsLike = document.getElementsByClassName('feels-like')[0];
        const desc = document.getElementsByClassName('weather-description')[0];
        const minTemp = document.getElementsByClassName('min-temp')[0];
        const maxTemp = document.getElementsByClassName('max-temp')[0];

        const degreesSymbol = '°C';
        humidity.innerHTML = `${data.main.humidity} %`;
        wind.innerHTML = `${data.wind.speed} km/h`;
        temperature.innerHTML = `${data.main.temp} ${degreesSymbol}`;
        location.innerHTML = data.name;
        feelsLike.innerHTML = `Feels like ${data.main.feels_like} ${degreesSymbol}`;
        desc.innerHTML = data.weather[0].description;
        minTemp.innerHTML = `Min ${data.main.temp_min} ${degreesSymbol}`;
        maxTemp.innerHTML = `Max ${data.main.temp_max} ${degreesSymbol}`;

        switch (data.weather[0].icon) {
            case '01d':
                setWeatherIcon(clear_sky_day);
                setBg(`bg-day`);
                break;
            case '01n':
                setWeatherIcon(clear_sky_night);
                setBg(`bg-night`);
                break;

            case '02d':
                setWeatherIcon(few_clouds_day);
                setBg(`bg-day`);
                break;
            case '02n':
                setWeatherIcon(few_clouds_night);
                setBg(`bg-night`);
                break;

            case '03d':
                setWeatherIcon(scattered_clouds);
                setBg(`bg-day`);
                break;
            case '03n':
                setWeatherIcon(scattered_clouds);
                setBg(`bg-night`);
                break;

            case '04d':
                setWeatherIcon(scattered_clouds);
                setBg(`bg-day`);
                break;
            case '04n':
                setWeatherIcon(scattered_clouds);
                setBg(`bg-night`);
                break;

            case '09d':
                setWeatherIcon(shower_rain);
                setBg('bg-day');
                break;
            case '09n':
                setWeatherIcon(shower_rain);
                setBg(`bg-night`);
                break;

            case '10d':
                setWeatherIcon(rain_day);
                setBg('bg-day');
                break;
            case '10n':
                setWeatherIcon(rain_night);
                setBg(`bg-night`);
                break;

            case '11d':
                setWeatherIcon(thunder);
                setBg('bg-day');
                break;
            case '11n':
                setWeatherIcon(thunder);
                setBg(`bg-night`);
                break;

            case '13d':
                setWeatherIcon(snow);
                setBg('bg-day');
                break;
            case '13n':
                setWeatherIcon(snow);
                setBg(`bg-night`);
                break;

            default:
                setWeatherIcon(clear_icon_day);
                setBg(`bg-default`);
                break;
        }
    };
    return (
        <>
            <div className={`container ${bg}`}>
                <div className="date">{displayDate}</div>
                <div className="top-bar">
                    <input
                        onKeyDown={handleKeyPress}
                        type="text"
                        className="cityInput"
                        placeholder="Search location"
                    ></input>
                    <div onClick={() => fetchData()} className="search-icon">
                        <img src={search_icon} alt="search icon" />
                    </div>
                </div>
                {/* location */}
                <div className="weather-location">-</div>
                <div className="weather-image-wrapper">
                    <img className="weather-image" src={weatherIcon} alt="" />
                </div>
                {/* main temp */}
                <div className="weather-temp">-</div>
                {/* weather description */}
                <div className="weather-description">-</div>

                {/* min and max temps */}
                <div className="details">
                    {/* feels like temp */}
                    <div className="feels-like">-</div>
                    <div className="min-temp">-</div>
                    <div className="max-temp">-</div>
                </div>

                <div className="data-container">
                    {/* humidity */}
                    <div className="element">
                        <img src={humidity_icon} className="icon" alt="" />
                        <div className="data">
                            <div className="humidity-percentage">-</div>
                            <div className="text">Humidity</div>
                        </div>
                    </div>
                    {/* wind */}
                    <div className="element">
                        <img src={wind_icon} className="icon" alt="" />
                        <div className="data">
                            <div className="wind-rate">-</div>
                            <div className="text">Wind Speed</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* container */}
        </>
    );
};

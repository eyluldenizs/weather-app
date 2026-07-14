"use client";

import Image from "next/image";
import { useState } from "react";

function formatCityName(value) {
  const trimmedValue = value.trim();

  if (trimmedValue === "") {
    return "";
  }

  const firstLetter = trimmedValue
    .charAt(0)
    .toLocaleUpperCase("tr-TR");

  const remainingLetters = trimmedValue.slice(1);

  return firstLetter + remainingLetters;
}

export default function Home() {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("İstanbul");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

async function handleSearch() {
  const formattedCity = formatCityName(city);

  if (formattedCity === "") {
    return;
  }

  setLoading(true);
  setError("");

  try {
    const response = await fetch(
      `/api/weather?city=${encodeURIComponent(formattedCity)}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Hava durumu alınamadı.");
    }

    setWeatherData(data);
    setSelectedCity(formatCityName(data.location.name));
  } catch (error) {
    setError(error.message);
    setWeatherData(null);
  } finally {
    setLoading(false);
  }
}
const weatherIconCode =
  weatherData?.weather?.weather?.[0]?.icon || "01d";

const weatherDescription =
  weatherData?.weather?.weather?.[0]?.description ||
  "Hafif Parçalı Bulutlu";

const weatherIconUrl =
  `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
  return (
    <main className="weather-page">
      <section className="weather-card">

         <div className="search-box">
          {/* Label görsel olarak gizlenecek ama erişilebilir kalacak */}
          <label className="search-label" htmlFor="city">
            Şehir veya ilçe ara
          </label>

          <input
            className="search-input"
            id="city"
            type="text"
            placeholder="Şehir ara..."
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />

          {/* Arama kutusunun sağındaki ikon butonu */}
          <button
            className="search-button"
            type="button"
            aria-label="Hava durumunu ara"
             onClick={handleSearch}
              disabled={loading}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              width="20"
              height="20"
            >
              <path
                d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
          {/* Geçici hava durumu özeti */}
        <div className="weather-summary">
          {loading && (
  <p className="loading-message">
    Hava durumu yükleniyor...
  </p>
)}

{error && (
  <p className="error-message">
    {error}
  </p>
)}
          {/* Input boşsa İstanbul, doluysa yazılan şehir gösterilir */}
          <h1 className="city-name">{selectedCity}</h1>

          {/* Tarihi ileride dinamik hale getireceğiz */}
          <p className="weather-date">Salı, 14 Temmuz</p>

          <div className="current-weather">
            {/* Geçici parçalı bulutlu hava ikonu */}
           <Image
  className="weather-icon"
  src={weatherIconUrl}
  alt={weatherDescription}
  width={110}
  height={80}
/>
            {/* Geçici sıcaklık değeri */}
            <p className="temperature">
            {weatherData
    ? Math.round(weatherData.weather.main.temp)
    : 26}
  <span className="temperature-unit">°C</span>

            </p>
          </div>

         <p className="weather-condition">
  {weatherDescription}
</p>

{/* Nem ve rüzgâr bilgileri */}
<div className="weather-details">
  {/* Nem bilgisi */}
  <div className="detail-item">
    <svg
      className="detail-icon"
      aria-hidden="true"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 3S6 9.2 6 14a6 6 0 0 0 12 0c0-4.8-6-11-6-11Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      <path
        d="M9 14.5A3.5 3.5 0 0 0 12.5 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>

    <p className="detail-text">
     Nem:{" "}
<strong>
  %{weatherData ? weatherData.weather.main.humidity : 64}
</strong>
    </p>
  </div>

  {/* İki bilgi arasındaki dikey çizgi */}
  <div className="detail-divider" aria-hidden="true" />

  {/* Rüzgâr bilgisi */}
  <div className="detail-item">
    <svg
      className="detail-icon"
      aria-hidden="true"
      viewBox="0 0 24 24"
    >
      <path
        d="M3 8H14A3 3 0 1 0 11 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M3 12H18A3 3 0 1 1 15 15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M3 16H10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>

    <p className="detail-text">
     Rüzgâr:{" "}
<strong>
  {weatherData
    ? Math.round(weatherData.weather.wind.speed * 3.6)
    : 18}{" "}
  km/sa
</strong>
    </p>
  </div>
</div>

        </div>
      </section>
    </main>
  );
}
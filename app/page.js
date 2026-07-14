"use client";

import { useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");

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
          {/* Input boşsa İstanbul, doluysa yazılan şehir gösterilir */}
          <h1 className="city-name">{city || "İstanbul"}</h1>

          {/* Tarihi ileride dinamik hale getireceğiz */}
          <p className="weather-date">Salı, 14 Temmuz</p>

          <div className="current-weather">
            {/* Geçici parçalı bulutlu hava ikonu */}
            <svg
              className="weather-icon"
              aria-hidden="true"
              viewBox="0 0 110 80"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="35" cy="27" r="14" />

                <path d="M35 5V1 M35 53V49 M13 27H7 M63 27H59" />
                <path d="M19 11L15 7 M55 47L51 43 M19 43L15 47 M55 7L51 11" />

                <path
                  d="M37 70H83C96 70 103 62 103 52C103 42 95 35 85 35C80 24 70 19 59 21C48 23 42 31 41 41C31 42 25 48 25 56C25 64 30 70 37 70Z"
                  fill="rgba(255, 255, 255, 0.3)"
                />
              </g>
            </svg>

            {/* Geçici sıcaklık değeri */}
            <p className="temperature">
              26<span className="temperature-unit">°C</span>
            </p>
          </div>

          {/* Geçici hava durumu açıklaması */}
          <p className="weather-condition">Hafif Parçalı Bulutlu</p>
        </div>
      </section>
    </main>
  );
}
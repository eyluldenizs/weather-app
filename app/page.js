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
      <h1 className="weather-title">Hava Durumu </h1>

      <p className="weather-description">
        Bana istenilen yerin hava durumu hakkında bilgi ver.
      </p>

       <p className="city-preview">
        Yazdığınız yer: {city}
      </p>
      </section>
    </main>
  );
}
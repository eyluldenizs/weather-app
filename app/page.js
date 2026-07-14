"use client";

import { useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");

  return (
    <main className="weather-page">
      <section className="weather-card">
      <h1 className="weather-title">Hava Durumu Uygulaması</h1>

      <p className="weather-description">
        Bana istenilen yerin hava durumu hakkında bilgi ver.
      </p>

      <div className="search-box">
        <label className="search-label" htmlFor="city">
          Ülke veya şehir
        </label>

        <input
          className="search-input"
          id="city"
          type="text"
          placeholder="Örneğin: İstanbul"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />

        <button className="search-button" type="button">
          Hava durumunu getir
        </button>
      </div>

       <p className="city-preview">
        Yazdığınız yer: {city}
      </p>
      </section>
    </main>
  );
}
export default function Home() {
  return (
    <main className="weather-page">
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
        />

        <button className="search-button" type="button">
          Hava durumunu getir
        </button>
      </div>
    </main>
  );
}
export async function GET(request) {
  // URL'den city parametresini alır
  const url = new URL(request.url);
  const city = url.searchParams.get("city");

  // Şehir gönderilmemişse hata döndürür
  if (!city) {
    return Response.json(
      {
        error: "Şehir adı gönderilmedi.",
      },
      {
        status: 400,
      }
    );
  }

  // .env.local içindeki gizli API anahtarını okur
  const apiKey = process.env.OPENWEATHER_API_KEY;

  // API anahtarı bulunamazsa hata döndürür
  if (!apiKey) {
    return Response.json(
      {
        error: "OpenWeatherMap API anahtarı bulunamadı.",
      },
      {
        status: 500,
      }
    );
  }

  // Şehir adını URL içinde güvenli kullanılabilir hale getirir
  const encodedCity = encodeURIComponent(city);

  // 1. İstek: Şehir adını koordinata çevirir
  const geocodingUrl =
    `https://api.openweathermap.org/geo/1.0/direct` +
    `?q=${encodedCity}&limit=1&appid=${apiKey}`;

  const geocodingResponse = await fetch(geocodingUrl);

  if (!geocodingResponse.ok) {
    return Response.json(
      {
        error: "Şehir bilgisi alınamadı.",
      },
      {
        status: geocodingResponse.status,
      }
    );
  }

  const locations = await geocodingResponse.json();

  if (locations.length === 0) {
    return Response.json(
      {
        error: "Şehir bulunamadı.",
      },
      {
        status: 404,
      }
    );
  }

  // İlk bulunan konumu alır
  const location = locations[0];

  // 2. İstek: Koordinatlarla güncel hava durumunu alır
  const weatherUrl =
    `https://api.openweathermap.org/data/2.5/weather` +
    `?lat=${location.lat}` +
    `&lon=${location.lon}` +
    `&appid=${apiKey}` +
    `&units=metric` +
    `&lang=tr`;

  const weatherResponse = await fetch(weatherUrl);

  if (!weatherResponse.ok) {
    return Response.json(
      {
        error: "Hava durumu alınamadı.",
      },
      {
        status: weatherResponse.status,
      }
    );
  }

  const weather = await weatherResponse.json();

  // Frontend'e hem konum hem hava durumu verisini gönderir
  return Response.json({
    location: {
      name: location.name,
      country: location.country,
      lat: location.lat,
      lon: location.lon,
    },
    weather: weather,
  });
}
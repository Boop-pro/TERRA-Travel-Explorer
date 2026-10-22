import { WeatherData } from '@/types';

/**
 * Free weather integration via Open-Meteo API.
 * No API key required, 100% compliant with privacy & rate limits.
 * Gracefully handles offline or network issues.
 */

// WMO Weather interpretation codes (WW)
const WMO_MAP: Record<number, { condition: string; icon: string }> = {
  0: { condition: 'Clear Sky', icon: 'sunny-outline' },
  1: { condition: 'Mainly Clear', icon: 'sunny-outline' },
  2: { condition: 'Partly Cloudy', icon: 'partly-sunny-outline' },
  3: { condition: 'Overcast', icon: 'cloud-outline' },
  45: { condition: 'Foggy Mist', icon: 'cloudy-outline' },
  48: { condition: 'Depositing Rime Fog', icon: 'cloudy-outline' },
  51: { condition: 'Light Drizzle', icon: 'rainy-outline' },
  53: { condition: 'Moderate Drizzle', icon: 'rainy-outline' },
  55: { condition: 'Dense Drizzle', icon: 'rainy-outline' },
  61: { condition: 'Slight Rain', icon: 'rainy-outline' },
  63: { condition: 'Moderate Rain', icon: 'rainy-outline' },
  65: { condition: 'Heavy Rain', icon: 'thunderstorm-outline' },
  71: { condition: 'Slight Snow', icon: 'snow-outline' },
  73: { condition: 'Moderate Snow', icon: 'snow-outline' },
  75: { condition: 'Heavy Snow', icon: 'snow-outline' },
  80: { condition: 'Passing Showers', icon: 'rainy-outline' },
  81: { condition: 'Moderate Showers', icon: 'rainy-outline' },
  82: { condition: 'Violent Showers', icon: 'thunderstorm-outline' },
  95: { condition: 'Thunderstorm', icon: 'thunderstorm-outline' },
};

export async function fetchLiveWeather(
  latitude: number,
  longitude: number
): Promise<WeatherData | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`;

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`Weather API responded with status ${response.status}`);
      return null;
    }

    const data = await response.json();
    const current = data?.current;

    if (!current) {
      return null;
    }

    const code = Number(current.weather_code ?? 0);
    const meta = WMO_MAP[code] || { condition: 'Pleasant', icon: 'partly-sunny-outline' };

    return {
      temperature: Math.round(Number(current.temperature_2m ?? 24)),
      humidity: Math.round(Number(current.relative_humidity_2m ?? 50)),
      windSpeed: Math.round(Number(current.wind_speed_10m ?? 8)),
      condition: meta.condition,
      iconName: meta.icon,
      isDaytime: true,
      timeFetched: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  } catch {
    // Graceful silent fallback - never disrupt destination details
    return null;
  }
}

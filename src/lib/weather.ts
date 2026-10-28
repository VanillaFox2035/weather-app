/* eslint-disable @typescript-eslint/no-explicit-any */
// Data layer: types, API calls and parsing. No React in here.

export const DEFAULT_PLACE = "名間";
const API = "https://weatherdata.vanillafox.site:4200/";

export type Kind =
  | "clear" | "mostlyClear" | "partlyCloudy" | "mostlyCloudy" | "cloudy"
  | "scatteredShowers" | "scatteredThunder" | "scatteredSnow"
  | "drizzle" | "showers" | "thunder" | "showersSnow" | "haze" | "unknown";

export const KIND_LABEL: Record<Kind, string> = {
  clear: "Clear", mostlyClear: "Mostly clear", partlyCloudy: "Partly cloudy",
  mostlyCloudy: "Mostly cloudy", cloudy: "Cloudy",
  scatteredShowers: "Scattered showers", scatteredThunder: "Scattered thunderstorms",
  scatteredSnow: "Snow flurries", drizzle: "Drizzle", showers: "Rain",
  thunder: "Thunderstorms", showersSnow: "Snow showers", haze: "Fog or haze", unknown: "Unknown",
};

const WET = new Set<Kind>(["scatteredShowers", "scatteredThunder", "drizzle", "showers", "thunder"]);
export const isWet = (k: Kind) => WET.has(k);
export const isNight = (hour: number) => hour <= 5 || hour >= 18;

export type Theme = "sun" | "overcast" | "rain" | "night" | "rain-night";
export function themeFor(kind: Kind, night: boolean): Theme {
  if (isWet(kind)) return night ? "rain-night" : "rain";
  if (night) return "night";
  return kind === "clear" || kind === "mostlyClear" || kind === "partlyCloudy" ? "sun" : "overcast";
}

export interface Current { updated: string; kind: Kind; temp: number | null; humidity: number | null; rain: number | null; night: boolean }
export interface Hour { time: string; kind: Kind; temp: number; night: boolean }
export interface Day { label: string; kind: Kind; max: number; min: number }
export interface Forecast { current: Current; hours: Hour[]; days: Day[] }

// Same matching rules as the old Host.TranslateWeather, flattened.
export function translateWeather(wx: string): Kind {
  const has = (s: string) => wx.includes(s);
  const clear = has("晴"), cloudy = has("多雲"), overcast = has("陰"), thunder = has("雷");
  const scattered = has("局部") || has("短暫"), rain = has("雨"), snow = has("雪"), fog = has("霧");

  if (clear) {
    if (snow) return "scatteredSnow";
    if (thunder) return "scatteredThunder";
    if (rain || scattered) return "scatteredShowers";
    if (overcast) return "mostlyCloudy";
    if (cloudy) return wx.indexOf("晴") < wx.indexOf("多雲") ? "mostlyClear" : "partlyCloudy";
    return "clear";
  }
  if (cloudy || overcast) {
    if (snow) return "showersSnow";
    if (thunder) return "thunder";
    if (scattered) return "drizzle";
    if (rain) return "showers";
    return overcast ? "cloudy" : "partlyCloudy";
  }
  if (thunder) return "thunder";
  if (scattered) return "drizzle";
  if (rain) return "showers";
  if (snow) return "showersSnow";
  if (fog) return "haze";
  return "unknown";
}

const p2 = (n: number) => String(n).padStart(2, "0");
const parseTime = (s: string) => Date.parse(s.replace(" ", "T"));
// The API uses -99 for "no data".
const num = (v: unknown): number | null => {
  const n = Number(v);
  return Number.isFinite(n) && n !== -99 ? n : null;
};

async function get(path: string, place: string, signal?: AbortSignal) {
  const res = await fetch(`${API}${path}?location=${encodeURIComponent(place)}`, { signal });
  if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`);
  return res.json();
}

export async function fetchLocations(signal?: AbortSignal): Promise<string[]> {
  const data = await get("LocationList", DEFAULT_PLACE, signal);
  return Array.isArray(data) ? data.map((v: any) => String(v?.title ?? v)) : [];
}

function parseCurrent(data: any): Current {
  const el = data.records.Station[0].WeatherElement;
  const t = new Date(data.timestamp);
  const temp = num(el.AirTemperature);
  return {
    updated: `${p2(t.getHours())}:${p2(t.getMinutes())}`,
    kind: translateWeather(String(el.Weather ?? "")),
    temp: temp === null ? null : Math.round(temp),
    humidity: num(el.RelativeHumidity),
    rain: num(el.Now?.Precipitation),
    night: isNight(new Date().getHours()),
  };
}

function parseHours(data: any): Hour[] {
  const el = data.records.Locations[0].Location[0].WeatherElement;
  const wx: any[] = el[8].Time, tp: any[] = el[0].Time;
  const start = Math.max(0, wx.findIndex((t) => parseTime(t.StartTime) >= Date.now()));
  const out: Hour[] = [];
  for (let i = start; i < Math.min(wx.length, start + 6); i++) {
    const temp = num(tp[i]?.ElementValue[0].Temperature);
    if (temp === null) continue;
    const time = String(wx[i].StartTime).substring(11, 16);
    out.push({ time, kind: translateWeather(wx[i].ElementValue[0].Weather), temp, night: isNight(Number(time.slice(0, 2))) });
  }
  return out;
}

function parseDays(data: any): Day[] {
  const el = data.records.Locations[0].Location[0].WeatherElement;
  const wx: any[] = el[12].Time, maxT: any[] = el[1].Time, minT: any[] = el[2].Time;
  const tomorrow = Date.parse(`${new Date().toLocaleDateString("sv-SE")}T23:59:59`);
  const start = Math.max(0, wx.findIndex((t) => parseTime(t.StartTime) >= tomorrow));
  const out: Day[] = [];
  // The feed alternates day/night entries, so step by two and merge each pair.
  for (let d = start; wx[d] && out.length < 6; d += 2) {
    const n = wx[d + 1] ? d + 1 : d;
    const max = Math.max(Number(maxT[d].ElementValue[0].MaxTemperature), Number(maxT[n].ElementValue[0].MaxTemperature));
    const min = Math.min(Number(minT[d].ElementValue[0].MinTemperature), Number(minT[n].ElementValue[0].MinTemperature));
    out.push({
      label: out.length === 0 ? "Tomorrow" : new Date(parseTime(wx[d].StartTime)).toLocaleDateString("en-US", { weekday: "long" }),
      kind: translateWeather(wx[d].ElementValue[0].Weather), max, min,
    });
  }
  return out;
}

export async function fetchForecast(place: string, signal?: AbortSignal): Promise<Forecast> {
  const [cur, day, week] = await Promise.all([
    get("CurrentWeather", place, signal), get("DayWeather", place, signal), get("WeekWeather", place, signal),
  ]);
  return { current: parseCurrent(cur), hours: parseHours(day), days: parseDays(week) };
}

// The one-line answer to "do I need an umbrella?"
export function summarize(c: Current, hours: Hour[]): string {
  const last = hours[hours.length - 1];
  if (isWet(c.kind)) {
    const dry = hours.find((h) => !isWet(h.kind));
    if (dry) return `Raining now, easing around ${dry.time}.`;
    return last ? `Raining now, with more rain through ${last.time}.` : "Raining now.";
  }
  const wet = hours.find((h) => isWet(h.kind));
  if (wet) return `Rain likely around ${wet.time}. Bring an umbrella.`;
  return last ? `No rain expected through ${last.time}.` : "";
}
